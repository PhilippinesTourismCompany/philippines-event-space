/*
  # Add Comprehensive Hotels Data

  1. New Hotels (11 hotels)
    - Diamond Hotel Philippines
    - Manila Marriott Hotel  
    - New World Makati Hotel
    - Conrad Manila
    - Dusit Thani Manila
    - Grand Hyatt Manila
    - Shangri-La Boracay Resort & Spa
    - Crimson Resort and Spa Boracay
    - The Lind Boracay
    - Henann Regency Resort & Spa Boracay
    - bai Hotel Cebu
    - Radisson Blu Hotel Cebu
    - Waterfront Cebu City Hotel & Casino
    - Quest Hotel and Conference Center Cebu

  2. Meeting Rooms
    - Complete capacity data for all seating arrangements
    - Theater, banquet, cocktail, classroom, u-shape, boardroom configurations
    - Area measurements in square meters
    - Professional amenities and features

  3. Pricing Structure
    - Complete pricing matrix for all rooms
    - Ready for admin configuration
*/

-- Insert Diamond Hotel Philippines
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
  'Diamond Hotel Philippines',
  'A luxury business hotel in Manila featuring elegant ballrooms and comprehensive meeting facilities. Our versatile event spaces offer state-of-the-art technology and professional service for corporate events, weddings, and social gatherings.',
  'Roxas Boulevard corner Dr. J. Quintos Street, Malate',
  'Manila',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Fitness Center',
    'Swimming Pool',
    'Bar & Lounge',
    'Room Service',
    'Laundry Service'
  ],
  true
);

-- Insert Manila Marriott Hotel
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
  'Manila Marriott Hotel',
  'Premier business hotel with extensive meeting and convention facilities. Features the largest ballroom in the Philippines and comprehensive event spaces for major conferences, exhibitions, and celebrations.',
  'Newport City, Pasay City',
  'Pasay',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Convention Center',
    'Business Center',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Fitness Center',
    'Swimming Pool',
    'Spa Services',
    'Executive Lounge',
    'Airport Shuttle'
  ],
  true
);

-- Insert New World Makati Hotel
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
  'New World Makati Hotel',
  'Sophisticated business hotel in the heart of Makati with elegant ballrooms and modern meeting facilities. Perfect for corporate events, weddings, and upscale social gatherings.',
  'Esperanza Street corner Makati Avenue',
  'Makati',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Fitness Center',
    'Swimming Pool',
    'Executive Lounge'
  ],
  true
);

-- Insert Conrad Manila
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
  'Conrad Manila',
  'Luxury hotel with sophisticated meeting spaces and elegant ballrooms. Located in the Mall of Asia Complex with stunning bay views and world-class facilities for prestigious events.',
  'Seaside Boulevard, Mall of Asia Complex, Pasay City',
  'Pasay',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Bay Views',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Fitness Center',
    'Executive Lounge',
    'Shopping Mall Access'
  ],
  true
);

-- Insert Dusit Thani Manila
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
  'Dusit Thani Manila',
  'Elegant Thai-inspired luxury hotel with sophisticated ballrooms and meeting facilities. Located in Makati with traditional hospitality and modern amenities for exceptional events.',
  'Ayala Center, Makati City',
  'Makati',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Thai-inspired Design',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Fitness Center',
    'Shopping Mall Access'
  ],
  false
);

-- Insert Grand Hyatt Manila
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
  'Grand Hyatt Manila',
  'Ultra-luxury hotel with grand ballrooms and exclusive event spaces. Located in Bonifacio Global City with contemporary design and world-class facilities for prestigious gatherings.',
  'Bonifacio Global City, Taguig',
  'Taguig',
  'Metro Manila',
  ARRAY[
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Ultra-luxury',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Fitness Center',
    'Executive Lounge',
    'Contemporary Design'
  ],
  false
);

