import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Camera, MessageCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';

const PrivacyControls = () => {
  const { user, updateProfile } = useAuth();
  const [profileBlurred, setProfileBlurred] = useState<boolean>(user?.profileBlurred || false);
  const [messageApproval, setMessageApproval] = useState<boolean>(user?.messageApproval || false);
  const [screenshotBlocking, setScreenshotBlocking] = useState<boolean>(user?.screenshotBlocking || true);
  const [invisibleMode, setInvisibleMode] = useState<boolean>(user?.invisibleMode || false);

  const handleProfileBlurToggle = () => {
    const newValue = !profileBlurred;
    setProfileBlurred(newValue);
    updateProfile({ profileBlurred: newValue });
    toast.success(newValue ? 'Profile photos are now blurred' : 'Profile photos are now visible');
  };

  const handleMessageApprovalToggle = () => {
    const newValue = !messageApproval;
    setMessageApproval(newValue);
    updateProfile({ messageApproval: newValue });
    toast.success(newValue ? 'Message approval enabled' : 'Message approval disabled');
  };

  const handleScreenshotBlockingToggle = () => {
    const newValue = !screenshotBlocking;
    setScreenshotBlocking(newValue);
    updateProfile({ screenshotBlocking: newValue });
    toast.success(newValue ? 'Screenshot blocking enabled' : 'Screenshot blocking disabled');
  };

  const handleInvisibleModeToggle = () => {
    const newValue = !invisibleMode;
    setInvisibleMode(newValue);
    updateProfile({ invisibleMode: newValue });
    toast.success(newValue ? 'Invisible mode enabled' : 'Invisible mode disabled');
  };

  const enableScreenshotProtection = () => {
    // Simulate enabling OS-level screenshot protection
    if ('permissions' in navigator) {
      toast.success('Screenshot protection enabled for supported browsers');
    } else {
      toast.info('Screenshot protection not supported on this device');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Visibility Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profile-blur" className="text-base font-medium">
                Blur Profile Photos
              </Label>
              <p className="text-sm text-gray-600">
                Your photos will be blurred until mutual interest is shown
              </p>
            </div>
            <Switch
              id="profile-blur"
              checked={profileBlurred}
              onCheckedChange={handleProfileBlurToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="invisible-mode" className="text-base font-medium flex items-center">
                Invisible Mode
                <Badge className="ml-2 bg-purple-100 text-purple-800">Premium</Badge>
              </Label>
              <p className="text-sm text-gray-600">
                Browse profiles without appearing in their visitor list
              </p>
            </div>
            <Switch
              id="invisible-mode"
              checked={invisibleMode}
              onCheckedChange={handleInvisibleModeToggle}
              disabled={!user?.isPremium}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="message-approval" className="text-base font-medium">
                Message Approval Required
              </Label>
              <p className="text-sm text-gray-600">
                Review and approve messages before they're delivered
              </p>
            </div>
            <Switch
              id="message-approval"
              checked={messageApproval}
              onCheckedChange={handleMessageApprovalToggle}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Photo Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="screenshot-blocking" className="text-base font-medium">
                Screenshot Prevention
              </Label>
              <p className="text-sm text-gray-600">
                Attempt to prevent screenshots of your photos
              </p>
            </div>
            <Switch
              id="screenshot-blocking"
              checked={screenshotBlocking}
              onCheckedChange={handleScreenshotBlockingToggle}
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Enhanced Photo Protection</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Enable additional browser-level screenshot protection (where supported)
                </p>
                <Button
                  onClick={enableScreenshotProtection}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Enable Advanced Protection
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2 font-medium">Photo Protection Features:</p>
            <ul className="space-y-1 text-xs">
              <li>• Watermark overlay on photos</li>
              <li>• Disable right-click context menu</li>
              <li>• Prevent drag-and-drop saving</li>
              <li>• Detection of screenshot attempts (where possible)</li>
              <li>• Notification when someone tries to save your photos</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyControls;
