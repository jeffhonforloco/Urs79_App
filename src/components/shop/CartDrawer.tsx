import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    toast.info('Checkout integration pending Stripe setup');
    // We will trigger stripe checkout here once it's set up
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-background/95 backdrop-blur-xl border-border">
        <SheetHeader className="px-1">
          <SheetTitle className="font-display text-2xl tracking-wider flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" /> YOUR CART
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden mt-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="tracking-widest uppercase text-sm">Your cart is empty</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 glass-card p-3">
                    <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium line-clamp-1">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-border rounded-md px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-primary">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-primary">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-display">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="mt-6 border-t border-border pt-6 flex-col sm:flex-col gap-4">
            <div className="flex justify-between w-full mb-4">
              <span className="text-lg tracking-wider uppercase">Subtotal</span>
              <span className="font-display text-2xl">${cartTotal.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full h-14 text-lg tracking-widest uppercase btn-primary">
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};