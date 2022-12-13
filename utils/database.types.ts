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
      },
      shops: {
        Row: {
          shopID: string
          vendorID: string
          shopName: string
          shopDescription: string
          open: boolean
          timeOpen: string
          timeClosed: string
          messagesOn: boolean
          liveTracking: boolean
        }
        Insert: {
          shopID: string
          vendorID: string
          shopName: string
          shopDescription: string
          open: boolean
          timeOpen: string
          timeClosed: string
          messagesOn: boolean
          liveTracking: boolean
        }
        Update: {
          shopID: string
          vendorID: string
          shopName: string
          shopDescription: string
          open: boolean
          timeOpen: string
          timeClosed: string
          messagesOn: boolean
          liveTracking: boolean
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