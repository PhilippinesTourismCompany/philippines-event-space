/*
  # User Types and Enhanced Profile System

  1. Profile Updates
    - Add user_type field to profiles table
    - Add company_name field for business users
    - Add phone_number field
    - Add profile_status field for verification
    - Add created_by field for admin tracking

  2. New Tables
    - `user_types` - Define available user types
    - `vendor_profiles` - Extended profiles for service vendors
    - `space_provider_profiles` - Extended profiles for space providers
    - `sponsor_profiles` - Extended profiles for sponsors
    - `client_preferences` - Client preferences and history

  3. Security
    - Update RLS policies for new user types
    - Add role-based access control
    - Add verification status checks

  4. Sample Data
    - Insert default user types
    - Create sample profiles for each type
*/

-- Add new columns to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'user_type'
  ) THEN
    ALTER TABLE profiles ADD COLUMN user_type text DEFAULT 'client';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN company_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'profile_status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_status text DEFAULT 'pending';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'verification_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN verification_date timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE profiles ADD COLUMN created_by uuid REFERENCES profiles(id);
  END IF;
END $$;

-- Create user_types table
CREATE TABLE IF NOT EXISTS user_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  permissions text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vendor_profiles table
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_license text,
  service_categories text[] DEFAULT '{}',
  service_areas text[] DEFAULT '{}',
  portfolio_images text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  years_experience integer DEFAULT 0,
  min_budget numeric(10,2),
  max_budget numeric(10,2),
  availability_schedule jsonb,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create space_provider_profiles table
CREATE TABLE IF NOT EXISTS space_provider_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_license text,
  property_type text,
  total_venues integer DEFAULT 0,
  total_capacity integer DEFAULT 0,
  operating_hours jsonb,
  cancellation_policy text,
  booking_lead_time integer DEFAULT 7,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sponsor_profiles table
CREATE TABLE IF NOT EXISTS sponsor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  industry text,
  company_size text,
  annual_budget numeric(12,2),
  sponsorship_types text[] DEFAULT '{}',
  target_audience text[] DEFAULT '{}',
  brand_guidelines text,
  logo_url text,
  website_url text,
  social_media_links jsonb,
  previous_sponsorships text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create client_preferences table
CREATE TABLE IF NOT EXISTS client_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  preferred_event_types text[] DEFAULT '{}',
  preferred_locations text[] DEFAULT '{}',
  budget_range_min numeric(10,2),
  budget_range_max numeric(10,2),
  guest_count_typical integer,
  notification_preferences jsonb DEFAULT '{"email": true, "sms": false, "push": true}',
  favorite_venues uuid[] DEFAULT '{}',
  booking_history_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_preferences ENABLE ROW LEVEL SECURITY;

-- Add constraints
ALTER TABLE profiles ADD CONSTRAINT profiles_user_type_check 
  CHECK (user_type IN ('client', 'space_provider', 'event_vendor', 'sponsor', 'admin'));

ALTER TABLE profiles ADD CONSTRAINT profiles_status_check 
  CHECK (profile_status IN ('pending', 'verified', 'suspended', 'rejected'));

-- RLS Policies for user_types
CREATE POLICY "Anyone can read user types"
  ON user_types
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage user types"
  ON user_types
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- RLS Policies for vendor_profiles
CREATE POLICY "Vendors can read own profile"
  ON vendor_profiles
  FOR SELECT
  TO authenticated
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Vendors can manage own profile"
  ON vendor_profiles
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Anyone can read featured vendors"
  ON vendor_profiles
  FOR SELECT
  TO anon, authenticated
  USING (featured = true);

-- RLS Policies for space_provider_profiles
CREATE POLICY "Space providers can read own profile"
  ON space_provider_profiles
  FOR SELECT
  TO authenticated
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Space providers can manage own profile"
  ON space_provider_profiles
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Anyone can read featured space providers"
  ON space_provider_profiles
  FOR SELECT
  TO anon, authenticated
  USING (featured = true);

-- RLS Policies for sponsor_profiles
CREATE POLICY "Sponsors can read own profile"
  ON sponsor_profiles
  FOR SELECT
  TO authenticated
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Sponsors can manage own profile"
  ON sponsor_profiles
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

-- RLS Policies for client_preferences
CREATE POLICY "Clients can read own preferences"
  ON client_preferences
  FOR SELECT
  TO authenticated
  USING (
    profile_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Clients can manage own preferences"
  ON client_preferences
  FOR ALL
  TO authenticated
  USING (profile_id = auth.uid());

-- Add update triggers
CREATE TRIGGER update_vendor_profiles_updated_at
  BEFORE UPDATE ON vendor_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_space_provider_profiles_updated_at
  BEFORE UPDATE ON space_provider_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_sponsor_profiles_updated_at
  BEFORE UPDATE ON sponsor_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_client_preferences_updated_at
  BEFORE UPDATE ON client_preferences
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_types_updated_at
  BEFORE UPDATE ON user_types
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Insert default user types
INSERT INTO user_types (type_name, display_name, description, permissions) VALUES
(
  'client',
  'Client',
  'Event organizers and individuals looking to book venues and services',
  ARRAY['book_venues', 'view_pricing', 'leave_reviews', 'save_favorites']
),
(
  'space_provider',
  'Space Provider',
  'Venue owners and managers who list their spaces on the platform',
  ARRAY['manage_venues', 'manage_bookings', 'view_analytics', 'respond_to_inquiries']
),
(
  'event_vendor',
  'Event Service Vendor',
  'Service providers offering catering, photography, decoration, and other event services',
  ARRAY['manage_services', 'manage_bookings', 'view_analytics', 'showcase_portfolio']
),
(
  'sponsor',
  'Sponsor',
  'Companies and organizations looking to sponsor events and partner with venues',
  ARRAY['view_sponsorship_opportunities', 'manage_partnerships', 'access_analytics', 'brand_promotion']
),
(
  'admin',
  'Administrator',
  'Platform administrators with full system access',
  ARRAY['manage_all_users', 'manage_all_content', 'view_all_analytics', 'system_configuration', 'moderate_content']
);

-- Create function to automatically create extended profiles
CREATE OR REPLACE FUNCTION create_extended_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Create extended profile based on user type
  IF NEW.user_type = 'event_vendor' THEN
    INSERT INTO vendor_profiles (profile_id) VALUES (NEW.id);
  ELSIF NEW.user_type = 'space_provider' THEN
    INSERT INTO space_provider_profiles (profile_id) VALUES (NEW.id);
  ELSIF NEW.user_type = 'sponsor' THEN
    INSERT INTO sponsor_profiles (profile_id) VALUES (NEW.id);
  ELSIF NEW.user_type = 'client' THEN
    INSERT INTO client_preferences (profile_id) VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create extended profiles
CREATE TRIGGER create_extended_profile_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_extended_profile();

-- Update existing profiles to have default user_type
UPDATE profiles SET user_type = 'client' WHERE user_type IS NULL;
UPDATE profiles SET profile_status = 'verified' WHERE profile_status IS NULL;