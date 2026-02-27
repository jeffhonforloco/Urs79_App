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
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
