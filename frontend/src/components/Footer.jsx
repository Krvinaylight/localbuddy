import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Globe, Share2, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10 rounded-t-[60px] mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-black tracking-tighter flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-neon group-hover:rotate-12 transition-transform duration-500">
              <ShoppingBag size={20} />
            </div>
            Local<span className="text-primary italic">Buddy</span>
          </Link>
          <p className="text-slate-400 font-medium">
            Your neighborhood's favorite supermarket buddy. Fresh groceries delivered at lightning speed.
          </p>
          <div className="flex gap-4">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
               <Globe size={18} />
             </div>
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
               <Share2 size={18} />
             </div>
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
               <MessageCircle size={18} />
             </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 tracking-tighter">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/cart" className="hover:text-primary transition-colors">My Cart</Link></li>
            <li><Link to="/help" className="hover:text-primary transition-colors">Help & Support</Link></li>
            <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 tracking-tighter">Categories</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">Vegetables</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Fruits</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Dairy & Staples</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Snacks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-black mb-6 tracking-tighter">Newsletter</h4>
          <p className="text-slate-400 font-medium mb-6">Get updates on fresh stock and special offers.</p>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 pt-20 mt-20 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-slate-500 text-sm font-bold">
        <p>© 2024 Local Buddy Platform. All rights reserved.</p>
        <div className="flex gap-8">
           <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
