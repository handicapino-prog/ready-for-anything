export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      challenge_results: {
        Row: {
          id: string
          challenge_id: string
          submitted_by: string
          claimed_winner_id: string
          score: string | null
          screenshot_url: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          challenge_id: string
          submitted_by: string
          claimed_winner_id: string
          score?: string | null
          screenshot_url?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string
          submitted_by?: string
          claimed_winner_id?: string
          score?: string | null
          screenshot_url?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          creator_id: string
          opponent_id: string | null
          game_id: string
          stake: number
          mode: string | null
          best_of: number
          status: "open" | "accepted" | "in_progress" | "completed" | "cancelled" | "disputed"
          room_id: string | null
          room_password: string | null
          scheduled_at: string | null
          notes: string | null
          winner_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          opponent_id?: string | null
          game_id: string
          stake: number
          mode?: string | null
          best_of?: number
          status?: "open" | "accepted" | "in_progress" | "completed" | "cancelled" | "disputed"
          room_id?: string | null
          room_password?: string | null
          scheduled_at?: string | null
          notes?: string | null
          winner_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          opponent_id?: string | null
          game_id?: string
          stake?: number
          mode?: string | null
          best_of?: number
          status?: "open" | "accepted" | "in_progress" | "completed" | "cancelled" | "disputed"
          room_id?: string | null
          room_password?: string | null
          scheduled_at?: string | null
          notes?: string | null
          winner_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      disputes: {
        Row: {
          id: string
          challenge_id: string | null
          tournament_match_id: string | null
          opened_by: string
          reason: string
          evidence_url: string | null
          status: "open" | "under_review" | "resolved" | "rejected"
          resolution: string | null
          resolved_by: string | null
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          challenge_id?: string | null
          tournament_match_id?: string | null
          opened_by: string
          reason: string
          evidence_url?: string | null
          status?: "open" | "under_review" | "resolved" | "rejected"
          resolution?: string | null
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          challenge_id?: string | null
          tournament_match_id?: string | null
          opened_by?: string
          reason?: string
          evidence_url?: string | null
          status?: "open" | "under_review" | "resolved" | "rejected"
          resolution?: string | null
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
        }
      }
      game_accounts: {
        Row: {
          id: string
          user_id: string
          game_id: string
          in_game_id: string
          in_game_name: string | null
          rank: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          in_game_id: string
          in_game_name?: string | null
          rank?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          in_game_id?: string
          in_game_name?: string | null
          rank?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: string
          slug: string
          name: string
          short_name: string | null
          cover_url: string | null
          accent_color: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          short_name?: string | null
          cover_url?: string | null
          accent_color?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          short_name?: string | null
          cover_url?: string | null
          accent_color?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      leaderboard_stats: {
        Row: {
          user_id: string
          wins: number
          losses: number
          matches_played: number
          tournaments_won: number
          total_earnings: number
          updated_at: string
        }
        Insert: {
          user_id: string
          wins?: number
          losses?: number
          matches_played?: number
          tournaments_won?: number
          total_earnings?: number
          updated_at?: string
        }
        Update: {
          user_id?: string
          wins?: number
          losses?: number
          matches_played?: number
          tournaments_won?: number
          total_earnings?: number
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          body: string | null
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          body?: string | null
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          body?: string | null
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tournament_matches: {
        Row: {
          id: string
          tournament_id: string
          round: number
          match_number: number
          player1_id: string | null
          player2_id: string | null
          winner_id: string | null
          score: string | null
          status: "pending" | "in_progress" | "completed" | "cancelled"
          scheduled_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          round: number
          match_number: number
          player1_id?: string | null
          player2_id?: string | null
          winner_id?: string | null
          score?: string | null
          status?: "pending" | "in_progress" | "completed" | "cancelled"
          scheduled_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          round?: number
          match_number?: number
          player1_id?: string | null
          player2_id?: string | null
          winner_id?: string | null
          score?: string | null
          status?: "pending" | "in_progress" | "completed" | "cancelled"
          scheduled_at?: string | null
          created_at?: string
        }
      }
      tournament_participants: {
        Row: {
          id: string
          tournament_id: string
          user_id: string
          seed: number | null
          eliminated_at: string | null
          placement: number | null
          joined_at: string
        }
        Insert: {
          id?: string
          tournament_id: string
          user_id: string
          seed?: number | null
          eliminated_at?: string | null
          placement?: number | null
          joined_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string
          user_id?: string
          seed?: number | null
          eliminated_at?: string | null
          placement?: number | null
          joined_at?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          game_id: string
          banner_url: string | null
          format: string
          entry_fee: number
          prize_pool: number
          max_slots: number
          starts_at: string
          status: "open" | "closed" | "in_progress" | "completed" | "cancelled"
          rules: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          game_id: string
          banner_url?: string | null
          format?: string
          entry_fee?: number
          prize_pool?: number
          max_slots?: number
          starts_at: string
          status?: "open" | "closed" | "in_progress" | "completed" | "cancelled"
          rules?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          game_id?: string
          banner_url?: string | null
          format?: string
          entry_fee?: number
          prize_pool?: number
          max_slots?: number
          starts_at?: string
          status?: "open" | "closed" | "in_progress" | "completed" | "cancelled"
          rules?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: "admin" | "moderator" | "player" | "support"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: "admin" | "moderator" | "player" | "support"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: "admin" | "moderator" | "player" | "support"
          created_at?: string
        }
      }
      wallet_transactions: {
        Row: {
          id: string
          user_id: string
          type: "deposit" | "withdrawal" | "stake" | "winnings" | "refund" | "fee"
          status: "pending" | "completed" | "failed" | "cancelled"
          amount: number
          balance_after: number | null
          reference: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: "deposit" | "withdrawal" | "stake" | "winnings" | "refund" | "fee"
          status?: "pending" | "completed" | "failed" | "cancelled"
          amount: number
          balance_after?: number | null
          reference?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: "deposit" | "withdrawal" | "stake" | "winnings" | "refund" | "fee"
          status?: "pending" | "completed" | "failed" | "cancelled"
          amount?: number
          balance_after?: number | null
          reference?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      wallets: {
        Row: {
          user_id: string
          balance: number
          locked: number
          currency: string
          updated_at: string
        }
        Insert: {
          user_id: string
          balance?: number
          locked?: number
          currency?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          balance?: number
          locked?: number
          currency?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof DatabaseWithoutInternals, "public">]

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
  PublicEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends PublicEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][PublicEnumNameOrOptions]
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
