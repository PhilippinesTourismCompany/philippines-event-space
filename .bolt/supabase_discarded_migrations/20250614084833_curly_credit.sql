/*
  # Add JPark Island Resort and update Shangri-La as featured

  1. New Hotel
    - `JPark Island Resort & Waterpark, Cebu`
      - Luxury beachfront resort with comprehensive meeting facilities
      - Multiple function rooms and outdoor venues
      - Waterpark and recreational amenities

  2. New Rooms (8 venues from JPark)
    - Lapu-Lapu Ballroom - Grand ballroom for large events
    - Mactan Function Room - Mid-size corporate events
    - Cebu Function Room - Flexible meeting space
    - Bohol Function Room - Intimate gatherings
    - Siquijor Function Room - Small meetings
    - Camotes Function Room - Board meetings
    - Bantayan Function Room - Private events
    - Poolside Pavilion - Outdoor events

  3. Updates
    - Set Shangri-La Mactan Resort as featured venue
    - Add comprehensive amenities and features
    - Include pricing structure setup (empty for now)

  4. Security
    - All tables already have RLS enabled
    - Existing policies apply to new records
*/

-- Update Shangri-La Mactan Resort to be featured
UPDATE hotels 
SET featured = true 
WHERE name = 'Shangri-La Mactan Resort & Spa, Cebu';

-- Insert JPark Island Resort & Waterpark
INSERT INTO hotels (
  name,
  description,
  location,
  city,
  province,
  images,
  amenities,
  featured
) VALUES (
  'JPark Island Resort & Waterpark, Cebu',
  'A premier beachfront resort and waterpark destination offering world-class meeting facilities, recreational amenities, and exceptional hospitality. Perfect for corporate retreats, conferences, and special events.',
  'M.L. Quezon Highway, Lapu-Lapu City',
  'Lapu-Lapu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg'
  ],
  ARRAY[
    'Waterpark Access',
    'Beachfront Location',
    'Multiple Swimming Pools',
    'Spa Services',
    'Multiple Restaurants',
    'Fitness Center',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Room Service',
    'Laundry Service',
    'Water Sports',
    'Kids Club',
    'Entertainment Programs'
  ],
  true
);

