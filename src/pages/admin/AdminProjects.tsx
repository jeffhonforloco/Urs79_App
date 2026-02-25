import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  video_url: string | null;
  thumbnail_url: string | null;
  credits: string | null;
  client_name: string | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  sort_order: number | null;
};

const emptyProject = { title: '', slug: '', description: '', category: 'film', video_url: '', thumbnail_url: '', credits: '', client_name: '', is_featured: false, is_published: false };

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) { toast.error('Title and slug required'); return; }
    try {
      if (editing.id) {
        const { error } = await supabase.from('projects').update(editing).eq('id', editing.id);
        if (error) throw error;
        toast.success('Project updated');
      } else {
        const { error } = await supabase.from('projects').insert([editing as any]);
        if (error) throw error;
        toast.success('Project created');
      }
      setEditing(null);
      fetchProjects();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    toast.success('Deleted');
    fetchProjects();
  };

  const togglePublish = async (p: Project) => {
    await supabase.from('projects').update({ is_published: !p.is_published }).eq('id', p.id);
    fetchProjects();
  };

  if (editing) {
    return (
      <div className="p-8 max-w-3xl">
        <h2 className="font-display text-3xl mb-6">{editing.id ? 'EDIT' : 'NEW'} PROJECT</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Title</label>
              <Input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="bg-secondary border-border h-10" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Slug</label>
              <Input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="bg-secondary border-border h-10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Category</label>
              <select value={editing.category || 'film'} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full h-10 px-3 bg-secondary border border-border text-foreground text-sm rounded">
                <option value="film">Film</option>
                <option value="music_video">Music Video</option>
                <option value="commercial">Commercial</option>
                <option value="visual">Visual Media</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Client</label>
              <Input value={editing.client_name || ''} onChange={e => setEditing({ ...editing, client_name: e.target.value })} className="bg-secondary border-border h-10" />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Description</label>
            <Textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} className="bg-secondary border-border" rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Video URL</label>
              <Input value={editing.video_url || ''} onChange={e => setEditing({ ...editing, video_url: e.target.value })} className="bg-secondary border-border h-10" />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Thumbnail URL</label>
              <Input value={editing.thumbnail_url || ''} onChange={e => setEditing({ ...editing, thumbnail_url: e.target.value })} className="bg-secondary border-border h-10" />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Credits</label>
            <Input value={editing.credits || ''} onChange={e => setEditing({ ...editing, credits: e.target.value })} className="bg-secondary border-border h-10" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={!!editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} className="accent-primary" /> Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={!!editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="accent-primary" /> Published
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="btn-primary">Save Project</button>
            <button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl">PORTFOLIO</h2>
        <button onClick={() => setEditing(emptyProject)} className="btn-primary inline-flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Project</button>
      </div>
      {loading ? <p className="text-muted-foreground">Loading...</p> : projects.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <button onClick={() => setEditing(emptyProject)} className="btn-primary text-sm">Create First Project</button>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map(p => (
            <div key={p.id} className="glass-card p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm truncate">{p.title}</h3>
                  {p.is_featured && <Star className="w-3 h-3 text-primary fill-primary" />}
                  <span className="text-[9px] tracking-wider uppercase text-muted-foreground bg-secondary px-2 py-0.5 rounded">{p.category}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">{p.description || 'No description'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublish(p)} className="p-2 hover:bg-secondary rounded" title={p.is_published ? 'Unpublish' : 'Publish'}>
                  {p.is_published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                </button>
                <button onClick={() => setEditing(p)} className="p-2 hover:bg-secondary rounded"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-secondary rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
