
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  bio?: string;
  interests?: string[];
  photos?: string[];
  location?: string;
  verified?: boolean;
  isPremium?: boolean;
  createdAt: Date;
  // Enhanced security features
  ageVerified?: boolean;
  twoFactorEnabled?: boolean;
  incognitoMode?: boolean;
  photoProtection?: boolean;
  // Optional mode features
  casualMode?: boolean;
  creatorMode?: boolean;
  subscriptionPrice?: number;
  verificationPending?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('urs79_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email,
        age: 25,
        bio: 'Looking for meaningful connections!',
        interests: ['Travel', 'Music', 'Fitness'],
        photos: ['/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png'],
        location: 'New York, NY',
        verified: true,
        isPremium: false,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('urs79_user', JSON.stringify(mockUser));
      toast.success('Welcome back to URS79!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        verified: false,
        isPremium: false,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('urs79_user', JSON.stringify(mockUser));
      toast.success('Welcome to URS79! Complete your profile to start matching.');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urs79_user');
    toast.success('See you soon!');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('urs79_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
