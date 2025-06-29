
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Users, Coffee, Flame, Compass, Check } from 'lucide-react';

const RelationshipIntent = () => {
  const { user, updateProfile } = useAuth();
  const [selectedIntent, setSelectedIntent] = useState(user?.relationshipIntent || '');
  const [isEditing, setIsEditing] = useState(!user?.relationshipIntent);

  const intentOptions = [
    {
      value: 'long-term',
      label: 'Long-Term Dating',
      description: 'Looking for a serious relationship',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      value: 'short-term',
      label: 'Short-Term Dating',
      description: 'Casual dating without long-term commitment',
      icon: Coffee,
      color: 'text-orange-500'
    },
    {
      value: 'friends-with-benefits',
      label: 'Friends with Benefits',
      description: 'Friendship with physical intimacy',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      value: 'hookups',
      label: 'Hookups',
      description: 'Physical connections without commitment',
      icon: Flame,
      color: 'text-pink-500'
    },
    {
      value: 'exploring',
      label: 'Exploring',
      description: 'Open to different types of connections',
      icon: Compass,
      color: 'text-purple-500'
    }
  ];

  const handleSave = () => {
    if (selectedIntent) {
      updateProfile({ 
        relationshipIntent: selectedIntent as 'long-term' | 'short-term' | 'friends-with-benefits' | 'hookups' | 'exploring' 
      });
      setIsEditing(false);
    }
  };

  const getCurrentIntentLabel = () => {
    const current = intentOptions.find(option => option.value === user?.relationshipIntent);
    return current ? current.label : 'Not specified';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Relationship Intent</CardTitle>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!selectedIntent}>
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="flex items-center space-x-3">
            {user?.relationshipIntent && (
              <>
                {React.createElement(
                  intentOptions.find(option => option.value === user.relationshipIntent)?.icon || Heart,
                  { 
                    className: `w-5 h-5 ${intentOptions.find(option => option.value === user.relationshipIntent)?.color || 'text-gray-500'}` 
                  }
                )}
                <div>
                  <p className="font-medium">{getCurrentIntentLabel()}</p>
                  <p className="text-sm text-gray-600">
                    {intentOptions.find(option => option.value === user.relationshipIntent)?.description}
                  </p>
                </div>
              </>
            )}
            {!user?.relationshipIntent && (
              <p className="text-gray-500">Please specify what you're looking for to improve your matches</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Select what you're looking for to help us show you more compatible matches:
            </p>
            <RadioGroup value={selectedIntent} onValueChange={setSelectedIntent}>
              {intentOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <option.icon className={`w-5 h-5 ${option.color}`} />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelationshipIntent;
