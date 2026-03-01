import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SiteSettings = Record<string, string | null>;

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('key, value')
      .then(({ data }) => {
        const map: SiteSettings = {};
        data?.forEach((row: any) => { map[row.key] = row.value; });
        setSettings(map);
        setLoading(false);
      });
  }, []);

  return { settings, loading };
};
