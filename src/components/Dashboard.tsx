
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useMatch } from '@/contexts/MatchContext';
import { Heart, MessageCircle, Timer, Star, Users } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { matches, potentialMatches } = useMatch();

  const stats = [
    {
      label: 'Total Matches',
      value: matches.length,
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      label: 'New Messages',
      value: matches.reduce((sum, match) => sum + (match.unreadCount || 0), 0),
      icon: MessageCircle,
      color: 'text-blue-500',
    },
    {
      label: 'Potential Matches',
      value: potentialMatches.length,
      icon: Users,
      color: 'text-purple-500',
    },
  ];

  const recentMatches = matches.slice(0, 3);
  const quickMatches = matches.filter(match => match.isQuickMatch && match.quickMatchEndsAt && new Date(match.quickMatchEndsAt) > new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to find your perfect match? Let's make some connections today.
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/swipe">
          <Button className="w-full h-20 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg">
            <Heart className="w-6 h-6 mr-2" />
            Start Swiping
          </Button>
        </Link>
        <Link to="/chat">
          <Button variant="outline" className="w-full h-20 text-lg border-2 border-orange-500 text-orange-600 hover:bg-orange-50">
            <MessageCircle className="w-6 h-6 mr-2" />
            View Messages
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Matches Alert */}
      {quickMatches.length > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <Timer className="w-5 h-5 mr-2" />
              Active Quick Matches!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              You have {quickMatches.length} quick match(es) active. Don't let them expire!
            </p>
            <Link to="/chat">
              <Button className="bg-orange-500 hover:bg-orange-600">
                View Quick Matches
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Matches */}
      {recentMatches.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Matches
              <Link to="/chat">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={match.photo}
                    alt={match.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{match.name}</h3>
                      {match.isQuickMatch && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                          <Timer className="w-3 h-3 mr-1" />
                          Quick Match
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {match.lastMessage || 'Say hello! 👋'}
                    </p>
                  </div>
                  {match.unreadCount && match.unreadCount > 0 && (
                    <Badge className="bg-orange-500">
                      {match.unreadCount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Profile Completion */}
      {(!user?.photos || user.photos.length === 0 || !user?.bio) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Star className="w-5 h-5 mr-2" />
              Complete Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Add photos and complete your bio to get more matches!
            </p>
            <Link to="/profile">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Complete Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
