
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Clock, Heart, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const CasualModeSettings = () => {
  const { user, updateProfile } = useAuth();
  const [casualModeEnabled, setCasualModeEnabled] = useState(user?.casualMode || false);
  const [showWarning, setShowWarning] = useState(!user?.casualMode);

  const handleToggleCasualMode = () => {
    if (!casualModeEnabled && !user?.ageVerified) {
      toast.error('Age verification required to enable Casual Mode');
      return;
    }

    if (!casualModeEnabled && showWarning) {
      setShowWarning(false);
      return;
    }

    const newValue = !casualModeEnabled;
    setCasualModeEnabled(newValue);
    updateProfile({ casualMode: newValue });
    
    toast.success(newValue ? 'Casual Mode enabled' : 'Casual Mode disabled');
  };

  const handleAgeVerification = () => {
    updateProfile({ ageVerified: true });
    toast.success('Age verification submitted for review');
  };

  if (showWarning && !casualModeEnabled) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-700">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Casual Mode - Age Verification Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-amber-800">
            <p className="mb-3">
              Casual Mode is designed for verified adults (18+) seeking short-term or no-strings-attached connections.
            </p>
            <ul className="space-y-1 mb-4">
              <li>• Enhanced privacy controls</li>
              <li>• Clear intention matching</li>
              <li>• Temporary profile visibility</li>
              <li>• Advanced safety features</li>
            </ul>
            <p className="text-xs text-amber-700">
              By enabling this feature, you confirm you are 18+ and agree to our enhanced community guidelines.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={handleAgeVerification}
              className="bg-amber-600 hover:bg-amber-700"
              disabled={user?.ageVerified}
            >
              {user?.ageVerified ? 'Verified ✓' : 'Verify Age'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowWarning(false)}
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
            <Heart className="w-5 h-5 mr-2 text-orange-500" />
            Casual Mode
          </div>
          {user?.ageVerified && (
            <Badge className="bg-green-100 text-green-800">
              <Shield className="w-3 h-3 mr-1" />
              Age Verified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="casual-mode" className="text-base font-medium">
              Enable Casual Mode
            </Label>
            <p className="text-sm text-gray-600">
              Connect with others seeking short-term relationships
            </p>
          </div>
          <Switch
            id="casual-mode"
            checked={casualModeEnabled}
            onCheckedChange={handleToggleCasualMode}
            disabled={!user?.ageVerified}
          />
        </div>

        {casualModeEnabled && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-gray-900">Casual Mode Features</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Temporary Visibility</p>
                  <p className="text-xs text-gray-600">Profile visible for limited time</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Enhanced Privacy</p>
                  <p className="text-xs text-gray-600">Additional anonymity options</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CasualModeSettings;
