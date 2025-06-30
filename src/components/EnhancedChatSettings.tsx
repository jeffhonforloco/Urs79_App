
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Timer, Lock, Shield, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EnhancedChatSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [disappearingMessages, setDisappearingMessages] = useState(false);
  const [disappearDuration, setDisappearDuration] = useState('24h');
  const [tipToUnlock, setTipToUnlock] = useState(user?.payToDmEnabled || false);
  const [unlockPrice, setUnlockPrice] = useState(user?.payToDmPrice?.toString() || '2.99');
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  const [matchOnlyContact, setMatchOnlyContact] = useState(true);

  const handleSaveSettings = () => {
    updateProfile({
      payToDmEnabled: tipToUnlock,
      payToDmPrice: parseFloat(unlockPrice)
    });
    
    toast.success('Chat settings updated successfully');
    console.log('Enhanced chat settings:', {
      disappearingMessages,
      disappearDuration,
      tipToUnlock,
      unlockPrice,
      nsfwEnabled,
      matchOnlyContact
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
            Enhanced Chat Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Disappearing Messages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium flex items-center">
                  <Timer className="w-4 h-4 mr-2" />
                  Disappearing Messages
                </Label>
                <p className="text-sm text-gray-600">
                  Messages automatically delete after a set time
                </p>
              </div>
              <Switch
                checked={disappearingMessages}
                onCheckedChange={setDisappearingMessages}
              />
            </div>

            {disappearingMessages && (
              <div>
                <Label>Auto-delete after</Label>
                <Select value={disappearDuration} onValueChange={setDisappearDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="view">After Viewing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Tip to Unlock Messages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Tip-to-Unlock Messages
                </Label>
                <p className="text-sm text-gray-600">
                  Require payment to view certain messages
                </p>
              </div>
              <Switch
                checked={tipToUnlock}
                onCheckedChange={setTipToUnlock}
              />
            </div>

            {tipToUnlock && (
              <div>
                <Label htmlFor="unlock-price">Unlock Price ($)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="unlock-price"
                    type="number"
                    min="0.99"
                    step="0.01"
                    value={unlockPrice}
                    onChange={(e) => setUnlockPrice(e.target.value)}
                    placeholder="2.99"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Minimum: $0.99 per unlock
                </p>
              </div>
            )}
          </div>

          {/* Match-Only Contact */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Match-Only Contact
              </Label>
              <p className="text-sm text-gray-600">
                Only matched users can contact you (unless payment authorized)
              </p>
            </div>
            <Switch
              checked={matchOnlyContact}
              onCheckedChange={setMatchOnlyContact}
            />
          </div>

          {/* NSFW Messaging */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label className="text-base font-medium flex items-center text-red-700">
                  <Shield className="w-4 h-4 mr-2" />
                  NSFW Messaging
                </Label>
                <p className="text-sm text-red-600">
                  Enable adult content in messaging (requires both users to be verified and consent)
                </p>
              </div>
              <Switch
                checked={nsfwEnabled}
                onCheckedChange={setNsfwEnabled}
                disabled={!user?.ageVerified || !user?.verified}
              />
            </div>
            
            {(!user?.ageVerified || !user?.verified) && (
              <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
                <p className="font-medium">Verification Required</p>
                <p>Complete age and identity verification to enable NSFW messaging.</p>
              </div>
            )}
          </div>

          <Button 
            onClick={handleSaveSettings}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Save Chat Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedChatSettings;
