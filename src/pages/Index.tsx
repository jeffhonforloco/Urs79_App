
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { MatchProvider } from '@/contexts/MatchContext';
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import SwipeScreen from '@/components/SwipeScreen';
import ChatScreen from '@/components/ChatScreen';
import ProfileScreen from '@/components/ProfileScreen';
import PremiumScreen from '@/components/PremiumScreen';
import CasualModeScreen from '@/components/CasualModeScreen';
import CreatorDashboard from '@/components/CreatorDashboard';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/swipe" element={<SwipeScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/chat/:matchId" element={<ChatScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/premium" element={<PremiumScreen />} />
        <Route path="/casual" element={<CasualModeScreen />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <MatchProvider>
        <AppContent />
      </MatchProvider>
    </AuthProvider>
  );
};

export default Index;
