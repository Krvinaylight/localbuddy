import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, Search, ShoppingBag } from 'lucide-react';
import useStore from '../store/useStore';

const Navbar = () => {
  const { cart, user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 md:px-8 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-black text-secondary tracking-tighter flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-neon group-hover:rotate-12 transition-transform duration-500">
            <ShoppingBag size={20} />
          </div>
          Local<span className="text-primary italic">Buddy</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/help" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors hidden sm:block">
            Help
          </Link>
          <Link to="/cart" className="relative p-3 rounded-2xl hover:bg-slate-100 transition-colors group">
            <ShoppingCart className="text-slate-600 group-hover:text-primary transition-colors" size={24} />
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-neon"
              >
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/admin" className="hidden md:block text-sm font-bold text-slate-500 hover:text-primary uppercase tracking-widest">
                Dashboard
              </Link>
              <button 
                onClick={() => { logout(); navigate('/auth'); }}
                className="flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-2.5 rounded-2xl font-bold hover:bg-secondary hover:text-white transition-all shadow-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-3 bg-secondary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary transition-all shadow-lg shadow-slate-200">
              <User size={20} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
