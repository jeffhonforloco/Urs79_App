import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_url: string | null;
  category: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  published_at: string | null;
};

const emptyNews = { title: '', slug: '', content: '', excerpt: '', cover_url: '', category: 'news', is_featured: false, is_published: false };

const AdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => { const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false }); setNews(data || []); setLoading(false); };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) { toast.error('Title and slug required'); return; }
    try {
      const payload = { ...editing, published_at: editing.is_published ? new Date().toISOString() : null };
      if (editing.id) {
        const { error } = await supabase.from('news').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert([payload as any]);
        if (error) throw error;
      }
      toast.success('Saved'); setEditing(null); fetchData();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await supabase.from('news').delete().eq('id', id); toast.success('Deleted'); fetchData(); };

  if (editing) {
    return (
      <div className="p-8 max-w-3xl">
        <h2 className="font-display text-3xl mb-6">{editing.id ? 'EDIT' : 'NEW'} POST</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Title</label><Input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="bg-secondary border-border h-10" /></div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Slug</label><Input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Category</label>
              <select value={editing.category || 'news'} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full h-10 px-3 bg-secondary border border-border text-foreground text-sm rounded">
                <option value="news">News</option><option value="release">Release</option><option value="announcement">Announcement</option><option value="press">Press</option>
              </select>
            </div>
            <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Cover URL</label><Input value={editing.cover_url || ''} onChange={e => setEditing({ ...editing, cover_url: e.target.value })} className="bg-secondary border-border h-10" /></div>
          </div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Excerpt</label><Input value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} className="bg-secondary border-border h-10" /></div>
          <div><label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Content</label><Textarea value={editing.content || ''} onChange={e => setEditing({ ...editing, content: e.target.value })} className="bg-secondary border-border" rows={8} /></div>
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
        <h2 className="font-display text-3xl">NEWS</h2>
        <button onClick={() => setEditing(emptyNews)} className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Post</button>
      </div>
      {loading ? <p className="text-muted-foreground">Loading...</p> : news.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted-foreground mb-4">No posts yet</p><button onClick={() => setEditing(emptyNews)} className="btn-primary text-sm">Create First Post</button></div>
      ) : (
        <div className="space-y-2">{news.map(n => (
          <div key={n.id} className="glass-card p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0"><h3 className="font-medium text-sm">{n.title}</h3><p className="text-xs text-muted-foreground">{n.category} · {n.published_at ? new Date(n.published_at).toLocaleDateString() : 'Draft'}</p></div>
            <div className="flex items-center gap-2">
              <button onClick={async () => { await supabase.from('news').update({ is_published: !n.is_published, published_at: !n.is_published ? new Date().toISOString() : null }).eq('id', n.id); fetchData(); }} className="p-2 hover:bg-secondary rounded">{n.is_published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
              <button onClick={() => setEditing(n)} className="p-2 hover:bg-secondary rounded"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(n.id)} className="p-2 hover:bg-secondary rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}</div>
      )}
    </div>
  );
};

export default AdminNews;
