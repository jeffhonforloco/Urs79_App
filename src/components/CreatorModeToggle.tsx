
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Star, Shield, Camera, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface CreatorModeToggleProps {
  creatorModeEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const CreatorModeToggle: React.FC<CreatorModeToggleProps> = ({ 
  creatorModeEnabled, 
  onToggle 
}) => {
  const { user, updateProfile } = useAuth();
  const [showVerificationWarning, setShowVerificationWarning] = useState(false);

  const handleToggleCreatorMode = () => {
    if (!creatorModeEnabled && (!user?.ageVerified || !user?.verified)) {
      setShowVerificationWarning(true);
      return;
    }

    const newValue = !creatorModeEnabled;
    onToggle(newValue);
    updateProfile({ creatorMode: newValue });
    
    toast.success(newValue ? 'Creator Mode enabled' : 'Creator Mode disabled');
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
      </CardContent>
    </Card>
  );
};

export default CreatorModeToggle;
