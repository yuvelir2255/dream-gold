// Generated via Supabase (project okylzqjlqbiwxbutsyvr) — `generate_typescript_types`.
// Includes the existing Telegram-bot tables (items/orders/events/reviews/…) plus
// the website's own `web_inquiries`. Regenerate after schema changes.
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
      events: {
        Row: {
          created_at: string
          id: number
          kind: string
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: never
          kind: string
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: never
          kind?: string
          user_id?: number | null
        }
        Relationships: []
      }
      items: {
        Row: {
          created_at: string
          description_en: string | null
          description_ru: string | null
          description_uk: string | null
          featured: boolean
          fineness: string[]
          gold_colors: string[]
          id: string
          image: string | null
          media: Json
          stones: boolean
          style: string
          title_en: string | null
          title_ru: string | null
          title_uk: string
          type: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_ru?: string | null
          description_uk?: string | null
          featured?: boolean
          fineness?: string[]
          gold_colors?: string[]
          id: string
          image?: string | null
          media?: Json
          stones?: boolean
          style?: string
          title_en?: string | null
          title_ru?: string | null
          title_uk: string
          type: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_ru?: string | null
          description_uk?: string | null
          featured?: boolean
          fineness?: string[]
          gold_colors?: string[]
          id?: string
          image?: string | null
          media?: Json
          stones?: boolean
          style?: string
          title_en?: string | null
          title_ru?: string | null
          title_uk?: string
          type?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: number
          lang: string | null
          status: string
          summary: string | null
          user_id: number | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          lang?: string | null
          status?: string
          summary?: string | null
          user_id?: number | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          lang?: string | null
          status?: string
          summary?: string | null
          user_id?: number | null
          username?: string | null
        }
        Relationships: []
      }
      pending_media: {
        Row: {
          caption: string | null
          chat_id: string
          created_at: string
          group_id: string | null
          id: number
          kind: string
          mid: number | null
          poster: string | null
          url: string
        }
        Insert: {
          caption?: string | null
          chat_id: string
          created_at?: string
          group_id?: string | null
          id?: never
          kind: string
          mid?: number | null
          poster?: string | null
          url: string
        }
        Update: {
          caption?: string | null
          chat_id?: string
          created_at?: string
          group_id?: string | null
          id?: never
          kind?: string
          mid?: number | null
          poster?: string | null
          url?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id: string
          image: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image?: string
        }
        Relationships: []
      }
      web_inquiries: {
        Row: {
          contact: string
          created_at: string
          delivered_telegram: boolean
          id: string
          message: string
          name: string
          source: string
          status: string
          user_id: string | null
        }
        Insert: {
          contact: string
          created_at?: string
          delivered_telegram?: boolean
          id?: string
          message: string
          name: string
          source?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          contact?: string
          created_at?: string
          delivered_telegram?: boolean
          id?: string
          message?: string
          name?: string
          source?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          product_slug: string
          user_id: string
        }
        Insert: {
          created_at?: string
          product_slug: string
          user_id: string
        }
        Update: {
          created_at?: string
          product_slug?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_media: {
        Args: {
          p_cover: string
          p_description: string
          p_description_en?: string
          p_description_ru?: string
          p_fineness: string[]
          p_gold: string[]
          p_id: string
          p_media: Json
          p_stones: boolean
          p_style: string
          p_title: string
          p_title_en?: string
          p_title_ru?: string
          p_type: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
