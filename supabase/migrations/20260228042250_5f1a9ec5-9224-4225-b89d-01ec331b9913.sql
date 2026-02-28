
-- ==============================================
-- URS79 Music Submission Portal Schema
-- ==============================================

-- Enum for account types
CREATE TYPE public.submission_account_type AS ENUM ('independent_artist', 'indie_label', 'artist_representative', 'distributor_partner');

-- Enum for release types
CREATE TYPE public.release_type AS ENUM ('single', 'ep', 'album');

-- Enum for track versions
CREATE TYPE public.track_version AS ENUM ('original', 'radio_edit', 'remix', 'instrumental', 'acoustic', 'live', 'deluxe');

-- Enum for contributor roles
CREATE TYPE public.contributor_role AS ENUM ('songwriter', 'producer', 'composer', 'lyricist', 'performer', 'featured_artist');

-- Enum for submission status
CREATE TYPE public.submission_status AS ENUM ('draft', 'submitted', 'in_review', 'revision_requested', 'approved', 'rejected', 'distributed');

-- ==============================================
-- 1. Submission Accounts (extends auth user)
-- ==============================================
CREATE TABLE public.submission_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  account_type submission_account_type NOT NULL DEFAULT 'independent_artist',
  full_legal_name TEXT NOT NULL,
  business_name TEXT,
  stage_name TEXT,
  phone TEXT,
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.submission_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submission account"
  ON public.submission_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submission account"
  ON public.submission_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submission account"
  ON public.submission_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all submission accounts"
  ON public.submission_accounts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_submission_accounts_updated_at
  BEFORE UPDATE ON public.submission_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- 2. Submission Artist Profiles
