
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, UserX } from 'lucide-react';
import { toast } from 'sonner';
import PrivacyControls from './PrivacyControls';
import AgeVerificationGate from './AgeVerificationGate';

const SecuritySettings = () => {
  const { user, updateProfile } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(user?.twoFactorEnabled || false);
  const [incognitoMode, setIncognitoMode] = useState<boolean>(user?.incognitoMode || false);
  const [photoProtection, setPhotoProtection] = useState<boolean>(user?.photoProtection || true);
  const [showAgeVerification, setShowAgeVerification] = useState(!user?.ageVerified);

  const handleTwoFactorToggle = () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    updateProfile({ twoFactorEnabled: newValue });
    
    toast.success(newValue ? '2FA enabled for enhanced security' : '2FA disabled');
  };

  const handleIncognitoToggle = () => {
    const newValue = !incognitoMode;
    setIncognitoMode(newValue);
    updateProfile({ incognitoMode: newValue });
    
    toast.success(newValue ? 'Incognito mode enabled' : 'Incognito mode disabled');
  };

  const handlePhotoProtectionToggle = () => {
    const newValue = !photoProtection;
    setPhotoProtection(newValue);
    updateProfile({ photoProtection: newValue });
    
    toast.success(newValue ? 'Photo protection enabled' : 'Photo protection disabled');
  };

  const securityScore = [
    user?.verified,
    user?.ageVerified,
    twoFactorEnabled,
    photoProtection,
    user?.email?.includes('@')
  ].filter(Boolean).length;

  const getSecurityLevel = () => {
    if (securityScore >= 4) return { level: 'High', color: 'text-green-600', bg: 'bg-green-50' };
    if (securityScore >= 3) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Basic', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const security = getSecurityLevel();

  // Show age verification gate if not verified
  if (showAgeVerification) {
    return <AgeVerificationGate onVerified={() => setShowAgeVerification(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <Card className={security.bg}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className={`w-5 h-5 mr-2 ${security.color}`} />
              Security Level: {security.level}
            </div>
            <Badge className={`${security.color} border-current`} variant="outline">
              {securityScore}/5
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              {user?.verified ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm">Profile Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              {user?.ageVerified ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm">Age Verification (18+)</span>
            </div>
            <div className="flex items-center space-x-2">
              {twoFactorEnabled ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm">Two-Factor Authentication</span>
            </div>
            <div className="flex items-center space-x-2">
              {photoProtection ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm">Photo Protection</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          {/* Age Verification Status */}
          {!user?.ageVerified && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Age Verification Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-800 mb-4">
                  You must verify your age (18+) to access Casual Mode and Creator features.
                </p>
                <Button 
                  onClick={() => setShowAgeVerification(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Verify Age Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="text-base font-medium">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="two-factor"
                  checked={twoFactorEnabled}
                  onCheckedChange={handleTwoFactorToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="incognito" className="text-base font-medium">
                    Incognito Mode
                  </Label>
                  <p className="text-sm text-gray-600">
                    Browse profiles without appearing in their views
                  </p>
                </div>
                <Switch
                  id="incognito"
                  checked={incognitoMode}
                  onCheckedChange={handleIncognitoToggle}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="photo-protection" className="text-base font-medium">
                    Basic Photo Protection
                  </Label>
                  <p className="text-sm text-gray-600">
                    Prevent screenshots and downloads of your photos
                  </p>
                </div>
                <Switch
                  id="photo-protection"
                  checked={photoProtection}
                  onCheckedChange={handlePhotoProtectionToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Moderation Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Content Moderation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">AI Content Screening</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Automated detection of inappropriate content, nudity, and policy violations
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    <Lock className="w-3 h-3 mr-1" />
                    Active 24/7
                  </Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Manual Review System</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Human moderators review reported content and policy violations
                  </p>
                  <Badge className="bg-blue-100 text-blue-800">
                    <UserX className="w-3 h-3 mr-1" />
                    24-48hr Response
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacyControls />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettings;
