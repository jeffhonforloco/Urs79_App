
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const CreatorPricingSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [subscriptionPrice, setSubscriptionPrice] = useState(user?.subscriptionPrice?.toString() || '');
  const [tipEnabled, setTipEnabled] = useState<boolean>(user?.tipEnabled || true);

  const handlePriceUpdate = () => {
    const price = parseFloat(subscriptionPrice);
    if (price < 4.99) {
      toast.error('Minimum subscription price is $4.99');
      return;
    }
    
    updateProfile({ subscriptionPrice: price });
    toast.success('Subscription price updated');
  };

  const handleTipToggle = (enabled: boolean) => {
    setTipEnabled(enabled);
    updateProfile({ tipEnabled: enabled });
    toast.success(enabled ? 'Tips enabled' : 'Tips disabled');
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="subscription-price">Monthly Subscription Price</Label>
          <div className="flex space-x-2 mt-1">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="subscription-price"
                type="number"
                min="4.99"
                step="0.01"
                value={subscriptionPrice}
                onChange={(e) => setSubscriptionPrice(e.target.value)}
                placeholder="9.99"
                className="pl-10"
              />
            </div>
            <Button onClick={handlePriceUpdate} variant="outline">
              Update
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Minimum price: $4.99/month
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Accept Tips</Label>
            <p className="text-sm text-gray-600">Allow fans to send you tips</p>
          </div>
          <Switch
            checked={tipEnabled}
            onCheckedChange={handleTipToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorPricingSettings;
