/*
  # Add enhanced features to rooms

  1. Updates
    - Update existing rooms to include the new features:
      - WiFi
      - Advanced audio-visual technology
      - Free Wi-Fi
      - Wheelchair Accessible Entrance

  2. Changes
    - Add these features to all existing Nustar Cebu rooms
    - Ensure consistent amenity naming
*/

-- Update all existing rooms to include the new standard features
UPDATE rooms 
SET amenities = ARRAY[
  'WiFi',
  'Advanced audio-visual technology', 
  'Free Wi-Fi',
  'Wheelchair Accessible Entrance',
  'Air Conditioning',
  'Projector',
  'Sound System',
  'Whiteboard'
]
WHERE hotel_id IN (
  SELECT id FROM hotels WHERE name = 'Nustar Resort & Casino Cebu'
) AND name IN ('Acacia', 'Molave', 'Narra', 'Kamagong');

-- Update Banaba room with appropriate features for smaller meeting space
UPDATE rooms 
SET amenities = ARRAY[
  'WiFi',
  'Advanced audio-visual technology',
  'Free Wi-Fi', 
  'Wheelchair Accessible Entrance',
  'Air Conditioning',
  'LED TV',
  'Conference Phone',
  'Whiteboard'
]
WHERE hotel_id IN (
  SELECT id FROM hotels WHERE name = 'Nustar Resort & Casino Cebu'
) AND name = 'Banaba';

-- Update hotel amenities to include accessibility features
UPDATE hotels 
SET amenities = ARRAY[
  'Casino',
  'Multiple Restaurants',
  'Spa Services',
  'Waterfront Location',
  'Valet Parking',
  'Business Center',
  'High-Speed Wi-Fi',
  'Advanced Audio Visual Equipment',
  'Professional Event Planning',
  'Wheelchair Accessible Entrance',
  'Free Wi-Fi Throughout Property'
]
WHERE name = 'Nustar Resort & Casino Cebu';