import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if environment variables are available (graceful fallback for build time)
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          name?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      trends: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          platform: string;
          relevance_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          category: string;
          platform: string;
          relevance_score?: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          category?: string;
          relevance_score?: number;
        };
      };
      preferences: {
        Row: {
          id: string;
          user_id: string;
          platforms: string[];
          categories: string[];
          frequency: string;
          email_notifications: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platforms?: string[];
          categories?: string[];
          frequency?: string;
          email_notifications?: boolean;
          updated_at?: string;
        };
        Update: {
          platforms?: string[];
          categories?: string[];
          frequency?: string;
          email_notifications?: boolean;
          updated_at?: string;
        };
      };
    };
  };
};
