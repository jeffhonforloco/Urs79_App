import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, MailOpen, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

type Submission = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string | null;
  artist_name: string | null;
  music_link: string | null;
  genre: string | null;
  is_read: boolean | null;
  created_at: string;
};

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchData = async () => {
    let query = supabase.from('submissions').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('type', filter);
    const { data } = await query;
    setSubmissions(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [filter]);

  const markRead = async (s: Submission) => {
    await supabase.from('submissions').update({ is_read: true }).eq('id', s.id);
    setSelected({ ...s, is_read: true });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    await supabase.from('submissions').delete().eq('id', id);
    if (selected?.id === id) setSelected(null);
    toast.success('Deleted');
    fetchData();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">SUBMISSIONS</h2>
        <div className="flex gap-2">
          {['all', 'contact', 'artist', 'production', 'distribution'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* List */}
        <div className="lg:col-span-5 space-y-1 max-h-[70vh] overflow-y-auto">
          {loading ? <p className="text-muted-foreground p-4">Loading...</p> : submissions.length === 0 ? (
            <div className="glass-card p-8 text-center"><p className="text-muted-foreground">No submissions</p></div>
          ) : submissions.map(s => (
            <button key={s.id} onClick={() => { setSelected(s); if (!s.is_read) markRead(s); }}
              className={`w-full text-left glass-card p-4 transition-all ${selected?.id === s.id ? 'border-primary/30' : ''} ${!s.is_read ? 'border-l-2 border-l-primary' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                {s.is_read ? <MailOpen className="w-3 h-3 text-muted-foreground" /> : <Mail className="w-3 h-3 text-primary" />}
                <span className="font-medium text-sm truncate">{s.name}</span>
                <span className="text-[9px] tracking-wider uppercase text-muted-foreground bg-secondary px-2 py-0.5 rounded ml-auto">{s.type}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{s.subject || s.message?.slice(0, 80) || 'No message'}</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1">{format(new Date(s.created_at), 'MMM d, yyyy · h:mm a')}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-7">
          {selected ? (
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                  {selected.phone && <p className="text-sm text-muted-foreground mt-1">{selected.phone}</p>}
                </div>
                <button onClick={() => handleDelete(selected.id)} className="p-2 hover:bg-secondary rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>

              {selected.subject && <div className="mb-4"><p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Subject</p><p className="text-sm">{selected.subject}</p></div>}
              {selected.message && <div className="mb-4"><p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Message</p><p className="text-sm whitespace-pre-wrap">{selected.message}</p></div>}

              {selected.type === 'artist' && (
                <div className="border-t border-border pt-4 mt-4 space-y-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">Artist Submission</p>
                  {selected.artist_name && <div><p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Artist Name</p><p className="text-sm">{selected.artist_name}</p></div>}
                  {selected.genre && <div><p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Genre</p><p className="text-sm">{selected.genre}</p></div>}
                  {selected.music_link && <div><p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Music Link</p><a href={selected.music_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">{selected.music_link} <ExternalLink className="w-3 h-3" /></a></div>}
                </div>
              )}

              <p className="text-[10px] text-muted-foreground/50 mt-6">{format(new Date(selected.created_at), 'MMMM d, yyyy · h:mm a')}</p>
            </div>
          ) : (
            <div className="glass-card p-12 text-center"><p className="text-muted-foreground">Select a submission to view</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;
