import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Camera, Utensils, Music, Palette, Calendar, Package, Star, MapPin, Phone, Facebook, Instagram } from 'lucide-react'

interface Vendor {
  id: string
  slug: string
  company_name: string
  bio: string
  services: string[]
  contact: {
    phone: string
    email: string
    address: string
  }
  social_media: {
    facebook?: string
    instagram?: string
  }
  logo: string
  rating: number
  total_reviews: number
  years_experience: number
  specialties: string[]
  coverage_areas: string[]
  featured: boolean
  price_range: string
}

// Mock vendors data with updated Budots Media Philippines details
const mockVendors: Vendor[] = [
  {
    id: 'budots-media',
    slug: 'budotsmedia',
    company_name: 'Budots Media Philippines',
    bio: 'Premier media production company specializing in wedding photography, videography, and live streaming services.',
    services: ['Wedding Photography', 'Event Videography', 'Live Streaming', 'Photo Booth', 'Drone Photography'],
    contact: {
      phone: '0915 405 2486',
      email: 'budots.media.philippines@gmail.com',
      address: 'Lapu-Lapu City, Cebu'
    },
    social_media: {
      facebook: 'facebook.com/budots.media.ph',
      instagram: 'https://www.instagram.com/budotsmediaph/'
    },
    logo: '/Budots Media Philippines logo_.png',
    rating: 4.9,
    total_reviews: 127,
    years_experience: 8,
    specialties: ['Wedding Photography', 'Corporate Events', 'Social Media Content'],
    coverage_areas: ['Metro Manila', 'Laguna', 'Cavite', 'Rizal', 'Bulacan', 'Cebu'],
    featured: true,
    price_range: '₱50K - ₱150K'
  },
  {
    id: 'happy-seven',
    slug: 'happy7',
    company_name: 'Happy Seven Weddings & Events',
    bio: 'Full-service wedding and event planning company dedicated to creating unforgettable celebrations.',
    services: ['Wedding Planning', 'Event Coordination', 'Venue Styling', 'Floral Arrangements', 'Catering Coordination'],
    contact: {
      phone: '+63 918 234 5678',
      email: 'hello@happy7events.com',
      address: 'Makati City, Metro Manila'
    },
    social_media: {
      facebook: 'facebook.com/happy7events',
      instagram: 'instagram.com/happy7events'
    },
    logo: '/h7-happyseven-weddings-events-logo.png',
    rating: 4.8,
    total_reviews: 89,
    years_experience: 6,
    specialties: ['Luxury Weddings', 'Corporate Events', 'Destination Weddings'],
    coverage_areas: ['Metro Manila', 'Tagaytay', 'Batangas', 'Boracay', 'Cebu'],
    featured: true,
    price_range: '₱80K - ₱250K'
  },
  {
    id: 'unique-weddings',
    slug: 'unique',
    company_name: 'Unique Weddings & Events',
    bio: 'Boutique wedding and event planning service specializing in personalized, unique celebrations.',
    services: ['Bespoke Wedding Planning', 'Intimate Events', 'Destination Planning', 'Custom Decor', 'Vendor Coordination'],
    contact: {
      phone: '+63 919 345 6789',
      email: 'carlo@uniqueweddings.ph',
      address: 'Pasig City, Metro Manila'
    },
    social_media: {
      facebook: 'facebook.com/uniqueweddings',
      instagram: 'instagram.com/uniqueweddings'
    },
    logo: '/carlo-jubela-unique-wedings-logo.png',
    rating: 4.7,
    total_reviews: 64,
    years_experience: 5,
    specialties: ['Intimate Weddings', 'Garden Parties', 'Artistic Events'],
    coverage_areas: ['Metro Manila', 'Antipolo', 'Tagaytay', 'Baguio'],
    featured: true,
    price_range: '₱60K - ₱200K'
  },
  {
    id: 'vania-romoff',
    slug: 'vaniaromoff',
    company_name: 'Vania Romoff',
    bio: 'Renowned fashion designer specializing in bridal and formal wear with a romantic, feminine aesthetic.',
    services: ['Bridal Gowns', 'Evening Wear', 'Custom Design', 'Bridal Consultations', 'Alterations'],
    contact: {
      phone: '+63 917 555 1234',
      email: 'info@vaniaromoff.com',
      address: 'Makati City, Metro Manila'
    },
    social_media: {
      facebook: 'facebook.com/vaniaromoffofficial',
      instagram: 'instagram.com/vaniaromoff'
    },
    logo: '/vaniaromoff-logo_468x392.webp',
    rating: 4.9,
    total_reviews: 112,
    years_experience: 12,
    specialties: ['Bridal Couture', 'Custom Gowns', 'Luxury Fashion'],
    coverage_areas: ['Metro Manila', 'Nationwide', 'International'],
    featured: true,
    price_range: '₱100K - ₱500K'
  }
]

const serviceCategories = [
  { id: 'all', name: 'All Services', icon: Package },
  { id: 'photography', name: 'Photography & Video', icon: Camera },
  { id: 'planning', name: 'Event Planning', icon: Calendar },
  { id: 'catering', name: 'Catering', icon: Utensils },
  { id: 'entertainment', name: 'Entertainment', icon: Music },
  { id: 'decoration', name: 'Decoration & Styling', icon: Palette }
]

