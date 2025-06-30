
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const CreatorMessagingSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [payToDmEnabled, setPayToDmEnabled] = useState(user?.payToDmEnabled || false);
  const [payToDmPrice, setPayToDmPrice] = useState(user?.payToDmPrice?.toString() || '5.00');
  const [unlockMediaEnabled, setUnlockMediaEnabled] = useState(user?.unlockMediaEnabled || false);

  const handlePayToDmUpdate = () => {
    const price = parseFloat(payToDmPrice);
    if (price < 1.00) {
      toast.error('Minimum pay-to-DM price is $1.00');
      return;
    }
    
    updateProfile({ 
      payToDmEnabled,
      payToDmPrice: price 
    });
    toast.success('Pay-to-DM settings updated');
  };

  const handleUnlockMediaToggle = (enabled: boolean) => {
    setUnlockMediaEnabled(enabled);
    updateProfile({ unlockMediaEnabled: enabled });
    toast.success(enabled ? 'Unlock media enabled' : 'Unlock media disabled');
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Pay-to-DM</Label>
            <p className="text-sm text-gray-600">
              Require payment to send you direct messages
            </p>
          </div>
          <Switch
            checked={payToDmEnabled}
            onCheckedChange={setPayToDmEnabled}
          />
        </div>

        {payToDmEnabled && (
          <div>
            <Label htmlFor="pay-to-dm-price">Pay-to-DM Price</Label>
            <div className="flex space-x-2 mt-1">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="pay-to-dm-price"
                  type="number"
                  min="1.00"
                  step="0.01"
                  value={payToDmPrice}
                  onChange={(e) => setPayToDmPrice(e.target.value)}
                  placeholder="5.00"
                  className="pl-10"
                />
              </div>
              <Button onClick={handlePayToDmUpdate} variant="outline">
                Update
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Minimum price: $1.00 per message
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Unlock Media in Chat</Label>
            <p className="text-sm text-gray-600">
              Allow fans to pay to unlock locked media
            </p>
          </div>
          <Switch
            checked={unlockMediaEnabled}
            onCheckedChange={handleUnlockMediaToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorMessagingSettings;
