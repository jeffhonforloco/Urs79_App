import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Star, DollarSign, Shield, Camera, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const CreatorModeSettings = () => {
  const { user, updateProfile } = useAuth();
  const [creatorModeEnabled, setCreatorModeEnabled] = useState(user?.creatorMode || false);
  const [subscriptionPrice, setSubscriptionPrice] = useState(user?.subscriptionPrice?.toString() || '');
  const [showVerificationWarning, setShowVerificationWarning] = useState(false);

  const handleToggleCreatorMode = () => {
    if (!creatorModeEnabled && (!user?.ageVerified || !user?.verified)) {
      setShowVerificationWarning(true);
      return;
    }

    const newValue = !creatorModeEnabled;
    setCreatorModeEnabled(newValue);
    updateProfile({ creatorMode: newValue });
    
    toast.success(newValue ? 'Creator Mode enabled' : 'Creator Mode disabled');
  };

  const handlePriceUpdate = () => {
    const price = parseFloat(subscriptionPrice);
    if (price < 4.99) {
      toast.error('Minimum subscription price is $4.99');
      return;
    }
    
    updateProfile({ subscriptionPrice: price });
    toast.success('Subscription price updated');
  };

  const handleVerification = () => {
    updateProfile({ 
      verified: true, 
      ageVerified: true,
      verificationPending: true 
    });
    toast.success('Verification submitted for review');
    setShowVerificationWarning(false);
  };

  if (showVerificationWarning) {
    return (
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Creator Mode - Verification Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-purple-800">
            <p className="mb-3">
              Creator Mode allows verified adults to monetize exclusive content through subscriptions and tips.
            </p>
            <div className="bg-white p-3 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Required Verifications:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <Shield className="w-3 h-3 mr-2 text-green-600" />
                  Government ID verification (18+)
                </li>
                <li className="flex items-center">
                  <Camera className="w-3 h-3 mr-2 text-green-600" />
                  Live selfie verification
                </li>
                <li className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-2 text-green-600" />
                  Banking information for payouts
                </li>
              </ul>
            </div>
            <p className="text-xs text-purple-700">
              All creator content is moderated and must comply with our community guidelines.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleVerification}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Start Verification
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowVerificationWarning(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-purple-500" />
            Creator Mode
          </div>
          <div className="flex space-x-2">
            {user?.ageVerified && (
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Age Verified
              </Badge>
            )}
            {user?.verified && (
              <Badge className="bg-blue-100 text-blue-800">
                <Camera className="w-3 h-3 mr-1" />
                ID Verified
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="creator-mode" className="text-base font-medium">
              Enable Creator Mode
            </Label>
            <p className="text-sm text-gray-600">
              Monetize exclusive content through subscriptions
            </p>
          </div>
          <Switch
            id="creator-mode"
            checked={creatorModeEnabled}
            onCheckedChange={handleToggleCreatorMode}
            disabled={!user?.ageVerified || !user?.verified}
          />
        </div>

        {creatorModeEnabled && (
          <div className="space-y-4 pt-4 border-t">
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

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Creator Features</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Subscription Revenue</p>
                    <p className="text-xs text-gray-600">85% revenue share, weekly payouts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Star className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Tips & Gifts</p>
                    <p className="text-xs text-gray-600">Receive tips from subscribers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatorModeSettings;
