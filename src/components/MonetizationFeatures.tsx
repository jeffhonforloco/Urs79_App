
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Heart, Lock, Star, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface MonetizationSettings {
  tipEnabled: boolean;
  tipAmounts: number[];
  customTipEnabled: boolean;
  payToDmEnabled: boolean;
  payToDmPrice: number;
  exclusiveContentEnabled: boolean;
  exclusiveContentPrice: number;
  subscriptionEnabled: boolean;
  subscriptionPrice: number;
}

const MonetizationFeatures: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState<MonetizationSettings>({
    tipEnabled: true,
    tipAmounts: [5, 10, 25, 50],
    customTipEnabled: true,
    payToDmEnabled: false,
    payToDmPrice: 10,
    exclusiveContentEnabled: false,
    exclusiveContentPrice: 20,
    subscriptionEnabled: false,
    subscriptionPrice: 15,
  });

  const handleSettingChange = (key: keyof MonetizationSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Monetization settings updated');
  };

  const handleSaveSettings = () => {
    updateProfile({
      ...user,
      monetizationSettings: settings
    });
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Monetization Features</h2>
        <p className="text-white/70">Configure your earning options and pricing</p>
      </div>

      {/* Tip Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Heart className="w-5 h-5 mr-2 text-pink-500" />
            Tip Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Enable Tips</Label>
              <p className="text-white/70 text-sm">Allow users to send you tips</p>
            </div>
            <Switch
              checked={settings.tipEnabled}
              onCheckedChange={(checked) => handleSettingChange('tipEnabled', checked)}
            />
          </div>

          {settings.tipEnabled && (
            <>
              <div>
                <Label className="text-white font-medium mb-2 block">Preset Tip Amounts ($)</Label>
                <div className="grid grid-cols-4 gap-2">
                  {settings.tipAmounts.map((amount, index) => (
                    <Input
                      key={index}
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const newAmounts = [...settings.tipAmounts];
                        newAmounts[index] = parseInt(e.target.value) || 0;
                        handleSettingChange('tipAmounts', newAmounts);
                      }}
                      className="text-center"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white font-medium">Custom Tip Amounts</Label>
                  <p className="text-white/70 text-sm">Allow custom tip amounts</p>
                </div>
                <Switch
                  checked={settings.customTipEnabled}
                  onCheckedChange={(checked) => handleSettingChange('customTipEnabled', checked)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Pay to DM */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <DollarSign className="w-5 h-5 mr-2 text-green-500" />
            Pay to DM
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Enable Pay to DM</Label>
              <p className="text-white/70 text-sm">Charge for direct messages</p>
            </div>
            <Switch
              checked={settings.payToDmEnabled}
              onCheckedChange={(checked) => handleSettingChange('payToDmEnabled', checked)}
            />
          </div>

          {settings.payToDmEnabled && (
            <div>
              <Label htmlFor="dm-price" className="text-white font-medium">DM Price ($)</Label>
              <Input
                id="dm-price"
                type="number"
                min="1"
                value={settings.payToDmPrice}
                onChange={(e) => handleSettingChange('payToDmPrice', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exclusive Content */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Lock className="w-5 h-5 mr-2 text-purple-500" />
            Exclusive Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Enable Exclusive Content</Label>
              <p className="text-white/70 text-sm">Sell premium photos and videos</p>
            </div>
            <Switch
              checked={settings.exclusiveContentEnabled}
              onCheckedChange={(checked) => handleSettingChange('exclusiveContentEnabled', checked)}
            />
          </div>

          {settings.exclusiveContentEnabled && (
            <div>
              <Label htmlFor="content-price" className="text-white font-medium">Content Price ($)</Label>
              <Input
                id="content-price"
                type="number"
                min="1"
                value={settings.exclusiveContentPrice}
                onChange={(e) => handleSettingChange('exclusiveContentPrice', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Monthly Subscription
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Enable Subscriptions</Label>
              <p className="text-white/70 text-sm">Monthly recurring revenue</p>
            </div>
            <Switch
              checked={settings.subscriptionEnabled}
              onCheckedChange={(checked) => handleSettingChange('subscriptionEnabled', checked)}
            />
          </div>

          {settings.subscriptionEnabled && (
            <div>
              <Label htmlFor="sub-price" className="text-white font-medium">Monthly Price ($)</Label>
              <Input
                id="sub-price"
                type="number"
                min="5"
                value={settings.subscriptionPrice}
                onChange={(e) => handleSettingChange('subscriptionPrice', parseInt(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Gift className="w-5 h-5 mr-2 text-blue-500" />
            Revenue Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-white/70 text-sm">Tips</p>
              <p className="text-white font-bold text-lg">
                {settings.tipEnabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-white/70 text-sm">Pay to DM</p>
              <p className="text-white font-bold text-lg">
                {settings.payToDmEnabled ? `$${settings.payToDmPrice}` : 'Disabled'}
              </p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-white/70 text-sm">Exclusive Content</p>
              <p className="text-white font-bold text-lg">
                {settings.exclusiveContentEnabled ? `$${settings.exclusiveContentPrice}` : 'Disabled'}
              </p>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <p className="text-white/70 text-sm">Subscription</p>
              <p className="text-white font-bold text-lg">
                {settings.subscriptionEnabled ? `$${settings.subscriptionPrice}/mo` : 'Disabled'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="w-full btn-primary">
        Save Monetization Settings
      </Button>
    </div>
  );
};

export default MonetizationFeatures;
