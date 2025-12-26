
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { MENU_ITEMS } from './constants';

export type CartItem = {
  id: string;
  quantity: number;
};

interface CartContextType {
  cart: Record<string, number>;
  cartCount: number;
  totalPrice: number;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'selectedMenuItems';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return {};
      }
    }
    return {};
  });

  // Sync to local storage and broadcast changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Support sync across tabs or custom listeners
    window.dispatchEvent(new Event('cart-updated'));
  }, [cart]);

  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      if (prev[id] === 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const cartCount = useMemo(() => {
    // Fix: Explicitly type accumulator and current value in reduce to prevent 'unknown' type errors
    return Object.values(cart).reduce((acc: number, qty: number) => acc + qty, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    // Fix: Provide explicit types for the reduce callback parameters to ensure numeric arithmetic operations are valid
    return (Object.entries(cart) as [string, number][]).reduce((acc: number, entry: [string, number]) => {
      const [id, qty] = entry;
      if (id === 'custom-bowl') return acc + (50 * qty); // Hardcoded base price for custom bowl
      const item = MENU_ITEMS.find(m => m.id === id);
      return acc + (item ? item.price : 0) * qty;
    }, 0);
  }, [cart]);

  const deliveryFee = subtotal > 0 ? 15 : 0;
  const totalPrice = subtotal + deliveryFee;

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      totalPrice, 
      addToCart, 
      removeFromCart, 
      clearCart,
      subtotal,
      deliveryFee
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
