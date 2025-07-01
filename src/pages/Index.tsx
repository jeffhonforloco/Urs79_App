import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { MatchProvider } from '@/contexts/MatchContext';
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import SwipeScreen from '@/components/SwipeScreen';
import ChatScreen from '@/components/ChatScreen';
import ProfileScreen from '@/components/ProfileScreen';
import PremiumScreen from '@/components/PremiumScreen';
import CasualModeScreen from '@/components/CasualModeScreen';
import CreatorDashboard from '@/components/CreatorDashboard';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import Phase3Features from '@/components/Phase3Features';

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

  // Show onboarding for new users without relationship intent
  if (!user.relationshipIntent || !user.onboardingCompleted) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 gradient-primary opacity-20"></div>
      <div className="fixed inset-0 bg-black/80"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main className="pb-24 md:pb-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/swipe" element={<SwipeScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/chat/:matchId" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/premium" element={<PremiumScreen />} />
            <Route path="/casual" element={<CasualModeScreen />} />
            <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="/phase3" element={<Phase3Features />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
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
