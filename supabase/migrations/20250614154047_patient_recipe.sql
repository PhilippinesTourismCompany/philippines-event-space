/*
  # Add Dusit Thani Davao Hotel and Meeting Rooms

  1. New Tables
    - Add Dusit Thani Davao to hotels table
    - Add 5 meeting rooms (Riyadh Hall, Bangkok Hall, Manila Hall, Chiang Mai Hall, Phuket Hall)
    - Add pricing information for each room

  2. Security
    - Uses existing RLS policies
    - All data follows established patterns

  3. Features
    - Complete hotel information with amenities
    - Detailed room specifications with multiple capacity configurations
    - Pricing for different event types and durations
*/

-- Add Dusit Thani Davao to hotels table
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
  'Dusit Thani Davao',
  'Luxury hotel in Davao offering Thai-inspired hospitality with modern amenities and elegant event spaces.',
  'JP Laurel Avenue, Lanang',
  'Davao City',
  'Davao',
  ARRAY[
    '/dusit-thani-davao-logo.png',
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'WiFi', 
    'Spa', 
    'Multiple Restaurants', 
    'Swimming Pool', 
    'Fitness Center', 
    'Business Center', 
    'Ballroom'
  ],
  true
);

-- Get the hotel ID for Dusit Thani Davao and add rooms
DO $$
DECLARE
  dusit_hotel_id uuid;
  riyadh_room_id uuid;
  bangkok_room_id uuid;
  manila_room_id uuid;
  chiangmai_room_id uuid;
  phuket_room_id uuid;
BEGIN
  SELECT id INTO dusit_hotel_id FROM hotels WHERE name = 'Dusit Thani Davao';
  
  -- Add Riyadh Hall (Grand Ballroom)
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
    dusit_hotel_id,
    'Riyadh Hall',
    'The Riyadh Hall is a grand ballroom that can be divided into three separate function rooms. It features high ceilings, elegant chandeliers, and state-of-the-art audiovisual equipment.',
    30,
    20,
    6,
    600,
    800,
    500,
    1000,
    400,
    150,
    0,
    0,
    ARRAY[
      'WiFi', 
      'Audio Visual Equipment', 
      'Air Conditioning', 
      'Natural Light', 
      'Stage Area', 
      'Customizable Lighting'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    ]
  ) RETURNING id INTO riyadh_room_id;
  
  -- Add Bangkok Hall
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
    dusit_hotel_id,
    'Bangkok Hall',
    'The Bangkok Hall is a versatile function room ideal for medium-sized events. It offers a sophisticated setting with modern amenities and can be configured in various layouts.',
    15,
    12,
    4,
    180,
    200,
    120,
    250,
    100,
    60,
    40,
    70,
    ARRAY[
      'WiFi', 
      'Audio Visual Equipment', 
      'Air Conditioning', 
      'Natural Light', 
      'Projector Screen'
    ],
    ARRAY[
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
    ]
  ) RETURNING id INTO bangkok_room_id;
  
  -- Add Manila Hall
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
    dusit_hotel_id,
    'Manila Hall',
    'The Manila Hall is perfect for intimate gatherings and small corporate meetings. It provides a comfortable and elegant environment with all necessary business amenities.',
    10,
    8,
    3.5,
    80,
    80,
    50,
    100,
    40,
    30,
    24,
    36,
    ARRAY[
      'WiFi', 
      'Audio Visual Equipment', 
      'Air Conditioning', 
      'Videoconferencing', 
      'Whiteboard'
    ],
    ARRAY[
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    ]
  ) RETURNING id INTO manila_room_id;
  
  -- Add Chiang Mai Hall
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
    dusit_hotel_id,
    'Chiang Mai Hall',
    'The Chiang Mai Hall is designed for executive meetings and presentations. It features premium furnishings and advanced technology for productive business sessions.',
    12,
    8,
    3.5,
    96,
    90,
    60,
    120,
    45,
    35,
    28,
    40,
    ARRAY[
      'WiFi', 
      'Audio Visual Equipment', 
      'Air Conditioning', 
      'LED Displays', 
      'Executive Chairs'
    ],
    ARRAY[
      'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg'
    ]
  ) RETURNING id INTO chiangmai_room_id;
  
  -- Add Phuket Hall
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
    dusit_hotel_id,
    'Phuket Hall',
    'The Phuket Hall offers a bright and airy space for social events and business functions. It features large windows with garden views and flexible setup options.',
    14,
    10,
    4,
    140,
    150,
    100,
    180,
    80,
    50,
    36,
    60,
    ARRAY[
      'WiFi', 
      'Audio Visual Equipment', 
      'Air Conditioning', 
      'Natural Light', 
      'Garden View'
    ],
    ARRAY[
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
    ]
  ) RETURNING id INTO phuket_room_id;
  
  -- Add pricing for Riyadh Hall
  INSERT INTO room_pricing (
    room_id,
    event_type,
    duration_type,
    price,
    currency,
    includes
  ) VALUES 
  (
    riyadh_room_id,
    'Wedding',
    'full_day',
    250000,
    'PHP',
    ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Stage', 'Banquet Tables', 'Chairs']
  ),
  (
    riyadh_room_id,
    'Corporate',
    'full_day',
    200000,
    'PHP',
    ARRAY['Basic Setup', 'Sound System', 'Projector', 'Screen', 'Conference Tables', 'Chairs']
  );
  
  -- Add pricing for Bangkok Hall
  INSERT INTO room_pricing (
    room_id,
    event_type,
    duration_type,
    price,
    currency,
    includes
  ) VALUES (
    bangkok_room_id,
    'Corporate',
    'full_day',
    120000,
    'PHP',
    ARRAY['Basic Setup', 'Sound System', 'Projector', 'Screen', 'Conference Tables', 'Chairs']
  );
  
  -- Add pricing for Manila Hall
  INSERT INTO room_pricing (
    room_id,
    event_type,
    duration_type,
    price,
    currency,
    includes
  ) VALUES (
    manila_room_id,
    'Corporate',
    'half_day',
    50000,
    'PHP',
    ARRAY['Basic Setup', 'Sound System', 'Projector', 'Screen', 'Conference Tables', 'Chairs']
  );
  
  -- Add pricing for Chiang Mai Hall
  INSERT INTO room_pricing (
    room_id,
    event_type,
    duration_type,
    price,
    currency,
    includes
  ) VALUES (
    chiangmai_room_id,
    'Corporate',
    'half_day',
    60000,
    'PHP',
    ARRAY['Basic Setup', 'Sound System', 'Projector', 'Screen', 'Conference Tables', 'Chairs']
  );
  
  -- Add pricing for Phuket Hall
  INSERT INTO room_pricing (
    room_id,
    event_type,
    duration_type,
    price,
    currency,
    includes
  ) VALUES (
    phuket_room_id,
    'Social',
    'full_day',
    90000,
    'PHP',
    ARRAY['Basic Setup', 'Sound System', 'Lighting', 'Banquet Tables', 'Chairs']
  );
  
END $$;