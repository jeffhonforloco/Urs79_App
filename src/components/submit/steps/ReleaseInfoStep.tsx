import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

type Props = {
  accountId: string;
  artistProfileId: string | null;
  releaseId: string | null;
  onSaved: (id: string) => void;
};

const ReleaseInfoStep = ({ accountId, artistProfileId, releaseId, onSaved }: Props) => {
  const [form, setForm] = useState({
    release_type: 'single' as 'single' | 'ep' | 'album',
    title: '', primary_artist: '', featured_artists: '',
    release_date: '', original_release_date: '', language: 'English',
    parental_advisory: false, label_name: 'URS79', upc: '',
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (releaseId) {
      supabase.from('submission_releases').select('*').eq('id', releaseId).single().then(({ data }) => {
        if (data) {
          setForm({
            release_type: (data.release_type as any) || 'single',
            title: data.title || '',
            primary_artist: data.primary_artist || '',
            featured_artists: data.featured_artists || '',
            release_date: data.release_date || '',
            original_release_date: data.original_release_date || '',
            language: data.language || 'English',
            parental_advisory: data.parental_advisory || false,
            label_name: data.label_name || 'URS79',
            upc: data.upc || '',
          });
        }
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, [releaseId]);

  const update = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }));
  const fieldLabel = (text: string, required = false) => (
    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
      {text} {required && <span className="text-primary">*</span>}
    </label>
  );

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Release title is required'); return; }
    setSaving(true);
    try {
      const payload = {
        account_id: accountId,
        artist_profile_id: artistProfileId,
        release_type: form.release_type as any,
        title: form.title.trim(),
        primary_artist: form.primary_artist.trim() || null,
        featured_artists: form.featured_artists.trim() || null,
        release_date: form.release_date || null,
        original_release_date: form.original_release_date || null,
        language: form.language || 'English',
        parental_advisory: form.parental_advisory,
        label_name: form.label_name.trim() || 'URS79',
        upc: form.upc.trim() || null,
      };

      if (releaseId) {
        const { error } = await supabase.from('submission_releases').update(payload).eq('id', releaseId);
        if (error) throw error;
        toast.success('Release info updated');
        onSaved(releaseId);
      } else {
        const { data, error } = await supabase.from('submission_releases').insert(payload).select('id').single();
        if (error) throw error;
        toast.success('Release created');
        onSaved(data.id);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-1">Release Information</h2>
        <p className="text-muted-foreground text-sm">Provide details about your release.</p>
      </div>

      <div>
        {fieldLabel('Release Type', true)}
        <div className="flex gap-2">
          {(['single', 'ep', 'album'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => update('release_type', t)}
              className={`glass-card px-6 py-3 text-sm uppercase tracking-[0.15em] transition-all ${
                form.release_type === t ? 'border-primary/40 bg-primary/5 text-primary' : ''
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>{fieldLabel('Release Title', true)}<Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="My Album Title" className="bg-secondary/50" /></div>
        <div>{fieldLabel('Primary Artist')}<Input value={form.primary_artist} onChange={e => update('primary_artist', e.target.value)} placeholder="Artist Name" className="bg-secondary/50" /></div>
        <div>{fieldLabel('Featured Artists')}<Input value={form.featured_artists} onChange={e => update('featured_artists', e.target.value)} placeholder="Feat. Artist 1, Artist 2" className="bg-secondary/50" /></div>
        <div>{fieldLabel('Language')}<Input value={form.language} onChange={e => update('language', e.target.value)} placeholder="English" className="bg-secondary/50" /></div>
        <div>{fieldLabel('Release Date')}<Input type="date" value={form.release_date} onChange={e => update('release_date', e.target.value)} className="bg-secondary/50" /></div>
        <div>{fieldLabel('Original Release Date (if re-release)')}<Input type="date" value={form.original_release_date} onChange={e => update('original_release_date', e.target.value)} className="bg-secondary/50" /></div>
        <div>{fieldLabel('Label Name')}<Input value={form.label_name} onChange={e => update('label_name', e.target.value)} placeholder="URS79" className="bg-secondary/50" /></div>
        <div>{fieldLabel('UPC (leave blank to auto-generate)')}<Input value={form.upc} onChange={e => update('upc', e.target.value)} placeholder="Auto-generated" className="bg-secondary/50" /></div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" checked={form.parental_advisory} onChange={e => update('parental_advisory', e.target.checked)} className="w-4 h-4 accent-primary" />
        <span className="text-sm">Contains explicit content (Parental Advisory)</span>
      </div>

      <Button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Release Info</>}
      </Button>
    </div>
  );
};

export default ReleaseInfoStep;
