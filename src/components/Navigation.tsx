
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Heart, MessageCircle, User, Flame, AlertTriangle } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/swipe', icon: Heart, label: 'Discover' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  // Add Casual Mode for verified users who have it enabled
  if (user?.casualMode && user?.ageVerified) {
    navItems.splice(2, 0, { path: '/casual', icon: Flame, label: 'Casual' });
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/41c0b1d3-ffef-40d9-855d-f7f3eb9e0882.png" 
              alt="URS79 Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              URS79
            </span>
          </Link>

          {/* Age Verification Warning */}
          {!user?.ageVerified && (
            <div className="hidden md:flex items-center">
              <Badge className="bg-red-100 text-red-800 border-red-300">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Age Verification Required
              </Badge>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isRestricted = (item.path === '/casual') && !user?.ageVerified;
              
              return (
                <Link
                  key={item.path}
                  to={isRestricted ? '/profile' : item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-orange-600 bg-orange-50'
                      : isRestricted
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={isRestricted ? (e) => e.preventDefault() : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isRestricted && (
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/premium">
              <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                Premium
              </Button>
            </Link>
            <Button variant="ghost" onClick={logout} size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className={`grid gap-1 ${navItems.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const isRestricted = (item.path === '/casual') && !user?.ageVerified;
            
            return (
              <Link
                key={item.path}
                to={isRestricted ? '/profile' : item.path}
                className={`flex flex-col items-center justify-center py-3 px-2 ${
                  isActive
                    ? 'text-orange-600 bg-orange-50'
                    : isRestricted
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
                onClick={isRestricted ? (e) => e.preventDefault() : undefined}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-1" />
                  {isRestricted && (
                    <AlertTriangle className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
