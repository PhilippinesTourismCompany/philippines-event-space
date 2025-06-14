/*
  # Add The Peninsula Manila Hotel

  1. New Hotel
    - `The Peninsula Manila`
      - Located in Makati City, Metro Manila
      - Luxury business hotel with premium meeting facilities
      - Featured hotel status
      - Comprehensive amenities list
      - Professional meeting and event spaces

  2. Meeting Rooms
    - `Conservatory` - Grand ballroom for large events
    - `Rigodon Ballroom` - Elegant ballroom with flexible setup
    - `Manila Room` - Executive meeting space
    - `Makati Room` - Corporate conference room
    - `Ayala Room` - Boardroom for intimate meetings
    - `Legaspi Room` - Small meeting room
    - `Rizal Room` - Private dining and meetings
    - `Salon de Ning` - VIP meeting space
    - `Garden Terrace` - Outdoor event space

  3. Pricing Structure
    - Complete pricing matrix for all event types and durations
    - Ready for admin configuration
*/

-- Insert The Peninsula Manila
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
  'The Peninsula Manila',
  'A luxury business hotel in the heart of Makati featuring world-class meeting facilities, elegant ballrooms, and sophisticated event spaces. Our professional venues offer state-of-the-art technology and impeccable service for corporate events, weddings, and special occasions.',
  'Corner of Ayala and Makati Avenues, Makati City',
  'Makati',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
  ],
  ARRAY[
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Room Service',
    'Laundry Service',
    'Spa Services',
    'Fitness Center',
    'Multiple Restaurants',
    'Bar & Lounge',
    'Shopping Arcade',
    'Airport Transfer',
    'Currency Exchange',
    'Safe Deposit Box',
    'Wheelchair Accessible',
    'Non-smoking Rooms',
    'Executive Lounge'
  ],
  true
);

-- Get the hotel ID for room insertions
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'The Peninsula Manila';

  -- Insert Conservatory
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
    'Conservatory',
    'Our grand ballroom featuring soaring ceilings, elegant chandeliers, and sophisticated décor. Perfect for large conferences, gala dinners, wedding receptions, and prestigious corporate events.',
    35.0,
    25.0,
    6.0,
    875.0,
    800,
    500,
    1000,
    400,
    150,
    100,
    200,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Elegant Chandeliers',
      'Professional Lighting',
      'Premium Sound System',
      'Multiple Projection Screens',
      'Wireless Microphones',
      'Stage Platform',
      'Dance Floor',
      'Wheelchair Accessible Entrance',
      'LED Display Screens',
      'Professional Spotlights',
      'Climate Control',
      'Marble Flooring'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Conservatory
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

  -- Insert Rigodon Ballroom
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
    'Rigodon Ballroom',
    'An elegant ballroom with flexible setup options and sophisticated ambiance. Ideal for medium to large-scale events, corporate functions, wedding celebrations, and social gatherings.',
    28.0,
    20.0,
    4.5,
    560.0,
    500,
    300,
    600,
    250,
    100,
    80,
    150,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Flexible Setup',
      'Professional Lighting',
      'Premium Sound System',
      'Multiple Projection Screens',
      'Wireless Microphones',
      'Stage Platform',
      'Dance Floor',
      'Wheelchair Accessible Entrance',
      'LED Display Screens',
      'Climate Control'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Rigodon Ballroom
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

  -- Insert Manila Room
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
    'Manila Room',
    'An executive meeting space with premium furnishing and advanced technology. Perfect for corporate meetings, board discussions, executive presentations, and high-level business gatherings.',
    18.0,
    12.0,
    3.5,
    216.0,
    180,
    120,
    200,
    100,
    60,
    50,
    80,
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
      'Executive Chairs',
      'Whiteboard',
      'Flip Chart',
      'Natural Lighting'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Manila Room
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

  -- Insert Makati Room
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
    'Makati Room',
    'A corporate conference room with flexible seating arrangements and modern amenities. Ideal for business meetings, training sessions, workshops, and corporate presentations.',
    15.0,
    10.0,
    3.5,
    150.0,
    120,
    80,
    140,
    70,
    45,
    35,
    60,
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
      'Conference Phone',
      'Natural Lighting'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Makati Room
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

  -- Insert Ayala Room
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
    'Ayala Room',
    'An intimate boardroom with premium furnishing and sophisticated atmosphere. Perfect for executive meetings, board discussions, VIP gatherings, and confidential business meetings.',
    12.0,
    8.0,
    3.5,
    96.0,
    80,
    50,
    90,
    45,
    30,
    24,
    40,
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
      'Executive Chairs',
      'Privacy Features'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Ayala Room
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

  -- Insert Legaspi Room
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
    'Legaspi Room',
    'A compact meeting room with modern amenities and comfortable seating. Ideal for small team meetings, brainstorming sessions, training workshops, and intimate discussions.',
    10.0,
    6.0,
    3.5,
    60.0,
    50,
    30,
    55,
    30,
    20,
    16,
    25,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Comfortable Atmosphere',
      'Professional Sound System',
      'LED Display',
      'Wireless Microphones',
      'Whiteboard',
      'Conference Phone',
      'Flip Chart'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Legaspi Room
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

  -- Insert Rizal Room
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
    'Rizal Room',
    'A versatile space perfect for private dining and meetings. Features elegant décor and flexible setup options for business lunches, private celebrations, and exclusive gatherings.',
    14.0,
    10.0,
    3.5,
    140.0,
    100,
    70,
    120,
    60,
    40,
    30,
    50,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Private Dining Setup',
      'Elegant Décor',
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

  -- Insert pricing for Rizal Room
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

  -- Insert Salon de Ning
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
    'Salon de Ning',
    'An exclusive VIP meeting space with luxurious furnishing and personalized service. Perfect for high-level executive meetings, VIP gatherings, confidential discussions, and prestigious events.',
    16.0,
    12.0,
    3.5,
    192.0,
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
      'VIP Setting',
      'Luxurious Furnishing',
      'Personalized Service',
      'Professional Sound System',
      'LED Display',
      'Conference Phone',
      'Wireless Microphones',
      'Executive Chairs',
      'Privacy Features',
      'Premium Amenities'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Salon de Ning
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

  -- Insert Garden Terrace
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
    'Garden Terrace',
    'A beautiful outdoor event space with garden views and natural ambiance. Perfect for cocktail receptions, networking events, product launches, and al fresco dining experiences.',
    20.0,
    15.0,
    0.0,
    300.0,
    250,
    180,
    350,
    120,
    70,
    50,
    100,
    ARRAY[
      'WiFi',
      'Garden Views',
      'Outdoor Setting',
      'Natural Ambiance',
      'Professional Sound System',
      'Weather Protection',
      'Ambient Lighting',
      'Al Fresco Dining',
      'Scenic Views',
      'Natural Ventilation',
      'Tropical Setting'
    ],
    ARRAY[
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    ]
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Garden Terrace
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