
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Star, DollarSign, Shield, Camera, AlertTriangle, MessageCircle, Eye, Lock } from 'lucide-react';
import { toast } from 'sonner';

const CreatorModeSettings = () => {
  const { user, updateProfile } = useAuth();
  const [creatorModeEnabled, setCreatorModeEnabled] = useState<boolean>(user?.creatorMode || false);
  const [subscriptionPrice, setSubscriptionPrice] = useState<string>(user?.subscriptionPrice?.toString() || '');
  const [payToDmEnabled, setPayToDmEnabled] = useState<boolean>(user?.payToDmEnabled || false);
  const [payToDmPrice, setPayToDmPrice] = useState<string>(user?.payToDmPrice?.toString() || '5.00');
  const [tipEnabled, setTipEnabled] = useState<boolean>(user?.tipEnabled || true);
  const [unlockMediaEnabled, setUnlockMediaEnabled] = useState<boolean>(user?.unlockMediaEnabled || false);
  const [showVerificationWarning, setShowVerificationWarning] = useState<boolean>(false);

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
    <div className="space-y-6">
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
            <Tabs defaultValue="pricing" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="messaging">Messaging</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="pricing" className="space-y-4">
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
                        onCheckedChange={setTipEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messaging" className="space-y-4">
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
                        onCheckedChange={setUnlockMediaEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Content Types</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <Eye className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Free Content</p>
                            <p className="text-xs text-gray-600">Visible to all users</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                          <Lock className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium">Subscriber-Only Content</p>
                            <p className="text-xs text-gray-600">Only visible to paying subscribers</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                          <DollarSign className="w-4 h-4 text-orange-600" />
                          <div>
                            <p className="text-sm font-medium">Pay-Per-View Posts</p>
                            <p className="text-xs text-gray-600">Individual posts with unlock fees</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {creatorModeEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Revenue Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-1">Revenue Share</h4>
                <p className="text-2xl font-bold text-green-700">85%</p>
                <p className="text-sm text-green-600">You keep 85% of all earnings</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-1">Payout Schedule</h4>
                <p className="text-lg font-semibold text-blue-700">Weekly</p>
                <p className="text-sm text-blue-600">Every Friday via bank transfer</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">Earning Features:</p>
              <ul className="space-y-1 text-xs ml-4">
                <li>• Monthly subscriptions with recurring billing</li>
                <li>• One-time tips from fans</li>
                <li>• Pay-per-view posts and media</li>
                <li>• Pay-to-DM messaging</li>
                <li>• Unlock media in private chats</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreatorModeSettings;
