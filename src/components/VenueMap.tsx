import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { MapPin, Building, Hotel, Users, DollarSign } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

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
  latitude?: number
  longitude?: number
}

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
  latitude?: number
  longitude?: number
  room_count?: number
}

interface VenueMapProps {
  venues?: Venue[]
  hotels?: Hotel[]
  center?: [number, number]
  zoom?: number
  height?: string
  onMarkerClick?: (item: Venue | Hotel, type: 'venue' | 'hotel') => void
}

// Philippine city coordinates (approximate)
const cityCoordinates: { [key: string]: [number, number] } = {
  'Manila': [14.5995, 120.9842],
  'Quezon City': [14.6760, 121.0437],
  'Makati': [14.5547, 121.0244],
  'Cebu City': [10.3157, 123.8854],
  'Lapu-Lapu City': [10.3103, 123.9494],
  'Davao City': [7.1907, 125.4553],
  'Iloilo City': [10.7202, 122.5621],
  'Baguio': [16.4023, 120.5960],
  'Boracay': [11.9674, 121.9248],
  'Palawan': [9.8349, 118.7384],
  'Bohol': [9.8349, 124.1436],
  'Siargao': [9.8601, 126.0570],
  'Tagaytay': [14.1159, 120.9621],
  'Subic': [14.8201, 120.2720],
  'Clark': [15.1855, 120.5360],
  'Batangas': [13.7565, 121.0583],
  'Antipolo': [14.5878, 121.1760],
  'Pasig': [14.5764, 121.0851],
  'Taguig': [14.5176, 121.0509],
  'Parañaque': [14.4793, 121.0198],
  'Las Piñas': [14.4378, 120.9761],
  'Muntinlupa': [14.3832, 121.0409],
  'Marikina': [14.6507, 121.1029],
  'Caloocan': [14.6488, 120.9668],
  'Valenzuela': [14.7000, 120.9830],
  'Malabon': [14.6570, 120.9570],
  'Navotas': [14.6691, 120.9496]
}

// Custom icons
const venueIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

const hotelIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
})

const featuredIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eab308" width="36" height="36">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
})

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  
  return null
}

export default function VenueMap({ 
  venues = [], 
  hotels = [], 
  center = [12.8797, 121.7740], // Philippines center
  zoom = 6,
  height = '400px',
  onMarkerClick
}: VenueMapProps) {
  const [mapData, setMapData] = useState<{
    venues: (Venue & { latitude: number, longitude: number })[]
    hotels: (Hotel & { latitude: number, longitude: number })[]
  }>({ venues: [], hotels: [] })

  useEffect(() => {
    // Add coordinates to venues and hotels based on city
    const venuesWithCoords = venues.map(venue => {
      const coords = cityCoordinates[venue.city] || cityCoordinates['Manila']
      return {
        ...venue,
        latitude: coords[0] + (Math.random() - 0.5) * 0.01, // Add small random offset
        longitude: coords[1] + (Math.random() - 0.5) * 0.01
      }
    })

    const hotelsWithCoords = hotels.map(hotel => {
      const coords = cityCoordinates[hotel.city] || cityCoordinates['Manila']
      return {
        ...hotel,
        latitude: coords[0] + (Math.random() - 0.5) * 0.01, // Add small random offset
        longitude: coords[1] + (Math.random() - 0.5) * 0.01
      }
    })

    setMapData({ venues: venuesWithCoords, hotels: hotelsWithCoords })
  }, [venues, hotels])

  const formatPrice = (min: number, max: number) => {
    return `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`
  }

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Venue Markers */}
        {mapData.venues.map((venue) => (
          <Marker
            key={`venue-${venue.id}`}
            position={[venue.latitude, venue.longitude]}
            icon={venue.featured ? featuredIcon : venueIcon}
            eventHandlers={{
              click: () => onMarkerClick?.(venue, 'venue')
            }}
          >
            <Popup className="venue-popup">
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{venue.name}</h3>
                  {venue.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs ml-2">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-2 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{venue.city}, {venue.province}</span>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {venue.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{venue.capacity_min}-{venue.capacity_max} pax</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span className="text-xs">{formatPrice(venue.price_min, venue.price_max)}</span>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {venue.event_types.slice(0, 2).map((type, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {type}
                    </span>
                  ))}
                  {venue.event_types.length > 2 && (
                    <span className="text-xs text-gray-500">+{venue.event_types.length - 2} more</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hotel Markers */}
        {mapData.hotels.map((hotel) => (
          <Marker
            key={`hotel-${hotel.id}`}
            position={[hotel.latitude, hotel.longitude]}
            icon={hotel.featured ? featuredIcon : hotelIcon}
            eventHandlers={{
              click: () => onMarkerClick?.(hotel, 'hotel')
            }}
          >
            <Popup className="hotel-popup">
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{hotel.name}</h3>
                  {hotel.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs ml-2">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-2 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{hotel.city}, {hotel.province}</span>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex items-center text-gray-600 text-xs mb-2">
                  <Building className="h-3 w-3 mr-1" />
                  <span>{hotel.room_count || 'Multiple'} meeting rooms</span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}