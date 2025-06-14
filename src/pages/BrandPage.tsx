import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Building, MapPin, Star, ArrowLeft, Users, Wifi, Car, Utensils } from 'lucide-react'
import HotelCard from '../components/HotelCard'

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
  slug?: string
  brand: string
  rating?: number
  total_reviews?: number
  room_count?: number
}

interface Brand {
  id: string
  name: string
  description: string
  logo: string
  properties_count: number
  established: string
  headquarters: string
  website: string
}

// Mock hotel brands data
const hotelBrands: Brand[] = [
  {
    id: 'shangri-la',
    name: 'Shangri-La Hotels and Resorts',
    description: 'Asian hospitality from the heart. Shangri-La Hotels and Resorts is a Hong Kong-based luxury hotel group with over 100 hotels worldwide.',
    logo: '/shangrila-logo-golden-budotsmedia.webp',
    properties_count: 8,
    established: '1971',
    headquarters: 'Hong Kong',
    website: 'shangri-la.com'
  },
  {
    id: 'peninsula',
    name: 'The Peninsula Hotels',
    description: 'The Peninsula Hotels is a luxury hotel group with properties in major cities across Asia, USA and Europe, known for exceptional service.',
    logo: '/peninsula-manila-logo_budotsmedia.svg',
    properties_count: 3,
    established: '1928',
    headquarters: 'Hong Kong',
    website: 'peninsula.com'
  },
  {
    id: 'marriott',
    name: 'Marriott International',
    description: 'Global hospitality company with 30 leading hotel brands spanning 139 countries and territories.',
    logo: '/Marriott_hotels_logo_Philippines.svg',
    properties_count: 12,
    established: '1927',
    headquarters: 'Maryland, USA',
    website: 'marriott.com'
  },
  {
    id: 'grandhyatt',
    name: 'Grand Hyatt Hotels',
    description: 'Luxury hotel brand offering sophisticated accommodations in gateway cities and resort destinations.',
    logo: '/grandhyatt-manila-logo.png',
    properties_count: 5,
    established: '1967',
    headquarters: 'Chicago, USA',
    website: 'hyatt.com'
  },
  {
    id: 'jpark',
    name: 'JPark Island Resort',
    description: 'Premier waterpark resort in Cebu offering luxury accommodations and world-class amenities.',
    logo: '/jpark--hotel-mactan-logo.png',
    properties_count: 2,
    established: '2009',
    headquarters: 'Cebu, Philippines',
    website: 'jparkislandresort.com'
  },
  {
    id: 'lind',
    name: 'The Lind Boracay',
    description: 'Contemporary luxury hotel with sophisticated event spaces and stunning beachfront location in Boracay.',
    logo: '/lind-hotel-boracay-logo-philippines-venue.svg',
    properties_count: 1,
    established: '2015',
    headquarters: 'Boracay, Philippines',
    website: 'thelindboracay.com'
  },
  {
    id: 'nustar',
    name: 'Nustar Resort & Casino',
    description: 'Integrated resort and casino offering luxury accommodations, world-class entertainment, and premium dining.',
    logo: '/nustar-resort-casino-logo-budotsmedia.webp',
    properties_count: 1,
    established: '2022',
    headquarters: 'Cebu, Philippines',
    website: 'nustar.ph'
  },
  {
    id: 'dusit',
    name: 'Dusit Thani',
    description: 'Thai-based hotel group known for gracious hospitality and distinctive Thai service, with a luxury property in Davao.',
    logo: '/dusit-logo-black.svg',
    properties_count: 1,
    established: '1948',
    headquarters: 'Bangkok, Thailand',
    website: 'dusit.com'
  },
  {
    id: 'savoy',
    name: 'Savoy Hotels & Resorts',
    description: 'Luxury beachfront resort brand offering exceptional venues for events and celebrations in pristine locations across the Philippines.',
    logo: '/SAVOY-BORACAY-BEACHFRONT.webp',
    properties_count: 1,
    established: '2017',
    headquarters: 'Boracay, Philippines',
    website: 'savoyhotel.com.ph'
  }
]

