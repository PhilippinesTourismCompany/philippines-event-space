/*
  # Add JPark Island Resort & Waterpark

  1. New Hotel
    - `JPark Island Resort & Waterpark, Cebu`
    - Luxury beachfront resort with waterpark
    - Located in Lapu-Lapu City, Cebu
    - Featured hotel with comprehensive amenities

  2. Meeting Rooms (8 venues)
    - Lapu-Lapu Ballroom (600 sqm) - Grand ballroom
    - Mactan Function Room (180 sqm) - Versatile mid-size venue
    - Cebu Function Room (120 sqm) - Flexible meeting space
    - Bohol Function Room (80 sqm) - Intimate venue
    - Siquijor Function Room (48 sqm) - Cozy meeting space
    - Camotes Function Room (54 sqm) - Executive boardroom
    - Bantayan Function Room (88 sqm) - Private venue
    - Poolside Pavilion (375 sqm) - Outdoor venue with waterpark views

  3. Room Pricing
    - Base pricing structure for all event types and durations
*/

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
  'A luxury beachfront resort featuring an exciting waterpark and world-class meeting facilities. Our versatile function rooms and outdoor venues provide the perfect setting for corporate events, weddings, and special celebrations.',
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
    'Kids Club',
    'Water Sports',
    'Multiple Restaurants',
    'Entertainment Programs',
    'Fitness Center',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Room Service',
    'Laundry Service',
    'Gift Shop',
    'Tour Desk'
  ],
  true
);

-- Get the hotel ID for room insertions
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
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
    'Our grand ballroom featuring elegant décor, stage platform, and state-of-the-art facilities. Perfect for large conferences, gala dinners, wedding receptions, and major corporate events.',
    30.0,
    20.0,
    4.5,
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
      'Professional Lighting',
      'Premium Sound System',
      'Multiple Projection Screens',
      'Wireless Microphones',
      'Stage Platform',
      'Dance Floor',
      'Wheelchair Accessible Entrance',
      'LED Display Screens',
      'Professional Spotlights'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Lapu-Lapu Ballroom
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'A versatile mid-size venue with flexible seating arrangements and natural lighting. Ideal for corporate meetings, seminars, product launches, and medium-scale events.',
    15.0,
    12.0,
    3.5,
    180.0,
    150,
    100,
    180,
    80,
    50,
    40,
    70,
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
      'Flip Chart'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Mactan Function Room
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'A flexible meeting space with modern amenities and comfortable seating. Perfect for workshops, training sessions, team meetings, and corporate presentations.',
    12.0,
    10.0,
    3.5,
    120.0,
    100,
    70,
    120,
    60,
    35,
    28,
    50,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Flexible Layout',
      'Professional Sound System',
      'Projection Screen',
      'Wireless Microphones',
      'Whiteboard',
      'Flip Chart',
      'Conference Phone'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Cebu Function Room
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'An intimate venue with personalized service and comfortable atmosphere. Ideal for small meetings, private dining, workshops, and exclusive gatherings.',
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
    35,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Intimate Setting',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Conference Phone',
      'Premium Furnishing'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Bohol Function Room
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'A cozy meeting space with modern technology and comfortable seating. Perfect for team meetings, brainstorming sessions, small workshops, and intimate discussions.',
    8.0,
    6.0,
    3.5,
    48.0,
    40,
    25,
    45,
    24,
    18,
    14,
    22,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Comfortable Atmosphere',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Whiteboard',
      'Conference Phone'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Siquijor Function Room
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'An executive boardroom with premium furnishing and advanced technology. Ideal for executive meetings, board discussions, VIP gatherings, and high-level negotiations.',
    9.0,
    6.0,
    3.5,
    54.0,
    45,
    30,
    50,
    28,
    20,
    16,
    25,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Executive Setting',
      'Premium Furnishing',
      'Professional Sound System',
      'LED Display',
      'Conference Phone',
      'Wireless Microphones',
      'Executive Chairs'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Camotes Function Room
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'A private venue with dedicated service and premium setting. Perfect for VIP meetings, special celebrations, private dining, and exclusive corporate events.',
    11.0,
    8.0,
    3.5,
    88.0,
    75,
    50,
    85,
    45,
    30,
    24,
    40,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Private Setting',
      'Dedicated Service',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Premium Furnishing',
      'Conference Phone'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Bantayan Function Room
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

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
    'A stunning outdoor venue with waterpark views and tropical garden setting. Perfect for cocktail receptions, team building activities, al fresco dining, and unique outdoor events.',
    25.0,
    15.0,
    0.0,
    375.0,
    300,
    200,
    400,
    150,
    80,
    60,
    120,
    ARRAY[
      'WiFi',
      'Waterpark Views',
      'Outdoor Setting',
      'Tropical Garden Setting',
      'Natural Ventilation',
      'Professional Sound System',
      'Weather Protection',
      'Ambient Lighting',
      'Pool Access',
      'Scenic Views',
      'Al Fresco Dining'
    ],
    ARRAY[
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Poolside Pavilion
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency, includes) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Corporate', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Wedding', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Birthday', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Conference', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Product Launch', 'package', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'hourly', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'half_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'full_day', 0, 'PHP', ARRAY[]::text[]),
  (room_uuid, 'Team Building', 'package', 0, 'PHP', ARRAY[]::text[]);

END $$;