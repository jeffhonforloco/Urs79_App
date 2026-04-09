import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Music, ArrowLeft, Shield, Clock, Globe } from 'lucide-react';
import SubmitAuth from '@/components/submit/SubmitAuth';
import AccountSetupStep from '@/components/submit/steps/AccountSetupStep';
import SubmissionWizard from '@/components/submit/SubmissionWizard';
import type { User } from '@supabase/supabase-js';

const SubmitMusicPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase
          .from('submission_accounts')
          .select('id')
          .eq('user_id', u.id)
          .maybeSingle();
        setAccountId(data?.id ?? null);
        setHasAccount(!!data);
      } else {
        setAccountId(null);
        setHasAccount(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const { data } = await supabase
          .from('submission_accounts')
          .select('id')
          .eq('user_id', u.id)
          .maybeSingle();
        setAccountId(data?.id ?? null);
        setHasAccount(!!data);
      }
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground tracking-wider uppercase">Loading your dashboard...</p>
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
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to site
              </Link>
              <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-2 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <Music className="w-5 h-5 text-primary" />
              <h1 className="font-display text-2xl sm:text-3xl">ACCOUNT SETUP</h1>
            </div>
            <p className="text-muted-foreground text-sm mb-8">
              Set up your account before submitting music. This information helps us manage royalties and communications.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: Shield, label: 'Secure & Encrypted' },
                { icon: Clock, label: 'Quick Review Process' },
                { icon: Globe, label: '200+ Platforms' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <AccountSetupStep userId={user.id} onComplete={handleAccountCreated} />
          </div>
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
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to site
            </Link>
            <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-2 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <Music className="w-5 h-5 text-primary" />
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl">SUBMIT YOUR MUSIC</h1>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Complete each step to submit your release for distribution. Save your progress at any step.
          </p>
          <div className="divider-gold mb-8 sm:mb-10" />

          <SubmissionWizard accountId={accountId!} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default SubmitMusicPage;
