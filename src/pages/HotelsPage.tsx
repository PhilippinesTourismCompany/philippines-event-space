import React, { useEffect, useState } from 'react'
import { Search, MapPin, Building } from 'lucide-react'
import { supabase } from '../lib/supabase'
import HotelCard from '../components/HotelCard'
import RoomCard from '../components/RoomCard'

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
}

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

// Mock data for Dusit Thani Davao
const dusitThaniDavao: Hotel = {
  id: 'dusit-thani-davao',
  name: 'Dusit Thani Davao',
  description: 'Luxury hotel in Davao offering Thai-inspired hospitality with modern amenities and elegant event spaces.',
  location: 'JP Laurel Avenue, Lanang',
  city: 'Davao City',
  province: 'Davao',
  images: ['/dusit-logo-black.svg', 'https://www.dusit.com/dusitthani-davao/wp-content/uploads/sites/52/2022/05/Dusit-Thani-Davao-Exterior-1.jpg'],
  amenities: ['WiFi', 'Spa', 'Multiple Restaurants', 'Swimming Pool', 'Fitness Center', 'Business Center', 'Ballroom'],
  featured: true,
  room_count: 12
}

// Mock data for Savoy Boracay
const savoyBoracay: Hotel = {
  id: 'savoy-boracay',
  name: 'Savoy Boracay',
  description: 'Luxury beachfront resort in Boracay Newcoast offering stunning venues for events and celebrations with pristine white sand beaches and crystal blue waters.',
  location: 'Newcoast, Boracay Island',
  city: 'Boracay',
  province: 'Aklan',
  images: ['/SAVOY-BORACAY-BEACHFRONT.webp', '/SAVOY-BORACAY-BEACH3.jpg', '/SAVOY-BORACAY-BEACHFRONT2.webp', '/SAVOY-BORACAY-POOL.webp'],
  amenities: ['Beachfront', 'Swimming Pool', 'Multiple Restaurants', 'WiFi', 'Spa', 'Event Venues', 'Wedding Planning Services'],
  featured: true,
  room_count: 8
}

// Mock data for Dusit Thani Davao meeting rooms
const dusitThaniDavaoRooms: Room[] = [
  {
    id: 'dusit-riyadh-hall',
    hotel_id: 'dusit-thani-davao',
    name: 'Riyadh Hall',
    description: 'The Riyadh Hall is a grand ballroom that can be divided into three separate function rooms. It features high ceilings, elegant chandeliers, and state-of-the-art audiovisual equipment.',
    dimensions_length: 30,
    dimensions_width: 20,
    ceiling_height: 6,
    area_sqm: 600,
    capacity_theater: 800,
    capacity_banquet: 500,
    capacity_cocktail: 1000,
    capacity_classroom: 400,
    capacity_u_shape: 150,
    capacity_boardroom: 0,
    capacity_hollow_square: 0,
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'Natural Light', 'Stage Area', 'Customizable Lighting'],
    images: ['https://www.dusit.com/dusitthani-davao/wp-content/uploads/sites/52/2022/05/Dusit-Thani-Davao-Riyadh-Hall.jpg']
  },
  {
    id: 'dusit-bangkok-hall',
    hotel_id: 'dusit-thani-davao',
    name: 'Bangkok Hall',
    description: 'The Bangkok Hall is a versatile function room ideal for medium-sized events. It offers a sophisticated setting with modern amenities and can be configured in various layouts.',
    dimensions_length: 15,
    dimensions_width: 12,
    ceiling_height: 4,
    area_sqm: 180,
    capacity_theater: 200,
    capacity_banquet: 120,
    capacity_cocktail: 250,
    capacity_classroom: 100,
    capacity_u_shape: 60,
    capacity_boardroom: 40,
    capacity_hollow_square: 70,
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'Natural Light', 'Projector Screen'],
    images: ['https://www.dusit.com/dusitthani-davao/wp-content/uploads/sites/52/2022/05/Dusit-Thani-Davao-Bangkok-Hall.jpg']
  },
  {
    id: 'dusit-manila-hall',
    hotel_id: 'dusit-thani-davao',
    name: 'Manila Hall',
    description: 'The Manila Hall is perfect for intimate gatherings and small corporate meetings. It provides a comfortable and elegant environment with all necessary business amenities.',
    dimensions_length: 10,
    dimensions_width: 8,
    ceiling_height: 3.5,
    area_sqm: 80,
    capacity_theater: 80,
    capacity_banquet: 50,
    capacity_cocktail: 100,
    capacity_classroom: 40,
    capacity_u_shape: 30,
    capacity_boardroom: 24,
    capacity_hollow_square: 36,
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'Videoconferencing', 'Whiteboard'],
    images: ['https://www.dusit.com/dusitthani-davao/wp-content/uploads/sites/52/2022/05/Dusit-Thani-Davao-Manila-Hall.jpg']
  },
  {
    id: 'dusit-chiang-mai-hall',
    hotel_id: 'dusit-thani-davao',
    name: 'Chiang Mai Hall',
    description: 'The Chiang Mai Hall is designed for executive meetings and presentations. It features premium furnishings and advanced technology for productive business sessions.',
    dimensions_length: 12,
    dimensions_width: 8,
    ceiling_height: 3.5,
    area_sqm: 96,
    capacity_theater: 90,
    capacity_banquet: 60,
    capacity_cocktail: 120,
    capacity_classroom: 45,
    capacity_u_shape: 35,
    capacity_boardroom: 28,
    capacity_hollow_square: 40,
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'LED Displays', 'Executive Chairs'],
    images: ['https://www.dusit.com/dusitthani-davao/wp-content/uploads/sites/52/2022/05/Dusit-Thani-Davao-Chiang-Mai-Hall.jpg']
  },
  {
    id: 'dusit-phuket-hall',
    hotel_id: 'dusit-thani-davao',
    name: 'Phuket Hall',
    description: 'The Phuket Hall offers a bright and airy space for social events and business functions. It features large windows with garden views and flexible setup options.',
    dimensions_length: 14,
    dimensions_width: 10,
    ceiling_height: 4,
    area_sqm: 140,
    capacity_theater: 150,
    capacity_banquet: 100,
    capacity_cocktail: 180,
    capacity_classroom: 80,
    capacity_u_shape: 50,
    capacity_boardroom: 36,
    capacity_hollow_square: 60,
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'Natural Light', 'Garden View'],
    images: ['https://www.dusit.com/dusitthani-davao/wp-content/uploads/sites/52/2022/05/Dusit-Thani-Davao-Phuket-Hall.jpg']
  }
]

