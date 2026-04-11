import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Music, ArrowLeft, Shield, Clock, Globe, User } from 'lucide-react';
import SubmitAuth from '@/components/submit/SubmitAuth';
import AccountSetupStep from '@/components/submit/steps/AccountSetupStep';
import SubmissionWizard from '@/components/submit/SubmissionWizard';
import type { User as SupaUser } from '@supabase/supabase-js';

const SubmitMusicPage = () => {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccount = async (u: SupaUser) => {
      const { data } = await supabase
        .from('submission_accounts')
        .select('id')
        .eq('user_id', u.id)
        .maybeSingle();
      setAccountId(data?.id ?? null);
      setHasAccount(!!data);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await checkAccount(u);
      } else {
        setAccountId(null);
        setHasAccount(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) await checkAccount(u);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
  };

  const handleAccountCreated = (id: string) => {
    setAccountId(id);
    setHasAccount(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full"
        />
        <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <SubmitAuth />;
  }

  // Account setup
  if (!hasAccount) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to site
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> {user.email}
                </span>
                <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-2 transition-colors">
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl">ACCOUNT SETUP</h1>
                <p className="text-muted-foreground text-xs">One-time setup — takes about 2 minutes</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
              {[
                { icon: Shield, label: 'Secure & Encrypted', desc: 'Bank-level security' },
                { icon: Clock, label: 'Quick Review', desc: '24–48 hours' },
                { icon: Globe, label: '200+ Platforms', desc: 'Worldwide reach' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-center gap-3 p-3.5 rounded-lg bg-secondary/30 border border-border/50">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-medium">{label}</p>
                    <p className="text-[10px] text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-5 sm:p-8">
              <AccountSetupStep userId={user.id} onComplete={handleAccountCreated} />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Full wizard
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to site
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:flex text-[10px] text-muted-foreground/60 items-center gap-1.5">
                  <User className="w-3 h-3" /> {user.email}
                </span>
                <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-2 transition-colors">
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl">SUBMIT YOUR MUSIC</h1>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6 pl-[52px]">
              Complete each step to submit your release for distribution.
            </p>
            <div className="divider-gold mb-8 sm:mb-10" />
          </motion.div>

          <SubmissionWizard accountId={accountId!} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default SubmitMusicPage;