export default function VendorsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || 
                           vendor.services.some(service => {
                             const lowerService = service.toLowerCase()
                             switch (selectedCategory) {
                               case 'photography': return lowerService.includes('photo') || lowerService.includes('video')
                               case 'planning': return lowerService.includes('planning') || lowerService.includes('coordination')
                               case 'catering': return lowerService.includes('catering') || lowerService.includes('food')
                               case 'entertainment': return lowerService.includes('entertainment') || lowerService.includes('music')
                               case 'decoration': return lowerService.includes('decor') || lowerService.includes('styling')
                               default: return true
                             }
                           })
    
    const matchesLocation = selectedLocation === 'all' || 
                           vendor.coverage_areas.some(area => area.toLowerCase().includes(selectedLocation.toLowerCase()))
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  const featuredVendors = filteredVendors.filter(vendor => vendor.featured)
  const otherVendors = filteredVendors.filter(vendor => !vendor.featured)

  const handleVendorClick = (vendor: Vendor) => {
    navigate(`/vendor/${vendor.slug}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Providers</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with trusted event service providers across the Philippines
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {serviceCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="metro manila">Metro Manila</option>
              <option value="cebu">Cebu</option>
              <option value="boracay">Boracay</option>
              <option value="tagaytay">Tagaytay</option>
              <option value="baguio">Baguio</option>
            </select>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceCategories.slice(1).map(category => {
              const Icon = category.icon
              const vendorCount = mockVendors.filter(vendor => 
                vendor.services.some(service => {
                  const lowerService = service.toLowerCase()
                  switch (category.id) {
                    case 'photography': return lowerService.includes('photo') || lowerService.includes('video')
                    case 'planning': return lowerService.includes('planning') || lowerService.includes('coordination')
                    case 'catering': return lowerService.includes('catering') || lowerService.includes('food')
                    case 'entertainment': return lowerService.includes('entertainment') || lowerService.includes('music')
                    case 'decoration': return lowerService.includes('decor') || lowerService.includes('styling')
                    default: return true
                  }
                })
              ).length

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-colors text-center ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-gray-500">{vendorCount} vendors</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Vendors */}
        {featuredVendors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Service Providers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} onClick={() => handleVendorClick(vendor)} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Vendors */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {featuredVendors.length > 0 ? 'All Service Providers' : 'Service Providers'}
          </h2>
          
          {otherVendors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} onClick={() => handleVendorClick(vendor)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Platform Statistics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{mockVendors.length}</div>
              <div className="text-gray-600">Service Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {mockVendors.reduce((sum, v) => sum + v.services.length, 0)}
              </div>
              <div className="text-gray-600">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {mockVendors.filter(v => v.featured).length}
              </div>
              <div className="text-gray-600">Featured Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {(mockVendors.reduce((sum, v) => sum + v.rating, 0) / mockVendors.length).toFixed(1)}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface VendorCardProps {
  vendor: Vendor
  onClick: () => void
  featured?: boolean
}

function VendorCard({ vendor, onClick, featured = false }: VendorCardProps) {
  const getServiceIcon = (service: string) => {
    const lowerService = service.toLowerCase()
    if (lowerService.includes('photo') || lowerService.includes('video')) return <Camera className="h-4 w-4" />
    if (lowerService.includes('catering') || lowerService.includes('food')) return <Utensils className="h-4 w-4" />
    if (lowerService.includes('music') || lowerService.includes('entertainment')) return <Music className="h-4 w-4" />
    if (lowerService.includes('decor') || lowerService.includes('styling')) return <Palette className="h-4 w-4" />
    if (lowerService.includes('planning') || lowerService.includes('coordination')) return <Calendar className="h-4 w-4" />
    return <Package className="h-4 w-4" />
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group ${
        featured ? 'ring-2 ring-blue-200' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={vendor.logo}
          alt={vendor.company_name}
          className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
          {vendor.years_experience} years
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {vendor.company_name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vendor.bio}
        </p>

        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="ml-1 text-sm font-medium">{vendor.rating}</span>
          <span className="text-gray-600 text-sm ml-1">({vendor.total_reviews})</span>
          <span className="text-gray-400 mx-2">•</span>
          <span className="text-sm text-gray-600">{vendor.price_range}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{vendor.contact.address}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="h-4 w-4 mr-1" />
            <span>{vendor.contact.phone}</span>
          </div>
        </div>

        {/* Social Media Links */}
        {(vendor.social_media?.facebook || vendor.social_media?.instagram) && (
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Follow:</span>
              {vendor.social_media?.facebook && (
                <a
                  href={`https://${vendor.social_media.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {vendor.social_media?.instagram && (
                <a
                  href={vendor.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-pink-600 hover:text-pink-700 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-900 mb-2">Services:</div>
          <div className="flex flex-wrap gap-1">
            {vendor.services.slice(0, 3).map((service, index) => (
              <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                {getServiceIcon(service)}
                <span>{service}</span>
              </div>
            ))}
            {vendor.services.length > 3 && (
              <span className="text-xs text-gray-500">+{vendor.services.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {vendor.specialties.slice(0, 2).map((specialty, index) => (
              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {specialty}
              </span>
            ))}
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Profile →
          </button>
        </div>
      </div>
    </div>
  )
}