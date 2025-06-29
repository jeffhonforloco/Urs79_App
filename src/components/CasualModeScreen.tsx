
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { useMatch } from '@/contexts/MatchContext';
import { MapPin, Eye, Clock, Heart, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

const CasualModeScreen = () => {
  const { user } = useAuth();
  const { potentialMatches, swipeRight, swipeLeft } = useMatch();
  const [availableTonight, setAvailableTonight] = useState(false);
  const [privateBrowsing, setPrivateBrowsing] = useState(false);
  const [blurredPhotos, setBlurredPhotos] = useState(true);
  const [locationRadius, setLocationRadius] = useState([5]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Filter matches for casual mode
  const casualMatches = potentialMatches.filter(match => match.distance <= locationRadius[0]);
  const currentMatch = casualMatches[currentMatchIndex];

  const handleSwipeRight = () => {
    if (currentMatch) {
      swipeRight(currentMatch);
      setCurrentMatchIndex(prev => (prev + 1) % casualMatches.length);
      toast.success('Match sent!');
    }
  };

  const handleSwipeLeft = () => {
    if (currentMatch) {
      swipeLeft(currentMatch);
      setCurrentMatchIndex(prev => (prev + 1) % casualMatches.length);
    }
  };

  const handleAvailabilityToggle = () => {
    setAvailableTonight(!availableTonight);
    toast.success(availableTonight ? 'Availability disabled' : 'You\'re now available tonight!');
  };

  if (!user?.casualMode) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-700">Casual Mode Not Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800 mb-4">
              Enable Casual Mode in your profile settings to access this feature.
            </p>
            <p className="text-sm text-amber-700">
              Casual Mode requires age verification and is designed for users seeking short-term connections.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-orange-500" />
              Casual Mode
            </h1>
            <p className="text-gray-600">Connect with nearby users for casual encounters</p>
          </div>
          <Badge className="bg-orange-100 text-orange-800">
            <Shield className="w-3 h-3 mr-1" />
            Verified Only
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Availability Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="w-5 h-5 mr-2" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="available-tonight">Available Tonight</Label>
                  <p className="text-sm text-gray-600">Show you're free to meet up</p>
                </div>
                <Switch
                  id="available-tonight"
                  checked={availableTonight}
                  onCheckedChange={handleAvailabilityToggle}
                />
              </div>
              {availableTonight && (
                <div className="mt-3 p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 text-sm">
                    <Zap className="w-4 h-4 mr-1" />
                    You'll appear in "Available Now" for other users
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Privacy Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Eye className="w-5 h-5 mr-2" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="private-browsing">Private Browsing</Label>
                  <p className="text-sm text-gray-600">Browse without appearing in views</p>
                </div>
                <Switch
                  id="private-browsing"
                  checked={privateBrowsing}
                  onCheckedChange={setPrivateBrowsing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="blurred-photos">Blur Photos</Label>
                  <p className="text-sm text-gray-600">Blur photos until mutual interest</p>
                </div>
                <Switch
                  id="blurred-photos"
                  checked={blurredPhotos}
                  onCheckedChange={setBlurredPhotos}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Discovery Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Within {locationRadius[0]} miles</Label>
                  <Slider
                    value={locationRadius}
                    onValueChange={setLocationRadius}
                    max={25}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {casualMatches.length} users found within range
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match Cards */}
        <div className="lg:col-span-2">
          {currentMatch ? (
            <Card className="h-[600px] relative overflow-hidden">
              <div className="relative h-full">
                <img
                  src={currentMatch.photo}
                  alt={currentMatch.name}
                  className={`w-full h-full object-cover ${blurredPhotos ? 'blur-sm' : ''}`}
                />
                
                {/* Overlay with user info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold">
                        {currentMatch.name}, {currentMatch.age}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{currentMatch.distance}mi away</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 mb-4">{currentMatch.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentMatch.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    {availableTonight && (
                      <Badge className="bg-green-500 text-white mb-4">
                        <Zap className="w-3 h-3 mr-1" />
                        Available Tonight
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full w-16 h-16 bg-white/90 hover:bg-white"
                    onClick={handleSwipeLeft}
                  >
                    ✕
                  </Button>
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 bg-orange-500 hover:bg-orange-600"
                    onClick={handleSwipeRight}
                  >
                    ♥
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No More Matches</h3>
                <p className="text-gray-500">
                  Try adjusting your discovery range or check back later
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CasualModeScreen;
