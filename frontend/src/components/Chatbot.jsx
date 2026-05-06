import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Local Buddy assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simple bot response logic
    setTimeout(() => {
      let botResponse = "I'm not sure about that. Would you like to speak with a human agent?";
      const lower = input.toLowerCase();
      if (lower.includes("delivery")) botResponse = "Our delivery time is 10-15 minutes!";
      if (lower.includes("return")) botResponse = "You can return fresh items at the door!";
      if (lower.includes("payment")) botResponse = "We accept COD and Online payments via Razorpay.";
      if (lower.includes("onion") || lower.includes("price")) botResponse = "Our prices are the best in the neighborhood!";
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-[350px] h-[500px] rounded-[40px] shadow-3xl border border-slate-100 flex flex-col overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between shadow-lg shadow-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-black tracking-tight text-sm">Local Buddy Bot</p>
                  <p className="text-[10px] font-bold text-white/70">Online & Ready to Help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 no-scrollbar bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
                    msg.isBot ? 'bg-white text-slate-700 rounded-tl-none' : 'bg-secondary text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
              />
              <button type="submit" className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-neon hover:shadow-neon-strong hover:scale-110 active:scale-90 transition-all duration-300"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default Chatbot;