// Mock hotels data with brand associations
const mockHotels: Hotel[] = [
  {
    id: 'shangri-la-makati',
    name: 'Shangri-La The Fort, Manila',
    description: 'Luxury hotel in Bonifacio Global City with world-class amenities and stunning city views.',
    location: 'Bonifacio Global City',
    city: 'Manila',
    province: 'Metro Manila',
    images: ['https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'],
    amenities: ['WiFi', 'Spa', 'Multiple Restaurants', 'Fitness Center', 'Pool', 'Business Center'],
    featured: true,
    slug: 'shangri-la-fort',
    brand: 'shangri-la',
    rating: 4.8,
    total_reviews: 1250,
    room_count: 8
  },
  {
    id: 'shangri-la-boracay',
    name: 'Shangri-La Boracay Resort & Spa',
    description: 'Premier beachfront resort offering stunning ocean views and tropical elegance.',
    location: 'Bulabog Beach, Malay',
    city: 'Boracay',
    province: 'Aklan',
    images: ['https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'],
    amenities: ['Beachfront', 'Spa', 'Multiple Restaurants', 'WiFi', 'Water Sports', 'Kids Club'],
    featured: true,
    slug: 'shangri-la-boracay',
    brand: 'shangri-la',
    rating: 4.9,
    total_reviews: 890,
    room_count: 12
  },
  {
    id: 'shangri-la-mactan',
    name: 'Shangri-La Mactan Resort & Spa',
    description: 'Tropical island resort with pristine beaches and luxury accommodations in Cebu.',
    location: 'Punta Engaño Road, Lapu-Lapu',
    city: 'Lapu-Lapu',
    province: 'Cebu',
    images: ['https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'],
    amenities: ['Private Beach', 'Spa', 'Golf Course', 'Multiple Restaurants', 'WiFi', 'Marine Sanctuary'],
    featured: true,
    slug: 'shangri-la-mactan',
    brand: 'shangri-la',
    rating: 4.7,
    total_reviews: 756,
    room_count: 10
  },
  {
    id: 'peninsula-manila',
    name: 'The Peninsula Manila',
    description: 'Luxury hotel in the heart of Makati with world-class event facilities and impeccable service.',
    location: 'Ayala Avenue, Makati City',
    city: 'Manila',
    province: 'Metro Manila',
    images: ['/image.png'],
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'Valet Parking', 'Catering Service', 'Business Center'],
    featured: true,
    slug: 'peninsula',
    brand: 'peninsula',
    rating: 4.9,
    total_reviews: 1450,
    room_count: 15
  },
  {
    id: 'manila-marriott',
    name: 'Manila Marriott Hotel',
    description: 'Premier business hotel in Pasay City with modern amenities and excellent connectivity.',
    location: 'Newport World Resorts, Pasay',
    city: 'Manila',
    province: 'Metro Manila',
    images: ['/Marriott_hotels_logo_Philippines.svg'],
    amenities: ['WiFi', 'Multiple Restaurants', 'Fitness Center', 'Pool', 'Business Center', 'Airport Shuttle'],
    featured: true,
    slug: 'manila-marriott',
    brand: 'marriott',
    rating: 4.6,
    total_reviews: 1120,
    room_count: 18
  },
  {
    id: 'grand-hyatt-manila',
    name: 'Grand Hyatt Manila',
    description: 'Luxury hotel in Bonifacio Global City with stunning views and world-class amenities.',
    location: 'Bonifacio Global City, Taguig',
    city: 'Manila',
    province: 'Metro Manila',
    images: ['/grandhyatt-manila-logo.png'],
    amenities: ['WiFi', 'Spa', 'Multiple Restaurants', 'Pool', 'Business Center', 'Fitness Center'],
    featured: true,
    slug: 'grand-hyatt-manila',
    brand: 'grandhyatt',
    rating: 4.8,
    total_reviews: 950,
    room_count: 16
  },
  {
    id: 'jpark-mactan',
    name: 'JPark Island Resort & Waterpark',
    description: 'Premier waterpark resort in Mactan with luxury accommodations and family-friendly amenities.',
    location: 'Mactan Island, Lapu-Lapu City',
    city: 'Cebu',
    province: 'Cebu',
    images: ['/jpark--hotel-mactan-logo.png'],
    amenities: ['Waterpark', 'Multiple Restaurants', 'Spa', 'WiFi', 'Kids Club', 'Private Beach'],
    featured: true,
    slug: 'jpark-mactan',
    brand: 'jpark',
    rating: 4.7,
    total_reviews: 820,
    room_count: 14
  },
  {
    id: 'lind-boracay',
    name: 'The Lind Boracay',
    description: 'Contemporary luxury hotel with sophisticated event spaces and stunning beachfront location.',
    location: 'Station 1, White Beach',
    city: 'Boracay',
    province: 'Aklan',
    images: ['/lind-hotel-boracay-logo-philippines-venue.svg'],
    amenities: ['Beachfront', 'Infinity Pool', 'Spa', 'Fine Dining', 'WiFi', 'Audio Visual Equipment'],
    featured: true,
    slug: 'lind-boracay',
    brand: 'lind',
    rating: 4.8,
    total_reviews: 680,
    room_count: 10
  },
  {
    id: 'nustar-cebu',
    name: 'Nustar Resort & Casino Cebu',
    description: 'Integrated resort and casino with luxurious event spaces and entertainment facilities.',
    location: 'South Road Properties, Cebu City',
    city: 'Cebu',
    province: 'Cebu',
    images: ['/nustar-resort-casino-logo-budotsmedia.webp'],
    amenities: ['Casino', 'Multiple Restaurants', 'Spa', 'Entertainment Shows', 'WiFi', 'Shopping'],
    featured: true,
    slug: 'nustar-cebu',
    brand: 'nustar',
    rating: 4.7,
    total_reviews: 520,
    room_count: 20
  },
  {
    id: 'dusit-thani-davao',
    name: 'Dusit Thani Davao',
    description: 'Luxury hotel in Davao offering Thai-inspired hospitality with modern amenities and elegant event spaces.',
    location: 'JP Laurel Avenue, Lanang',
    city: 'Davao City',
    province: 'Davao',
    images: ['/dusit-logo-black.svg'],
    amenities: ['WiFi', 'Spa', 'Multiple Restaurants', 'Swimming Pool', 'Fitness Center', 'Business Center', 'Ballroom'],
    featured: true,
    slug: 'dusit-thani-davao',
    brand: 'dusit',
    rating: 4.8,
    total_reviews: 680,
    room_count: 12
  },
  {
    id: 'savoy-boracay',
    name: 'Savoy Boracay',
    description: 'Luxury beachfront resort in Boracay Newcoast offering stunning venues for events and celebrations with pristine white sand beaches and crystal blue waters.',
    location: 'Newcoast, Boracay Island',
    city: 'Boracay',
    province: 'Aklan',
    images: ['/SAVOY-BORACAY-BEACHFRONT.webp', '/SAVOY-BORACAY-BEACH3.jpg', '/SAVOY-BORACAY-BEACHFRONT2.webp', '/SAVOY-BORACAY-POOL.webp'],
    amenities: ['Beachfront', 'Swimming Pool', 'Multiple Restaurants', 'WiFi', 'Spa', 'Event Venues', 'Wedding Planning Services'],
    featured: true,
    slug: 'savoy-boracay',
    brand: 'savoy',
    rating: 4.8,
    total_reviews: 450,
    room_count: 8
  }
]

