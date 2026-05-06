import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Plus, Minus, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import api from '../services/api';
import useStore from '../store/useStore';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity } = useStore();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        
        // Fetch related products
        const relatedRes = await api.get('/products', { params: { category: response.data.category } });
        setRelatedProducts(relatedRes.data.filter(p => p.id !== parseInt(id)).slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12"><LoadingSkeleton /><LoadingSkeleton /></div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const cartItem = cart.find((item) => item.product.id === product.id);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-all mb-10 font-bold uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={16} />
        Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[50px] overflow-hidden bg-white shadow-2xl shadow-slate-200/50 border border-white"
        >
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-10"
        >
          <div className="space-y-4">
            <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em]">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-secondary leading-[0.9] tracking-tighter">{product.name}</h1>
            <div className="flex items-center gap-4">
               <p className="text-4xl font-bold text-slate-900 tracking-tight">₹{product.price}</p>
               <span className="text-green-500 font-bold bg-green-50 px-3 py-1 rounded-lg text-sm">In Stock</span>
            </div>
          </div>

          <p className="text-slate-500 text-xl leading-relaxed font-medium">
            {product.description || 'Premium selection of the freshest quality groceries delivered directly from our local store to your home. We ensure the best standards for every item.'}
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-3xl text-center space-y-3">
              <ShieldCheck className="mx-auto text-primary" size={28} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certified</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl text-center space-y-3">
              <Truck className="mx-auto text-primary" size={28} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">10m Delivery</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl text-center space-y-3">
              <RefreshCw className="mx-auto text-primary" size={28} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Returnable</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
            {cartItem ? (
              <div className="flex items-center gap-8 bg-slate-900 text-white px-10 py-5 rounded-[25px] shadow-2xl shadow-slate-900/20">
                <button 
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  className="hover:text-primary transition-colors"
                >
                  <Minus size={24} />
                </button>
                <span className="text-2xl font-black w-10 text-center">{cartItem.quantity}</span>
                <button 
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="hover:text-primary transition-colors"
                >
                  <Plus size={24} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto bg-primary text-white px-16 py-6 rounded-[30px] font-black text-xl flex items-center justify-center gap-4 hover:bg-secondary hover:shadow-neon transition-all duration-300 active:scale-95"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-secondary tracking-tighter">You might also <span className="text-primary italic">like</span></h2>
            <div className="h-px flex-grow mx-8 bg-slate-100 hidden md:block" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
