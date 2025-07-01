import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMatch } from '@/contexts/MatchContext';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  User, 
  MessageCircle, 
  Timer, 
  Zap, 
  Crown,
  Settings
} from 'lucide-react';

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { matches } = useMatch();
  
  const unreadCount = matches.reduce((total, match) => total + (match.unreadCount || 0), 0);

  const navigationItems = [
    { 
      path: '/', 
      icon: Heart, 
      label: 'Discover', 
      color: 'from-pink-500 to-red-500',
      context: 'dating'
    },
    { 
      path: '/swipe', 
      icon: Timer, 
      label: 'Quick Match', 
      color: 'from-orange-500 to-pink-500',
      context: 'dating'
    },
    { 
      path: '/chat', 
      icon: MessageCircle, 
      label: 'Chat', 
      badge: unreadCount,
      color: 'from-blue-500 to-purple-500',
      context: 'dating'
    },
    { 
      path: '/casual', 
      icon: Zap, 
      label: 'Casual', 
      color: 'from-purple-500 to-pink-500',
      context: 'casual'
    },
    { 
      path: '/creator-dashboard', 
      icon: Crown, 
      label: 'Creator', 
      color: 'from-cyan-500 to-blue-500',
      context: 'creator'
    },
    { 
      path: '/phase3', 
      icon: Settings, 
      label: 'Phase 3', 
      color: 'from-green-500 to-blue-500',
      context: 'creator'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profile', 
      color: 'from-gray-500 to-gray-600',
      context: 'dating'
    },
  ];

  const filteredNavigation = navigationItems.filter(item => {
    if (!user) return item.path === '/';
    return true;
  });

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black/70 backdrop-blur-md z-20 safe-bottom">
      <ul className="flex justify-around items-center py-3">
        {filteredNavigation.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "group flex flex-col items-center justify-center px-3 py-2 rounded-lg",
                  isActive ? `bg-gradient-to-br ${item.color}` : "hover:bg-white/5"
                )
              }
            >
              <div className="relative">
                <item.icon 
                  className={cn(
                    "w-6 h-6 mb-1 transition-colors duration-300",
                    location.pathname === item.path ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                  )}
                />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1 flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
