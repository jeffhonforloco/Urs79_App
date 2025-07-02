import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Users, Settings, Shield } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  adminOnly?: boolean;
}

const Navigation = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.email === 'admin@example.com';

  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
    },
    {
      path: '/discovery',
      label: 'Discovery',
      icon: Users,
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  // Add admin navigation item
  const adminNavItem = {
    path: '/admin',
    label: 'Admin',
    icon: Shield,
    adminOnly: true
  };

  // Add admin item to navigation if user is admin
  const allNavItems = isAdmin ? [...navItems, adminNavItem] : navItems;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/lovable-uploads/41c0b1d3-ffef-40d9-855d-f7f3eb9e0882.png"
                alt="URS79"
              />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {allNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-orange-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4">
              {user ? (
                <span className="text-gray-700">{user.name}</span>
              ) : (
                <NavLink to="/auth" className="text-gray-700">
                  Login
                </NavLink>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {allNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
            >
              <item.icon className="w-4 h-4 mr-2 inline-block" />
              {item.label}
            </NavLink>
          ))}
        </div>
        {user && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4">
              <div className="text-base font-medium text-gray-800">{user.name}</div>
              <div className="text-sm font-medium text-gray-500">{user.email}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
