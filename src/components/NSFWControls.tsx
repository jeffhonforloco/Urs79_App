
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const NSFWControls: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [nsfwEnabled, setNsfwEnabled] = useState(false);
  const [contentFilters, setContentFilters] = useState({
    explicitContent: false,
    suggestiveContent: true,
    adultProfiles: false,
  });

  const handleNsfwToggle = (enabled: boolean) => {
    if (enabled && (!user?.ageVerified || (user?.age || 0) < 18)) {
      toast.error('Age verification required for NSFW content');
      return;
    }
    
    setNsfwEnabled(enabled);
    updateProfile({ nsfwEnabled: enabled });
    toast.success(enabled ? 'NSFW content enabled' : 'NSFW content disabled');
  };

  const handleFilterChange = (filter: string, enabled: boolean) => {
    setContentFilters(prev => ({
      ...prev,
      [filter]: enabled
    }));
    toast.success('Content filters updated');
  };

  const handleAgeVerification = () => {
    // Mock age verification process
    toast.success('Age verification process started');
    setTimeout(() => {
      updateProfile({ ageVerified: true });
      toast.success('Age verification completed');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Content Controls</h2>
        <p className="text-white/70">Manage your content preferences and safety settings</p>
      </div>

      {/* Age Verification Status */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Shield className="w-5 h-5 mr-2" />
            Age Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Verification Status</p>
              <p className="text-white/70 text-sm">Required for NSFW content access</p>
            </div>
            <Badge variant={user?.ageVerified ? "default" : "secondary"}>
              {user?.ageVerified ? 'Verified' : 'Pending'}
            </Badge>
          </div>
          
          {!user?.ageVerified && (
            <Button onClick={handleAgeVerification} className="w-full">
              Verify Age (18+)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* NSFW Content Toggle */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Eye className="w-5 h-5 mr-2" />
            NSFW Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white font-medium">Enable NSFW Content</Label>
              <p className="text-white/70 text-sm">View and create adult content</p>
            </div>
            <Switch
              checked={nsfwEnabled}
              onCheckedChange={handleNsfwToggle}
              disabled={!user?.ageVerified}
            />
          </div>
          
          {!user?.ageVerified && (
            <div className="flex items-center p-3 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-yellow-200 text-sm">Age verification required</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Filters */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <EyeOff className="w-5 h-5 mr-2" />
            Content Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white font-medium">Explicit Content</Label>
                <p className="text-white/70 text-sm">Graphic sexual content</p>
              </div>
              <Switch
                checked={contentFilters.explicitContent}
                onCheckedChange={(checked) => handleFilterChange('explicitContent', checked)}
                disabled={!nsfwEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white font-medium">Suggestive Content</Label>
                <p className="text-white/70 text-sm">Mildly suggestive material</p>
              </div>
              <Switch
                checked={contentFilters.suggestiveContent}
                onCheckedChange={(checked) => handleFilterChange('suggestiveContent', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white font-medium">Adult Profiles</Label>
                <p className="text-white/70 text-sm">Profiles with adult content</p>
              </div>
              <Switch
                checked={contentFilters.adultProfiles}
                onCheckedChange={(checked) => handleFilterChange('adultProfiles', checked)}
                disabled={!nsfwEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NSFWControls;
