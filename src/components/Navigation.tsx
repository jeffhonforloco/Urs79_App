
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Heart, 
  MessageCircle, 
  User, 
  Star, 
  Menu, 
  X, 
  LogOut, 
  Settings,
  Flame,
  TrendingUp,
  AlertTriangle,
  Shield,
  Crown
} from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { 
      path: '/', 
      icon: Home, 
      label: 'Home',
      color: 'text-blue-600',
      context: 'dating'
    },
    { 
      path: '/swipe', 
      icon: Heart, 
      label: 'Discover',
      color: 'text-pink-600',
      context: 'dating'
    },
    { 
      path: '/chat', 
      icon: MessageCircle, 
      label: 'Chat',
      color: 'text-green-600',
      context: 'dating'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profile',
      color: 'text-gray-600',
      context: 'dating'
    },
    { 
      path: '/premium', 
      icon: Star, 
      label: 'Premium',
      color: 'text-yellow-600',
      context: 'dating'
    },
  ];

  // Add conditional nav items based on user settings
  if (user?.casualMode && user?.ageVerified && user?.verified) {
    navItems.push({ 
      path: '/casual', 
      icon: Flame, 
      label: 'Casual',
      color: 'text-orange-600',
      context: 'casual'
    });
  }

  if (user?.creatorMode && user?.ageVerified && user?.verified) {
    navItems.push({ 
      path: '/creator-dashboard', 
      icon: TrendingUp, 
      label: 'Creator',
      color: 'text-purple-600',
      context: 'creator'
    });
  }

  const getContextColor = (context: string) => {
    switch (context) {
      case 'dating': return 'border-l-blue-500';
      case 'casual': return 'border-l-orange-500';
      case 'creator': return 'border-l-purple-500';
      default: return 'border-l-gray-500';
    }
  };

  const getUserBadges = () => {
    const badges = [];
    
    if (user?.isPremium) {
      badges.push(
        <Badge key="premium" className="bg-yellow-100 text-yellow-800 flex items-center space-x-1">
          <Crown className="w-3 h-3" />
          <span>Premium</span>
        </Badge>
      );
    }
    
    if (user?.verified) {
      badges.push(
        <Badge key="verified" className="bg-blue-100 text-blue-800 flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>Verified</span>
        </Badge>
      );
    }
    
    if (user?.creatorMode) {
      badges.push(
        <Badge key="creator" className="bg-purple-100 text-purple-800 flex items-center space-x-1">
          <Star className="w-3 h-3" />
          <span>Creator</span>
        </Badge>
      );
    }

    return badges;
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          URS79
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 border-l-2 ${getContextColor(item.context)} ${location.pathname === item.path ? 'bg-gray-100 font-medium' : ''}`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            {getUserBadges()}
            
            {user?.verificationPending && (
              <Badge className="bg-orange-100 text-orange-800 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Verification Pending</span>
              </Badge>
            )}
            
            <Button variant="outline" onClick={handleLogout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 border-l-2 ${getContextColor(item.context)} ${location.pathname === item.path ? 'bg-gray-100 font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-gray-700">{item.label}</span>
              </Link>
            ))}
            
            <div className="flex flex-wrap gap-2 mt-4">
              {getUserBadges()}
              {user?.verificationPending && (
                <Badge className="bg-orange-100 text-orange-800 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Verification Pending</span>
                </Badge>
              )}
            </div>
            
            <Button variant="outline" onClick={handleLogout} className="w-full justify-center mt-4">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
