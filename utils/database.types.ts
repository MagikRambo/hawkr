export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[] 

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          uuid: string
          state: number | null
          name: string | null
          description: string | null
        }
        Insert: {
          uuid: string
          state?: number | null
          name?: string | null
          description?: string | null
        }
        Update: {
          uuid: string
          state?: number | null
          name?: string | null
          description?: string | null
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
  }
}