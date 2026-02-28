import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Music } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in — show auth
  if (!user) {
    return <SubmitAuth />;
  }

  // Logged in but no account — show account setup
  if (!hasAccount) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-36 pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-primary" />
                <h1 className="font-display text-3xl">ACCOUNT SETUP</h1>
              </div>
              <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
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
      <div className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl">SUBMIT YOUR MUSIC</h1>
            </div>
            <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
          <div className="divider-gold mb-10" />
          <SubmissionWizard accountId={accountId!} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default SubmitMusicPage;
