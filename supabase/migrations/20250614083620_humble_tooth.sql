/*
  # Add Shangri-La Mactan Resort and Meeting Rooms

  1. New Hotel
    - `Shangri-La Mactan Resort & Spa, Cebu`
    - Located in Lapu-Lapu City, Cebu
    - Premium resort with comprehensive meeting facilities

  2. Meeting Rooms
    - Multiple function rooms with varying capacities
    - Professional audio-visual equipment
    - Flexible seating arrangements
    - Ocean and garden views

  3. Room Features
    - Detailed capacity configurations for different setups
    - Premium amenities including WiFi and AV equipment
    - Wheelchair accessible facilities
    - Professional event support
*/

-- Insert Shangri-La Mactan Resort
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
  'Shangri-La Mactan Resort & Spa, Cebu',
  'A luxury beachfront resort offering world-class meeting and event facilities with stunning ocean views. Our versatile function rooms and professional services make every event memorable.',
  'Punta Engaño Road, Lapu-Lapu City',
  'Lapu-Lapu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Beachfront Location',
    'Spa Services',
    'Multiple Restaurants',
    'Swimming Pool',
    'Fitness Center',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Room Service',
    'Laundry Service'
  ],
  true
);

-- Get the hotel ID for room insertions
DO $$
DECLARE
  hotel_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Shangri-La Mactan Resort & Spa, Cebu';

  -- Insert Hibiscus Room
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
    'Hibiscus',
    'An elegant function room with flexible seating arrangements and modern amenities, perfect for corporate meetings and social events.',
    12.0,
    8.0,
    3.5,
    96.0,
    80,
    60,
    100,
    40,
    30,
    24,
    35,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Natural Lighting',
      'Flexible Seating',
      'Professional Sound System',
      'Projection Screen',
      'Microphone System'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Bougainvillea Room
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
    'Bougainvillea',
    'A sophisticated meeting space with garden views, ideal for intimate gatherings and executive meetings.',
    10.0,
    7.0,
    3.5,
    70.0,
    60,
    40,
    70,
    30,
    24,
    18,
    28,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Garden View',
      'Natural Lighting',
      'Professional Sound System',
      'Projection Screen',
      'Wireless Microphones'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Sampaguita Room
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
    'Sampaguita',
    'A versatile function room perfect for workshops, seminars, and small corporate events with professional amenities.',
    9.0,
    6.0,
    3.5,
    54.0,
    45,
    30,
    50,
    24,
    18,
    14,
    20,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Flexible Layout',
      'Professional Sound System',
      'Projection Screen',
      'Whiteboard',
      'Flip Chart'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Ilang-Ilang Room
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
    'Ilang-Ilang',
    'An intimate meeting space ideal for board meetings, private dining, and exclusive gatherings.',
    8.0,
    5.0,
    3.5,
    40.0,
    30,
    20,
    35,
    18,
    12,
    10,
    16,
    ARRAY[
      'WiFi',
      'Advanced audio-visual technology',
      'Air Conditioning',
      'Executive Setting',
      'Professional Sound System',
      'LED Display',
      'Conference Phone',
      'Premium Furnishing'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Marigold Ballroom
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
    'Marigold Ballroom',
    'Our grand ballroom featuring elegant décor and state-of-the-art facilities, perfect for large conferences, gala dinners, and wedding receptions.',
    25.0,
    15.0,
    4.5,
    375.0,
    400,
    250,
    500,
    200,
    80,
    60,
    120,
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
      'Wheelchair Accessible Entrance'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
    ]
  );

  -- Insert Orchid Pavilion
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
    'Orchid Pavilion',
    'A stunning outdoor pavilion with ocean views, perfect for cocktail receptions, product launches, and al fresco dining events.',
    20.0,
    12.0,
    0.0,
    240.0,
    200,
    150,
    300,
    100,
    50,
    40,
    80,
    ARRAY[
      'WiFi',
      'Ocean View',
      'Outdoor Setting',
      'Natural Ventilation',
      'Professional Sound System',
      'Weather Protection',
      'Ambient Lighting',
      'Tropical Garden Setting',
      'Wheelchair Accessible Entrance'
    ],
    ARRAY[
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

  -- Insert Jasmine Terrace
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
    'Jasmine Terrace',
    'An elegant terrace space overlooking the resort gardens, ideal for intimate receptions and networking events.',
    15.0,
    10.0,
    0.0,
    150.0,
    120,
    80,
    150,
    60,
    35,
    25,
    45,
    ARRAY[
      'WiFi',
      'Garden View',
      'Outdoor Setting',
      'Natural Ventilation',
      'Ambient Lighting',
      'Professional Sound System',
      'Tropical Setting',
      'Weather Protection'
    ],
    ARRAY[
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  );

END $$;