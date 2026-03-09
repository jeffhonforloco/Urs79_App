import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type WishlistItem = {
  id: string;
  title: string;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  slug: string;
  stock_quantity: number;
};

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (product: WishlistItem) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('urs79_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('urs79_wishlist', JSON.stringify(items));
  }, [items]);

  const isWishlisted = (id: string) => items.some((item) => item.id === id);

  const addToWishlist = (product: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) return prev;
      toast.success(`${product.title} saved to wishlist`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast('Removed from wishlist');
  };

  const toggleWishlist = (product: WishlistItem) => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      setIsWishlistOpen(true);
    }
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, isWishlistOpen, setIsWishlistOpen }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
