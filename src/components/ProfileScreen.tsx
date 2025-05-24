
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, Plus, X, Check } from 'lucide-react';
import { toast } from 'sonner';

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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your profile information and preferences</p>
      </div>

      {/* Profile Photos */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Photos</CardTitle>
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
      <Card className="mb-6">
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
      <Card className="mb-6">
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
      <Card className="mb-6">
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

      {/* Premium Status */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Status: {user?.isPremium ? (
                  <span className="text-purple-600">Premium ⭐</span>
                ) : (
                  <span className="text-gray-600">Free</span>
                )}
              </p>
              <p className="text-sm text-gray-600">
                {user?.isPremium 
                  ? 'Enjoy unlimited swipes and premium features'
                  : 'Upgrade to unlock premium features'
                }
              </p>
            </div>
            {!user?.isPremium && (
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Upgrade
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileScreen;