// Mock data for Savoy Boracay meeting rooms
const savoyBoracayRooms: Room[] = [
  {
    id: 'savoy-seafront-venue',
    hotel_id: 'savoy-boracay',
    name: 'Sea Front Venue',
    description: 'May it be an intimate, grand or even corporate event, the pristine white beach at Newcoast can be transformed into your ideal venue. Let the crystal blue water and sound of the waves serve as your event backdrop. Our team of banquet specialists will work closely with you to bring to life your vision.',
    dimensions_length: 30,
    dimensions_width: 20,
    ceiling_height: 0, // Open air
    area_sqm: 600,
    capacity_theater: 200,
    capacity_banquet: 150,
    capacity_cocktail: 300,
    capacity_classroom: 100,
    capacity_u_shape: 80,
    capacity_boardroom: 0,
    capacity_hollow_square: 0,
    amenities: ['Beachfront', 'Natural Lighting', 'Ocean View', 'Customizable Setup', 'Wedding Planning Services', 'Professional Sound System'],
    images: ['/SAVOY-BORACAY-BEACHFRONT.webp', '/SAVOY-BORACAY-BEACH3.jpg', '/SAVOY-BORACAY-BEACHFRONT2.webp']
  },
  {
    id: 'savoy-poolside-beach',
    hotel_id: 'savoy-boracay',
    name: 'Poolside & Beach',
    description: 'Make our swimming pools the stunning backdrop of your events. Beautiful banquet set ups and sea-inspired menus will further elevate your dream parties.',
    dimensions_length: 25,
    dimensions_width: 15,
    ceiling_height: 0, // Open air
    area_sqm: 375,
    capacity_theater: 150,
    capacity_banquet: 100,
    capacity_cocktail: 200,
    capacity_classroom: 80,
    capacity_u_shape: 60,
    capacity_boardroom: 0,
    capacity_hollow_square: 0,
    amenities: ['Poolside', 'Ocean View', 'Customizable Setup', 'Professional Sound System', 'Ambient Lighting', 'Catering Services'],
    images: ['/SAVOY-BORACAY-POOL.webp', '/SAVOY-BORACAY-KEYHOLE.webp']
  }
]

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'hotels' | 'rooms'>('hotels')

  useEffect(() => {
    fetchHotels()
  }, [])

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms(selectedHotel.id)
    }
  }, [selectedHotel])

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          rooms(count)
        `)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error

      const hotelsWithRoomCount = data?.map(hotel => ({
        ...hotel,
        room_count: hotel.rooms?.[0]?.count || 0
      })) || []

      // Add Dusit Thani Davao and Savoy Boracay to the hotels list
      setHotels([savoyBoracay, dusitThaniDavao, ...hotelsWithRoomCount])
    } catch (error) {
      console.error('Error fetching hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRooms = async (hotelId: string) => {
    try {
      if (hotelId === 'dusit-thani-davao') {
        // Use mock data for Dusit Thani Davao
        setRooms(dusitThaniDavaoRooms)
        return
      }
      
      if (hotelId === 'savoy-boracay') {
        // Use mock data for Savoy Boracay
        setRooms(savoyBoracayRooms)
        return
      }

      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('name')

      if (error) throw error
      setRooms(data || [])
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
  }

  const handleHotelClick = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setViewMode('rooms')
  }

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.province.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {viewMode === 'hotels' ? 'Hotels & Resorts' : `${selectedHotel?.name} - Meeting Rooms`}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {viewMode === 'hotels' 
              ? 'Discover premium hotels with world-class meeting and event facilities'
              : 'Explore our versatile meeting spaces designed for every occasion'
            }
          </p>
        </div>

        {/* Navigation */}
        {viewMode === 'rooms' && (
          <div className="mb-6">
            <button
              onClick={() => {
                setViewMode('hotels')
                setSelectedHotel(null)
              }}
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              ← Back to Hotels
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={viewMode === 'hotels' ? "Search hotels..." : "Search rooms..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'hotels' ? (
          <>
            {/* Hotels Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onClick={() => handleHotelClick(hotel)}
                />
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your search criteria.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Hotel Info */}
            {selectedHotel && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedHotel.name}</h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedHotel.location}, {selectedHotel.city}, {selectedHotel.province}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{selectedHotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedHotel.amenities.map((amenity, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={selectedHotel.images[1] || selectedHotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                      alt={selectedHotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Rooms Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  hotelName={selectedHotel?.name}
                />
              ))}
            </div>

            {rooms.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
                <p className="text-gray-600">This hotel doesn't have any meeting rooms configured yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}