import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ACCOUNT_TYPES = [
  { value: 'independent_artist', label: 'Independent Artist' },
  { value: 'indie_label', label: 'Indie Label' },
  { value: 'artist_representative', label: 'Artist Representative / Manager' },
  { value: 'distributor_partner', label: 'Distributor Partner' },
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

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_legal_name.trim()) {
      toast.error('Full legal name is required');
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
      toast.success('Account created!');
      onComplete(data.id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create account');
    } finally {
      setSaving(false);
    }
  };

  const fieldLabel = (text: string, required = false) => (
    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
      {text} {required && <span className="text-primary">*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-muted-foreground text-sm mb-6">
        Tell us about yourself. This information helps us manage your submissions and royalties.
      </p>

      <div>
        {fieldLabel('Account Type', true)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ACCOUNT_TYPES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => update('account_type', t.value)}
              className={`glass-card p-4 text-left text-sm transition-all ${
                form.account_type === t.value
                  ? 'border-primary/40 bg-primary/5'
                  : ''
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {fieldLabel('Full Legal Name', true)}
          <Input value={form.full_legal_name} onChange={e => update('full_legal_name', e.target.value)} placeholder="John Doe" className="bg-secondary/50" />
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
          <Input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 555 123 4567" className="bg-secondary/50" />
        </div>
        <div>
          {fieldLabel('Country')}
          <select
            value={form.country}
            onChange={e => update('country', e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm"
          >
            <option value="">Select country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <Button type="submit" disabled={saving} className="btn-primary gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Continue</>}
      </Button>
    </form>
  );
};

export default AccountSetupStep;
