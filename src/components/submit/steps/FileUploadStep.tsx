import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Upload, Music, Image, Film, Trash2, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type Props = { releaseId: string; userId: string };

type TrackFile = {
  trackId: string;
  trackTitle: string;
  trackNumber: number;
  audioUrl: string | null;
};

const FileUploadStep = ({ releaseId, userId }: Props) => {
  const [tracks, setTracks] = useState<TrackFile[]>([]);
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const { data: trackData } = await supabase
        .from('release_tracks')
        .select('id, title, track_number, audio_url')
        .eq('release_id', releaseId)
        .order('track_number');

      if (trackData) {
        setTracks(trackData.map(t => ({
          trackId: t.id,
          trackTitle: t.title || `Track ${t.track_number}`,
          trackNumber: t.track_number,
          audioUrl: t.audio_url,
        })));
      }

      const { data: release } = await supabase
        .from('submission_releases')
        .select('cover_art_url')
        .eq('id', releaseId)
        .single();
      if (release) setCoverArtUrl(release.cover_art_url);
      setLoaded(true);
    };
    load();
  }, [releaseId]);

  const uploadFile = async (file: File, path: string) => {
    setProgress(0);
    // Simulate progress since Supabase doesn't provide upload progress
    const interval = setInterval(() => setProgress(p => Math.min(p + 10, 90)), 200);

    const { data, error } = await supabase.storage
      .from('submissions')
      .upload(path, file, { upsert: true });

    clearInterval(interval);
    setProgress(100);

    if (error) throw error;
    return data.path;
  };

  const handleAudioUpload = async (trackId: string, file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['wav', 'mp3'].includes(ext || '')) {
      toast.error('Only WAV and MP3 files are accepted');
      return;
    }
    if (ext === 'mp3' && file.size < 1000) {
      toast.error('MP3 must be at least 320kbps');
      return;
    }

    setUploading(trackId);
    try {
      const path = `${userId}/${releaseId}/audio/${trackId}.${ext}`;
      await uploadFile(file, path);

      const publicPath = path;
      await supabase.from('release_tracks').update({ audio_url: publicPath }).eq('id', trackId);

      setTracks(prev => prev.map(t => t.trackId === trackId ? { ...t, audioUrl: publicPath } : t));
      toast.success('Audio uploaded');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(null);
      setProgress(0);
    }
  };

  const handleCoverUpload = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(ext || '')) {
      toast.error('Only JPG and PNG images are accepted');
      return;
    }

    setUploading('cover');
    try {
      const path = `${userId}/${releaseId}/artwork/cover.${ext}`;
      await uploadFile(file, path);

      await supabase.from('submission_releases').update({ cover_art_url: path }).eq('id', releaseId);
      setCoverArtUrl(path);
      toast.success('Cover art uploaded');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(null);
      setProgress(0);
    }
  };

  if (!loaded) return <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-1">File Upload</h2>
        <p className="text-muted-foreground text-sm">Upload audio files (WAV preferred, MP3 min 320kbps) and cover artwork (3000×3000 min, JPG/PNG).</p>
      </div>

      {/* Cover Art */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">Cover Artwork</p>
        <div
          onClick={() => coverRef.current?.click()}
          className="glass-card p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/30 transition-all min-h-[200px]"
        >
          {coverArtUrl ? (
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-sm">Cover art uploaded</span>
            </div>
          ) : (
            <>
              <Image className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Drop cover art here or click to browse</p>
              <p className="text-[10px] text-muted-foreground/60">3000×3000px minimum · JPG or PNG</p>
            </>
          )}
          {uploading === 'cover' && <Progress value={progress} className="w-48 mt-4 h-1" />}
        </div>
        <input ref={coverRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={e => { if (e.target.files?.[0]) handleCoverUpload(e.target.files[0]); }} />
      </div>

      {/* Audio files */}
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">Audio Files</p>
        {tracks.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground text-sm">No tracks added yet. Go back to the Track Metadata step to add tracks first.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tracks.map(track => (
              <div key={track.trackId} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-primary">{String(track.trackNumber).padStart(2, '0')}</span>
                  <span className="text-sm">{track.trackTitle}</span>
                  {track.audioUrl && <Check className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex items-center gap-2">
                  {uploading === track.trackId && <Progress value={progress} className="w-24 h-1" />}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="audio/wav,audio/mpeg,audio/mp3"
                      className="hidden"
                      onChange={e => { if (e.target.files?.[0]) handleAudioUpload(track.trackId, e.target.files[0]); }}
                    />
                    <span className="text-xs text-primary hover:underline flex items-center gap-1">
                      <Upload className="w-3 h-3" /> {track.audioUrl ? 'Replace' : 'Upload'}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadStep;
