import { create } from 'zustand';

const useStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    set({ user: null, token: null, cart: [] });
  },

  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      let newCart;
      if (existing) {
        newCart = state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { cart: newCart };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));

export default useStore;
