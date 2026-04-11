import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { toast } from 'sonner';
import { Music, ArrowRight, Eye, EyeOff, Lock, Mail, KeyRound, Shield, Clock, Globe, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

const resetSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
});

type Mode = 'welcome' | 'login' | 'signup' | 'forgot';

const FEATURES = [
  { icon: Globe, title: '200+ Platforms', desc: 'Spotify, Apple Music, TikTok & more' },
  { icon: Shield, title: 'Rights Protected', desc: 'Your music, your ownership — always' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Review within 24–48 hours' },
  { icon: Sparkles, title: 'Free Distribution', desc: 'No upfront costs to release' },
];

const SubmitAuth = () => {
  const [mode, setMode] = useState<Mode>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setErrors({});
    setPassword('');
    setConfirmPassword('');
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: `${window.location.origin}/submit`,
      });
      if (result.error) throw result.error;
    } catch (err: any) {
      toast.error(err.message || 'Google sign-in failed');
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (mode === 'forgot') {
      const result = resetSchema.safeParse({ email });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach(i => { fieldErrors[i.path[0] as string] = i.message; });
        setErrors(fieldErrors);
        return;
      }
      setLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/submit`,
        });
        if (error) throw error;
        toast.success('Password reset email sent! Check your inbox.');
        switchMode('login');
      } catch (err: any) {
        toast.error(err.message || 'Failed to send reset email');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup') {
      const result = signupSchema.safeParse({ email, password, confirmPassword });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach(i => { fieldErrors[i.path[0] as string] = i.message; });
        setErrors(fieldErrors);
        return;
      }
    } else {
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach(i => { fieldErrors[i.path[0] as string] = i.message; });
        setErrors(fieldErrors);
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + '/submit' },
        });
        if (error) throw error;
        toast.success('Account created! Check your email to verify before signing in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Welcome / Landing screen
  if (mode === 'welcome') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Hero */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link to="/">
                <img src="/images/urs79-logo-color.webp" alt="URS79" className="h-14 sm:h-20 mx-auto mb-8 cursor-pointer hover:opacity-80 transition-opacity" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-primary font-bold mb-4">Music Distribution Portal</p>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-6">
                RELEASE YOUR<br />
                <span className="text-primary">MUSIC</span> WORLDWIDE
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Get your tracks on every major platform. Professional distribution, 
                transparent royalties, and dedicated support — all in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
            >
              <Button
                onClick={() => switchMode('signup')}
                className="btn-primary h-13 px-10 text-sm gap-2 w-full sm:w-auto"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => switchMode('login')}
                className="h-13 px-10 text-sm w-full sm:w-auto"
              >
                Sign In
              </Button>
            </motion.div>

            {/* Feature grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
            >
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                  className="glass-card p-4 sm:p-5 text-center group hover:border-primary/30 transition-all"
                >
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold tracking-wide mb-1">{title}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground/50">
            © {new Date().getFullYear()} URS79. All rights reserved.
          </p>
        </div>
      </div>
    );
  }

  // Auth forms
  const titles: Record<Mode, string> = {
    welcome: '',
    login: 'WELCOME BACK',
    signup: 'CREATE ACCOUNT',
    forgot: 'RESET PASSWORD',
  };

  const subtitles: Record<Mode, string> = {
    welcome: '',
    login: 'Sign in to access your submission dashboard',
    signup: 'Start distributing your music with URS79',
    forgot: "Enter your email and we'll send a reset link",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/images/urs79-logo-color.webp" alt="URS79" className="h-12 sm:h-14 mx-auto mb-5 cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Music className="w-4 h-4 text-primary" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">Music Submission Portal</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl mb-2">{titles[mode]}</h1>
              <p className="text-muted-foreground text-sm">{subtitles[mode]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8">
          {/* Google Sign-In */}
          {mode !== 'forgot' && (
            <div className="mb-5">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full h-12 gap-3 text-sm font-medium"
              >
                {googleLoading ? (
                  <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-card px-4 text-muted-foreground">or continue with email</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="artist@example.com"
                  className="bg-secondary/50 border-border pl-10"
                />
              </div>
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-secondary/50 border-border pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Confirm Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-secondary/50 border-border pl-10"
                  />
                </div>
                {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full btn-primary h-12 text-sm">
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer links */}
          <div className="mt-5 space-y-2 text-center">
            {mode === 'login' && (
              <>
                <button onClick={() => switchMode('forgot')} className="text-xs text-muted-foreground hover:text-primary transition-colors block w-full">
                  Forgot your password?
                </button>
                <button onClick={() => switchMode('signup')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Don't have an account? <span className="text-primary font-medium">Sign up</span>
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button onClick={() => switchMode('login')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Already have an account? <span className="text-primary font-medium">Sign in</span>
              </button>
            )}
            {mode === 'forgot' && (
              <button onClick={() => switchMode('login')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Back to sign in
              </button>
            )}
          </div>
        </div>

        {/* Back to welcome */}
        <div className="mt-4 text-center">
          <button onClick={() => switchMode('welcome')} className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            ← Back to overview
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed max-w-xs mx-auto">
            By creating an account you agree to our terms of service.
            Your data is encrypted and securely stored.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitAuth;
