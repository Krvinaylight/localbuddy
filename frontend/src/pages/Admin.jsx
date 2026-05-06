import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, Users, Plus, Trash2, CheckCircle } from 'lucide-react';
import api from '../services/api';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Vegetables', image_url: '', stock: 50 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        api.get('/orders/'),
        api.get('/products/')
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products/', newProduct);
      setShowAddModal(false);
      setNewProduct({ name: '', price: '', category: 'Vegetables', image_url: '', stock: 50 });
      fetchData();
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchData();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 pb-20 relative">
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] p-10 w-full max-w-lg shadow-2xl"
          >
            <h2 className="text-3xl font-black mb-8 text-secondary tracking-tighter">Add <span className="text-primary">Product</span></h2>
            <form onSubmit={handleAddProduct} className="space-y-6">
              <input 
                type="text" placeholder="Product Name" required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Price (₹)" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  {['Vegetables', 'Fruits', 'Staples', 'Dairy', 'Snacks', 'Beverages'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input 
                type="text" placeholder="Image URL (Unsplash)" required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                value={newProduct.image_url} onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20">Save Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tighter">Admin <span className="text-primary italic">Dashboard</span></h1>
          <p className="text-slate-400 font-medium mt-1">Manage your local supermarket orders and inventory</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeTab === 'orders' ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeTab === 'products' ? 'bg-white text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            Inventory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50">
          <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
            <ShoppingBag size={24} />
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Orders</p>
          <p className="text-4xl font-black text-secondary tracking-tighter mt-1">{orders.length}</p>
        </div>
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50">
          <div className="bg-cyan-50 w-12 h-12 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 shadow-sm">
            <Package size={24} />
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Inventory</p>
          <p className="text-4xl font-black text-secondary tracking-tighter mt-1">{products.length}</p>
        </div>
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50">
          <div className="bg-violet-50 w-12 h-12 rounded-2xl flex items-center justify-center text-violet-600 mb-6 shadow-sm">
            <Users size={24} />
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Customers</p>
          <p className="text-4xl font-black text-secondary tracking-tighter mt-1">1,248</p>
        </div>
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50">
          <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
            <CheckCircle size={24} />
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Delivered</p>
          <p className="text-4xl font-black text-secondary tracking-tighter mt-1">{orders.filter(o => o.status === 'Delivered').length}</p>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="bg-white rounded-[40px] border border-slate-50 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Order ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-black text-secondary tracking-tighter text-lg">#{order.id}</td>
                  <td className="px-8 py-6 text-slate-500 font-bold text-sm">User {order.user_id}</td>
                  <td className="px-8 py-6 text-slate-400 font-medium text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      order.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-black text-secondary text-lg">₹{order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="flex justify-between items-center bg-white p-6 rounded-[30px] border border-slate-50 shadow-xl shadow-slate-200/50">
             <h2 className="text-2xl font-black text-secondary tracking-tighter">Product <span className="text-primary">Catalog</span></h2>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20"
            >
              <Plus size={24} />
              Add Product
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50 flex items-center gap-6 group">
                <img src={p.image_url} className="w-24 h-24 rounded-3xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500" />
                <div className="flex-grow">
                  <p className="font-black text-secondary tracking-tight text-lg">{p.name}</p>
                  <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">{p.category} • ₹{p.price}</p>
                  <div className="mt-4 w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full shadow-neon" style={{ width: `${Math.min(100, (p.stock/100)*100)}%` }} />
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteProduct(p.id)}
                  className="p-3 text-slate-200 hover:text-primary transition-colors bg-slate-50 rounded-2xl"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
