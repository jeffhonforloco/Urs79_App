import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/urs79/ScrollReveal';

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
  const { toggleWishlist, isWishlisted, setIsWishlistOpen } = useWishlist();

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
      const el = document.getElementById(`size-picker-${p.id}`);
      el?.classList.add('animate-shake');
      setTimeout(() => el?.classList.remove('animate-shake'), 500);
      return;
    }
    addToCart(p, size);
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-24 relative">
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

      {/* Floating Wishlist Button */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary border border-border text-foreground shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 hover:border-primary/50"
      >
        <Heart className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
        <ScrollReveal direction="up" blur>
          <p className="section-label mb-5">Merchandise</p>
          <div className="flex justify-between items-end mb-8">
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] tracking-wide leading-[0.85]">SHOP</h1>
          </div>
          <div className="hr-gold w-24 mb-8 md:mb-10" />
          <p className="body-lg max-w-2xl mb-16 md:mb-20">Official URS79 merchandise. Wear the brand.</p>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card animate-pulse">
                <div className="aspect-square bg-secondary/50" />
                <div className="p-4 md:p-6 space-y-3">
                  <div className="h-4 bg-secondary/50 rounded w-1/3" />
                  <div className="h-6 bg-secondary/50 rounded w-3/4" />
                  <div className="h-4 bg-secondary/50 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <ScrollReveal direction="up" scale>
            <div className="glass-card p-16 md:p-20 text-center">
              <ShoppingBag className="w-14 h-14 text-muted-foreground/30 mx-auto mb-6" />
              <p className="text-muted-foreground tracking-widest uppercase text-sm">Coming soon — check back for new drops.</p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollRevealGroup stagger={0.08} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ScrollRevealItem key={p.id} direction="up" scale blur>
                <div className="glass-card group flex flex-col overflow-hidden hover:border-primary/50 hover:-translate-y-1 transition-all duration-500">
                  <div className="aspect-square bg-secondary overflow-hidden relative">
                    <Link to={`/shop/${p.slug}`} className="block w-full h-full">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-10 h-10 text-muted-foreground/20" />
                        </div>
                      )}
                    </Link>
                    <button
                      onClick={() => toggleWishlist(p)}
                      className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-md z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-200 ${isWishlisted(p.id) ? 'fill-primary text-primary' : 'text-foreground'}`}
                      />
                    </button>
                    {p.stock_quantity <= 0 && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="font-display text-lg md:text-2xl tracking-widest rotate-[-15deg] border-y-2 border-foreground py-2 px-4 md:px-6">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <Link to={`/shop/${p.slug}`} className="block mb-2 md:mb-3">
                      {p.category && <p className="section-label text-[8px] md:text-[9px] mb-1.5 md:mb-2">{p.category}</p>}
                      <h3 className="font-display text-sm md:text-lg tracking-wide line-clamp-1 hover:text-primary transition-colors">{p.title}</h3>
                    </Link>
                    {p.description && <p className="text-[11px] md:text-xs text-muted-foreground mb-4 line-clamp-2 hidden sm:block">{p.description}</p>}
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 md:gap-3 mb-4">
                        <span className="font-display text-lg md:text-2xl">${Number(p.price).toFixed(2)}</span>
                        {p.compare_at_price && (
                          <span className="text-[10px] md:text-sm text-muted-foreground line-through">${Number(p.compare_at_price).toFixed(2)}</span>
                        )}
                      </div>

                      {p.stock_quantity > 0 && (
                        <div id={`size-picker-${p.id}`} className="flex gap-1.5 md:gap-2 mb-4 transition-transform">
                          {SIZES.map((size) => {
                            const isSelected = selectedSizes[p.id] === size;
                            return (
                              <button
                                key={size}
                                onClick={() => setSelectedSizes(prev => ({ ...prev, [p.id]: size }))}
                                className={`flex-1 h-9 md:h-10 rounded text-[10px] md:text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
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
                        className="w-full uppercase tracking-widest text-[10px] md:text-xs h-11 md:h-13"
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
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