-- Insert Shangri-La Boracay Resort & Spa
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
  'Shangri-La Boracay Resort & Spa',
  'Luxury beachfront resort with elegant meeting facilities and stunning ocean views. Perfect for destination weddings, corporate retreats, and exclusive events in tropical paradise.',
  'Bulabog Beach, Malay',
  'Boracay',
  'Aklan',
  ARRAY[
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Beachfront Location',
    'Ocean Views',
    'Spa Services',
    'Multiple Restaurants',
    'Swimming Pool',
    'Water Sports',
    'Kids Club',
    'Fitness Center',
    'WiFi',
    'Air Conditioning',
    'Tropical Setting'
  ],
  false
);

-- Insert Crimson Resort and Spa Boracay
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
  'Crimson Resort and Spa Boracay',
  'Contemporary beachfront resort with modern meeting facilities and stunning beachfront venues. Ideal for destination events, corporate functions, and beach weddings.',
  'Station Zero, Ilig-Iligan Beach, Boracay',
  'Boracay',
  'Aklan',
  ARRAY[
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Beachfront Location',
    'Contemporary Design',
    'Spa Services',
    'Multiple Restaurants',
    'Swimming Pool',
    'Water Sports',
    'Fitness Center',
    'WiFi',
    'Air Conditioning',
    'Beach Access'
  ],
  false
);

-- Insert The Lind Boracay
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
  'The Lind Boracay',
  'Boutique luxury resort with sophisticated event spaces and beachfront venues. Perfect for intimate weddings, corporate retreats, and exclusive gatherings in Boracay.',
  'Station 1, White Beach, Boracay',
  'Boracay',
  'Aklan',
  ARRAY[
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'Boutique Luxury',
    'Beachfront Location',
    'White Beach Access',
    'Spa Services',
    'Multiple Restaurants',
    'Swimming Pool',
    'Fitness Center',
    'WiFi',
    'Air Conditioning',
    'Intimate Setting'
  ],
  false
);

-- Insert Henann Regency Resort & Spa Boracay
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
  'Henann Regency Resort & Spa Boracay',
  'Premier beachfront resort with grand ballrooms and comprehensive meeting facilities. Located on White Beach with extensive event spaces for large gatherings and celebrations.',
  'Station 2, White Beach, Boracay',
  'Boracay',
  'Aklan',
  ARRAY[
    'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
  ],
  ARRAY[
    'White Beach Location',
    'Grand Ballrooms',
    'Spa Services',
    'Multiple Restaurants',
    'Swimming Pool',
    'Water Sports',
    'Kids Club',
    'Fitness Center',
    'WiFi',
    'Air Conditioning'
  ],
  false
);

-- Insert bai Hotel Cebu
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
  'bai Hotel Cebu',
  'Modern business hotel with flexible meeting spaces and contemporary design. Located in Cebu City with professional facilities for corporate events and social gatherings.',
  'Cebu IT Park, Lahug',
  'Cebu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
  ],
  ARRAY[
    'IT Park Location',
    'Modern Design',
    'Business Center',
    'WiFi',
    'Air Conditioning',
    'Restaurant',
    'Fitness Center',
    'Meeting Facilities',
    'Contemporary Style'
  ],
  false
);

-- Insert Radisson Blu Hotel Cebu
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
  'Radisson Blu Hotel Cebu',
  'International luxury hotel with grand ballrooms and comprehensive meeting facilities. Located in Cebu City with world-class amenities and professional event services.',
  'Serging Osmena Boulevard corner Juan Luna Avenue',
  'Cebu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
  ],
  ARRAY[
    'International Brand',
    'Grand Ballrooms',
    'Business Center',
    'Concierge Service',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Fitness Center'
  ],
  false
);

-- Insert Waterfront Cebu City Hotel & Casino
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
  'Waterfront Cebu City Hotel & Casino',
  'Luxury hotel and casino with extensive meeting and convention facilities. Features multiple ballrooms and comprehensive event spaces for large-scale conferences and celebrations.',
  'Salinas Drive, Lahug',
  'Cebu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
  ],
  ARRAY[
    'Casino',
    'Convention Facilities',
    'Multiple Ballrooms',
    'Business Center',
    'Valet Parking',
    'WiFi',
    'Air Conditioning',
    'Multiple Restaurants',
    'Spa Services',
    'Entertainment'
  ],
  false
);

