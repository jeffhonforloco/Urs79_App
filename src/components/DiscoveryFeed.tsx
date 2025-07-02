import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMatch } from '@/contexts/MatchContext';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, X, MapPin, Filter, Users, Coffee, Flame, Compass } from 'lucide-react';
import { toast } from 'sonner';

const DiscoveryFeed = () => {
  const { potentialMatches, swipeRight, swipeLeft } = useMatch();
  const { user } = useAuth();
  const [intentFilter, setIntentFilter] = useState<string>('all');
  const [distanceFilter, setDistanceFilter] = useState<string>('all');

  const intentOptions = [
    { value: 'all', label: 'All Intents', icon: Users },
    { value: 'long-term', label: 'Long-Term Dating', icon: Heart },
    { value: 'short-term', label: 'Short-Term Dating', icon: Coffee },
    { value: 'friends-with-benefits', label: 'Friends with Benefits', icon: Users },
    { value: 'hookups', label: 'Hookups', icon: Flame },
    { value: 'exploring', label: 'Exploring', icon: Compass }
  ];

  const distanceOptions = [
    { value: 'all', label: 'Any Distance' },
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' }
  ];

  const filteredMatches = useMemo(() => {
    return potentialMatches.filter(match => {
      // Intent-based filtering
      if (intentFilter !== 'all') {
        // In a real app, matches would have their own relationship intent
        // For demo purposes, we'll simulate random intents
        const matchIntent = ['long-term', 'short-term', 'friends-with-benefits', 'hookups', 'exploring'][
          match.name.length % 5
        ];
        if (matchIntent !== intentFilter) return false;
      }

      // Distance filtering
      if (distanceFilter !== 'all') {
        const maxDistance = parseInt(distanceFilter);
        if (match.distance > maxDistance) return false;
      }

      return true;
    });
  }, [potentialMatches, intentFilter, distanceFilter]);

  const handleLike = (match: any) => {
    swipeRight(match);
    toast.success(`Liked ${match.name}!`);
  };

  const handlePass = (match: any) => {
    swipeLeft(match);
  };

  const getCurrentIntentBadge = () => {
    const currentIntent = intentOptions.find(option => option.value === user?.relationshipIntent);
    if (!currentIntent || !user?.relationshipIntent) return null;

    const IconComponent = currentIntent.icon;
    return (
      <Badge className="bg-primary/10 text-primary border-primary/20">
        <IconComponent className="w-3 h-3 mr-1" />
        {currentIntent.label}
      </Badge>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Discovery Feed</h1>
            <p className="text-gray-600">Find matches based on your preferences</p>
          </div>
          {getCurrentIntentBadge()}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Looking for:
                  </label>
                  <Select value={intentFilter} onValueChange={setIntentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by intent" />
                    </SelectTrigger>
                    <SelectContent>
                      {intentOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <IconComponent className="w-4 h-4 mr-2" />
                              {option.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Distance:
                  </label>
                  <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by distance" />
                    </SelectTrigger>
                    <SelectContent>
                      {distanceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredMatches.length} of {potentialMatches.length} potential matches
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match Grid */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/60 text-white">
                    <MapPin className="w-3 h-3 mr-1" />
                    {match.distance}mi
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {match.name}, {match.age}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{match.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {match.interests.slice(0, 3).map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {match.interests.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{match.interests.length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handlePass(match)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Pass
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                    onClick={() => handleLike(match)}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardContent>
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No matches found
            </h2>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more potential matches.
            </p>
            <Button onClick={() => { setIntentFilter('all'); setDistanceFilter('all'); }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscoveryFeed;