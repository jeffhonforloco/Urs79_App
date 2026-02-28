import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const GENRES = [
  'Hip-Hop/Rap', 'R&B/Soul', 'Pop', 'Rock', 'Electronic/Dance', 'Latin',
  'Afrobeats', 'Country', 'Jazz', 'Classical', 'Reggae', 'Gospel', 'Alternative', 'Other',
];

const PRO_LIST = ['BMI', 'ASCAP', 'SESAC', 'PRS', 'SOCAN', 'GEMA', 'SACEM', 'APRA AMCOS', 'Other', 'None'];

type Props = {
  accountId: string;
  artistProfileId: string | null;
  onSaved: (id: string) => void;
};

const ArtistProfileStep = ({ accountId, artistProfileId, onSaved }: Props) => {
  const [form, setForm] = useState({
    stage_name: '', legal_name: '', date_of_birth: '', country: '',
    primary_genre: '', secondary_genre: '', bio: '',
    spotify_url: '', apple_music_url: '', instagram_url: '', tiktok_url: '', youtube_url: '',
    isni: '', has_existing_distributor: false, pro_affiliation: '', ipi_number: '',
  });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (artistProfileId) {
      supabase
        .from('submission_artist_profiles')
        .select('*')
        .eq('id', artistProfileId)
        .single()
        .then(({ data }) => {
          if (data) {
            setForm({
              stage_name: data.stage_name || '',
              legal_name: data.legal_name || '',
              date_of_birth: data.date_of_birth || '',
              country: data.country || '',
              primary_genre: data.primary_genre || '',
              secondary_genre: data.secondary_genre || '',
              bio: data.bio || '',
              spotify_url: data.spotify_url || '',
              apple_music_url: data.apple_music_url || '',
              instagram_url: data.instagram_url || '',
              tiktok_url: data.tiktok_url || '',
              youtube_url: data.youtube_url || '',
              isni: data.isni || '',
              has_existing_distributor: data.has_existing_distributor || false,
              pro_affiliation: data.pro_affiliation || '',
              ipi_number: data.ipi_number || '',
            });
          }
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  }, [artistProfileId]);

  const update = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }));
  const fieldLabel = (text: string, required = false) => (
    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
      {text} {required && <span className="text-primary">*</span>}
    </label>
  );

  const handleSave = async () => {
    if (!form.stage_name.trim() || !form.legal_name.trim()) {
      toast.error('Stage name and legal name are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        account_id: accountId,
        stage_name: form.stage_name.trim(),
        legal_name: form.legal_name.trim(),
        date_of_birth: form.date_of_birth || null,
        country: form.country || null,
        primary_genre: form.primary_genre || null,
        secondary_genre: form.secondary_genre || null,
        bio: form.bio.trim() || null,
        spotify_url: form.spotify_url.trim() || null,
        apple_music_url: form.apple_music_url.trim() || null,
        instagram_url: form.instagram_url.trim() || null,
        tiktok_url: form.tiktok_url.trim() || null,
        youtube_url: form.youtube_url.trim() || null,
        isni: form.isni.trim() || null,
        has_existing_distributor: form.has_existing_distributor,
        pro_affiliation: form.pro_affiliation || null,
        ipi_number: form.ipi_number.trim() || null,
      };

      if (artistProfileId) {
        const { error } = await supabase.from('submission_artist_profiles').update(payload).eq('id', artistProfileId);
        if (error) throw error;
        toast.success('Profile updated');
        onSaved(artistProfileId);
      } else {
        const { data, error } = await supabase.from('submission_artist_profiles').insert(payload).select('id').single();
        if (error) throw error;
        toast.success('Profile saved');
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
        <h2 className="font-display text-2xl mb-1">Artist Profile</h2>
        <p className="text-muted-foreground text-sm">Enter the primary artist information for this submission.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>{fieldLabel('Stage Name', true)}<Input value={form.stage_name} onChange={e => update('stage_name', e.target.value)} placeholder="Artist Name" className="bg-secondary/50" /></div>
        <div>{fieldLabel('Legal Name', true)}<Input value={form.legal_name} onChange={e => update('legal_name', e.target.value)} placeholder="Full Legal Name" className="bg-secondary/50" /></div>
        <div>{fieldLabel('Date of Birth')}<Input type="date" value={form.date_of_birth} onChange={e => update('date_of_birth', e.target.value)} className="bg-secondary/50" /></div>
        <div>{fieldLabel('Country')}<Input value={form.country} onChange={e => update('country', e.target.value)} placeholder="Country" className="bg-secondary/50" /></div>
        <div>
          {fieldLabel('Primary Genre')}
          <select value={form.primary_genre} onChange={e => update('primary_genre', e.target.value)} className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm">
            <option value="">Select genre</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          {fieldLabel('Secondary Genre')}
          <select value={form.secondary_genre} onChange={e => update('secondary_genre', e.target.value)} className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm">
            <option value="">Select genre</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div>
        {fieldLabel('Artist Bio')}
        <Textarea value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="Tell us about the artist..." rows={4} className="bg-secondary/50" />
      </div>

      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">Social Links</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>{fieldLabel('Spotify')}<Input value={form.spotify_url} onChange={e => update('spotify_url', e.target.value)} placeholder="https://open.spotify.com/artist/..." className="bg-secondary/50" /></div>
          <div>{fieldLabel('Apple Music')}<Input value={form.apple_music_url} onChange={e => update('apple_music_url', e.target.value)} placeholder="https://music.apple.com/..." className="bg-secondary/50" /></div>
          <div>{fieldLabel('Instagram')}<Input value={form.instagram_url} onChange={e => update('instagram_url', e.target.value)} placeholder="https://instagram.com/..." className="bg-secondary/50" /></div>
          <div>{fieldLabel('TikTok')}<Input value={form.tiktok_url} onChange={e => update('tiktok_url', e.target.value)} placeholder="https://tiktok.com/@..." className="bg-secondary/50" /></div>
          <div>{fieldLabel('YouTube')}<Input value={form.youtube_url} onChange={e => update('youtube_url', e.target.value)} placeholder="https://youtube.com/..." className="bg-secondary/50" /></div>
        </div>
      </div>

      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">Publishing & Rights</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>{fieldLabel('ISNI (Optional)')}<Input value={form.isni} onChange={e => update('isni', e.target.value)} placeholder="0000 0000 0000 0000" className="bg-secondary/50" /></div>
          <div>
            {fieldLabel('PRO Affiliation')}
            <select value={form.pro_affiliation} onChange={e => update('pro_affiliation', e.target.value)} className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm">
              <option value="">Select PRO</option>
              {PRO_LIST.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>{fieldLabel('IPI Number')}<Input value={form.ipi_number} onChange={e => update('ipi_number', e.target.value)} placeholder="00000000000" className="bg-secondary/50" /></div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" checked={form.has_existing_distributor} onChange={e => update('has_existing_distributor', e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm">Currently signed with a distributor</span>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Profile</>}
      </Button>
    </div>
  );
};

export default ArtistProfileStep;
