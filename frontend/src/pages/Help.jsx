import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Phone, Mail, MessageSquare, ChevronRight } from 'lucide-react';

const Help = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const faqs = [
    { q: "How fast is the delivery?", a: "We deliver within 10-15 minutes for locations within 5km of our partner supermarkets." },
    { q: "Can I return a product?", a: "Yes, you can return fresh products at the time of delivery if they don't meet your expectations." },
    { q: "What payment methods are supported?", a: "We support Online Payments (UPI, Cards) via Razorpay and Cash on Delivery (COD)." },
    { q: "How can I track my order?", a: "Once placed, you can see your order status in the 'Orders' section of your profile or dashboard." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 pb-20">
      <div className="text-center space-y-4 mb-16">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-primary"
        >
          <HelpCircle size={40} />
        </motion.div>
        <h1 className="text-5xl font-black text-secondary tracking-tighter">How can we <span className="text-primary italic">help?</span></h1>
        <p className="text-slate-400 text-lg font-medium">Find answers to common questions or reach out to our support team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50 text-center hover:scale-105 transition-all">
          <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
            <Phone size={24} />
          </div>
          <p className="font-black text-secondary">Call Us</p>
          <p className="text-slate-400 text-sm mt-1">+91 98765 43210</p>
        </div>
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50 text-center hover:scale-105 transition-all">
          <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <Mail size={24} />
          </div>
          <p className="font-black text-secondary">Email Us</p>
          <p className="text-slate-400 text-sm mt-1">support@localbuddy.com</p>
        </div>
        <div className="bg-white p-8 rounded-[35px] border border-slate-50 shadow-xl shadow-slate-200/50 text-center hover:scale-105 transition-all">
          <div className="bg-cyan-50 w-12 h-12 rounded-2xl flex items-center justify-center text-cyan-600 mx-auto mb-6">
            <MessageSquare size={24} />
          </div>
          <p className="font-black text-secondary">Live Chat</p>
          <p className="text-slate-400 text-sm mt-1">Available 24/7</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black text-secondary tracking-tighter mb-8">Frequently Asked <span className="text-primary">Questions</span></h2>
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className="bg-white p-6 rounded-[25px] border border-slate-50 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-secondary text-lg group-hover:text-primary transition-colors">{faq.q}</p>
              <ChevronRight size={20} className={`text-slate-300 transition-all ${activeIndex === i ? 'rotate-90 text-primary' : ''}`} />
            </div>
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mt-4 pt-4 border-t border-slate-50">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Help;
