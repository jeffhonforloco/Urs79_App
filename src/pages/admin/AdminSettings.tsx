import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Image, Video, Save, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('key, value').then(({ data }) => {
      const map: Record<string, string | null> = {};
      data?.forEach((row: any) => { map[row.key] = row.value; });
      setSettings(map);
      setLoading(false);
    });
  }, []);

  const uploadFile = async (file: File, key: string, folder: string) => {
    setUploading(key);
    try {
      const ext = file.name.split('.').pop();
      const path = `${folder}/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true });
      if (error) throw error;

      const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(data.path);
      const publicUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ value: publicUrl })
        .eq('key', key);
      if (updateError) throw updateError;

      setSettings(prev => ({ ...prev, [key]: publicUrl }));
      toast.success(`${key === 'logo_url' ? 'Logo' : 'Video'} updated successfully!`);
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  const handleSaveEmails = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: settings.notification_emails })
        .eq('key', 'notification_emails');
      if (error) throw error;
      toast.success('Notification emails updated');
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="font-display text-4xl tracking-wide mb-2">SITE SETTINGS</h1>
      <p className="text-muted-foreground text-sm mb-8">Manage your site logo, hero video, and notification preferences.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Upload */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Image className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl">SITE LOGO</h2>
          </div>
          <p className="text-muted-foreground text-xs mb-4">Upload a new logo (PNG, WebP, or SVG recommended). Transparent backgrounds work best.</p>
          
          {settings.logo_url && (
            <div className="bg-secondary rounded p-4 mb-4 flex items-center justify-center">
              <img src={settings.logo_url} alt="Current Logo" className="max-h-24 object-contain" />
            </div>
          )}
          
          <label className="btn-primary text-center cursor-pointer inline-flex items-center gap-2 text-sm">
            {uploading === 'logo_url' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading === 'logo_url' ? 'Uploading...' : 'Upload New Logo'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file, 'logo_url', 'logos');
              }}
            />
          </label>
        </div>

        {/* Hero Video Upload */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl">HERO VIDEO</h2>
          </div>
          <p className="text-muted-foreground text-xs mb-4">Upload a background video for the homepage hero (MP4 recommended, max 50MB).</p>
          
          {settings.hero_video_url && (
            <div className="bg-secondary rounded overflow-hidden mb-4">
              <video src={settings.hero_video_url} className="w-full h-32 object-cover" muted autoPlay loop playsInline />
            </div>
          )}
          
          <label className="btn-primary text-center cursor-pointer inline-flex items-center gap-2 text-sm">
            {uploading === 'hero_video_url' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading === 'hero_video_url' ? 'Uploading...' : 'Upload New Video'}
            <input
              type="file"
              accept="video/mp4,video/webm"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file, 'hero_video_url', 'videos');
              }}
            />
          </label>
        </div>

        {/* Notification Emails */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Save className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl">NOTIFICATION EMAILS</h2>
          </div>
          <p className="text-muted-foreground text-xs mb-4">Comma-separated email addresses that receive inquiry and submission notifications.</p>
          <div className="flex gap-3">
            <Input
              value={settings.notification_emails ?? ''}
              onChange={(e) => setSettings(prev => ({ ...prev, notification_emails: e.target.value }))}
              className="bg-secondary border-border flex-1"
              placeholder="info@urs79.com, urs7980@gmail.com"
            />
            <button onClick={handleSaveEmails} disabled={saving} className="btn-primary inline-flex items-center gap-2 text-sm">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
