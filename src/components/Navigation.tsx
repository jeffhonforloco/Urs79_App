
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
  Flame,
  TrendingUp,
  AlertTriangle,
  Shield,
  Crown,
  Bell
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
      color: 'text-white',
      bgColor: 'bg-blue-500/20',
      context: 'dating'
    },
    { 
      path: '/swipe', 
      icon: Heart, 
      label: 'Discover',
      color: 'text-white',
      bgColor: 'bg-pink-500/20',
      context: 'dating'
    },
    { 
      path: '/chat', 
      icon: MessageCircle, 
      label: 'Chat',
      color: 'text-white',
      bgColor: 'bg-green-500/20',
      context: 'dating'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profile',
      color: 'text-white',
      bgColor: 'bg-gray-500/20',
      context: 'dating'
    },
    { 
      path: '/premium', 
      icon: Star, 
      label: 'Premium',
      color: 'text-white',
      bgColor: 'bg-yellow-500/20',
      context: 'dating'
    },
  ];

  // Add conditional nav items based on user settings
  if (user?.casualMode && user?.ageVerified && user?.verified) {
    navItems.push({ 
      path: '/casual', 
      icon: Flame, 
      label: 'Casual',
      color: 'text-white',
      bgColor: 'bg-orange-500/20',
      context: 'casual'
    });
  }

  if (user?.creatorMode && user?.ageVerified && user?.verified) {
    navItems.push({ 
      path: '/creator-dashboard', 
      icon: TrendingUp, 
      label: 'Creator',
      color: 'text-white',
      bgColor: 'bg-purple-500/20',
      context: 'creator'
    });
  }

  const getContextGradient = (context: string) => {
    switch (context) {
      case 'dating': return 'from-blue-500 to-pink-500';
      case 'casual': return 'from-orange-500 to-red-500';
      case 'creator': return 'from-purple-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getUserBadges = () => {
    const badges = [];
    
    if (user?.isPremium) {
      badges.push(
        <Badge key="premium" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold border-0">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      );
    }
    
    if (user?.verified) {
      badges.push(
        <Badge key="verified" className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold border-0">
          <Shield className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      );
    }
    
    if (user?.creatorMode) {
      badges.push(
        <Badge key="creator" className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold border-0">
          <Star className="w-3 h-3 mr-1" />
          Creator
        </Badge>
      );
    }

    return badges;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom">
        <div className="glass-dark rounded-t-3xl border-t border-white/10 px-6 py-4">
          <div className="flex justify-around items-center">
            {navItems.slice(0, 5).map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${getContextGradient(item.context)} shadow-lg scale-110` 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Header */}
      <nav className="hidden md:block sticky top-0 z-40 glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png" 
              alt="URS79" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              URS79
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${getContextGradient(item.context)} text-white shadow-lg` 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 p-2">
                <Bell className="w-5 h-5" />
              </Button>
              
              {getUserBadges()}
              
              {user?.verificationPending && (
                <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold border-0">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
              
              <Button 
                onClick={handleLogout} 
                className="btn-secondary text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-50 safe-top">
        <Button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Side Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 h-full glass-dark border-l border-white/10 p-6 safe-top">
            <div className="flex items-center justify-between mb-8 mt-16">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png" 
                  alt="URS79" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold text-white">URS79</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${getContextGradient(item.context)} text-white` 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {getUserBadges()}
                {user?.verificationPending && (
                  <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold border-0">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
              
              <Button 
                onClick={handleLogout} 
                className="w-full btn-secondary justify-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
