import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const ProductCard = ({ product }) => {
  const { addToCart, cart, updateQuantity } = useStore();
  const cartItem = cart.find((item) => item.product.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-neon transition-all duration-500 group relative border border-white"
    >
      <Link to={`/product/${product.id}`} className="block relative h-48 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <div className="p-6 space-y-4">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-lg">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`} className="block mt-2 text-lg font-bold text-secondary line-clamp-1 hover:text-primary transition-colors tracking-tight">
            {product.name}
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black text-secondary tracking-tighter">₹{product.price}</span>

          {cartItem ? (
            <div className="flex items-center gap-3 bg-secondary text-white px-3 py-2 rounded-2xl shadow-lg">
              <button 
                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, cartItem.quantity - 1); }}
                className="hover:text-primary transition-colors p-1"
              >
                <Minus size={14} />
              </button>
              <span className="text-xs font-black w-4 text-center">{cartItem.quantity}</span>
              <button 
                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, cartItem.quantity + 1); }}
                className="hover:text-primary transition-colors p-1"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-10 h-10 bg-slate-50 text-secondary flex items-center justify-center rounded-2xl hover:bg-primary hover:text-white hover:shadow-neon transition-all duration-300"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
