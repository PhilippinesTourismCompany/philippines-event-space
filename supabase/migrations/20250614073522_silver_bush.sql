/*
  # Create venues and profiles tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `is_admin` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `venues`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `city` (text)
      - `province` (text)
      - `capacity_min` (integer)
      - `capacity_max` (integer)
      - `price_min` (integer)
      - `price_max` (integer)
      - `size_sqm` (integer)
      - `event_types` (text array)
      - `amenities` (text array)
      - `images` (text array)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their data
    - Add admin policies for venue management
    
  3. Sample Data
    - Insert sample Philippine venues including Radisson Blu Cebu
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create venues table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  capacity_min integer NOT NULL DEFAULT 0,
  capacity_max integer NOT NULL DEFAULT 0,
  price_min integer NOT NULL DEFAULT 0,
  price_max integer NOT NULL DEFAULT 0,
  size_sqm integer NOT NULL DEFAULT 0,
  event_types text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Venues policies
CREATE POLICY "Anyone can read venues"
  ON venues
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage venues"
  ON venues
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample venues
INSERT INTO venues (
  name, description, location, city, province,
  capacity_min, capacity_max, price_min, price_max, size_sqm,
  event_types, amenities, images, featured
) VALUES
(
  'Radisson Blu Cebu',
  'Luxurious 5-star hotel venue perfect for weddings, corporate events, and social gatherings. Located in the heart of Cebu City with stunning city views.',
  'Serging Osmena Boulevard, Cebu IT Park',
  'Cebu City',
  'Cebu',
  50, 300, 80000, 200000, 400,
  ARRAY['Wedding', 'Corporate', 'Birthday', 'Anniversary'],
  ARRAY['Air Conditioning', 'Audio Visual Equipment', 'Catering Service', 'Parking', 'Wi-Fi'],
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
  ],
  true
),
(
  'Marco Polo Plaza Cebu',
  'Elegant ballroom with panoramic views of Cebu City. Premium venue for sophisticated events and celebrations.',
  'Nivel Hills, Apas',
  'Cebu City',
  'Cebu',
  100, 500, 120000, 300000, 600,
  ARRAY['Wedding', 'Corporate', 'Gala', 'Conference'],
  ARRAY['Grand Ballroom', 'Outdoor Terrace', 'Valet Parking', 'Bridal Suite'],
  ARRAY[
    'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  true
),
(
  'Shangri-La Makati',
  'Prestigious venue in the heart of Manila''s business district. Perfect for corporate events and luxury weddings.',
  'Ayala Avenue',
  'Makati City',
  'Metro Manila',
  80, 400, 100000, 250000, 500,
  ARRAY['Wedding', 'Corporate', 'Product Launch', 'Awards Night'],
  ARRAY['LED Wall', 'Professional Lighting', 'VIP Lounge', 'Business Center'],
  ARRAY[
    'https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  true
),
(
  'Okada Manila',
  'World-class entertainment complex with multiple event spaces. Ideal for large-scale events and celebrations.',
  'Entertainment City',
  'Paranaque City',
  'Metro Manila',
  200, 1000, 200000, 500000, 1200,
  ARRAY['Wedding', 'Corporate', 'Convention', 'Concert'],
  ARRAY['Multiple Ballrooms', 'Casino', 'Restaurants', 'Hotel Accommodation'],
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
  ],
  true
),
(
  'Dusit Thani Manila',
  'Classic elegance in the heart of Makati. Traditional venue with modern amenities for discerning clients.',
  'Ayala Center',
  'Makati City',
  'Metro Manila',
  75, 350, 90000, 220000, 450,
  ARRAY['Wedding', 'Corporate', 'Social', 'Reunion'],
  ARRAY['Crystal Chandelier', 'Garden Terrace', 'Spa Services', 'Fine Dining'],
  ARRAY[
    'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  true
),
(
  'The Peninsula Manila',
  'Timeless luxury and impeccable service. One of Manila''s most prestigious venues for exclusive events.',
  'Ayala Avenue corner Makati Avenue',
  'Makati City',
  'Metro Manila',
  60, 300, 110000, 280000, 380,
  ARRAY['Wedding', 'Corporate', 'Diplomatic', 'Fashion Show'],
  ARRAY['Rolls-Royce Fleet', 'Butler Service', 'Flower Arrangements', 'Champagne Service'],
  ARRAY[
    'https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg',
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
  ],
  false
),
(
  'Resorts World Manila',
  'Integrated resort with multiple venue options. Entertainment, dining, and accommodation all in one location.',
  'Newport City',
  'Pasay City',
  'Metro Manila',
  150, 800, 180000, 400000, 900,
  ARRAY['Wedding', 'Corporate', 'Trade Show', 'Gaming Tournament'],
  ARRAY['Casino', 'Theater', 'Shopping Mall', 'Multiple Restaurants'],
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg'
  ],
  false
),
(
  'Waterfront Hotel Lahug',
  'Cebu''s premier waterfront venue with spectacular sea views. Perfect for destination weddings and corporate retreats.',
  'Salinas Drive',
  'Cebu City',
  'Cebu',
  80, 400, 70000, 180000, 500,
  ARRAY['Wedding', 'Corporate', 'Team Building', 'Birthday'],
  ARRAY['Sea View', 'Swimming Pool', 'Spa', 'Water Sports'],
  ARRAY[
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
  ],
  false
);