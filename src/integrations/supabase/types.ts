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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      game_scores: {
        Row: {
          created_at: string
          difficulty: string
          display_name: string
          game_type: string
          id: string
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty: string
          display_name: string
          game_type: string
          id?: string
          score?: number
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          display_name?: string
          game_type?: string
          id?: string
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      grootouder_verhalen: {
        Row: {
          antwoorden: Json
          approved: boolean
          created_at: string
          email: string | null
          foto_url: string | null
          geboortejaar: string | null
          id: string
          naam: string
          relatie: string | null
          updated_at: string
          woonplaats: string | null
        }
        Insert: {
          antwoorden?: Json
          approved?: boolean
          created_at?: string
          email?: string | null
          foto_url?: string | null
          geboortejaar?: string | null
          id?: string
          naam: string
          relatie?: string | null
          updated_at?: string
          woonplaats?: string | null
        }
        Update: {
          antwoorden?: Json
          approved?: boolean
          created_at?: string
          email?: string | null
          foto_url?: string | null
          geboortejaar?: string | null
          id?: string
          naam?: string
          relatie?: string | null
          updated_at?: string
          woonplaats?: string | null
        }
        Relationships: []
      }
      guestbook_entries: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          location: string | null
          message: string
          name: string
          relation: string | null
          visitor_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          id?: string
          location?: string | null
          message: string
          name: string
          relation?: string | null
          visitor_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          location?: string | null
          message?: string
          name?: string
          relation?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          achievements_count: number
          created_at: string
          display_name: string
          id: string
          sections_visited: number
          total_score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements_count?: number
          created_at?: string
          display_name: string
          id?: string
          sections_visited?: number
          total_score?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements_count?: number
          created_at?: string
          display_name?: string
          id?: string
          sections_visited?: number
          total_score?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_notes: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          note_id: string
          share_token: string
          user_id: string
          view_count: number
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          note_id: string
          share_token?: string
          user_id: string
          view_count?: number
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          note_id?: string
          share_token?: string
          user_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "shared_notes_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "user_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      site_updates: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          id: string
          page_path: string | null
          visited_at: string
          visitor_id: string
        }
        Insert: {
          id?: string
          page_path?: string | null
          visited_at?: string
          visitor_id: string
        }
        Update: {
          id?: string
          page_path?: string | null
          visited_at?: string
          visitor_id?: string
        }
        Relationships: []
      }
      tts_rate_limits: {
        Row: {
          created_at: string
          id: string
          request_count: number
          visitor_id: string
          window_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          request_count?: number
          visitor_id: string
          window_start?: string
        }
        Update: {
          created_at?: string
          id?: string
          request_count?: number
          visitor_id?: string
          window_start?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          section_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          section_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          section_id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          section_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          section_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          section_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_update_reads: {
        Row: {
          id: string
          read_at: string
          update_id: string
          user_id: string
        }
        Insert: {
          id?: string
          read_at?: string
          update_id: string
          user_id: string
        }
        Update: {
          id?: string
          read_at?: string
          update_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_update_reads_update_id_fkey"
            columns: ["update_id"]
            isOneToOne: false
            referencedRelation: "site_updates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_update_reads_update_id_fkey"
            columns: ["update_id"]
            isOneToOne: false
            referencedRelation: "site_updates_public"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_secrets: {
        Row: {
          created_at: string
          id: string
          purpose: string
          secret: string
        }
        Insert: {
          created_at?: string
          id?: string
          purpose: string
          secret: string
        }
        Update: {
          created_at?: string
          id?: string
          purpose?: string
          secret?: string
        }
        Relationships: []
      }
    }
    Views: {
      game_scores_public: {
        Row: {
          created_at: string | null
          difficulty: string | null
          display_name: string | null
          game_type: string | null
          id: string | null
          score: number | null
        }
        Insert: {
          created_at?: string | null
          difficulty?: string | null
          display_name?: string | null
          game_type?: string | null
          id?: string | null
          score?: number | null
        }
        Update: {
          created_at?: string | null
          difficulty?: string | null
          display_name?: string | null
          game_type?: string | null
          id?: string | null
          score?: number | null
        }
        Relationships: []
      }
      guestbook_entries_public: {
        Row: {
          created_at: string | null
          id: string | null
          location: string | null
          message: string | null
          name: string | null
          relation: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          location?: string | null
          message?: string | null
          name?: string | null
          relation?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          location?: string | null
          message?: string | null
          name?: string | null
          relation?: string | null
        }
        Relationships: []
      }
      leaderboard_public: {
        Row: {
          achievements_count: number | null
          display_name: string | null
          id: string | null
          sections_visited: number | null
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          achievements_count?: number | null
          display_name?: string | null
          id?: string | null
          sections_visited?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          achievements_count?: number | null
          display_name?: string | null
          id?: string | null
          sections_visited?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_updates_public: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_tts_rate_limit: {
        Args: {
          p_max_requests?: number
          p_visitor_id: string
          p_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      get_approved_grootouder_verhalen: {
        Args: never
        Returns: {
          antwoorden: Json
          created_at: string
          foto_url: string
          geboortejaar: string
          id: string
          naam: string
          relatie: string
          woonplaats: string
        }[]
      }
      get_shared_note: {
        Args: { p_share_token: string }
        Returns: {
          content: string
          created_at: string
          expires_at: string
          id: string
          note_created_at: string
          note_updated_at: string
          section_id: string
          share_token: string
          view_count: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_share_view_count: {
        Args: { p_share_token: string }
        Returns: undefined
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
