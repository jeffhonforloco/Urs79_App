
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Plus, X, Check, Settings, Shield, Heart, Star, User, Flame } from 'lucide-react';
import { toast } from 'sonner';
import CasualModeSettings from './CasualModeSettings';
import CreatorModeSettings from './CreatorModeSettings';
import SecuritySettings from './SecuritySettings';
import RelationshipIntent from './RelationshipIntent';

const ProfileScreen = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    bio: user?.bio || '',
    location: user?.location || '',
    interests: user?.interests || [],
  });
  const [newInterest, setNewInterest] = useState('');

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      age: formData.age ? Number(formData.age) : undefined,
      bio: formData.bio,
      location: formData.location,
      interests: formData.interests,
    });
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleVerifyProfile = () => {
    updateProfile({ verified: true });
    toast.success('Profile verification submitted! We\'ll review it within 24 hours.');
  };

  const getTabCount = () => {
    let count = 2; // Profile and Security are always available
    if (user?.ageVerified) count++; // Casual mode
    if (user?.ageVerified && user?.verified) count++; // Creator mode
    return count;
  };

  const getTabClassName = (context: string) => {
    const baseClass = "flex items-center space-x-2 relative";
    switch (context) {
      case 'dating':
        return `${baseClass} data-[state=active]:border-b-2 data-[state=active]:border-blue-500`;
      case 'casual':
        return `${baseClass} data-[state=active]:border-b-2 data-[state=active]:border-orange-500`;
      case 'creator':
        return `${baseClass} data-[state=active]:border-b-2 data-[state=active]:border-purple-500`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your profile, security, and optional features</p>
        
        {/* User Status Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {user?.verified && (
            <Badge className="bg-blue-100 text-blue-800">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {user?.ageVerified && (
            <Badge className="bg-green-100 text-green-800">
              18+ Verified
            </Badge>
          )}
          {user?.casualMode && (
            <Badge className="bg-orange-100 text-orange-800">
              <Flame className="w-3 h-3 mr-1" />
              Casual Mode
            </Badge>
          )}
          {user?.creatorMode && (
            <Badge className="bg-purple-100 text-purple-800">
              <Star className="w-3 h-3 mr-1" />
              Creator Mode
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className={`grid w-full grid-cols-${getTabCount()}`}>
          <TabsTrigger value="profile" className={getTabClassName('dating')}>
            <User className="w-4 h-4 text-blue-600" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className={getTabClassName('dating')}>
            <Shield className="w-4 h-4 text-gray-600" />
            <span>Security</span>
          </TabsTrigger>
          {user?.ageVerified && (
            <TabsTrigger value="casual" className={getTabClassName('casual')}>
              <Heart className="w-4 h-4 text-orange-600" />
              <span>Casual</span>
            </TabsTrigger>
          )}
          {user?.ageVerified && user?.verified && (
            <TabsTrigger value="creator" className={getTabClassName('creator')}>
              <Star className="w-4 h-4 text-purple-600" />
              <span>Creator</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Relationship Intent */}
          <RelationshipIntent />

          {/* Profile Photos */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2 text-blue-600" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {user?.photos?.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <Badge className="absolute top-2 left-2 bg-orange-500">
                        Main
                      </Badge>
                    )}
                  </div>
                ))}
                {(!user?.photos || user.photos.length < 6) && (
                  <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Add Photo</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Add up to 6 photos. Your first photo will be your main profile picture.
              </p>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Basic Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="City, State"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  placeholder="Tell people about yourself..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>{interest}</span>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <Input
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                  />
                  <Button onClick={handleAddInterest} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle>Profile Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Verification Status: {user?.verified ? (
                      <span className="text-green-600">Verified ✓</span>
                    ) : (
                      <span className="text-orange-600">Pending</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">
                    Verified profiles get 3x more matches
                  </p>
                </div>
                {!user?.verified && (
                  <Button onClick={handleVerifyProfile} className="bg-green-600 hover:bg-green-700">
                    Verify Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="border-l-4 border-l-gray-500 pl-1">
            <SecuritySettings />
          </div>
        </TabsContent>

        {user?.ageVerified && (
          <TabsContent value="casual">
            <div className="border-l-4 border-l-orange-500 pl-1">
              <CasualModeSettings />
            </div>
          </TabsContent>
        )}

        {user?.ageVerified && user?.verified && (
          <TabsContent value="creator">
            <div className="border-l-4 border-l-purple-500 pl-1">
              <CreatorModeSettings />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
