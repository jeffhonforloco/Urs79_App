import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, ShoppingBag, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

const SIZES = ['S', 'M', 'L', 'XL'] as const;

export const WishlistDrawer = () => {
  const { items, removeFromWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleMoveToCart = (item: typeof items[0]) => {
    const size = selectedSizes[item.id];
    if (!size) {
      const el = document.getElementById(`wishlist-size-${item.id}`);
      el?.classList.add('animate-shake');
      setTimeout(() => el?.classList.remove('animate-shake'), 500);
      return;
    }
    addToCart(item, size);
    removeFromWishlist(item.id);
  };

  return (
    <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-background/95 backdrop-blur-xl border-border">
        <SheetHeader className="px-1">
          <SheetTitle className="font-display text-2xl tracking-wider flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" /> WISHLIST
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden mt-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <Heart className="w-16 h-16 opacity-20" />
              <p className="tracking-widest uppercase text-sm">Your wishlist is empty</p>
              <Button variant="outline" onClick={() => setIsWishlistOpen(false)}>
                Browse Shop
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-5">
                {items.map((item) => (
                  <div key={item.id} className="glass-card p-3 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/shop/${item.slug}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0 block"
                      >
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                          </div>
                        )}
                      </Link>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            {item.category && (
                              <p className="text-[9px] tracking-[0.25em] uppercase text-primary mb-1">{item.category}</p>
                            )}
                            <Link
                              to={`/shop/${item.slug}`}
                              onClick={() => setIsWishlistOpen(false)}
                              className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors"
                            >
                              {item.title}
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-display text-base">${Number(item.price).toFixed(2)}</span>
                          {item.compare_at_price && (
                            <span className="text-xs text-muted-foreground line-through">${Number(item.compare_at_price).toFixed(2)}</span>
                          )}
                          {item.stock_quantity <= 0 && (
                            <span className="text-[9px] tracking-widest uppercase text-destructive font-semibold">Sold Out</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {item.stock_quantity > 0 && (
                      <>
                        {/* Size selector */}
                        <div
                          id={`wishlist-size-${item.id}`}
                          className="grid grid-cols-4 gap-1.5 transition-transform"
                        >
                          {SIZES.map((size) => {
                            const isSelected = selectedSizes[item.id] === size;
                            return (
                              <button
                                key={size}
                                onClick={() => setSelectedSizes((prev) => ({ ...prev, [item.id]: size }))}
                                className={`h-8 rounded text-[10px] font-semibold tracking-wider uppercase border transition-all duration-200 ${
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

                        <Button
                          size="sm"
                          className="w-full uppercase tracking-widest text-[10px] h-9"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1.5" /> Move to Cart
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground tracking-wider text-center">
              {items.length} item{items.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
