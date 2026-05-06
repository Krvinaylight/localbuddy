from flask import Blueprint, jsonify, request
from models import db, Order, OrderItem, Product
from flask_jwt_extended import jwt_required, get_jwt_identity
import razorpay
from config import Config

orders_bp = Blueprint('orders', __name__)

# Initialize Razorpay client only if keys are present (for MVP testing)
try:
    razorpay_client = razorpay.Client(auth=(Config.RAZORPAY_KEY_ID, Config.RAZORPAY_KEY_SECRET))
except Exception:
    razorpay_client = None

@orders_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.get_json()
    items = data.get('items', [])
    payment_method = data.get('payment_method', 'COD')
    address = data.get('address', '')
    latitude = data.get('latitude', None)
    longitude = data.get('longitude', None)
    
    if not items:
        return jsonify({"message": "No items in order"}), 400
        
    total_price = 0
    
    # Create order first
    new_order = Order(
        user_id=user_id,
        total_price=0, # will update
        payment_method=payment_method,
        address=address,
        latitude=latitude,
        longitude=longitude
    )
    db.session.add(new_order)
    db.session.flush() # get new_order.id
    
    for item in items:
        product = Product.query.get(item['product_id'])
        if not product:
            continue
            
        qty = item['quantity']
        price = product.price * qty
        total_price += price
        
        # update stock
        product.stock = max(0, product.stock - qty)
        
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=qty,
            price_at_purchase=product.price
        )
        db.session.add(order_item)
        
    new_order.total_price = total_price
    
    response_data = {
        "message": "Order created successfully",
        "order_id": new_order.id,
        "total_price": total_price,
        "payment_method": payment_method
    }
    
    # If Razorpay, create razorpay order
    if payment_method == 'Online' and razorpay_client:
        try:
            rzp_order = razorpay_client.order.create({
                "amount": int(total_price * 100), # amount in paise
                "currency": "INR",
                "receipt": f"receipt_order_{new_order.id}",
                "payment_capture": 1
            })
            new_order.razorpay_order_id = rzp_order['id']
            response_data['razorpay_order_id'] = rzp_order['id']
            response_data['razorpay_key'] = Config.RAZORPAY_KEY_ID
        except Exception as e:
            print(f"Razorpay order creation failed: {e}")
            
    db.session.commit()
    return jsonify(response_data), 201

@orders_bp.route('/verify_payment', methods=['POST'])
@jwt_required()
def verify_payment():
    data = request.get_json()
    razorpay_order_id = data.get('razorpay_order_id')
    razorpay_payment_id = data.get('razorpay_payment_id')
    razorpay_signature = data.get('razorpay_signature')
    order_id = data.get('order_id')
    
    if not razorpay_client:
        return jsonify({"message": "Razorpay not configured"}), 500
        
    try:
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        })
        
        order = Order.query.get(order_id)
        if order:
            order.status = 'Paid'
            order.razorpay_payment_id = razorpay_payment_id
            db.session.commit()
            return jsonify({"message": "Payment verified successfully"}), 200
            
    except razorpay.errors.SignatureVerificationError:
        return jsonify({"message": "Invalid payment signature"}), 400
        
    return jsonify({"message": "Order not found"}), 404

@orders_bp.route('/my_orders', methods=['GET'])
@jwt_required()
def my_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    
    result = []
    for o in orders:
        items = [{
            "product_name": i.product.name,
            "quantity": i.quantity,
            "price": i.price_at_purchase
        } for i in o.items]
        
        result.append({
            "id": o.id,
            "total_price": o.total_price,
            "status": o.status,
            "payment_method": o.payment_method,
            "created_at": o.created_at,
            "address": o.address,
            "items": items
        })
        
    return jsonify(result), 200

# Admin route to get all orders
@orders_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_orders():
    # In a real app, verify if user is admin
    orders = Order.query.order_by(Order.created_at.desc()).all()
    result = []
    for o in orders:
        result.append({
            "id": o.id,
            "user_id": o.user_id,
            "total_price": o.total_price,
            "status": o.status,
            "created_at": o.created_at,
            "address": o.address
        })
    return jsonify(result), 200