-- ==============================================
CREATE TABLE public.submission_artist_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.submission_accounts(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  date_of_birth DATE,
  country TEXT,
  primary_genre TEXT,
  secondary_genre TEXT,
  bio TEXT,
  photo_url TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  youtube_url TEXT,
  isni TEXT,
  has_existing_distributor BOOLEAN DEFAULT false,
  pro_affiliation TEXT,
  ipi_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.submission_artist_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own artist profiles"
  ON public.submission_artist_profiles FOR SELECT
  USING (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own artist profiles"
  ON public.submission_artist_profiles FOR INSERT
  WITH CHECK (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own artist profiles"
  ON public.submission_artist_profiles FOR UPDATE
  USING (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete own artist profiles"
  ON public.submission_artist_profiles FOR DELETE
  USING (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all artist profiles"
  ON public.submission_artist_profiles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_submission_artist_profiles_updated_at
  BEFORE UPDATE ON public.submission_artist_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- 3. Submission Releases
-- ==============================================
CREATE TABLE public.submission_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.submission_accounts(id) ON DELETE CASCADE,
  artist_profile_id UUID REFERENCES public.submission_artist_profiles(id) ON DELETE SET NULL,
  status submission_status NOT NULL DEFAULT 'draft',
  release_type release_type NOT NULL DEFAULT 'single',
  title TEXT NOT NULL DEFAULT '',
  primary_artist TEXT,
  featured_artists TEXT,
  release_date DATE,
  original_release_date DATE,
  language TEXT DEFAULT 'English',
  parental_advisory BOOLEAN DEFAULT false,
  label_name TEXT DEFAULT 'URS79',
  upc TEXT,
  cover_art_url TEXT,
  admin_notes TEXT,
  submission_id TEXT UNIQUE,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.submission_releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own releases"
  ON public.submission_releases FOR SELECT
  USING (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own releases"
  ON public.submission_releases FOR INSERT
  WITH CHECK (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can update own releases"
  ON public.submission_releases FOR UPDATE
  USING (account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete draft releases"
  ON public.submission_releases FOR DELETE
  USING (
    account_id IN (SELECT id FROM public.submission_accounts WHERE user_id = auth.uid())
    AND status = 'draft'
  );

CREATE POLICY "Admins can manage all releases"
  ON public.submission_releases FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_submission_releases_updated_at
  BEFORE UPDATE ON public.submission_releases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- 4. Release Tracks
-- ==============================================
CREATE TABLE public.release_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID NOT NULL REFERENCES public.submission_releases(id) ON DELETE CASCADE,
  track_number INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL DEFAULT '',
  version track_version DEFAULT 'original',
  isrc TEXT,
  is_explicit BOOLEAN DEFAULT false,
  genre TEXT,
  mood_tags TEXT[],
  bpm INTEGER,
  musical_key TEXT,
  language TEXT DEFAULT 'English',
  duration_seconds INTEGER,
  lyrics TEXT,
  audio_url TEXT,
  preview_video_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.release_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tracks"
  ON public.release_tracks FOR SELECT
  USING (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own tracks"
  ON public.release_tracks FOR INSERT
  WITH CHECK (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own tracks"
  ON public.release_tracks FOR UPDATE
  USING (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own tracks"
  ON public.release_tracks FOR DELETE
  USING (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all tracks"
  ON public.release_tracks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_release_tracks_updated_at
  BEFORE UPDATE ON public.release_tracks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- 5. Track Contributors
-- ==============================================
CREATE TABLE public.track_contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES public.release_tracks(id) ON DELETE CASCADE,
  full_legal_name TEXT NOT NULL,
  role contributor_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.track_contributors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own track contributors"
  ON public.track_contributors FOR SELECT
  USING (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own track contributors"
  ON public.track_contributors FOR INSERT
  WITH CHECK (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own track contributors"
  ON public.track_contributors FOR UPDATE
  USING (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own track contributors"
  ON public.track_contributors FOR DELETE
  USING (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all track contributors"
  ON public.track_contributors FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ==============================================
-- 6. Publishing Splits
-- ==============================================
CREATE TABLE public.publishing_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES public.release_tracks(id) ON DELETE CASCADE,
  songwriter_legal_name TEXT NOT NULL,
  ownership_percentage NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (ownership_percentage >= 0 AND ownership_percentage <= 100),
  publisher_name TEXT,
  pro_affiliation TEXT,
  ipi_number TEXT,
  owns_mechanical_rights BOOLEAN DEFAULT false,
  admin_rights_to_urs79 BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.publishing_splits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own publishing splits"
  ON public.publishing_splits FOR SELECT
  USING (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own publishing splits"
  ON public.publishing_splits FOR INSERT
  WITH CHECK (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own publishing splits"
  ON public.publishing_splits FOR UPDATE
  USING (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own publishing splits"
  ON public.publishing_splits FOR DELETE
  USING (track_id IN (
    SELECT t.id FROM public.release_tracks t
    JOIN public.submission_releases r ON r.id = t.release_id
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all publishing splits"
  ON public.publishing_splits FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ==============================================
-- 7. Master Ownership Declarations
-- ==============================================
CREATE TABLE public.master_declarations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID NOT NULL REFERENCES public.submission_releases(id) ON DELETE CASCADE UNIQUE,
  master_owner TEXT NOT NULL DEFAULT '',
  ownership_percentage NUMERIC(5,2) NOT NULL DEFAULT 100,
  is_cover BOOLEAN DEFAULT false,
  mechanical_license_url TEXT,
  has_samples BOOLEAN DEFAULT false,
  sample_clearance_url TEXT,
  rights_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.master_declarations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own master declarations"
  ON public.master_declarations FOR SELECT
  USING (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own master declarations"
  ON public.master_declarations FOR INSERT
  WITH CHECK (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own master declarations"
  ON public.master_declarations FOR UPDATE
  USING (release_id IN (
    SELECT r.id FROM public.submission_releases r
    JOIN public.submission_accounts a ON a.id = r.account_id
    WHERE a.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all master declarations"
  ON public.master_declarations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_master_declarations_updated_at
  BEFORE UPDATE ON public.master_declarations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================
-- Storage bucket for submissions
-- ==============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('submissions', 'submissions', false, 104857600);

-- Users can upload to their own folder
CREATE POLICY "Users can upload submission files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own submission files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own submission files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own submission files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can access all submission files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'submissions' AND public.has_role(auth.uid(), 'admin'));

-- Indexes for performance
CREATE INDEX idx_submission_accounts_user_id ON public.submission_accounts(user_id);
CREATE INDEX idx_submission_artist_profiles_account_id ON public.submission_artist_profiles(account_id);
CREATE INDEX idx_submission_releases_account_id ON public.submission_releases(account_id);
CREATE INDEX idx_submission_releases_status ON public.submission_releases(status);
CREATE INDEX idx_release_tracks_release_id ON public.release_tracks(release_id);
CREATE INDEX idx_track_contributors_track_id ON public.track_contributors(track_id);
CREATE INDEX idx_publishing_splits_track_id ON public.publishing_splits(track_id);
