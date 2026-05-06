from flask import Blueprint, jsonify, request
from models import db, Product
from flask_jwt_extended import jwt_required, get_jwt_identity

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = Product.query
    if category and category != 'All':
        query = query.filter_by(category=category)
    if search:
        query = query.filter(Product.name.ilike(f'%{search}%'))
        
    products = query.all()
    result = [{
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "category": p.category,
        "image_url": p.image_url,
        "stock": p.stock
    } for p in products]
    
    return jsonify(result), 200

@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    p = Product.query.get_or_404(id)
    return jsonify({
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "category": p.category,
        "image_url": p.image_url,
        "stock": p.stock
    }), 200

# Admin route (simple protection, in real app check is_admin)
@products_bp.route('/', methods=['POST'])
@jwt_required()
def add_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        category=data['category'],
        image_url=data.get('image_url', ''),
        stock=data.get('stock', 0)
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201

@products_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200
