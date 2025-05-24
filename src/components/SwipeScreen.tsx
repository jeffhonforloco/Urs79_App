
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMatch } from '@/contexts/MatchContext';
import { Heart, X, Timer, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';

const SwipeScreen = () => {
  const { getNextPotentialMatch, swipeRight, swipeLeft, startQuickMatch } = useMatch();
  const [currentMatch, setCurrentMatch] = useState(getNextPotentialMatch());
  const [isQuickMatchMode, setIsQuickMatchMode] = useState(false);
  const [quickMatchTimer, setQuickMatchTimer] = useState(79);

  useEffect(() => {
    setCurrentMatch(getNextPotentialMatch());
  }, [getNextPotentialMatch]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isQuickMatchMode && quickMatchTimer > 0) {
      interval = setInterval(() => {
        setQuickMatchTimer(prev => prev - 1);
      }, 1000);
    } else if (quickMatchTimer === 0) {
      setIsQuickMatchMode(false);
      setQuickMatchTimer(79);
      toast.success('Quick match started! Check your messages.');
    }
    return () => clearInterval(interval);
  }, [isQuickMatchMode, quickMatchTimer]);

  const handleSwipeLeft = () => {
    if (!currentMatch) return;
    
    swipeLeft(currentMatch);
    setCurrentMatch(getNextPotentialMatch());
    
    if (isQuickMatchMode) {
      setIsQuickMatchMode(false);
      setQuickMatchTimer(79);
    }
  };

  const handleSwipeRight = () => {
    if (!currentMatch) return;
    
    if (isQuickMatchMode) {
      startQuickMatch(currentMatch);
      setIsQuickMatchMode(false);
      setQuickMatchTimer(79);
      toast.success('Quick match started! You have 79 seconds to connect.');
    } else {
      swipeRight(currentMatch);
      toast.success('Great choice! If they like you back, it\'s a match!');
    }
    
    setCurrentMatch(getNextPotentialMatch());
  };

  const handleQuickMatch = () => {
    if (!currentMatch) return;
    setIsQuickMatchMode(true);
    toast.info('Quick Match activated! Swipe right within 79 seconds to start an instant connection.');
  };

  if (!currentMatch) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 pb-20 md:pb-8">
        <Card className="text-center p-8">
          <CardContent>
            <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No more potential matches
            </h2>
            <p className="text-gray-600 mb-4">
              Check back later for new profiles or expand your search preferences.
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
              Adjust Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Quick Match Timer */}
      {isQuickMatchMode && (
        <Card className="mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Timer className="w-5 h-5" />
              <span className="text-2xl font-bold">{quickMatchTimer}s</span>
            </div>
            <p className="text-sm opacity-90">Swipe right for instant connection!</p>
          </CardContent>
        </Card>
      )}

      {/* Profile Card */}
      <Card className="relative overflow-hidden mb-6">
        <div className="relative h-[600px]">
          <img
            src={currentMatch.photo}
            alt={currentMatch.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-3xl font-bold">{currentMatch.name}</h2>
              <span className="text-xl">{currentMatch.age}</span>
            </div>
            
            <div className="flex items-center text-sm opacity-90 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{currentMatch.distance} miles away</span>
            </div>
            
            <p className="text-sm opacity-90 mb-3">{currentMatch.bio}</p>
            
            <div className="flex flex-wrap gap-2">
              {currentMatch.interests.map((interest, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/20"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleSwipeLeft}
          className="h-16 border-2 border-gray-300 hover:border-red-500 hover:text-red-500"
        >
          <X className="w-8 h-8" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleQuickMatch}
          disabled={isQuickMatchMode}
          className="h-16 border-2 border-orange-300 hover:border-orange-500 hover:text-orange-500"
        >
          <Timer className="w-6 h-6" />
        </Button>
        
        <Button
          size="lg"
          onClick={handleSwipeRight}
          className={`h-16 ${
            isQuickMatchMode 
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 animate-pulse' 
              : 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600'
          }`}
        >
          <Heart className="w-8 h-8" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-600">
          Swipe left to pass, right to like
        </p>
        <p className="text-xs text-gray-500">
          Tap the timer for a 79-second quick match challenge!
        </p>
      </div>
    </div>
  );
};

export default SwipeScreen;
