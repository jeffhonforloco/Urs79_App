import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if user has admin role
      const { data: roles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', 'admin');

      if (roleError || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin privileges required.');
      }

      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/images/urs79-logo-color.webp" alt="URS79" className="h-16 mx-auto mb-6" />
          <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-3xl tracking-wide mb-2">ADMIN ACCESS</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage URS79</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-6">
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="bg-secondary border-border text-foreground h-12"
              placeholder="admin@urs79.com"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="bg-secondary border-border text-foreground h-12"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full text-center block">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
