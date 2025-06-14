/*
  # Update venue images with real venue photos

  1. Updates
    - Replace Pexels image references with real venue images from official websites
    - Update venue images to use authentic photos from hotel/venue websites
    - Ensure all venues have proper image URLs

  2. Changes
    - Peninsula Manila: Use official Peninsula image
    - Shangri-La venues: Use official Shangri-La images
    - Other venues: Use high-quality Unsplash images as placeholders
*/

-- Update Peninsula Manila with official image
UPDATE venues 
SET images = ARRAY['/image.png']
WHERE name ILIKE '%peninsula%' AND city = 'Manila';

-- Update Shangri-La venues with official images
UPDATE venues 
SET images = ARRAY['https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg']
WHERE name ILIKE '%shangri%la%';

-- Update other venues with high-quality venue images
UPDATE venues 
SET images = ARRAY['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80']
WHERE name NOT ILIKE '%peninsula%' 
  AND name NOT ILIKE '%shangri%la%' 
  AND (images IS NULL OR images = '{}' OR images[1] LIKE '%pexels%');

-- Update hotels with appropriate images
UPDATE hotels 
SET images = ARRAY['/image.png']
WHERE name ILIKE '%peninsula%';

UPDATE hotels 
SET images = ARRAY['https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg']
WHERE name ILIKE '%shangri%la%';

UPDATE hotels 
SET images = ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80']
WHERE name NOT ILIKE '%peninsula%' 
  AND name NOT ILIKE '%shangri%la%' 
  AND (images IS NULL OR images = '{}' OR images[1] LIKE '%pexels%');

-- Update room images
UPDATE rooms 
SET images = ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80']
WHERE images IS NULL OR images = '{}' OR images[1] LIKE '%pexels%';