import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

type Release = {
  id: string;
  title: string;
  slug: string;
  artist_name: string | null;
  release_type: string | null;
  cover_url: string | null;
  release_date: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  youtube_url: string | null;
  description: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
};

const emptyRelease = { title: '', slug: '', artist_name: '', release_type: 'single', cover_url: '', release_date: '', spotify_url: '', apple_music_url: '', youtube_url: '', description: '', is_featured: false, is_published: false };

const AdminReleases = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [editing, setEditing] = useState<Partial<Release> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => { const { data } = await supabase.from('releases').select('*').order('created_at', { ascending: false }); setReleases(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) { toast.error('Title and slug required'); return; }
    try {
      const payload = { ...editing, release_date: editing.release_date || null };
      if (editing.id) {
        const { error } = await supabase.from('releases').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('releases').insert([payload as any]);
        if (error) throw error;
      }
      toast.success('Saved'); setEditing(null); fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('releases').delete().eq('id', id); toast.success('Deleted'); fetchData(); };

  if (editing) {
    return (
      <div className="p-8 max-w-3xl">
        <h2 className="font-display text-3xl mb-6">{editing.id ? 'EDIT' : 'NEW'} RELEASE</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Title</label><Input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Slug</label><Input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Artist</label><Input value={editing.artist_name || ''} onChange={e => setEditing({ ...editing, artist_name: e.target.value })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Type</label>
              <select value={editing.release_type || 'single'} onChange={e => setEditing({ ...editing, release_type: e.target.value })} className="w-full h-10 px-3 bg-secondary border border-border text-foreground text-sm rounded">
                <option value="single">Single</option><option value="ep">EP</option><option value="album">Album</option><option value="compilation">Compilation</option>
              </select>
            </div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Release Date</label><Input type="date" value={editing.release_date || ''} onChange={e => setEditing({ ...editing, release_date: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Description</label><Textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} className="bg-secondary border-border" rows={3} /></div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Cover URL</label><Input value={editing.cover_url || ''} onChange={e => setEditing({ ...editing, cover_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Spotify</label><Input value={editing.spotify_url || ''} onChange={e => setEditing({ ...editing, spotify_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Apple Music</label><Input value={editing.apple_music_url || ''} onChange={e => setEditing({ ...editing, apple_music_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">YouTube</label><Input value={editing.youtube_url || ''} onChange={e => setEditing({ ...editing, youtube_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={!!editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} className="accent-primary" /> Featured</label>
            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={!!editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="accent-primary" /> Published</label>
          </div>
          <div className="flex gap-3 pt-4"><button onClick={handleSave} className="btn-primary">Save</button><button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl">RELEASES</h2>
        <button onClick={() => setEditing(emptyRelease)} className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Release</button>
      </div>
      {loading ? <p className="text-muted-foreground">Loading...</p> : releases.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted-foreground mb-4">No releases yet</p><button onClick={() => setEditing(emptyRelease)} className="btn-primary text-sm">Add First Release</button></div>
      ) : (
        <div className="space-y-2">{releases.map(r => (
          <div key={r.id} className="glass-card p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0"><h3 className="font-medium text-sm">{r.title}</h3><p className="text-xs text-muted-foreground">{r.artist_name} · {r.release_type}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={async () => { await supabase.from('releases').update({ is_published: !r.is_published }).eq('id', r.id); fetchData(); }} className="p-2 hover:bg-secondary rounded">{r.is_published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
              <button onClick={() => setEditing(r)} className="p-2 hover:bg-secondary rounded"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(r.id)} className="p-2 hover:bg-secondary rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}</div>
      )}
    </div>
  );
};

export default AdminReleases;
