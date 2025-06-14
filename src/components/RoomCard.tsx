import React from 'react'
import { Users, Square, Ruler, Building, Wifi, Volume2, Accessibility } from 'lucide-react'

interface Room {
  id: string
  hotel_id: string
  name: string
  description: string
  dimensions_length: number
  dimensions_width: number
  ceiling_height: number
  area_sqm: number
  capacity_theater: number
  capacity_banquet: number
  capacity_cocktail: number
  capacity_classroom: number
  capacity_u_shape: number
  capacity_boardroom: number
  capacity_hollow_square: number
  amenities: string[]
  images: string[]
}

interface RoomCardProps {
  room: Room
  hotelName?: string
  onClick?: () => void
}

export default function RoomCard({ room, hotelName, onClick }: RoomCardProps) {
  const maxCapacity = Math.max(
    room.capacity_theater,
    room.capacity_banquet,
    room.capacity_cocktail,
    room.capacity_classroom,
    room.capacity_u_shape,
    room.capacity_boardroom,
    room.capacity_hollow_square
  )

  // Helper function to get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('wi-fi')) {
      return <Wifi className="h-3 w-3" />
    }
    if (lowerAmenity.includes('audio') || lowerAmenity.includes('sound')) {
      return <Volume2 className="h-3 w-3" />
    }
    if (lowerAmenity.includes('wheelchair') || lowerAmenity.includes('accessible')) {
      return <Accessibility className="h-3 w-3" />
    }
    return null
  }

  // Separate key features from other amenities
  const keyFeatures = room.amenities.filter(amenity => {
    const lower = amenity.toLowerCase()
    return lower.includes('wifi') || 
           lower.includes('audio-visual') || 
           lower.includes('wheelchair') ||
           lower.includes('accessible')
  })

  const otherAmenities = room.amenities.filter(amenity => {
    const lower = amenity.toLowerCase()
    return !lower.includes('wifi') && 
           !lower.includes('audio-visual') && 
           !lower.includes('wheelchair') &&
           !lower.includes('accessible')
  })

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          {hotelName && (
            <p className="text-xs text-blue-600 font-medium mb-1">{hotelName}</p>
          )}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {room.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Square className="h-4 w-4 mr-1" />
            <span>{room.area_sqm} sqm</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>Up to {maxCapacity} pax</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Ruler className="h-4 w-4 mr-1" />
            <span>{room.dimensions_length}m × {room.dimensions_width}m</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-1" />
            <span>{room.ceiling_height}m ceiling</span>
          </div>
        </div>

        {/* Key Features */}
        {keyFeatures.length > 0 && (
          <div className="mb-3">
            <span className="font-semibold block mb-2 text-sm text-blue-700">Key Features:</span>
            <div className="flex flex-wrap gap-1">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                  {getAmenityIcon(feature)}
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3">
          <span className="font-semibold block mb-2 text-sm">Capacity Options:</span>
          <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
            {room.capacity_theater > 0 && <div>Theater: {room.capacity_theater}</div>}
            {room.capacity_banquet > 0 && <div>Banquet: {room.capacity_banquet}</div>}
            {room.capacity_cocktail > 0 && <div>Cocktail: {room.capacity_cocktail}</div>}
            {room.capacity_classroom > 0 && <div>Classroom: {room.capacity_classroom}</div>}
            {room.capacity_u_shape > 0 && <div>U-Shape: {room.capacity_u_shape}</div>}
            {room.capacity_boardroom > 0 && <div>Boardroom: {room.capacity_boardroom}</div>}
            {room.capacity_hollow_square > 0 && <div>Hollow Square: {room.capacity_hollow_square}</div>}
          </div>
        </div>

        {/* Other Amenities */}
        {otherAmenities.length > 0 && (
          <div>
            <span className="font-semibold block mb-2 text-sm">Additional Amenities:</span>
            <div className="flex flex-wrap gap-1">
              {otherAmenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {otherAmenities.length > 3 && (
                <span className="text-xs text-gray-500">+{otherAmenities.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}