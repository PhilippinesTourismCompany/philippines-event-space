import React from 'react'
import { MapPin, Building, Users, Wifi, Accessibility } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Hotel {
  id: string
  name: string
  description: string
  location: string
  city: string
  province: string
  images: string[]
  amenities: string[]
  featured: boolean
  room_count?: number
  slug?: string
}

interface HotelCardProps {
  hotel: Hotel
  onClick?: () => void
}

// Function to generate slug from hotel name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '') // Remove spaces
    .replace(/the\s*/g, '') // Remove "the" prefix
    .replace(/hotel|resort|spa|&/g, '') // Remove common words
    .trim()
}

// Function to generate city slug
const generateCitySlug = (city: string): string => {
  return city.toLowerCase().replace(/\s+/g, '')
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  const navigate = useNavigate()

  // Check for key accessibility and tech features
  const hasWifi = hotel.amenities.some(amenity => 
    amenity.toLowerCase().includes('wifi') || amenity.toLowerCase().includes('wi-fi')
  )
  const hasAccessibility = hotel.amenities.some(amenity => 
    amenity.toLowerCase().includes('wheelchair') || amenity.toLowerCase().includes('accessible')
  )

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Generate hotel path
      const citySlug = generateCitySlug(hotel.city)
      const hotelSlug = hotel.slug || generateSlug(hotel.name)
      navigate(`/${citySlug}/${hotelSlug}`)
    }
  }

  // Function to get the appropriate image for each hotel
  const getHotelImage = (hotel: Hotel) => {
    // Use the new Peninsula Manila image if it's The Peninsula Manila
    if (hotel.name.toLowerCase().includes('peninsula manila') || hotel.name.toLowerCase().includes('peninsula')) {
      return '/image.png'
    }
    // Use the new Shangri-La image if it's Shangri-La
    if (hotel.name.toLowerCase().includes('shangri-la') || hotel.name.toLowerCase().includes('shangri la')) {
      return 'https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'
    }
    // Use the Dusit Thani image if it's Dusit Thani
    if (hotel.name.toLowerCase().includes('dusit thani') || hotel.name.toLowerCase().includes('dusit')) {
      return '/dusit-logo-black.svg'
    }
    // Use the Hennan image if it's Hennan
    if (hotel.name.toLowerCase().includes('henann') || hotel.name.toLowerCase().includes('hennan')) {
      return 'https://www.henann.com/boracay/henannregency/images/logo.png'
    }
    // Use the bai Hotel image if it's bai Hotel
    if (hotel.name.toLowerCase().includes('bai hotel')) {
      return 'https://baihotel.com.ph/wp-content/uploads/2022/06/bai-hotel-cebu-logo.png'
    }
    // Use the Savoy image if it's Savoy
    if (hotel.name.toLowerCase().includes('savoy')) {
      return '/SAVOY-BORACAY-BEACHFRONT.webp'
    }
    // Use the first image from the hotel's images array, or fallback to a generic hotel image
    return hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getHotelImage(hotel)}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hotel.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        
        {/* Feature badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {hasWifi && (
            <div className="bg-blue-600 text-white p-1 rounded-md">
              <Wifi className="h-3 w-3" />
            </div>
          )}
          {hasAccessibility && (
            <div className="bg-green-600 text-white p-1 rounded-md">
              <Accessibility className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {hotel.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{hotel.city}, {hotel.province}</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {hotel.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-1" />
            <span>{hotel.room_count || 'Multiple'} rooms</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>Event facilities</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm">Key Features:</span>
            <div className="flex gap-1">
              {hasWifi && (
                <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  <Wifi className="h-3 w-3" />
                  <span>WiFi</span>
                </div>
              )}
              {hasAccessibility && (
                <div className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  <Accessibility className="h-3 w-3" />
                  <span>Accessible</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {hotel.amenities.slice(0, 2).map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 2 && (
              <span className="text-xs text-gray-500">+{hotel.amenities.length - 2} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}