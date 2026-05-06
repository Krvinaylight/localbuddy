import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Truck, Loader2, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getCartTotal, clearCart, user } = useStore();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [orderSuccess, setOrderSuccess] = useState(null);
  
  const total = getCartTotal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    // Get geolocation on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Reverse geocode using Nominatim (free)
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            setAddress(data.display_name);
          } catch (err) {
            console.error('Geocoding error:', err);
          }
        },
        (err) => console.error('Location error:', err)
      );
    }
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({ product_id: item.product.id, quantity: item.quantity })),
        payment_method: paymentMethod,
        address: address,
        latitude: location.lat,
        longitude: location.lng
      };

      const orderRes = await api.post('/orders/', orderData);
      const { order_id, razorpay_order_id, razorpay_key, total_price } = orderRes.data;
      
      if (paymentMethod === 'Online' && razorpay_order_id && razorpay_key) {
        const options = {
          key: razorpay_key,
          amount: total_price * 100,
          currency: "INR",
          name: "Local Buddy",
          description: "Grocery Order",
          order_id: razorpay_order_id,
          handler: async (rzpResponse) => {
            try {
              await api.post('/orders/verify_payment', {
                ...rzpResponse,
                order_id: order_id
              });
              setOrderSuccess(order_id);
              clearCart();
            } catch (err) {
              alert('Payment verification failed, but your order is recorded. Please contact support.');
              setOrderSuccess(order_id);
              clearCart();
            }
          },
          prefill: {
            name: user?.name || "Customer",
            email: user?.email || "customer@example.com"
          },
          theme: { color: "#6366f1" }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (paymentMethod === 'Online') {
         alert('Online payment system is down. Your order has been placed as Cash on Delivery (COD).');
         setOrderSuccess(order_id);
         clearCart();
      } else {
        setOrderSuccess(order_id);
        clearCart();
      }
    } catch (err) {
      alert('Order failed: ' + (err.response?.data?.message || 'Please check your connection or try COD.'));
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center space-y-6">
        <CheckCircle2 className="text-green-500 w-20 h-20 mx-auto" />
        <h1 className="text-3xl font-bold">Order Placed!</h1>
        <p className="text-gray-500">Your order #{orderSuccess} has been received and is being prepared.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <MapPin className="text-primary" size={20} />
              Delivery Address
            </h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 h-32 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
            {location.lat && (
              <p className="text-[10px] text-gray-400">Pinned: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CreditCard className="text-primary" size={20} />
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'COD' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'
                }`}
              >
                <Truck size={24} />
                <span className="font-bold">Cash on Delivery</span>
              </button>
              <button
                onClick={() => setPaymentMethod('Online')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'Online' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'
                }`}
              >
                <CreditCard size={24} />
                <span className="font-bold">Online Payment</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6">Final Summary</h2>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.product.name} x {item.quantity}</span>
                <span className="font-medium text-gray-900">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dashed border-gray-200 pt-4 mb-8">
            <div className="flex justify-between text-xl font-bold">
              <span>Payable Amount</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading || !address}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
