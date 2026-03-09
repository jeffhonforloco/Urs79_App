import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, ArrowLeft, Ruler, ChevronDown, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

const SIZE_GUIDE = [
  { size: 'S', chest: '34-36"', waist: '28-30"', hips: '34-36"' },
  { size: 'M', chest: '38-40"', waist: '32-34"', hips: '38-40"' },
  { size: 'L', chest: '42-44"', waist: '36-38"', hips: '42-44"' },
  { size: 'XL', chest: '46-48"', waist: '40-42"', hips: '46-48"' },
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addToCart, setIsCartOpen, items } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    if (slug) {
      supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()
        .then(({ data }) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [slug]);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      const el = document.getElementById('size-picker');
      el?.classList.add('animate-shake');
      setTimeout(() => el?.classList.remove('animate-shake'), 500);
      return;
    }
    addToCart(product, selectedSize);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 md:pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="aspect-square bg-secondary/50 animate-pulse rounded-lg" />
            <div className="space-y-6">
              <div className="h-4 bg-secondary/50 rounded w-1/4 animate-pulse" />
              <div className="h-10 bg-secondary/50 rounded w-3/4 animate-pulse" />
              <div className="h-20 bg-secondary/50 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 md:pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="font-display text-2xl mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

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
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden sticky top-32 relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-20 h-20 text-muted-foreground/20" />
                </div>
              )}
              {/* Wishlist heart button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg z-10"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-200 ${isWishlisted(product.id) ? 'fill-primary text-primary' : 'text-foreground'}`}
                />
              </button>
              {product.stock_quantity <= 0 && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-display text-3xl md:text-4xl tracking-widest rotate-[-15deg] border-y-2 border-foreground py-3 px-8">
                    SOLD OUT
                  </span>
                </div>
              )}
              {product.compare_at_price && product.stock_quantity > 0 && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded">
                  Sale
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.category && (
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3 font-semibold">
                {product.category}
              </p>
            )}

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wide mb-6">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-3xl md:text-4xl">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-muted-foreground line-through">
                  ${Number(product.compare_at_price).toFixed(2)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                {product.description}
              </p>
            )}

            {/* Size Selector */}
            {product.stock_quantity > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium tracking-wider uppercase">
                    Select Size
                  </label>
                  <button
                    onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>

                <div
                  id="size-picker"
                  className="grid grid-cols-4 gap-3 transition-transform"
                >
                  {SIZES.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 md:h-14 rounded-md text-sm md:text-base font-semibold tracking-wider uppercase border transition-all duration-200 ${
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
              </div>
            )}

            {/* Size Guide Collapsible */}
            <Collapsible open={sizeGuideOpen} onOpenChange={setSizeGuideOpen}>
              <CollapsibleContent className="mb-6">
                <div className="glass-card p-4 md:p-6 rounded-lg">
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    Size Guide
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Size</th>
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Chest</th>
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Waist</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Hips</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_GUIDE.map((row) => (
                          <tr key={row.size} className="border-b border-border/50">
                            <td className="py-2.5 pr-4 font-semibold">{row.size}</td>
                            <td className="py-2.5 pr-4 text-muted-foreground">{row.chest}</td>
                            <td className="py-2.5 pr-4 text-muted-foreground">{row.waist}</td>
                            <td className="py-2.5 text-muted-foreground">{row.hips}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Measurements are approximate and may vary slightly.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
              size="lg"
              className="w-full h-14 md:h-16 uppercase tracking-widest text-sm md:text-base"
              variant={product.stock_quantity > 0 ? 'default' : 'secondary'}
            >
              {product.stock_quantity > 0 ? (
                <>
                  <Plus className="w-5 h-5 mr-2" /> Add to Cart
                </>
              ) : (
                'Out of Stock'
              )}
            </Button>

            {/* Product Details Accordion */}
            <div className="mt-10 space-y-4">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-t border-border text-left group">
                  <span className="text-sm font-semibold tracking-wider uppercase">
                    Product Details
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="text-sm text-muted-foreground space-y-2 pb-4">
                    <li>• Premium quality materials</li>
                    <li>• URS79 branded design</li>
                    <li>• Comfortable fit</li>
                    <li>• Machine washable</li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-t border-border text-left group">
                  <span className="text-sm font-semibold tracking-wider uppercase">
                    Shipping & Returns
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="text-sm text-muted-foreground space-y-2 pb-4">
                    <p>Free shipping on orders over $100.</p>
                    <p>Standard delivery: 5-7 business days.</p>
                    <p>Returns accepted within 30 days of purchase.</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
