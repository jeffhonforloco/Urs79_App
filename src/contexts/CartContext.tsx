import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image_url: string | null;
  quantity: number;
  size: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: any, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartKey = (id: string, size: string) => `${id}__${size}`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('urs79_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('urs79_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any, size: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        toast.success(`Increased ${product.title} (${size}) quantity`);
        return prev.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`Added ${product.title} (${size}) to cart`);
      return [...prev, { id: product.id, title: product.title, price: product.price, image_url: product.image_url, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal }}>
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
