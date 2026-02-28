import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save, Copy, ChevronDown, ChevronUp } from 'lucide-react';

const VERSIONS = ['original', 'radio_edit', 'remix', 'instrumental', 'acoustic', 'live', 'deluxe'];
const GENRES = ['Hip-Hop/Rap', 'R&B/Soul', 'Pop', 'Rock', 'Electronic/Dance', 'Latin', 'Afrobeats', 'Country', 'Jazz', 'Other'];

type Track = {
  id?: string;
  track_number: number;
  title: string;
  version: string;
  isrc: string;
  is_explicit: boolean;
  genre: string;
  bpm: string;
  musical_key: string;
  language: string;
  lyrics: string;
  contributors: { full_legal_name: string; role: string }[];
};

const emptyTrack = (num: number): Track => ({
  track_number: num, title: '', version: 'original', isrc: '', is_explicit: false,
  genre: '', bpm: '', musical_key: '', language: 'English', lyrics: '',
  contributors: [{ full_legal_name: '', role: 'songwriter' }],
});

type Props = { releaseId: string };

const TrackMetadataStep = ({ releaseId }: Props) => {
  const [tracks, setTracks] = useState<Track[]>([emptyTrack(1)]);
  const [expanded, setExpanded] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: trackData } = await supabase
        .from('release_tracks')
        .select('*')
        .eq('release_id', releaseId)
        .order('track_number');

      if (trackData && trackData.length > 0) {
        const loadedTracks: Track[] = [];
        for (const t of trackData) {
          const { data: contribs } = await supabase.from('track_contributors').select('*').eq('track_id', t.id);
          loadedTracks.push({
            id: t.id,
            track_number: t.track_number,
            title: t.title || '',
            version: t.version || 'original',
            isrc: t.isrc || '',
            is_explicit: t.is_explicit || false,
            genre: t.genre || '',
            bpm: t.bpm?.toString() || '',
            musical_key: t.musical_key || '',
            language: t.language || 'English',
            lyrics: t.lyrics || '',
            contributors: contribs && contribs.length > 0
              ? contribs.map(c => ({ full_legal_name: c.full_legal_name, role: c.role }))
              : [{ full_legal_name: '', role: 'songwriter' }],
          });
        }
        setTracks(loadedTracks);
      }
      setLoaded(true);
    };
    load();
  }, [releaseId]);

  const updateTrack = (index: number, field: string, value: any) => {
    setTracks(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  };

  const addTrack = () => {
    setTracks(prev => [...prev, emptyTrack(prev.length + 1)]);
    setExpanded(tracks.length);
  };

  const duplicateTrack = (index: number) => {
    const copy = { ...tracks[index], id: undefined, track_number: tracks.length + 1, title: tracks[index].title + ' (copy)' };
    setTracks(prev => [...prev, copy]);
  };

  const removeTrack = (index: number) => {
    if (tracks.length <= 1) return;
    setTracks(prev => prev.filter((_, i) => i !== index).map((t, i) => ({ ...t, track_number: i + 1 })));
    if (expanded >= tracks.length - 1) setExpanded(Math.max(0, expanded - 1));
  };

  const updateContributor = (tIdx: number, cIdx: number, field: string, value: string) => {
    setTracks(prev => prev.map((t, i) => {
      if (i !== tIdx) return t;
      const contribs = [...t.contributors];
      contribs[cIdx] = { ...contribs[cIdx], [field]: value };
      return { ...t, contributors: contribs };
    }));
  };

  const addContributor = (tIdx: number) => {
    setTracks(prev => prev.map((t, i) => i === tIdx ? { ...t, contributors: [...t.contributors, { full_legal_name: '', role: 'songwriter' }] } : t));
  };

  const removeContributor = (tIdx: number, cIdx: number) => {
    setTracks(prev => prev.map((t, i) => {
      if (i !== tIdx || t.contributors.length <= 1) return t;
      return { ...t, contributors: t.contributors.filter((_, ci) => ci !== cIdx) };
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const track of tracks) {
        const payload = {
          release_id: releaseId,
          track_number: track.track_number,
          title: track.title.trim(),
          version: track.version as any,
          isrc: track.isrc.trim() || null,
          is_explicit: track.is_explicit,
          genre: track.genre || null,
          bpm: track.bpm ? parseInt(track.bpm) : null,
          musical_key: track.musical_key || null,
          language: track.language || 'English',
          lyrics: track.lyrics.trim() || null,
        };

        let trackId = track.id;
        if (trackId) {
          const { error } = await supabase.from('release_tracks').update(payload).eq('id', trackId);
          if (error) throw error;
        } else {
          const { data, error } = await supabase.from('release_tracks').insert(payload).select('id').single();
          if (error) throw error;
          trackId = data.id;
          track.id = trackId;
        }

        // Save contributors — delete old, insert new
        await supabase.from('track_contributors').delete().eq('track_id', trackId);
        const validContribs = track.contributors.filter(c => c.full_legal_name.trim());
        if (validContribs.length > 0) {
          const { error } = await supabase.from('track_contributors').insert(
            validContribs.map(c => ({ track_id: trackId!, full_legal_name: c.full_legal_name.trim(), role: c.role as any }))
          );
          if (error) throw error;
        }
      }
      toast.success('Tracks saved');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save tracks');
    } finally {
      setSaving(false);
    }
  };

  const fieldLabel = (text: string) => (
    <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{text}</label>
  );

  if (!loaded) return <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl mb-1">Track Metadata</h2>
          <p className="text-muted-foreground text-sm">Add details for each track on the release.</p>
        </div>
        <Button variant="outline" onClick={addTrack} className="gap-2 text-xs">
          <Plus className="w-3.5 h-3.5" /> Add Track
        </Button>
      </div>

      <div className="space-y-3">
        {tracks.map((track, tIdx) => (
          <div key={tIdx} className="glass-card overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === tIdx ? -1 : tIdx)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-xl text-primary">{String(track.track_number).padStart(2, '0')}</span>
                <span className="text-sm font-medium">{track.title || 'Untitled Track'}</span>
              </div>
              {expanded === tIdx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded === tIdx && (
              <div className="px-4 pb-5 space-y-5 border-t border-border pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>{fieldLabel('Track Title')}<Input value={track.title} onChange={e => updateTrack(tIdx, 'title', e.target.value)} placeholder="Track title" className="bg-secondary/50" /></div>
                  <div>
                    {fieldLabel('Version')}
                    <select value={track.version} onChange={e => updateTrack(tIdx, 'version', e.target.value)} className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm">
                      {VERSIONS.map(v => <option key={v} value={v}>{v.replace('_', ' ')}</option>)}
                    </select>
                  </div>
                  <div>{fieldLabel('ISRC (optional)')}<Input value={track.isrc} onChange={e => updateTrack(tIdx, 'isrc', e.target.value)} placeholder="Auto-generated" className="bg-secondary/50" /></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    {fieldLabel('Genre')}
                    <select value={track.genre} onChange={e => updateTrack(tIdx, 'genre', e.target.value)} className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm">
                      <option value="">Select</option>
                      {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>{fieldLabel('BPM')}<Input value={track.bpm} onChange={e => updateTrack(tIdx, 'bpm', e.target.value)} placeholder="120" className="bg-secondary/50" /></div>
                  <div>{fieldLabel('Key')}<Input value={track.musical_key} onChange={e => updateTrack(tIdx, 'musical_key', e.target.value)} placeholder="C Major" className="bg-secondary/50" /></div>
                  <div>{fieldLabel('Language')}<Input value={track.language} onChange={e => updateTrack(tIdx, 'language', e.target.value)} placeholder="English" className="bg-secondary/50" /></div>
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={track.is_explicit} onChange={e => updateTrack(tIdx, 'is_explicit', e.target.checked)} className="w-4 h-4 accent-primary" />
                  <span className="text-sm">Explicit content</span>
                </div>

                <div>
                  {fieldLabel('Lyrics')}
                  <Textarea value={track.lyrics} onChange={e => updateTrack(tIdx, 'lyrics', e.target.value)} placeholder="Paste lyrics here..." rows={4} className="bg-secondary/50" />
                </div>

                {/* Contributors */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">Contributors</p>
                    <button onClick={() => addContributor(tIdx)} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  </div>
                  <div className="space-y-2">
                    {track.contributors.map((c, cIdx) => (
                      <div key={cIdx} className="flex gap-2 items-center">
                        <Input value={c.full_legal_name} onChange={e => updateContributor(tIdx, cIdx, 'full_legal_name', e.target.value)} placeholder="Full legal name" className="bg-secondary/50 flex-1" />
                        <select value={c.role} onChange={e => updateContributor(tIdx, cIdx, 'role', e.target.value)} className="h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm w-40">
                          {['songwriter', 'producer', 'composer', 'lyricist', 'performer', 'featured_artist'].map(r => (
                            <option key={r} value={r}>{r.replace('_', ' ')}</option>
                          ))}
                        </select>
                        <button onClick={() => removeContributor(tIdx, cIdx)} className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <button onClick={() => duplicateTrack(tIdx)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><Copy className="w-3 h-3" /> Duplicate</button>
                  {tracks.length > 1 && (
                    <button onClick={() => removeTrack(tIdx)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save All Tracks</>}
      </Button>
    </div>
  );
};

export default TrackMetadataStep;
