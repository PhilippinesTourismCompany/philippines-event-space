import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      venues: {
        Row: {
          id: string
          name: string
          description: string
          location: string
          city: string
          province: string
          capacity_min: number
          capacity_max: number
          price_min: number
          price_max: number
          size_sqm: number
          event_types: string[]
          amenities: string[]
          images: string[]
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          location: string
          city: string
          province: string
          capacity_min: number
          capacity_max: number
          price_min: number
          price_max: number
          size_sqm: number
          event_types: string[]
          amenities: string[]
          images: string[]
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          location?: string
          city?: string
          province?: string
          capacity_min?: number
          capacity_max?: number
          price_min?: number
          price_max?: number
          size_sqm?: number
          event_types?: string[]
          amenities?: string[]
          images?: string[]
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          user_type: string
          company_name: string | null
          phone_number: string | null
          profile_status: string
          verification_date: string | null
          created_by: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          user_type?: string
          company_name?: string | null
          phone_number?: string | null
          profile_status?: string
          verification_date?: string | null
          created_by?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          user_type?: string
          company_name?: string | null
          phone_number?: string | null
          profile_status?: string
          verification_date?: string | null
          created_by?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          name: string
          description: string
          location: string
          city: string
          province: string
          images: string[]
          amenities: string[]
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          location: string
          city: string
          province: string
          images?: string[]
          amenities?: string[]
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          location?: string
          city?: string
          province?: string
          images?: string[]
          amenities?: string[]
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          hotel_id: string
          name: string
          description: string
          dimensions_length: number
          dimensions_width: number
          ceiling_height: number
          area_sqm: number
          capacity_theater: number
          capacity_banquet: number
          capacity_cocktail: number
          capacity_classroom: number
          capacity_u_shape: number
          capacity_boardroom: number
          capacity_hollow_square: number
          amenities: string[]
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_id: string
          name: string
          description?: string
          dimensions_length?: number
          dimensions_width?: number
          ceiling_height?: number
          area_sqm?: number
          capacity_theater?: number
          capacity_banquet?: number
          capacity_cocktail?: number
          capacity_classroom?: number
          capacity_u_shape?: number
          capacity_boardroom?: number
          capacity_hollow_square?: number
          amenities?: string[]
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string
          name?: string
          description?: string
          dimensions_length?: number
          dimensions_width?: number
          ceiling_height?: number
          area_sqm?: number
          capacity_theater?: number
          capacity_banquet?: number
          capacity_cocktail?: number
          capacity_classroom?: number
          capacity_u_shape?: number
          capacity_boardroom?: number
          capacity_hollow_square?: number
          amenities?: string[]
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      room_pricing: {
        Row: {
          id: string
          room_id: string
          event_type: string
          duration_type: string
          price: number
          currency: string
          includes: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          room_id: string
          event_type: string
          duration_type: string
          price?: number
          currency?: string
          includes?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          event_type?: string
          duration_type?: string
          price?: number
          currency?: string
          includes?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      user_types: {
        Row: {
          id: string
          type_name: string
          display_name: string
          description: string | null
          permissions: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type_name: string
          display_name: string
          description?: string | null
          permissions?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type_name?: string
          display_name?: string
          description?: string | null
          permissions?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      vendor_profiles: {
        Row: {
          id: string
          profile_id: string
          business_license: string | null
          service_categories: string[]
          service_areas: string[]
          portfolio_images: string[]
          certifications: string[]
          years_experience: number
          min_budget: number | null
          max_budget: number | null
          availability_schedule: any
          rating: number
          total_reviews: number
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          business_license?: string | null
          service_categories?: string[]
          service_areas?: string[]
          portfolio_images?: string[]
          certifications?: string[]
          years_experience?: number
          min_budget?: number | null
          max_budget?: number | null
          availability_schedule?: any
          rating?: number
          total_reviews?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          business_license?: string | null
          service_categories?: string[]
          service_areas?: string[]
          portfolio_images?: string[]
          certifications?: string[]
          years_experience?: number
          min_budget?: number | null
          max_budget?: number | null
          availability_schedule?: any
          rating?: number
          total_reviews?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      space_provider_profiles: {
        Row: {
          id: string
          profile_id: string
          business_license: string | null
          property_type: string | null
          total_venues: number
          total_capacity: number
          operating_hours: any
          cancellation_policy: string | null
          booking_lead_time: number
          rating: number
          total_reviews: number
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          business_license?: string | null
          property_type?: string | null
          total_venues?: number
          total_capacity?: number
          operating_hours?: any
          cancellation_policy?: string | null
          booking_lead_time?: number
          rating?: number
          total_reviews?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          business_license?: string | null
          property_type?: string | null
          total_venues?: number
          total_capacity?: number
          operating_hours?: any
          cancellation_policy?: string | null
          booking_lead_time?: number
          rating?: number
          total_reviews?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sponsor_profiles: {
        Row: {
          id: string
          profile_id: string
          industry: string | null
          company_size: string | null
          annual_budget: number | null
          sponsorship_types: string[]
          target_audience: string[]
          brand_guidelines: string | null
          logo_url: string | null
          website_url: string | null
          social_media_links: any
          previous_sponsorships: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          industry?: string | null
          company_size?: string | null
          annual_budget?: number | null
          sponsorship_types?: string[]
          target_audience?: string[]
          brand_guidelines?: string | null
          logo_url?: string | null
          website_url?: string | null
          social_media_links?: any
          previous_sponsorships?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          industry?: string | null
          company_size?: string | null
          annual_budget?: number | null
          sponsorship_types?: string[]
          target_audience?: string[]
          brand_guidelines?: string | null
          logo_url?: string | null
          website_url?: string | null
          social_media_links?: any
          previous_sponsorships?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      client_preferences: {
        Row: {
          id: string
          profile_id: string
          preferred_event_types: string[]
          preferred_locations: string[]
          budget_range_min: number | null
          budget_range_max: number | null
          guest_count_typical: number | null
          notification_preferences: any
          favorite_venues: string[]
          booking_history_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          preferred_event_types?: string[]
          preferred_locations?: string[]
          budget_range_min?: number | null
          budget_range_max?: number | null
          guest_count_typical?: number | null
          notification_preferences?: any
          favorite_venues?: string[]
          booking_history_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          preferred_event_types?: string[]
          preferred_locations?: string[]
          budget_range_min?: number | null
          budget_range_max?: number | null
          guest_count_typical?: number | null
          notification_preferences?: any
          favorite_venues?: string[]
          booking_history_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}