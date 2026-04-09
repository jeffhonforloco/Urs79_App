import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Music, ArrowRight, Eye, EyeOff, Lock, Mail, KeyRound } from 'lucide-react';
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

type Mode = 'login' | 'signup' | 'forgot';

const SubmitAuth = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setErrors({});
    setPassword('');
    setConfirmPassword('');
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

  const titles: Record<Mode, string> = {
    login: 'WELCOME BACK',
    signup: 'CREATE ACCOUNT',
    forgot: 'RESET PASSWORD',
  };

  const subtitles: Record<Mode, string> = {
    login: 'Sign in to access your submission dashboard',
    signup: 'Start distributing your music with URS79',
    forgot: "Enter your email and we'll send a reset link",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8 sm:mb-10">
          <Link to="/">
            <img src="/images/urs79-logo-color.webp" alt="URS79" className="h-12 sm:h-16 mx-auto mb-5 sm:mb-6 cursor-pointer hover:opacity-80 transition-opacity" />
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
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-2">{titles[mode]}</h1>
              <p className="text-muted-foreground text-sm">{subtitles[mode]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
          <div className="mt-5 sm:mt-6 space-y-2 text-center">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => switchMode('forgot')}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors block w-full"
                >
                  Forgot your password?
                </button>
                <button
                  onClick={() => switchMode('signup')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Don't have an account? <span className="text-primary font-medium">Sign up</span>
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button
                onClick={() => switchMode('login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Already have an account? <span className="text-primary font-medium">Sign in</span>
              </button>
            )}
            {mode === 'forgot' && (
              <button
                onClick={() => switchMode('login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to sign in
              </button>
            )}
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-6 text-center">
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
