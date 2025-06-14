/*
  # Add Savoy Boracay Hotel and Event Venues

  1. New Hotel
    - `Savoy Boracay`
    - Luxury beachfront resort in Boracay Newcoast
    - Featured hotel with comprehensive amenities
    - Part of the Savoy Hotels & Resorts brand

  2. Event Venues
    - Sea Front Venue - Beachfront event space
    - Poolside & Beach - Pool area event space
    - Both with detailed descriptions and capacity information

  3. Features
    - Complete hotel information with amenities
    - Detailed venue specifications with multiple capacity configurations
    - High-quality images for all venues
*/

-- Insert Savoy Boracay Hotel
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
  'Savoy Boracay',
  'Luxury beachfront resort in Boracay Newcoast offering stunning venues for events and celebrations with pristine white sand beaches and crystal blue waters.',
  'Newcoast, Boracay Island',
  'Boracay',
  'Aklan',
  ARRAY[
    '/SAVOY-BORACAY-BEACHFRONT.webp',
    '/SAVOY-BORACAY-BEACH3.jpg',
    '/SAVOY-BORACAY-BEACHFRONT2.webp',
    '/SAVOY-BORACAY-POOL.webp'
  ],
  ARRAY[
    'Beachfront',
    'Swimming Pool',
    'Multiple Restaurants',
    'WiFi',
    'Spa',
    'Event Venues',
    'Wedding Planning Services',
    'Air Conditioning',
    'Room Service',
    'Concierge',
    'Airport Transfers',
    'Water Sports'
  ],
  true
);

-- Get the hotel ID for room insertions
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Savoy Boracay';

  -- Insert Sea Front Venue
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
    'Sea Front Venue',
    'May it be an intimate, grand or even corporate event, the pristine white beach at Newcoast can be transformed into your ideal venue. Let the crystal blue water and sound of the waves serve as your event backdrop. Our team of banquet specialists will work closely with you to bring to life your vision.',
    30.0,
    20.0,
    0.0, -- Open air
    600.0,
    200,
    150,
    300,
    100,
    80,
    0,
    0,
    ARRAY[
      'Beachfront',
      'Natural Lighting',
      'Ocean View',
      'Customizable Setup',
      'Wedding Planning Services',
      'Professional Sound System',
      'WiFi',
      'Catering Services'
    ],
    ARRAY[
      '/SAVOY-BORACAY-BEACHFRONT.webp',
      '/SAVOY-BORACAY-BEACH3.jpg',
      '/SAVOY-BORACAY-BEACHFRONT2.webp'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Sea Front Venue
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Wedding', 'full_day', 250000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']),
  (room_uuid, 'Corporate', 'full_day', 200000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Projector', 'Screen', 'Conference Tables', 'Chairs']),
  (room_uuid, 'Birthday', 'full_day', 180000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']),
  (room_uuid, 'Social', 'full_day', 220000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']);

  -- Insert Poolside & Beach
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
    'Poolside & Beach',
    'Make our swimming pools the stunning backdrop of your events. Beautiful banquet set ups and sea-inspired menus will further elevate your dream parties.',
    25.0,
    15.0,
    0.0, -- Open air
    375.0,
    150,
    100,
    200,
    80,
    60,
    0,
    0,
    ARRAY[
      'Poolside',
      'Ocean View',
      'Customizable Setup',
      'Professional Sound System',
      'Ambient Lighting',
      'Catering Services',
      'WiFi',
      'Event Planning Services'
    ],
    ARRAY[
      '/SAVOY-BORACAY-POOL.webp',
      '/SAVOY-BORACAY-KEYHOLE.webp'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Poolside & Beach
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Wedding', 'full_day', 200000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']),
  (room_uuid, 'Corporate', 'full_day', 180000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Projector', 'Screen', 'Conference Tables', 'Chairs']),
  (room_uuid, 'Birthday', 'full_day', 150000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']),
  (room_uuid, 'Social', 'full_day', 170000, 'PHP', ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']);

END $$;