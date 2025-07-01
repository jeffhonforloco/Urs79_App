import React from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { MatchProvider } from "../contexts/MatchContext";
import LandingPage from "./LandingPage";
import AuthPage from "./AuthPage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileScreen from "../components/ProfileScreen";
import SecuritySettings from "../components/SecuritySettings";
import CasualModeSettings from "../components/CasualModeSettings";
import CreatorModeSettings from "../components/CreatorModeSettings";
import AdminPanel from "../components/AdminPanel";
import NotFound from "./NotFound";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAdmin = user?.email === 'admin@urs79.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <AuthProvider>
        <MatchProvider>
          {user ? (
            <>
              <Navigation />
              <Routes>
                <Route path="/" element={<ProfileScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/security" element={<SecuritySettings />} />
                <Route path="/casual" element={<CasualModeSettings />} />
                <Route path="/creator" element={<CreatorModeSettings />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </MatchProvider>
      </AuthProvider>
    </div>
  );
};

export default Index;
