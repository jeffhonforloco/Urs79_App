import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Music, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords don\'t match', path: ['confirmPassword'] });

const SubmitAuth = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

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
        toast.success('Account created! Check your email to verify.');
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/"><img src="/images/urs79-logo-color.png" alt="URS79" className="h-16 mx-auto mb-6 cursor-pointer hover:opacity-80 transition-opacity" /></Link>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Music className="w-4 h-4 text-primary" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-semibold">Music Submission Portal</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-2">
            {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === 'login'
              ? 'Access your submission dashboard'
              : 'Start distributing your music globally'}
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="artist@example.com"
                className="bg-secondary/50 border-border"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-secondary/50 border-border pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-secondary/50 border-border"
                />
                {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full btn-primary h-12">
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitAuth;
