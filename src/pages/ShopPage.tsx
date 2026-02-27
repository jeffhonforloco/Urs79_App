import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

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

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('*').eq('is_published', true).order('sort_order').then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Merchandise</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide mb-6">SHOP</h1>
          <div className="hr-gold w-24 mb-8" />
          <p className="text-muted-foreground max-w-2xl mb-16">Official URS79 merchandise. Wear the brand.</p>
        </motion.div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : products.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Coming soon — check back for new drops.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass-card group overflow-hidden"
              >
                <div className="aspect-square bg-secondary overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-muted-foreground/20" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {p.category && <p className="text-[9px] tracking-[0.3em] uppercase text-primary mb-2">{p.category}</p>}
                  <h3 className="font-display text-lg tracking-wide mb-2">{p.title}</h3>
                  {p.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.description}</p>}
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg">${Number(p.price).toFixed(2)}</span>
                    {p.compare_at_price && (
                      <span className="text-sm text-muted-foreground line-through">${Number(p.compare_at_price).toFixed(2)}</span>
                    )}
                  </div>
                  {p.stock_quantity <= 0 && <p className="text-[10px] tracking-[0.2em] uppercase text-red-400 mt-2">Sold Out</p>}
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
