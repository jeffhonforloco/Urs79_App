export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      artists: {
        Row: {
          apple_music_url: string | null
          bio: string | null
          created_at: string
          genre: string | null
          id: string
          instagram_url: string | null
          is_featured: boolean | null
          is_published: boolean | null
          name: string
          photo_url: string | null
          slug: string
          sort_order: number | null
          spotify_url: string | null
          updated_at: string
        }
        Insert: {
          apple_music_url?: string | null
          bio?: string | null
          created_at?: string
          genre?: string | null
          id?: string
          instagram_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          name: string
          photo_url?: string | null
          slug: string
          sort_order?: number | null
          spotify_url?: string | null
          updated_at?: string
        }
        Update: {
          apple_music_url?: string | null
          bio?: string | null
          created_at?: string
          genre?: string | null
          id?: string
          instagram_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          name?: string
          photo_url?: string | null
          slug?: string
          sort_order?: number | null
          spotify_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      master_declarations: {
        Row: {
          created_at: string
          has_samples: boolean | null
          id: string
          is_cover: boolean | null
          master_owner: string
          mechanical_license_url: string | null
          ownership_percentage: number
          release_id: string
          rights_confirmed: boolean | null
          sample_clearance_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          has_samples?: boolean | null
          id?: string
          is_cover?: boolean | null
          master_owner?: string
          mechanical_license_url?: string | null
          ownership_percentage?: number
          release_id: string
          rights_confirmed?: boolean | null
          sample_clearance_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          has_samples?: boolean | null
          id?: string
          is_cover?: boolean | null
          master_owner?: string
          mechanical_license_url?: string | null
          ownership_percentage?: number
          release_id?: string
          rights_confirmed?: boolean | null
          sample_clearance_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "master_declarations_release_id_fkey"
            columns: ["release_id"]
            isOneToOne: true
            referencedRelation: "submission_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          category: string | null
          content: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          compare_at_price: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_published: boolean | null
          price: number
          slug: string
          sort_order: number | null
          stock_quantity: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          compare_at_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          price?: number
          slug: string
          sort_order?: number | null
          stock_quantity?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          compare_at_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          price?: number
          slug?: string
          sort_order?: number | null
          stock_quantity?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client_name: string | null
          created_at: string
          credits: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          slug: string
          sort_order: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string
          client_name?: string | null
          created_at?: string
          credits?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          slug: string
          sort_order?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          client_name?: string | null
          created_at?: string
          credits?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          slug?: string
          sort_order?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      publishing_splits: {
        Row: {
          admin_rights_to_urs79: boolean | null
          created_at: string
          id: string
          ipi_number: string | null
          ownership_percentage: number
          owns_mechanical_rights: boolean | null
          pro_affiliation: string | null
          publisher_name: string | null
          songwriter_legal_name: string
          track_id: string
        }
        Insert: {
          admin_rights_to_urs79?: boolean | null
          created_at?: string
          id?: string
          ipi_number?: string | null
          ownership_percentage?: number
          owns_mechanical_rights?: boolean | null
          pro_affiliation?: string | null
          publisher_name?: string | null
          songwriter_legal_name: string
          track_id: string
        }
        Update: {
          admin_rights_to_urs79?: boolean | null
          created_at?: string
          id?: string
          ipi_number?: string | null
          ownership_percentage?: number
          owns_mechanical_rights?: boolean | null
          pro_affiliation?: string | null
          publisher_name?: string | null
          songwriter_legal_name?: string
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "publishing_splits_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "release_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      release_tracks: {
        Row: {
          audio_url: string | null
          bpm: number | null
          created_at: string
          duration_seconds: number | null
          genre: string | null
          id: string
          is_explicit: boolean | null
          isrc: string | null
          language: string | null
          lyrics: string | null
          mood_tags: string[] | null
          musical_key: string | null
          preview_video_url: string | null
          release_id: string
          title: string
          track_number: number
          updated_at: string
          version: Database["public"]["Enums"]["track_version"] | null
        }
        Insert: {
          audio_url?: string | null
          bpm?: number | null
          created_at?: string
          duration_seconds?: number | null
          genre?: string | null
          id?: string
          is_explicit?: boolean | null
          isrc?: string | null
          language?: string | null
          lyrics?: string | null
          mood_tags?: string[] | null
          musical_key?: string | null
          preview_video_url?: string | null
          release_id: string
          title?: string
          track_number?: number
          updated_at?: string
          version?: Database["public"]["Enums"]["track_version"] | null
        }
        Update: {
          audio_url?: string | null
          bpm?: number | null
          created_at?: string
          duration_seconds?: number | null
          genre?: string | null
          id?: string
          is_explicit?: boolean | null
          isrc?: string | null
          language?: string | null
          lyrics?: string | null
          mood_tags?: string[] | null
          musical_key?: string | null
          preview_video_url?: string | null
          release_id?: string
          title?: string
          track_number?: number
          updated_at?: string
          version?: Database["public"]["Enums"]["track_version"] | null
        }
        Relationships: [
          {
            foreignKeyName: "release_tracks_release_id_fkey"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "submission_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      releases: {
        Row: {
          apple_music_url: string | null
          artist_id: string | null
          artist_name: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          release_date: string | null
          release_type: string | null
          slug: string
          spotify_url: string | null
          title: string
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          apple_music_url?: string | null
          artist_id?: string | null
          artist_name?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          release_date?: string | null
          release_type?: string | null
          slug: string
          spotify_url?: string | null
          title: string
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          apple_music_url?: string | null
          artist_id?: string | null
          artist_name?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          release_date?: string | null
          release_type?: string | null
          slug?: string
          spotify_url?: string | null
          title?: string
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "releases_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      submission_accounts: {
        Row: {
          account_type: Database["public"]["Enums"]["submission_account_type"]
          business_name: string | null
          country: string | null
          created_at: string
          full_legal_name: string
          id: string
          phone: string | null
          stage_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["submission_account_type"]
          business_name?: string | null
          country?: string | null
          created_at?: string
          full_legal_name: string
          id?: string
          phone?: string | null
          stage_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["submission_account_type"]
          business_name?: string | null
          country?: string | null
          created_at?: string
          full_legal_name?: string
          id?: string
          phone?: string | null
          stage_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      submission_artist_profiles: {
        Row: {
          account_id: string
          apple_music_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          has_existing_distributor: boolean | null
          id: string
          instagram_url: string | null
          ipi_number: string | null
          isni: string | null
          legal_name: string
          photo_url: string | null
          primary_genre: string | null
          pro_affiliation: string | null
          secondary_genre: string | null
          spotify_url: string | null
          stage_name: string
          tiktok_url: string | null
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          account_id: string
          apple_music_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          has_existing_distributor?: boolean | null
          id?: string
          instagram_url?: string | null
          ipi_number?: string | null
          isni?: string | null
          legal_name: string
          photo_url?: string | null
          primary_genre?: string | null
          pro_affiliation?: string | null
          secondary_genre?: string | null
          spotify_url?: string | null
          stage_name: string
          tiktok_url?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          account_id?: string
          apple_music_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          has_existing_distributor?: boolean | null
          id?: string
          instagram_url?: string | null
          ipi_number?: string | null
          isni?: string | null
          legal_name?: string
          photo_url?: string | null
          primary_genre?: string | null
          pro_affiliation?: string | null
          secondary_genre?: string | null
          spotify_url?: string | null
          stage_name?: string
          tiktok_url?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submission_artist_profiles_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "submission_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_releases: {
        Row: {
          account_id: string
          admin_notes: string | null
          artist_profile_id: string | null
          cover_art_url: string | null
          created_at: string
          featured_artists: string | null
          id: string
          label_name: string | null
          language: string | null
          original_release_date: string | null
          parental_advisory: boolean | null
          primary_artist: string | null
          release_date: string | null
          release_type: Database["public"]["Enums"]["release_type"]
          status: Database["public"]["Enums"]["submission_status"]
          submission_id: string | null
          submitted_at: string | null
          title: string
          upc: string | null
          updated_at: string
        }
        Insert: {
          account_id: string
          admin_notes?: string | null
          artist_profile_id?: string | null
          cover_art_url?: string | null
          created_at?: string
          featured_artists?: string | null
          id?: string
          label_name?: string | null
          language?: string | null
          original_release_date?: string | null
          parental_advisory?: boolean | null
          primary_artist?: string | null
          release_date?: string | null
          release_type?: Database["public"]["Enums"]["release_type"]
          status?: Database["public"]["Enums"]["submission_status"]
          submission_id?: string | null
          submitted_at?: string | null
          title?: string
          upc?: string | null
          updated_at?: string
        }
        Update: {
          account_id?: string
          admin_notes?: string | null
          artist_profile_id?: string | null
          cover_art_url?: string | null
          created_at?: string
          featured_artists?: string | null
          id?: string
          label_name?: string | null
          language?: string | null
          original_release_date?: string | null
          parental_advisory?: boolean | null
          primary_artist?: string | null
          release_date?: string | null
          release_type?: Database["public"]["Enums"]["release_type"]
          status?: Database["public"]["Enums"]["submission_status"]
          submission_id?: string | null
          submitted_at?: string | null
          title?: string
          upc?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_releases_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "submission_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_releases_artist_profile_id_fkey"
            columns: ["artist_profile_id"]
            isOneToOne: false
            referencedRelation: "submission_artist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          artist_name: string | null
          created_at: string
          email: string
          genre: string | null
          id: string
          is_read: boolean | null
          message: string | null
          music_link: string | null
          name: string
          phone: string | null
          subject: string | null
          type: string
        }
        Insert: {
          artist_name?: string | null
          created_at?: string
          email: string
          genre?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          music_link?: string | null
          name: string
          phone?: string | null
          subject?: string | null
          type?: string
        }
        Update: {
          artist_name?: string | null
          created_at?: string
          email?: string
          genre?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          music_link?: string | null
          name?: string
          phone?: string | null
          subject?: string | null
          type?: string
        }
        Relationships: []
      }
      track_contributors: {
        Row: {
          created_at: string
          full_legal_name: string
          id: string
          role: Database["public"]["Enums"]["contributor_role"]
          track_id: string
        }
        Insert: {
          created_at?: string
          full_legal_name: string
          id?: string
          role: Database["public"]["Enums"]["contributor_role"]
          track_id: string
        }
        Update: {
          created_at?: string
          full_legal_name?: string
          id?: string
          role?: Database["public"]["Enums"]["contributor_role"]
          track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "track_contributors_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "release_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "editor" | "viewer"
      contributor_role:
        | "songwriter"
        | "producer"
        | "composer"
        | "lyricist"
        | "performer"
        | "featured_artist"
      release_type: "single" | "ep" | "album"
      submission_account_type:
        | "independent_artist"
        | "indie_label"
        | "artist_representative"
        | "distributor_partner"
      submission_status:
        | "draft"
        | "submitted"
        | "in_review"
        | "revision_requested"
        | "approved"
        | "rejected"
        | "distributed"
      track_version:
        | "original"
        | "radio_edit"
        | "remix"
        | "instrumental"
        | "acoustic"
        | "live"
        | "deluxe"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "editor", "viewer"],
      contributor_role: [
        "songwriter",
        "producer",
        "composer",
        "lyricist",
        "performer",
        "featured_artist",
      ],
      release_type: ["single", "ep", "album"],
      submission_account_type: [
        "independent_artist",
        "indie_label",
        "artist_representative",
        "distributor_partner",
      ],
      submission_status: [
        "draft",
        "submitted",
        "in_review",
        "revision_requested",
        "approved",
        "rejected",
        "distributed",
      ],
      track_version: [
        "original",
        "radio_edit",
        "remix",
        "instrumental",
        "acoustic",
        "live",
        "deluxe",
      ],
    },
  },
} as const
