import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useStore();
  const navigate = useNavigate();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-12">
        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="text-gray-300" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 px-4">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Start Shopping
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        Your Cart
        <span className="text-sm font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
          {cart.length} items
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.category}</p>
                  <p className="text-lg font-bold text-primary mt-1">₹{item.product.price}</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="hover:text-primary transition-colors disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="hover:text-primary transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold mb-8">
              <span>Total</span>
              <span className="text-primary">₹{total}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
            >
              Checkout
              <ArrowRight size={20} />
            </button>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 justify-center">
              <MapPin size={12} />
              <span>Free delivery within 5km of Supermarket</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
