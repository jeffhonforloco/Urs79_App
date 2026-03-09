import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  stock_quantity: number;
};

const SIZES = ['S', 'M', 'L', 'XL'] as const;

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const { addToCart, setIsCartOpen, items } = useCart();

  useEffect(() => {
    supabase.from('products').select('*').eq('is_published', true).order('sort_order').then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (p: Product) => {
    const size = selectedSizes[p.id];
    if (!size) {
      // Highlight the size selector — shake effect via state
      const el = document.getElementById(`size-picker-${p.id}`);
      el?.classList.add('animate-shake');
      setTimeout(() => el?.classList.remove('animate-shake'), 500);
      return;
    }
    addToCart(p, size);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-20 relative">
      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-destructive text-destructive-foreground rounded-full text-[10px] md:text-xs flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        )}
      </button>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Merchandise</p>
          <div className="flex justify-between items-end mb-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide">SHOP</h1>
          </div>
          <div className="hr-gold w-24 mb-6 md:mb-8" />
          <p className="text-muted-foreground max-w-2xl mb-12 md:mb-16 text-sm md:text-base">Official URS79 merchandise. Wear the brand.</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse">
                <div className="aspect-square bg-secondary/50" />
                <div className="p-4 md:p-5 space-y-3">
                  <div className="h-4 bg-secondary/50 rounded w-1/3" />
                  <div className="h-6 bg-secondary/50 rounded w-3/4" />
                  <div className="h-4 bg-secondary/50 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="glass-card p-12 md:p-16 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground tracking-widest uppercase text-sm">Coming soon — check back for new drops.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass-card group flex flex-col overflow-hidden hover:border-primary/50 transition-colors duration-500"
              >
                <Link to={`/shop/${p.slug}`} className="block">
                  <div className="aspect-square bg-secondary overflow-hidden relative">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground/20" />
                      </div>
                    )}
                    {p.stock_quantity <= 0 && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="font-display text-lg md:text-2xl tracking-widest rotate-[-15deg] border-y-2 border-foreground py-2 px-4 md:px-6">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <Link to={`/shop/${p.slug}`} className="block mb-1 md:mb-2">
                    {p.category && <p className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-primary mb-1 md:mb-2">{p.category}</p>}
                    <h3 className="font-display text-sm md:text-lg tracking-wide line-clamp-1 hover:text-primary transition-colors">{p.title}</h3>
                  </Link>
                  {p.description && <p className="text-[10px] md:text-xs text-muted-foreground mb-3 md:mb-4 line-clamp-2 hidden sm:block">{p.description}</p>}
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <span className="font-display text-base md:text-xl">${Number(p.price).toFixed(2)}</span>
                      {p.compare_at_price && (
                        <span className="text-[10px] md:text-sm text-muted-foreground line-through">${Number(p.compare_at_price).toFixed(2)}</span>
                      )}
                    </div>

                    {/* Size selector */}
                    {p.stock_quantity > 0 && (
                      <div id={`size-picker-${p.id}`} className="flex gap-1.5 md:gap-2 mb-3 md:mb-4 transition-transform">
                        {SIZES.map((size) => {
                          const isSelected = selectedSizes[p.id] === size;
                          return (
                            <button
                              key={size}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [p.id]: size }))}
                              className={`flex-1 h-8 md:h-9 rounded text-[10px] md:text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleAddToCart(p)}
                      disabled={p.stock_quantity <= 0}
                      className="w-full uppercase tracking-widest text-[10px] md:text-xs h-10 md:h-12"
                      variant={p.stock_quantity > 0 ? 'default' : 'secondary'}
                    >
                      {p.stock_quantity > 0 ? (
                        <>
                          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" /> Add to Cart
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
