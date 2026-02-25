import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

type Artist = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  photo_url: string | null;
  genre: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  instagram_url: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
};

const emptyArtist = { name: '', slug: '', bio: '', photo_url: '', genre: '', spotify_url: '', apple_music_url: '', instagram_url: '', is_featured: false, is_published: false };

const AdminArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [editing, setEditing] = useState<Partial<Artist> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => { const { data } = await supabase.from('artists').select('*').order('sort_order'); setArtists(data || []); setLoading(false); };
  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!editing?.name || !editing?.slug) { toast.error('Name and slug required'); return; }
    try {
      if (editing.id) {
        const { error } = await supabase.from('artists').update(editing).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('artists').insert([editing as any]);
        if (error) throw error;
      }
      toast.success('Saved');
      setEditing(null);
      fetch();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('artists').delete().eq('id', id); toast.success('Deleted'); fetch(); };

  if (editing) {
    return (
      <div className="p-8 max-w-3xl">
        <h2 className="font-display text-3xl mb-6">{editing.id ? 'EDIT' : 'NEW'} ARTIST</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Name</label><Input value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Slug</label><Input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Genre</label><Input value={editing.genre || ''} onChange={e => setEditing({ ...editing, genre: e.target.value })} className="bg-secondary border-border h-10" /></div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Bio</label><Textarea value={editing.bio || ''} onChange={e => setEditing({ ...editing, bio: e.target.value })} className="bg-secondary border-border" rows={4} /></div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Photo URL</label><Input value={editing.photo_url || ''} onChange={e => setEditing({ ...editing, photo_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Spotify</label><Input value={editing.spotify_url || ''} onChange={e => setEditing({ ...editing, spotify_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Apple Music</label><Input value={editing.apple_music_url || ''} onChange={e => setEditing({ ...editing, apple_music_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Instagram</label><Input value={editing.instagram_url || ''} onChange={e => setEditing({ ...editing, instagram_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
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
        <h2 className="font-display text-3xl">ARTISTS</h2>
        <button onClick={() => setEditing(emptyArtist)} className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Artist</button>
      </div>
      {loading ? <p className="text-muted-foreground">Loading...</p> : artists.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted-foreground mb-4">No artists yet</p><button onClick={() => setEditing(emptyArtist)} className="btn-primary text-sm">Add First Artist</button></div>
      ) : (
        <div className="space-y-2">{artists.map(a => (
          <div key={a.id} className="glass-card p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0"><h3 className="font-medium text-sm">{a.name}</h3><p className="text-xs text-muted-foreground">{a.genre || 'No genre'}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={async () => { await supabase.from('artists').update({ is_published: !a.is_published }).eq('id', a.id); fetch(); }} className="p-2 hover:bg-secondary rounded">{a.is_published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
              <button onClick={() => setEditing(a)} className="p-2 hover:bg-secondary rounded"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(a.id)} className="p-2 hover:bg-secondary rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}</div>
      )}
    </div>
  );
};

export default AdminArtists;