-- Get the hotel ID for room insertions
DO $$
DECLARE
  hotel_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'JPark Island Resort & Waterpark, Cebu';

  -- Insert Lapu-Lapu Ballroom
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Lapu-Lapu Ballroom',
    'Our grand ballroom featuring elegant design and state-of-the-art facilities, perfect for large conferences, gala dinners, weddings, and corporate events with capacity for up to 500 guests.',
    30.0,
    20.0,
    5.0,
    600.0,
    500,
    350,
    600,
    250,
    100,
    80,
    150,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Elegant Décor',
      'Professional Lighting',
      'Premium Sound System',
      'Multiple Projection Screens',
      'Wireless Microphones',
      'Stage Platform',
      'Dance Floor',
      'Wheelchair Accessible Entrance',
      'Dedicated Entrance',
      'Pre-function Area'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
    ]
  );

  -- Insert Mactan Function Room
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Mactan Function Room',
    'A versatile mid-size function room ideal for corporate meetings, seminars, product launches, and social gatherings with flexible seating arrangements.',
    15.0,
    12.0,
    4.0,
    180.0,
    150,
    100,
    180,
    80,
    45,
    35,
    60,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Natural Lighting',
      'Flexible Seating',
      'Professional Sound System',
      'Projection Screen',
      'Wireless Microphones',
      'Whiteboard',
      'Flip Chart',
      'Wheelchair Accessible Entrance'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Cebu Function Room
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Cebu Function Room',
    'A flexible meeting space perfect for workshops, training sessions, and corporate meetings with modern amenities and comfortable seating.',
    12.0,
    10.0,
    4.0,
    120.0,
    100,
    70,
    120,
    60,
    35,
    25,
    45,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Natural Lighting',
      'Flexible Layout',
      'Professional Sound System',
      'Projection Screen',
      'Wireless Microphones',
      'Whiteboard',
      'Flip Chart'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Bohol Function Room
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Bohol Function Room',
    'An intimate function room ideal for small corporate meetings, private dining, and exclusive gatherings with personalized service.',
    10.0,
    8.0,
    3.5,
    80.0,
    70,
    50,
    80,
    40,
    25,
    20,
    30,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Intimate Setting',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Executive Furnishing'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Siquijor Function Room
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Siquijor Function Room',
    'A cozy meeting space perfect for small team meetings, brainstorming sessions, and intimate business discussions.',
    8.0,
    6.0,
    3.5,
    48.0,
    40,
    25,
    45,
    24,
    15,
    12,
    20,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Cozy Atmosphere',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Comfortable Seating'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Camotes Function Room
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Camotes Function Room',
    'A professional boardroom-style meeting space ideal for executive meetings, board discussions, and high-level business conferences.',
    9.0,
    6.0,
    3.5,
    54.0,
    45,
    30,
    50,
    25,
    18,
    16,
    22,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Executive Setting',
      'Professional Sound System',
      'LED Display',
      'Conference Phone',
      'Premium Furnishing',
      'Wireless Microphones'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Bantayan Function Room
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Bantayan Function Room',
    'A private function room perfect for exclusive events, VIP meetings, and special celebrations with personalized service and attention to detail.',
    11.0,
    8.0,
    3.5,
    88.0,
    75,
    55,
    85,
    45,
    28,
    22,
    35,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Private Setting',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Premium Furnishing',
      'Dedicated Service'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Poolside Pavilion
  INSERT INTO rooms (
    hotel_id,
    name,
    description,
    dimensions_length,
    dimensions_width,
    ceiling_height,
    area_sqm,
    capacity_theater,
    capacity_banquet,
    capacity_cocktail,
    capacity_classroom,
    capacity_u_shape,
    capacity_boardroom,
    capacity_hollow_square,
    amenities,
    images
  ) VALUES (
    hotel_uuid,
    'Poolside Pavilion',
    'A stunning outdoor venue with pool and garden views, perfect for cocktail receptions, team building activities, product launches, and al fresco events.',
    25.0,
    15.0,
    0.0,
    375.0,
    300,
    200,
    400,
    150,
    70,
    50,
    100,
    ARRAY[
      'WiFi',
      'Pool View',
      'Outdoor Setting',
      'Natural Ventilation',
      'Professional Sound System',
      'Weather Protection',
      'Ambient Lighting',
      'Tropical Garden Setting',
      'Pool Access',
      'Waterpark Views',
      'Wheelchair Accessible Entrance'
    ],
    ARRAY[
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg'
    ]
  );

END $$;

-- Create empty pricing records for all JPark rooms
DO $$
DECLARE
  room_record RECORD;
  event_types TEXT[] := ARRAY['Corporate', 'Wedding', 'Birthday', 'Conference', 'Product Launch', 'Team Building'];
  duration_types TEXT[] := ARRAY['hourly', 'half_day', 'full_day', 'package'];
  event_type TEXT;
  duration_type TEXT;
BEGIN
  -- Get all rooms for JPark Island Resort
  FOR room_record IN 
    SELECT r.id 
    FROM rooms r 
    JOIN hotels h ON r.hotel_id = h.id 
    WHERE h.name = 'JPark Island Resort & Waterpark, Cebu'
  LOOP
    -- Create pricing records for each combination
    FOREACH event_type IN ARRAY event_types
    LOOP
      FOREACH duration_type IN ARRAY duration_types
      LOOP
        INSERT INTO room_pricing (
          room_id,
          event_type,
          duration_type,
          price,
          currency,
          includes
        ) VALUES (
          room_record.id,
          event_type,
          duration_type,
          0, -- Empty price for now
          'PHP',
          ARRAY[]::text[] -- Empty includes for now
        );
      END LOOP;
    END LOOP;
  END LOOP;
END $$;