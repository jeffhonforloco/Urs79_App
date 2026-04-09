import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, ChevronLeft, ChevronRight, Send, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtistProfileStep from './steps/ArtistProfileStep';
import ReleaseInfoStep from './steps/ReleaseInfoStep';
import TrackMetadataStep from './steps/TrackMetadataStep';
import FileUploadStep from './steps/FileUploadStep';
import PublishingSplitsStep from './steps/PublishingSplitsStep';
import MasterOwnershipStep from './steps/MasterOwnershipStep';

const STEPS = [
  { num: 1, label: 'Artist Profile', desc: 'Your artist identity & social presence' },
  { num: 2, label: 'Release Info', desc: 'Release type, title, date & metadata' },
  { num: 3, label: 'Track Metadata', desc: 'Song details, credits & contributors' },
  { num: 4, label: 'File Upload', desc: 'Audio files & cover artwork' },
  { num: 5, label: 'Publishing & Splits', desc: 'Songwriting ownership & royalties' },
  { num: 6, label: 'Rights & Ownership', desc: 'Master rights & legal declarations' },
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

  const handleFinalSubmit = async () => {
    if (!releaseId) return;
    setSubmitting(true);
    try {
      const submissionCode = 'URS-' + Date.now().toString(36).toUpperCase();
      const { error } = await supabase
        .from('submission_releases')
        .update({
          status: 'submitted' as any,
          submitted_at: new Date().toISOString(),
          submission_id: submissionCode,
        })
        .eq('id', releaseId);
      if (error) throw error;
      toast.success(`Submission ${submissionCode} received! We'll review it shortly.`);
      setStep(0);
      setReleaseId(null);
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

  return (
    <div>
      {/* Progress stepper */}
      <div className="mb-8 sm:mb-10">
        {/* Desktop stepper */}
        <div className="hidden md:flex items-center justify-between mb-4">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => { if (i <= step) setStep(i); }}
              className={`flex items-center gap-2 group ${i <= step ? 'cursor-pointer' : 'cursor-default'}`}
              title={s.desc}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step
                  ? 'bg-primary text-primary-foreground'
                  : i === step
                    ? 'border-2 border-primary text-primary bg-primary/5'
                    : 'border border-border text-muted-foreground'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`hidden lg:block text-[10px] tracking-[0.12em] uppercase transition-colors ${
                i <= step ? 'text-foreground font-semibold' : 'text-muted-foreground'
              }`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile stepper - compact */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase">{STEPS[step].label}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step description */}
        <div className="mt-3 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
          <p className="text-xs text-muted-foreground/80">{STEPS[step].desc}</p>
        </div>
      </div>

      {/* Step content */}
      <div className="glass-card p-5 sm:p-6 md:p-10">
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
        {step === 2 && releaseId && (
          <TrackMetadataStep releaseId={releaseId} />
        )}
        {step === 3 && releaseId && (
          <FileUploadStep releaseId={releaseId} userId={userId} />
        )}
        {step === 4 && releaseId && (
          <PublishingSplitsStep releaseId={releaseId} />
        )}
        {step === 5 && releaseId && (
          <MasterOwnershipStep releaseId={releaseId} userId={userId} />
        )}

        {/* Missing data warnings */}
        {step === 0 && !artistProfileId && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">Save your artist profile to proceed to the next step.</p>
          </div>
        )}
        {step === 1 && !releaseId && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">Save your release information to continue with tracks and uploads.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="gap-2 h-11"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            onClick={() => setStep(step + 1)}
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