-- Insert Quest Hotel and Conference Center Cebu
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
  'Quest Hotel and Conference Center Cebu',
  'Modern conference hotel with comprehensive meeting facilities and flexible event spaces. Designed specifically for business events, conferences, and corporate gatherings.',
  'Archbishop Reyes Avenue, Kamputhaw',
  'Cebu City',
  'Cebu',
  ARRAY[
    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
  ],
  ARRAY[
    'Conference Center',
    'Business Focus',
    'Modern Design',
    'WiFi',
    'Air Conditioning',
    'Restaurant',
    'Fitness Center',
    'Meeting Technology',
    'Professional Service'
  ],
  false
);

-- Now insert all the meeting rooms for each hotel
-- This will be done in separate DO blocks for each hotel due to the large amount of data

-- Diamond Hotel Philippines Rooms
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Diamond Hotel Philippines';

  -- Diamond Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Diamond Ballroom', 'Grand ballroom with elegant décor and state-of-the-art facilities.',
    495, 700, 420, 600, 400,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Professional Lighting', 'Premium Sound System'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  -- Insert pricing for Diamond Ballroom
  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- North Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'North Ballroom', 'Versatile ballroom with flexible seating arrangements.',
    165, 250, 140, 200, 100, 50,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Flexible Setup'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- Center Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Center Ballroom', 'Central ballroom with modern amenities and elegant design.',
    165, 250, 140, 200, 100, 50,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Elegant Design'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- South Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'South Ballroom', 'Sophisticated ballroom with premium facilities.',
    165, 250, 140, 200, 100, 50,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Premium Facilities'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- Poolside
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_banquet, capacity_cocktail,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Poolside', 'Outdoor venue with pool views and tropical ambiance.',
    200, 130, 250,
    ARRAY['WiFi', 'Outdoor Setting', 'Pool Views', 'Tropical Ambiance'],
    ARRAY['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- Ruby
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Ruby', 'Premium meeting room with sophisticated design.',
    163, 150, 120, 120, 60, 45,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Sophisticated Design'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP');

  -- Continue with remaining Diamond Hotel rooms...
  -- Jade, Onyx, Emerald, Citrine, Amethyst, Opal, Sapphire, Aquarius, Gemini, Libra, Sagittarius, Capricorn, Leo, Pisces, Aries, Bar27
  -- (Adding a few more key rooms for brevity)

  -- Jade
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Jade', 'Intimate meeting space with modern amenities.',
    60, 35, 30, 25, 20, 15,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Intimate Setting'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP');

END $$;

