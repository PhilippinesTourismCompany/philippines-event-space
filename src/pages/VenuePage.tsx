import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Users, DollarSign, Square, Calendar, Star, Heart, Share2, Phone, Mail, Clock, Wifi, Car, Utensils, Camera, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { trackVenueView, trackBookingInquiry } from '../lib/analytics'

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
  contact_phone?: string
  contact_email?: string
  operating_hours?: string
  rating?: number
  total_reviews?: number
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
  slug?: string
  contact_phone?: string
  contact_email?: string
  rating?: number
  total_reviews?: number
  rooms?: any[]
}

// Mock venue data with slugs and real images
const mockVenues: (Venue | Hotel)[] = [
  {
    id: 'peninsula-manila',
    name: 'The Peninsula Manila',
    description: 'Luxury hotel in the heart of Makati with world-class event facilities and impeccable service. Features elegant ballrooms, sophisticated meeting rooms, and award-winning cuisine.',
    location: 'Ayala Avenue, Makati City',
    city: 'Manila',
    province: 'Metro Manila',
    capacity_min: 50,
    capacity_max: 800,
    price_min: 150000,
    price_max: 500000,
    size_sqm: 1200,
    event_types: ['Wedding', 'Corporate', 'Gala', 'Conference'],
    amenities: ['WiFi', 'Audio Visual Equipment', 'Air Conditioning', 'Valet Parking', 'Catering Service', 'Business Center'],
    images: ['/image.png'],
    featured: true,
    slug: 'peninsula',
    contact_phone: '+63 2 8887 2888',
    contact_email: 'events@peninsula.com',
    operating_hours: '24/7',
    rating: 4.9,
    total_reviews: 245
  },
  {
    id: 'shangri-la-boracay',
    name: 'Shangri-La Boracay Resort & Spa',
    description: 'Premier beachfront resort offering stunning ocean views and tropical elegance. Perfect for destination weddings and corporate retreats with world-class amenities.',
    location: 'Bulabog Beach, Malay',
    city: 'Boracay',
    province: 'Aklan',
    capacity_min: 30,
    capacity_max: 400,
    price_min: 200000,
    price_max: 800000,
    size_sqm: 800,
    event_types: ['Wedding', 'Corporate Retreat', 'Anniversary', 'Product Launch'],
    amenities: ['Beachfront Location', 'Spa Services', 'Multiple Restaurants', 'WiFi', 'Audio Visual Equipment', 'Outdoor Spaces'],
    images: ['https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'],
    featured: true,
    slug: 'shangrila',
    contact_phone: '+63 36 288 4988',
    contact_email: 'events@shangri-la.com',
    operating_hours: '6:00 AM - 11:00 PM',
    rating: 4.8,
    total_reviews: 189
  },
  {
    id: 'nustar-cebu',
    name: 'Nustar Resort Cebu',
    description: 'Integrated resort and casino with luxurious event spaces and entertainment facilities. Features modern ballrooms and outdoor venues with panoramic city views.',
    location: 'South Road Properties, Cebu City',
    city: 'Cebu',
    province: 'Cebu',
    capacity_min: 100,
    capacity_max: 1000,
    price_min: 180000,
    price_max: 600000,
    size_sqm: 1500,
    event_types: ['Corporate', 'Gala', 'Conference', 'Product Launch', 'Awards Night'],
    amenities: ['Casino', 'Multiple Restaurants', 'Spa', 'WiFi', 'Audio Visual Equipment', 'Parking', 'Entertainment'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    featured: true,
    slug: 'nustar',
    contact_phone: '+63 32 888 8888',
    contact_email: 'events@nustarceburesorts.com',
    operating_hours: '24/7',
    rating: 4.7,
    total_reviews: 156
  },
  {
    id: 'lind-hotel-boracay',
    name: 'The Lind Boracay',
    description: 'Contemporary luxury hotel with sophisticated event spaces and stunning beachfront location. Offers intimate venues perfect for exclusive gatherings.',
    location: 'Station 1, White Beach',
    city: 'Boracay',
    province: 'Aklan',
    capacity_min: 20,
    capacity_max: 200,
    price_min: 120000,
    price_max: 400000,
    size_sqm: 600,
    event_types: ['Wedding', 'Anniversary', 'Corporate', 'Birthday'],
    amenities: ['Beachfront', 'Infinity Pool', 'Spa', 'Fine Dining', 'WiFi', 'Audio Visual Equipment'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'],
    featured: true,
    slug: 'lindhotel',
    contact_phone: '+63 36 288 5555',
    contact_email: 'events@thelindboracay.com',
    operating_hours: '6:00 AM - 12:00 AM',
    rating: 4.6,
    total_reviews: 98
  },
  {
    id: 'savoy-boracay',
    name: 'Savoy Boracay',
    description: 'Luxury beachfront resort in Boracay Newcoast offering stunning venues for events and celebrations with pristine white sand beaches and crystal blue waters.',
    location: 'Newcoast, Boracay Island',
    city: 'Boracay',
    province: 'Aklan',
    capacity_min: 30,
    capacity_max: 300,
    price_min: 150000,
    price_max: 450000,
    size_sqm: 600,
    event_types: ['Wedding', 'Corporate Retreat', 'Birthday', 'Anniversary', 'Social Gatherings'],
    amenities: ['Beachfront', 'Swimming Pool', 'Multiple Restaurants', 'WiFi', 'Audio Visual Equipment', 'Wedding Planning Services'],
    images: ['/SAVOY-BORACAY-BEACHFRONT.webp', '/SAVOY-BORACAY-BEACH3.jpg', '/SAVOY-BORACAY-BEACHFRONT2.webp', '/SAVOY-BORACAY-POOL.webp'],
    featured: true,
    slug: 'savoy',
    contact_phone: '+63 36 288 2777',
    contact_email: 'events@savoyboracay.com',
    operating_hours: '6:00 AM - 11:00 PM',
    rating: 4.8,
    total_reviews: 175
  }
]

export default function VenuePage() {
  const { city, venue } = useParams()
  const navigate = useNavigate()
  const [venueData, setVenueData] = useState<Venue | Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchVenueData()
  }, [city, venue])

  const fetchVenueData = async () => {
    try {
      // Find venue by city and slug
      const foundVenue = mockVenues.find(v => 
        v.city.toLowerCase().replace(/\s+/g, '') === city?.toLowerCase() && 
        v.slug === venue
      )

      if (foundVenue) {
        setVenueData(foundVenue)
        // Track venue view
        trackVenueView(foundVenue.name, foundVenue.city)
      } else {
        // Venue not found, redirect to 404 or venues page
        navigate('/venues')
      }
    } catch (error) {
      console.error('Error fetching venue:', error)
      navigate('/venues')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (min: number, max: number) => {
    return `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`
  }

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes('wifi')) return <Wifi className="h-4 w-4" />
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('valet')) return <Car className="h-4 w-4" />
    if (lowerAmenity.includes('catering') || lowerAmenity.includes('restaurant')) return <Utensils className="h-4 w-4" />
    if (lowerAmenity.includes('audio') || lowerAmenity.includes('visual')) return <Camera className="h-4 w-4" />
    return null
  }

  const handleRequestQuote = () => {
    if (venueData) {
      trackBookingInquiry(venueData.name, 'Quote Request')
    }
  }

  const handleScheduleVisit = () => {
    if (venueData) {
      trackBookingInquiry(venueData.name, 'Schedule Visit')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!venueData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Venue Not Found</h1>
          <p className="text-gray-600 mb-6">The venue you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/venues')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Venues
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{venueData.name}</h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{venueData.location}, {venueData.city}, {venueData.province}</span>
              </div>
              {venueData.rating && (
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium">{venueData.rating}</span>
                  <span className="text-gray-600 ml-1">({venueData.total_reviews} reviews)</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full border transition-colors ${
                  isFavorite 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                <img
                  src={venueData.images[selectedImage] || venueData.images[0]}
                  alt={venueData.name}
                  className="w-full h-full object-cover"
                />
                {venueData.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-md font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              {venueData.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {venueData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${venueData.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Venue</h2>
              <p className="text-gray-600 leading-relaxed">{venueData.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities & Features</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {venueData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAmenityIcon(amenity) || <div className="w-4 h-4 bg-blue-600 rounded-full"></div>}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Types */}
            {'event_types' in venueData && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Perfect For</h2>
                <div className="flex flex-wrap gap-2">
                  {venueData.event_types.map((type, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book This Venue</h3>
              
              {/* Pricing */}
              {'price_min' in venueData && (
                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(venueData.price_min, venueData.price_max)}
                  </div>
                  <p className="text-gray-600 text-sm">Starting price per event</p>
                </div>
              )}

              {/* Capacity */}
              {'capacity_min' in venueData && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">
                      {venueData.capacity_min}-{venueData.capacity_max}
                    </div>
                    <div className="text-xs text-gray-600">Guests</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 text-gray-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{venueData.size_sqm}</div>
                    <div className="text-xs text-gray-600">sqm</div>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {venueData.contact_phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{venueData.contact_phone}</span>
                  </div>
                )}
                {venueData.contact_email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{venueData.contact_email}</span>
                  </div>
                )}
                {venueData.operating_hours && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{venueData.operating_hours}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleRequestQuote}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Request Quote
                </button>
                <button 
                  onClick={handleScheduleVisit}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">{venueData.city}, {venueData.province}</span>
                </div>
                {'capacity_max' in venueData && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Capacity</span>
                    <span className="font-medium text-gray-900">{venueData.capacity_max} guests</span>
                  </div>
                )}
                {'size_sqm' in venueData && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Space Size</span>
                    <span className="font-medium text-gray-900">{venueData.size_sqm} sqm</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}