import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search, Filter } from 'lucide-react';

const categories = ['All', 'Vegetables', 'Fruits', 'Staples', 'Dairy', 'Snacks', 'Beverages'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', {
        params: { 
          category: selectedCategory === 'All' ? '' : selectedCategory,
          search: searchQuery
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToProducts = () => {
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Premium Hero Banner */}
      <section className="relative h-[400px] md:h-[550px] rounded-[50px] overflow-hidden bg-secondary flex items-center px-8 md:px-24 group shadow-3xl border border-white/5 mx-2">
        <div className="absolute inset-0 bg-[url('/assets/hero.png')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent" />
        
        <div className="relative z-10 text-white max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-xl text-xs font-black text-primary uppercase tracking-[0.2em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Direct from Supermarket
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            Your Daily <br/> <span className="text-primary italic">Essentials,</span> <br/> Delivered.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg md:text-2xl font-medium max-w-md leading-relaxed"
          >
            Experience the future of local shopping with neon-fast deliveries and premium quality products.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={scrollToProducts}
              className="bg-primary text-white px-12 py-5 rounded-[25px] font-black text-lg shadow-2xl shadow-primary/40 hover:shadow-neon-strong hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              Shop Now
            </button>
          </motion.div>
        </div>
        
        {/* Floating Product Card Decoration */}
        <div className="absolute right-20 bottom-10 w-[300px] h-[400px] hidden xl:block">
           <motion.div
             animate={{ y: [0, -30, 0], rotate: [2, -2, 2] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="glass p-6 rounded-[40px] border border-white/20 shadow-neon"
           >
             <img 
               src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=400" 
               className="w-full h-56 object-cover rounded-[30px] mb-6"
             />
             <div className="space-y-2">
               <div className="h-4 w-20 bg-primary/20 rounded-full" />
               <div className="h-6 w-full bg-white/10 rounded-full" />
               <div className="h-6 w-2/3 bg-white/10 rounded-full" />
             </div>
           </motion.div>
        </div>
      </section>

      {/* Attractive Category Grid — clicking filters products */}
      <section className="px-2">
        <h2 className="text-2xl font-black text-secondary tracking-tighter mb-8">Browse <span className="text-primary italic">Categories</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Vegetables', sub: 'Freshly Picked', color: 'text-emerald-400', shadow: 'shadow-emerald-500/10', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800' },
            { label: 'Fruits', sub: 'Sweet & Juicy', color: 'text-orange-400', shadow: 'shadow-orange-500/10', img: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=800' },
            { label: 'Dairy', sub: 'Pure & Healthy', color: 'text-indigo-400', shadow: 'shadow-indigo-500/10', img: 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&q=80&w=800' },
            { label: 'Staples', sub: 'Kitchen Essentials', color: 'text-amber-400', shadow: 'shadow-amber-500/10', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800' },
            { label: 'Snacks', sub: 'Tasty Bites', color: 'text-pink-400', shadow: 'shadow-pink-500/10', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=800' },
            { label: 'Beverages', sub: 'Stay Refreshed', color: 'text-cyan-400', shadow: 'shadow-cyan-500/10', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800' },
          ].map(({ label, sub, color, shadow, img }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory(label);
                document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative h-64 rounded-[40px] overflow-hidden group cursor-pointer shadow-xl ${shadow}`}
            >
              <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={label} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className={`text-xs font-black uppercase tracking-widest ${color} mb-1`}>{sub}</p>
                <h3 className="text-3xl font-black tracking-tight">{label}</h3>
              </div>
              {selectedCategory === label && (
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Active
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters & Search */}
      <div className="sticky top-20 z-40 flex flex-col md:flex-row gap-6 justify-between items-center glass p-6 rounded-[30px] shadow-xl shadow-slate-200/50">
        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-3 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl whitespace-nowrap font-bold transition-all duration-300 ${
                selectedCategory === cat 
                ? 'bg-secondary text-white shadow-xl scale-105' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-6 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium border-transparent focus:border-primary/20"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div id="products-grid" className="scroll-mt-32">
        {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl">
          <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default Home;
