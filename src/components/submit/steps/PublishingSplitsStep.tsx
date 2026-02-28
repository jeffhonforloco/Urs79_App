import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Plus, Trash2, AlertTriangle } from 'lucide-react';

const PRO_LIST = ['BMI', 'ASCAP', 'SESAC', 'PRS', 'SOCAN', 'GEMA', 'SACEM', 'APRA AMCOS', 'Other', 'None'];

type Split = {
  songwriter_legal_name: string;
  ownership_percentage: string;
  publisher_name: string;
  pro_affiliation: string;
  ipi_number: string;
  owns_mechanical_rights: boolean;
  admin_rights_to_urs79: boolean;
};

type TrackSplits = {
  trackId: string;
  trackTitle: string;
  trackNumber: number;
  splits: Split[];
};

type Props = { releaseId: string };

const emptySplit = (): Split => ({
  songwriter_legal_name: '', ownership_percentage: '100',
  publisher_name: '', pro_affiliation: '', ipi_number: '',
  owns_mechanical_rights: false, admin_rights_to_urs79: false,
});

const PublishingSplitsStep = ({ releaseId }: Props) => {
  const [trackSplits, setTrackSplits] = useState<TrackSplits[]>([]);
  const [activeTrack, setActiveTrack] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: tracks } = await supabase
        .from('release_tracks')
        .select('id, title, track_number')
        .eq('release_id', releaseId)
        .order('track_number');

      if (tracks) {
        const result: TrackSplits[] = [];
        for (const t of tracks) {
          const { data: splits } = await supabase
            .from('publishing_splits')
            .select('*')
            .eq('track_id', t.id);

          result.push({
            trackId: t.id,
            trackTitle: t.title || `Track ${t.track_number}`,
            trackNumber: t.track_number,
            splits: splits && splits.length > 0
              ? splits.map(s => ({
                  songwriter_legal_name: s.songwriter_legal_name,
                  ownership_percentage: s.ownership_percentage.toString(),
                  publisher_name: s.publisher_name || '',
                  pro_affiliation: s.pro_affiliation || '',
                  ipi_number: s.ipi_number || '',
                  owns_mechanical_rights: s.owns_mechanical_rights || false,
                  admin_rights_to_urs79: s.admin_rights_to_urs79 || false,
                }))
              : [emptySplit()],
          });
        }
        setTrackSplits(result);
      }
      setLoaded(true);
    };
    load();
  }, [releaseId]);

  const updateSplit = (tIdx: number, sIdx: number, field: string, value: any) => {
    setTrackSplits(prev => prev.map((t, i) => {
      if (i !== tIdx) return t;
      const splits = [...t.splits];
      splits[sIdx] = { ...splits[sIdx], [field]: value };
      return { ...t, splits };
    }));
  };

  const addSplit = (tIdx: number) => {
    setTrackSplits(prev => prev.map((t, i) => i === tIdx ? { ...t, splits: [...t.splits, emptySplit()] } : t));
  };

  const removeSplit = (tIdx: number, sIdx: number) => {
    setTrackSplits(prev => prev.map((t, i) => {
      if (i !== tIdx || t.splits.length <= 1) return t;
      return { ...t, splits: t.splits.filter((_, si) => si !== sIdx) };
    }));
  };

  const getTotal = (tIdx: number) =>
    trackSplits[tIdx]?.splits.reduce((sum, s) => sum + (parseFloat(s.ownership_percentage) || 0), 0) || 0;

  const handleSave = async () => {
    // Validate totals
    for (const ts of trackSplits) {
      const total = ts.splits.reduce((s, sp) => s + (parseFloat(sp.ownership_percentage) || 0), 0);
      if (Math.abs(total - 100) > 0.01) {
        toast.error(`Splits for "${ts.trackTitle}" must total 100% (currently ${total}%)`);
        return;
      }
    }

    setSaving(true);
    try {
      for (const ts of trackSplits) {
        await supabase.from('publishing_splits').delete().eq('track_id', ts.trackId);
        const validSplits = ts.splits.filter(s => s.songwriter_legal_name.trim());
        if (validSplits.length > 0) {
          const { error } = await supabase.from('publishing_splits').insert(
            validSplits.map(s => ({
              track_id: ts.trackId,
              songwriter_legal_name: s.songwriter_legal_name.trim(),
              ownership_percentage: parseFloat(s.ownership_percentage) || 0,
              publisher_name: s.publisher_name.trim() || null,
              pro_affiliation: s.pro_affiliation || null,
              ipi_number: s.ipi_number.trim() || null,
              owns_mechanical_rights: s.owns_mechanical_rights,
              admin_rights_to_urs79: s.admin_rights_to_urs79,
            }))
          );
          if (error) throw error;
        }
      }
      toast.success('Publishing splits saved');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const fieldLabel = (text: string) => (
    <label className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">{text}</label>
  );

  if (!loaded) return <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  if (trackSplits.length === 0) return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">No tracks added yet. Please add tracks first.</p>
    </div>
  );

  const current = trackSplits[activeTrack];
  const total = getTotal(activeTrack);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl mb-1">Publishing & Splits</h2>
        <p className="text-muted-foreground text-sm">Define ownership percentages for each track. Each track must total 100%.</p>
      </div>

      {/* Track tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {trackSplits.map((ts, i) => (
          <button
            key={ts.trackId}
            onClick={() => setActiveTrack(i)}
            className={`flex-shrink-0 glass-card px-4 py-2 text-xs tracking-[0.1em] uppercase transition-all ${
              i === activeTrack ? 'border-primary/40 bg-primary/5 text-primary' : ''
            }`}
          >
            {String(ts.trackNumber).padStart(2, '0')} · {ts.trackTitle}
          </button>
        ))}
      </div>

      {/* Total indicator */}
      <div className={`flex items-center gap-2 text-sm ${Math.abs(total - 100) < 0.01 ? 'text-primary' : 'text-destructive'}`}>
        {Math.abs(total - 100) > 0.01 && <AlertTriangle className="w-4 h-4" />}
        Total: {total}%
      </div>

      {/* Splits for active track */}
      <div className="space-y-4">
        {current.splits.map((split, sIdx) => (
          <div key={sIdx} className="glass-card p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>{fieldLabel('Songwriter Legal Name')}<Input value={split.songwriter_legal_name} onChange={e => updateSplit(activeTrack, sIdx, 'songwriter_legal_name', e.target.value)} placeholder="Full legal name" className="bg-secondary/50" /></div>
              <div>{fieldLabel('Ownership %')}<Input type="number" value={split.ownership_percentage} onChange={e => updateSplit(activeTrack, sIdx, 'ownership_percentage', e.target.value)} placeholder="50" min="0" max="100" step="0.01" className="bg-secondary/50" /></div>
              <div>{fieldLabel('Publisher')}<Input value={split.publisher_name} onChange={e => updateSplit(activeTrack, sIdx, 'publisher_name', e.target.value)} placeholder="Publisher name" className="bg-secondary/50" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                {fieldLabel('PRO')}
                <select value={split.pro_affiliation} onChange={e => updateSplit(activeTrack, sIdx, 'pro_affiliation', e.target.value)} className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm">
                  <option value="">Select PRO</option>
                  {PRO_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>{fieldLabel('IPI Number')}<Input value={split.ipi_number} onChange={e => updateSplit(activeTrack, sIdx, 'ipi_number', e.target.value)} placeholder="00000000000" className="bg-secondary/50" /></div>
              <div className="flex items-end gap-4 pb-2">
                <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={split.owns_mechanical_rights} onChange={e => updateSplit(activeTrack, sIdx, 'owns_mechanical_rights', e.target.checked)} className="accent-primary" /> Mechanical Rights</label>
                <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={split.admin_rights_to_urs79} onChange={e => updateSplit(activeTrack, sIdx, 'admin_rights_to_urs79', e.target.checked)} className="accent-primary" /> Admin to URS79</label>
              </div>
            </div>
            {current.splits.length > 1 && (
              <button onClick={() => removeSplit(activeTrack, sIdx)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => addSplit(activeTrack)} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add Songwriter</button>

      <Button onClick={handleSave} disabled={saving} className="btn-primary gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Splits</>}
      </Button>
    </div>
  );
};

export default PublishingSplitsStep;