export default function BrandPage() {
  const { brandId } = useParams()
  const navigate = useNavigate()
  const [brand, setBrand] = useState<Brand | null>(null)
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBrandData()
  }, [brandId])

  const fetchBrandData = async () => {
    try {
      // Find brand
      const foundBrand = hotelBrands.find(b => b.id === brandId)
      if (!foundBrand) {
        navigate('/brands')
        return
      }

      // Find hotels for this brand
      const brandHotels = mockHotels.filter(h => h.brand === brandId)

      setBrand(foundBrand)
      setHotels(brandHotels)
    } catch (error) {
      console.error('Error fetching brand data:', error)
      navigate('/brands')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
          <button
            onClick={() => navigate('/brands')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Brands
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/brands')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to All Brands
          </button>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{brand.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{brand.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Properties</span>
                  <p className="text-gray-600">{hotels.length} in Philippines</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Established</span>
                  <p className="text-gray-600">{brand.established}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Headquarters</span>
                  <p className="text-gray-600">{brand.headquarters}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Website</span>
                  <p className="text-blue-600">{brand.website}</p>
                </div>
              </div>
            </div>

            <div className="relative h-48 rounded-lg overflow-hidden">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {brand.name} Properties in the Philippines
            </h2>
            <p className="text-gray-600 mt-1">
              {hotels.length} {hotels.length === 1 ? 'property' : 'properties'} available
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Locations</option>
              <option>Manila</option>
              <option>Cebu</option>
              <option>Boracay</option>
              <option>Davao</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Sort by Rating</option>
              <option>Sort by Price</option>
              <option>Sort by Name</option>
            </select>
          </div>
        </div>

        {hotels.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">This brand doesn't have any properties in the Philippines yet.</p>
          </div>
        )}

        {/* Brand Stats */}
        {hotels.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Brand Overview</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{hotels.length}</div>
                <div className="text-gray-600">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {hotels.reduce((sum, h) => sum + (h.room_count || 0), 0)}
                </div>
                <div className="text-gray-600">Meeting Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {(hotels.reduce((sum, h) => sum + (h.rating || 0), 0) / hotels.length).toFixed(1)}
                </div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {hotels.reduce((sum, h) => sum + (h.total_reviews || 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Reviews</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}