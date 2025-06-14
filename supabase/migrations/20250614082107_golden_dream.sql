/*
  # Add hotels and rooms structure

  1. New Tables
    - `hotels`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `city` (text)
      - `province` (text)
      - `images` (text array)
      - `amenities` (text array)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `rooms`
      - `id` (uuid, primary key)
      - `hotel_id` (uuid, foreign key to hotels)
      - `name` (text)
      - `description` (text)
      - `dimensions_length` (decimal)
      - `dimensions_width` (decimal)
      - `ceiling_height` (decimal)
      - `area_sqm` (decimal)
      - `capacity_theater` (integer)
      - `capacity_banquet` (integer)
      - `capacity_cocktail` (integer)
      - `capacity_classroom` (integer)
      - `capacity_u_shape` (integer)
      - `capacity_boardroom` (integer)
      - `capacity_hollow_square` (integer)
      - `amenities` (text array)
      - `images` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `room_pricing`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key to rooms)
      - `event_type` (text)
      - `duration_type` (text) -- 'hourly', 'half_day', 'full_day', 'package'
      - `price` (decimal)
      - `currency` (text, default 'PHP')
      - `includes` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add admin policies for management

  3. Sample Data
    - Insert Nustar Cebu hotel
    - Insert all meeting rooms with specifications
*/

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  images text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  dimensions_length decimal(8,2),
  dimensions_width decimal(8,2),
  ceiling_height decimal(8,2),
  area_sqm decimal(8,2),
  capacity_theater integer DEFAULT 0,
  capacity_banquet integer DEFAULT 0,
  capacity_cocktail integer DEFAULT 0,
  capacity_classroom integer DEFAULT 0,
  capacity_u_shape integer DEFAULT 0,
  capacity_boardroom integer DEFAULT 0,
  capacity_hollow_square integer DEFAULT 0,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create room pricing table
CREATE TABLE IF NOT EXISTS room_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  duration_type text NOT NULL CHECK (duration_type IN ('hourly', 'half_day', 'full_day', 'package')),
  price decimal(10,2) DEFAULT 0,
  currency text DEFAULT 'PHP',
  includes text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_pricing ENABLE ROW LEVEL SECURITY;

-- Hotels policies
CREATE POLICY "Anyone can read hotels"
  ON hotels
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage hotels"
  ON hotels
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Rooms policies
CREATE POLICY "Anyone can read rooms"
  ON rooms
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage rooms"
  ON rooms
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Room pricing policies
CREATE POLICY "Anyone can read room pricing"
  ON room_pricing
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage room pricing"
  ON room_pricing
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Add update triggers
CREATE TRIGGER update_hotels_updated_at
  BEFORE UPDATE ON hotels
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_room_pricing_updated_at
  BEFORE UPDATE ON room_pricing
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Insert Nustar Cebu hotel
INSERT INTO hotels (
  name, description, location, city, province, images, amenities, featured
) VALUES (
  'Nustar Resort & Casino Cebu',
  'A premier integrated resort destination in Cebu offering world-class meeting and event facilities. Located in the South Road Properties with stunning waterfront views and state-of-the-art conference facilities.',
  'South Road Properties, Kawit',
  'Cebu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
    'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg'
  ],
  ARRAY[
    'Casino',
    'Multiple Restaurants',
    'Spa Services',
    'Waterfront Location',
    'Valet Parking',
    'Business Center',
    'High-Speed Wi-Fi',
    'Audio Visual Equipment',
    'Professional Event Planning'
  ],
  true
);

-- Get the hotel ID for inserting rooms
DO $$
DECLARE
    nustar_hotel_id uuid;
BEGIN
    SELECT id INTO nustar_hotel_id FROM hotels WHERE name = 'Nustar Resort & Casino Cebu';
    
    -- Insert Acacia room
    INSERT INTO rooms (
      hotel_id, name, description, dimensions_length, dimensions_width, 
      ceiling_height, area_sqm, capacity_theater, capacity_banquet, 
      capacity_cocktail, capacity_classroom, capacity_u_shape, 
      capacity_boardroom, capacity_hollow_square, amenities, images
    ) VALUES (
      nustar_hotel_id, 'Acacia', 
      'Spacious meeting room perfect for large conferences and events with flexible seating arrangements.',
      9.2, 8.9, 4, 81.88, 128, 50, 70, 45, 24, 24, 36,
      ARRAY['Air Conditioning', 'Projector', 'Sound System', 'Whiteboard', 'Wi-Fi'],
      ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
    );
    
    -- Insert Molave room
    INSERT INTO rooms (
      hotel_id, name, description, dimensions_length, dimensions_width, 
      ceiling_height, area_sqm, capacity_theater, capacity_banquet, 
      capacity_cocktail, capacity_classroom, capacity_u_shape, 
      capacity_boardroom, capacity_hollow_square, amenities, images
    ) VALUES (
      nustar_hotel_id, 'Molave', 
      'Versatile meeting space ideal for medium-sized corporate events and training sessions.',
      9.2, 7.9, 4, 72.68, 65, 40, 50, 36, 21, 20, 30,
      ARRAY['Air Conditioning', 'Projector', 'Sound System', 'Whiteboard', 'Wi-Fi'],
      ARRAY['https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg']
    );
    
    -- Insert Narra room
    INSERT INTO rooms (
      hotel_id, name, description, dimensions_length, dimensions_width, 
      ceiling_height, area_sqm, capacity_theater, capacity_banquet, 
      capacity_cocktail, capacity_classroom, capacity_u_shape, 
      capacity_boardroom, capacity_hollow_square, amenities, images
    ) VALUES (
      nustar_hotel_id, 'Narra', 
      'Elegant meeting room with the same specifications as Molave, perfect for parallel sessions.',
      9.2, 7.9, 4, 72.68, 65, 40, 50, 36, 21, 20, 30,
      ARRAY['Air Conditioning', 'Projector', 'Sound System', 'Whiteboard', 'Wi-Fi'],
      ARRAY['https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg']
    );
    
    -- Insert Banaba room
    INSERT INTO rooms (
      hotel_id, name, description, dimensions_length, dimensions_width, 
      ceiling_height, area_sqm, capacity_theater, capacity_banquet, 
      capacity_cocktail, capacity_classroom, capacity_u_shape, 
      capacity_boardroom, capacity_hollow_square, amenities, images
    ) VALUES (
      nustar_hotel_id, 'Banaba', 
      'Intimate meeting space perfect for small group discussions and board meetings.',
      4.7, 8.0, 4, 37.6, 40, 0, 30, 12, 0, 10, 0,
      ARRAY['Air Conditioning', 'LED TV', 'Conference Phone', 'Whiteboard', 'Wi-Fi'],
      ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
    );
    
    -- Insert Kamagong room
    INSERT INTO rooms (
      hotel_id, name, description, dimensions_length, dimensions_width, 
      ceiling_height, area_sqm, capacity_theater, capacity_banquet, 
      capacity_cocktail, capacity_classroom, capacity_u_shape, 
      capacity_boardroom, capacity_hollow_square, amenities, images
    ) VALUES (
      nustar_hotel_id, 'Kamagong', 
      'Premium meeting room with the largest capacity, ideal for major conferences and presentations.',
      10.8, 8.7, 4, 93.96, 128, 50, 70, 45, 24, 24, 36,
      ARRAY['Air Conditioning', 'Advanced AV System', 'Sound System', 'Lighting Control', 'Wi-Fi'],
      ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
    );
END $$;