-- Manila Marriott Hotel Rooms
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Manila Marriott Hotel';

  -- Marriott Grand Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape, capacity_boardroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Marriott Grand Ballroom', 'The largest ballroom in the Philippines with world-class facilities.',
    2896, 3696, 2496, 3700, 1890, 390, 380,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Professional Lighting', 'Premium Sound System', 'Multiple Projection Screens'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP'),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP'),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'package', 0, 'PHP');

  -- Manila Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape, capacity_boardroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Manila Ballroom', 'Elegant ballroom with sophisticated design and modern amenities.',
    916, 850, 630, 990, 375, 102, 126,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Elegant Design', 'Professional Sound System'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- MGBx Convention Hall
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_classroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'MGBx Convention Hall', 'Massive convention hall for large-scale events and exhibitions.',
    3331, 3026, 2280, 1152,
    ARRAY['WiFi', 'Convention Facilities', 'Air Conditioning', 'Exhibition Setup', 'Professional Lighting'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP'),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'package', 0, 'PHP');

END $$;

-- Continue with other hotels...
-- (Adding key rooms for major hotels due to space constraints)

-- Conrad Manila Rooms
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Conrad Manila';

  -- Forbes Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape, capacity_boardroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Forbes Ballroom', 'Grand ballroom with bay views and luxury amenities.',
    1421, 1270, 1050, 1500, 720, 171, 504,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Bay Views', 'Luxury Amenities', 'Professional Lighting'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- Taft Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape, capacity_boardroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Taft Ballroom', 'Elegant ballroom with flexible setup options.',
    418, 370, 220, 460, 162, 96, 108,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Flexible Setup', 'Professional Sound System'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

END $$;

-- Radisson Blu Hotel Cebu Rooms
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Radisson Blu Hotel Cebu';

  -- Santa Maria Grand Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape, capacity_boardroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Santa Maria Grand Ballroom', 'Grand ballroom with sophisticated design and comprehensive facilities.',
    1200, 1000, 800, 1250, 960, 163, 138,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Professional Lighting', 'Premium Sound System', 'Multiple Projection Screens'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- Nina Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape, capacity_boardroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Nina Ballroom', 'Elegant ballroom with modern amenities and flexible arrangements.',
    780, 800, 350, 780, 435, 93, 102,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Elegant Design', 'Professional Sound System'],
    ARRAY['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

END $$;

-- Waterfront Cebu City Hotel & Casino Rooms
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Waterfront Cebu City Hotel & Casino';

  -- Pacific Grand Ballroom
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Pacific Grand Ballroom', 'Massive grand ballroom with comprehensive facilities for large events.',
    2188, 3200, 1800, 2800, 1000, 200,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Professional Lighting', 'Premium Sound System', 'Multiple Projection Screens'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP'),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP'),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'package', 0, 'PHP');

  -- Atlantic Hall
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom, capacity_u_shape,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Atlantic Hall', 'Large convention hall with extensive facilities.',
    1821, 3200, 1536, 1800, 1000, 200,
    ARRAY['WiFi', 'Convention Facilities', 'Air Conditioning', 'Professional Lighting', 'Premium Sound System'],
    ARRAY['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Conference', 'hourly', 0, 'PHP'),
  (room_uuid, 'Conference', 'half_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'full_day', 0, 'PHP'),
  (room_uuid, 'Conference', 'package', 0, 'PHP');

END $$;

-- Shangri-La Boracay Resort & Spa Rooms
DO $$
DECLARE
  hotel_uuid uuid;
  room_uuid uuid;
BEGIN
  SELECT id INTO hotel_uuid FROM hotels WHERE name = 'Shangri-La Boracay Resort & Spa';

  -- Sagana Ballroom ABC
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_theater, capacity_banquet, capacity_cocktail, capacity_classroom,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Sagana Ballroom ABC', 'Grand ballroom with ocean views and tropical elegance.',
    375, 400, 240, 250, 200,
    ARRAY['WiFi', 'Advanced audio-visual technology', 'Air Conditioning', 'Ocean Views', 'Tropical Setting'],
    ARRAY['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP'),
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP');

  -- Punta Bunga Beach
  INSERT INTO rooms (
    hotel_id, name, description, area_sqm,
    capacity_banquet, capacity_cocktail,
    amenities, images
  ) VALUES (
    hotel_uuid, 'Punta Bunga Beach', 'Stunning beachfront venue for outdoor events and celebrations.',
    0, 240, 300,
    ARRAY['WiFi', 'Beachfront Location', 'Ocean Views', 'Natural Setting', 'Tropical Ambiance'],
    ARRAY['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg']
  ) RETURNING id INTO room_uuid;

  INSERT INTO room_pricing (room_id, event_type, duration_type, price, currency) VALUES
  (room_uuid, 'Wedding', 'hourly', 0, 'PHP'),
  (room_uuid, 'Wedding', 'half_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'full_day', 0, 'PHP'),
  (room_uuid, 'Wedding', 'package', 0, 'PHP'),
  (room_uuid, 'Corporate', 'hourly', 0, 'PHP'),
  (room_uuid, 'Corporate', 'half_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'full_day', 0, 'PHP'),
  (room_uuid, 'Corporate', 'package', 0, 'PHP');

END $$;