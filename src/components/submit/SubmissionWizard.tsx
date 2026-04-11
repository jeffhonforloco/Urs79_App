import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, ChevronLeft, ChevronRight, Send, Info, Sparkles, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtistProfileStep from './steps/ArtistProfileStep';
import ReleaseInfoStep from './steps/ReleaseInfoStep';
import TrackMetadataStep from './steps/TrackMetadataStep';
import FileUploadStep from './steps/FileUploadStep';
import PublishingSplitsStep from './steps/PublishingSplitsStep';
import MasterOwnershipStep from './steps/MasterOwnershipStep';

const STEPS = [
  { num: 1, label: 'Artist Profile', desc: 'Your artist identity & social presence', emoji: '🎤' },
  { num: 2, label: 'Release Info', desc: 'Release type, title, date & metadata', emoji: '💿' },
  { num: 3, label: 'Track Metadata', desc: 'Song details, credits & contributors', emoji: '🎵' },
  { num: 4, label: 'File Upload', desc: 'Audio files & cover artwork', emoji: '📁' },
  { num: 5, label: 'Publishing', desc: 'Songwriting ownership & royalties', emoji: '📝' },
  { num: 6, label: 'Rights', desc: 'Master rights & legal declarations', emoji: '🛡️' },
];

type Props = {
  accountId: string;
  userId: string;
};

const SubmissionWizard = ({ accountId, userId }: Props) => {
  const [step, setStep] = useState(0);
  const [artistProfileId, setArtistProfileId] = useState<string | null>(null);
  const [releaseId, setReleaseId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionCode, setSubmissionCode] = useState('');
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    supabase
      .from('submission_artist_profiles')
      .select('id')
      .eq('account_id', accountId)
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setArtistProfileId(data.id);
      });
  }, [accountId]);

  const goTo = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const handleFinalSubmit = async () => {
    if (!releaseId) return;
    setSubmitting(true);
    try {
      const code = 'URS-' + Date.now().toString(36).toUpperCase();
      const { error } = await supabase
        .from('submission_releases')
        .update({
          status: 'submitted' as any,
          submitted_at: new Date().toISOString(),
          submission_id: code,
        })
        .eq('id', releaseId);
      if (error) throw error;

      // Fetch release details for the confirmation email
      const { data: release } = await supabase
        .from('submission_releases')
        .select('title, primary_artist')
        .eq('id', releaseId)
        .maybeSingle();

      // Get user email for confirmation
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        supabase.functions.invoke('send-transactional-email', {
          body: {
            templateName: 'submission-received',
            recipientEmail: user.email,
            idempotencyKey: `submission-confirm-${releaseId}`,
            templateData: {
              artistName: release?.primary_artist || '',
              releaseTitle: release?.title || '',
              submissionId: code,
            },
          },
        }).catch(() => {});
      }

      setSubmissionCode(code);
      setSubmitted(true);
      toast.success('Submission received!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const canGoNext = () => {
    if (step === 0 && !artistProfileId) return false;
    if (step === 1 && !releaseId) return false;
    return true;
  };

  // Success state
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 sm:p-12 text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <PartyPopper className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="font-display text-3xl sm:text-4xl mb-3">SUBMITTED!</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Your release has been submitted for review. We'll get back to you within 24–48 hours.
        </p>
        <div className="glass-card p-4 mb-6 inline-block">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Submission ID</p>
          <p className="font-display text-xl text-primary">{submissionCode}</p>
        </div>
        <p className="text-xs text-muted-foreground/60">
          Save this ID for your records. You'll receive an email confirmation shortly.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
            setReleaseId(null);
          }}
          variant="outline"
          className="mt-6 gap-2"
        >
          <Sparkles className="w-4 h-4" /> Submit Another Release
        </Button>
      </motion.div>
    );
  }

  const progressPercent = ((step + 1) / STEPS.length) * 100;

  return (
    <div>
      {/* Progress stepper */}
      <div className="mb-8 sm:mb-10">
        {/* Desktop stepper */}
        <div className="hidden md:flex items-center justify-between mb-4 gap-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => { if (i <= step) goTo(i); }}
                className={`flex items-center gap-2.5 group ${i <= step ? 'cursor-pointer' : 'cursor-default'}`}
                title={s.desc}
              >
                <motion.div
                  animate={{
                    scale: i === step ? 1.1 : 1,
                    backgroundColor: i < step ? 'hsl(var(--primary))' : i === step ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < step
                      ? 'text-primary-foreground'
                      : i === step
                        ? 'border-2 border-primary text-primary'
                        : 'border border-border text-muted-foreground'
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : <span>{s.emoji}</span>}
                </motion.div>
                <span className={`hidden lg:block text-[10px] tracking-[0.1em] uppercase transition-colors ${
                  i <= step ? 'text-foreground font-bold' : 'text-muted-foreground'
                }`}>
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px mx-1 hidden lg:block">
                  <div className={`h-full transition-colors ${i < step ? 'bg-primary' : 'bg-border'}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile stepper */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
            <p className="text-xs font-bold text-primary tracking-wider uppercase flex items-center gap-1.5">
              <span>{STEPS[step].emoji}</span> {STEPS[step].label}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Step description */}
        <div className="mt-3 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
          <p className="text-xs text-muted-foreground/80">{STEPS[step].desc}</p>
        </div>
      </div>

      {/* Step content with animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="glass-card p-5 sm:p-6 md:p-10"
        >
          {step === 0 && (
            <ArtistProfileStep
              accountId={accountId}
              artistProfileId={artistProfileId}
              onSaved={setArtistProfileId}
            />
          )}
          {step === 1 && (
            <ReleaseInfoStep
              accountId={accountId}
              artistProfileId={artistProfileId}
              releaseId={releaseId}
              onSaved={setReleaseId}
            />
          )}
          {step === 2 && releaseId && <TrackMetadataStep releaseId={releaseId} />}
          {step === 3 && releaseId && <FileUploadStep releaseId={releaseId} userId={userId} />}
          {step === 4 && releaseId && <PublishingSplitsStep releaseId={releaseId} />}
          {step === 5 && releaseId && <MasterOwnershipStep releaseId={releaseId} userId={userId} />}

          {/* Inline hints */}
          {step === 0 && !artistProfileId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10"
            >
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Save your artist profile to unlock the next step.</p>
            </motion.div>
          )}
          {step === 1 && !releaseId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10"
            >
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Save your release info to continue with tracks and uploads.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => goTo(Math.max(0, step - 1))}
          disabled={step === 0}
          className="gap-2 h-11"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => goTo(step + 1)}
            disabled={!canGoNext()}
            className="btn-primary gap-2 h-11"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleFinalSubmit}
            disabled={submitting}
            className="btn-primary gap-2 h-11"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Send className="w-4 h-4" /> Submit for Review</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionWizard;
