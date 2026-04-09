import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, User, Users, Handshake } from 'lucide-react';
import { z } from 'zod';

const accountSchema = z.object({
  full_legal_name: z.string().trim().min(2, 'Legal name must be at least 2 characters').max(100),
  business_name: z.string().trim().max(100).optional(),
  stage_name: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  country: z.string().optional(),
});

const ACCOUNT_TYPES = [
  { value: 'independent_artist', label: 'Independent Artist', desc: 'Releasing music on your own', icon: User },
  { value: 'indie_label', label: 'Indie Label', desc: 'Managing multiple artists', icon: Building2 },
  { value: 'artist_representative', label: 'Manager / Rep', desc: 'Submitting on behalf of artists', icon: Users },
  { value: 'distributor_partner', label: 'Distributor Partner', desc: 'Distribution partnership', icon: Handshake },
];

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Japan', 'Brazil', 'Nigeria', 'South Africa', 'India', 'Mexico', 'Other',
];

type Props = { userId: string; onComplete: (accountId: string) => void };

const AccountSetupStep = ({ userId, onComplete }: Props) => {
  const [form, setForm] = useState({
    account_type: 'independent_artist',
    full_legal_name: '',
    business_name: '',
    stage_name: '',
    phone: '',
    country: '',
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = accountSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(i => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('submission_accounts')
        .insert({
          user_id: userId,
          account_type: form.account_type as any,
          full_legal_name: form.full_legal_name.trim(),
          business_name: form.business_name.trim() || null,
          stage_name: form.stage_name.trim() || null,
          phone: form.phone.trim() || null,
          country: form.country || null,
        })
        .select('id')
        .single();
      if (error) throw error;
      toast.success('Account created successfully!');
      onComplete(data.id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create account');
    } finally {
      setSaving(false);
    }
  };

  const fieldLabel = (text: string, required = false) => (
    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block font-medium">
      {text} {required && <span className="text-primary">*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account type */}
      <div>
        {fieldLabel('Account Type', true)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {ACCOUNT_TYPES.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => update('account_type', t.value)}
                className={`glass-card p-4 text-left transition-all flex items-start gap-3 ${
                  form.account_type === t.value
                    ? 'border-primary/40 bg-primary/5 ring-1 ring-primary/20'
                    : 'hover:border-border/80'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${form.account_type === t.value ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div>
          {fieldLabel('Full Legal Name', true)}
          <Input value={form.full_legal_name} onChange={e => update('full_legal_name', e.target.value)} placeholder="John Doe" className="bg-secondary/50" />
          {errors.full_legal_name && <p className="text-destructive text-xs mt-1">{errors.full_legal_name}</p>}
        </div>
        <div>
          {fieldLabel('Business Name')}
          <Input value={form.business_name} onChange={e => update('business_name', e.target.value)} placeholder="My Records LLC" className="bg-secondary/50" />
        </div>
        <div>
          {fieldLabel('Artist Stage Name')}
          <Input value={form.stage_name} onChange={e => update('stage_name', e.target.value)} placeholder="DJ Example" className="bg-secondary/50" />
        </div>
        <div>
          {fieldLabel('Phone Number')}
          <Input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 555 123 4567" type="tel" className="bg-secondary/50" />
        </div>
        <div>
          {fieldLabel('Country')}
          <select
            value={form.country}
            onChange={e => update('country', e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm text-foreground"
          >
            <option value="">Select country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <Button type="submit" disabled={saving} className="btn-primary gap-2 h-11 w-full sm:w-auto">
        {saving ? (
          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <>Continue to Submission <ArrowRight className="w-4 h-4" /></>
        )}
      </Button>
    </form>
  );
};

export default AccountSetupStep;
