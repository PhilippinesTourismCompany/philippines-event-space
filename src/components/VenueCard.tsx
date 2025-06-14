import React from 'react'
import { MapPin, Users, DollarSign, Square, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Venue {
  id: string
  name: string
  description: string
  location: string
  city: string
  province: string
  capacity_min: number
  capacity_max: number
  price_min: number
  price_max: number
  size_sqm: number
  event_types: string[]
  amenities: string[]
  images: string[]
  featured: boolean
  slug?: string
}

interface VenueCardProps {
  venue: Venue
  onClick?: () => void
}

// Function to generate slug from venue name
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

// Function to generate event type slug
const generateEventTypeSlug = (eventType: string): string => {
  return eventType
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export default function VenueCard({ venue, onClick }: VenueCardProps) {
  const navigate = useNavigate()

  const formatPrice = (min: number, max: number) => {
    return `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`
  }

  // Function to get the appropriate image for each venue
  const getVenueImage = (venue: Venue) => {
    // Use the new Peninsula Manila image if it's The Peninsula Manila
    if (venue.name.toLowerCase().includes('peninsula manila') || venue.name.toLowerCase().includes('peninsula')) {
      return '/image.png'
    }
    // Use the new Shangri-La image if it's Shangri-La
    if (venue.name.toLowerCase().includes('shangri-la') || venue.name.toLowerCase().includes('shangri la')) {
      return 'https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'
    }
    // Use the first image from the venue's images array, or fallback to a generic venue image
    return venue.images[0] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Generate venue path
      const citySlug = generateCitySlug(venue.city)
      const venueSlug = venue.slug || generateSlug(venue.name)
      navigate(`/${citySlug}/${venueSlug}`)
    }
  }

  const handleEventTypeClick = (eventType: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent venue card click
    const eventTypeSlug = generateEventTypeSlug(eventType)
    navigate(`/venues/${eventTypeSlug}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getVenueImage(venue)}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {venue.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {venue.name}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{venue.city}, {venue.province}</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {venue.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>{venue.capacity_min}-{venue.capacity_max} pax</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="h-4 w-4 mr-1" />
            <span>{venue.size_sqm} sqm</span>
          </div>
          <div className="flex items-center text-gray-600 col-span-2">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{formatPrice(venue.price_min, venue.price_max)}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <div className="flex flex-wrap gap-1">
            {venue.event_types.slice(0, 3).map((type, index) => (
              <button
                key={index}
                onClick={(e) => handleEventTypeClick(type, e)}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                {type}
              </button>
            ))}
            {venue.event_types.length > 3 && (
              <span className="text-xs text-gray-500">+{venue.event_types.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}