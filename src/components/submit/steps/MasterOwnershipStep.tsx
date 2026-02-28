import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Upload, Check, Shield } from 'lucide-react';

type Props = { releaseId: string; userId: string };

const MasterOwnershipStep = ({ releaseId, userId }: Props) => {
  const [form, setForm] = useState({
    master_owner: '',
    ownership_percentage: '100',
    is_cover: false,
    mechanical_license_url: null as string | null,
    has_samples: false,
    sample_clearance_url: null as string | null,
    rights_confirmed: false,
  });
  const [existingId, setExistingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const mechRef = useRef<HTMLInputElement>(null);
  const sampleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase
      .from('master_declarations')
      .select('*')
      .eq('release_id', releaseId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setExistingId(data.id);
          setForm({
            master_owner: data.master_owner || '',
            ownership_percentage: data.ownership_percentage?.toString() || '100',
            is_cover: data.is_cover || false,
            mechanical_license_url: data.mechanical_license_url,
            has_samples: data.has_samples || false,
            sample_clearance_url: data.sample_clearance_url,
            rights_confirmed: data.rights_confirmed || false,
          });
        }
        setLoaded(true);
      });
  }, [releaseId]);

  const update = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }));

  const handleFileUpload = async (file: File, type: 'mechanical' | 'sample') => {
    setUploading(type);
    try {
      const ext = file.name.split('.').pop();
      const path = `${userId}/${releaseId}/docs/${type}-license.${ext}`;
      const { error } = await supabase.storage.from('submissions').upload(path, file, { upsert: true });
      if (error) throw error;

      if (type === 'mechanical') update('mechanical_license_url', path);
      else update('sample_clearance_url', path);
      toast.success('Document uploaded');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    if (!form.master_owner.trim()) { toast.error('Master owner is required'); return; }
    if (!form.rights_confirmed) { toast.error('You must confirm you control the necessary rights'); return; }

    setSaving(true);
    try {
      const payload = {
        release_id: releaseId,
        master_owner: form.master_owner.trim(),
        ownership_percentage: parseFloat(form.ownership_percentage) || 100,
        is_cover: form.is_cover,
        mechanical_license_url: form.mechanical_license_url,
        has_samples: form.has_samples,
        sample_clearance_url: form.sample_clearance_url,
        rights_confirmed: form.rights_confirmed,
      };

      if (existingId) {
        const { error } = await supabase.from('master_declarations').update(payload).eq('id', existingId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('master_declarations').insert(payload).select('id').single();
        if (error) throw error;
        setExistingId(data.id);
      }
      toast.success('Rights declaration saved');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const fieldLabel = (text: string, required = false) => (
    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
      {text} {required && <span className="text-primary">*</span>}
    </label>
  );

  if (!loaded) return <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-1">Rights & Ownership</h2>
        <p className="text-muted-foreground text-sm">Declare master ownership and confirm rights for distribution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {fieldLabel('Who owns the master?', true)}
          <Input value={form.master_owner} onChange={e => update('master_owner', e.target.value)} placeholder="Full legal name or entity" className="bg-secondary/50" />
        </div>
        <div>
          {fieldLabel('% Owned by Submitter', true)}
          <Input type="number" value={form.ownership_percentage} onChange={e => update('ownership_percentage', e.target.value)} min="0" max="100" className="bg-secondary/50" />
        </div>
      </div>

      {/* Cover song */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={form.is_cover} onChange={e => update('is_cover', e.target.checked)} className="w-4 h-4 accent-primary" />
          <span className="text-sm">This is a cover version</span>
        </div>
        {form.is_cover && (
          <div>
            {fieldLabel('Upload Mechanical License')}
            <div className="flex items-center gap-3">
              <button onClick={() => mechRef.current?.click()} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Upload className="w-3 h-3" /> {form.mechanical_license_url ? 'Replace' : 'Upload'}
              </button>
              {form.mechanical_license_url && <Check className="w-4 h-4 text-primary" />}
              {uploading === 'mechanical' && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
            </div>
            <input ref={mechRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'mechanical'); }} />
          </div>
        )}
      </div>

      {/* Samples */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={form.has_samples} onChange={e => update('has_samples', e.target.checked)} className="w-4 h-4 accent-primary" />
          <span className="text-sm">Contains samples from other recordings</span>
        </div>
        {form.has_samples && (
          <div>
            {fieldLabel('Upload Sample Clearance Documentation')}
            <div className="flex items-center gap-3">
              <button onClick={() => sampleRef.current?.click()} className="text-xs text-primary hover:underline flex items-center gap-1">
                <Upload className="w-3 h-3" /> {form.sample_clearance_url ? 'Replace' : 'Upload'}
              </button>
              {form.sample_clearance_url && <Check className="w-4 h-4 text-primary" />}
              {uploading === 'sample' && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
            </div>
            <input ref={sampleRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'sample'); }} />
          </div>
        )}
      </div>

      {/* Rights confirmation */}
      <div className="glass-card p-5 border-primary/20">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.rights_confirmed}
            onChange={e => update('rights_confirmed', e.target.checked)}
            className="w-5 h-5 accent-primary mt-0.5"
          />
          <div>
            <p className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Rights Confirmation
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              I confirm that I control all rights necessary for distribution of this release, including master recording rights, publishing rights, and any applicable mechanical licenses or sample clearances.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Declaration</>}
      </Button>
    </div>
  );
};

export default MasterOwnershipStep;
