import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, Star, ExternalLink, Search } from 'lucide-react'

interface Brand {
  id: string
  name: string
  description: string
  logo: string
  featured: boolean
  properties_count: number
}

// Mock hotel brands data
const hotelBrands: Brand[] = [
  {
    id: 'shangri-la',
    name: 'Shangri-La Hotels and Resorts',
    description: 'Asian hospitality from the heart. Shangri-La Hotels and Resorts is a Hong Kong-based luxury hotel group with over 100 hotels worldwide.',
    logo: '/shangrila-logo-golden-budotsmedia.webp',
    featured: true,
    properties_count: 3
  },
  {
    id: 'peninsula',
    name: 'The Peninsula Hotels',
    description: 'The Peninsula Hotels is a luxury hotel group with properties in major cities across Asia, USA and Europe, known for exceptional service.',
    logo: '/peninsula-manila-logo_budotsmedia.svg',
    featured: true,
    properties_count: 1
  },
  {
    id: 'marriott',
    name: 'Marriott International',
    description: 'Global hospitality company with 30 leading hotel brands spanning 139 countries and territories.',
    logo: '/Marriott_hotels_logo_Philippines.svg',
    featured: true,
    properties_count: 1
  },
  {
    id: 'grandhyatt',
    name: 'Grand Hyatt Hotels',
    description: 'Luxury hotel brand offering sophisticated accommodations in gateway cities and resort destinations.',
    logo: '/grandhyatt-manila-logo.png',
    featured: true,
    properties_count: 1
  },
  {
    id: 'jpark',
    name: 'JPark Island Resort',
    description: 'Premier waterpark resort in Cebu offering luxury accommodations and world-class amenities.',
    logo: '/jpark--hotel-mactan-logo.png',
    featured: true,
    properties_count: 1
  },
  {
    id: 'lind',
    name: 'The Lind Boracay',
    description: 'Contemporary luxury hotel with sophisticated event spaces and stunning beachfront location in Boracay.',
    logo: '/lind-hotel-boracay-logo-philippines-venue.svg',
    featured: true,
    properties_count: 1
  },
  {
    id: 'nustar',
    name: 'Nustar Resort & Casino',
    description: 'Integrated resort and casino offering luxury accommodations, world-class entertainment, and premium dining.',
    logo: '/nustar-resort-casino-logo-budotsmedia.webp',
    featured: true,
    properties_count: 1
  },
  {
    id: 'dusit',
    name: 'Dusit Thani',
    description: 'Thai-based hotel group known for gracious hospitality and distinctive Thai service, with a luxury property in Davao.',
    logo: '/dusit-logo-black.svg',
    featured: true,
    properties_count: 1
  },
  {
    id: 'savoy',
    name: 'Savoy Hotels & Resorts',
    description: 'Luxury beachfront resort brand offering exceptional venues for events and celebrations in pristine locations across the Philippines.',
    logo: '/SAVOY-BORACAY-BEACHFRONT.webp',
    featured: true,
    properties_count: 1
  }
]

export default function BrandsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredBrands = hotelBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'featured' && brand.featured) ||
                           (selectedCategory === 'luxury' && brand.name.toLowerCase().includes('luxury')) ||
                           (selectedCategory === 'resort' && brand.name.toLowerCase().includes('resort'))
    
    return matchesSearch && matchesCategory
  })

  const featuredBrands = filteredBrands.filter(brand => brand.featured)
  const otherBrands = filteredBrands.filter(brand => !brand.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotel Brands</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium hotel brands and their properties across the Philippines
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hotel brands..."
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
              <option value="all">All Brands</option>
              <option value="featured">Featured Brands</option>
              <option value="luxury">Luxury Brands</option>
              <option value="resort">Resort Brands</option>
            </select>
          </div>
        </div>

        {/* Featured Brands */}
        {featuredBrands.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Brands</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} navigate={navigate} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Brands */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {featuredBrands.length > 0 ? 'All Brands' : 'Hotel Brands'}
          </h2>
          
          {otherBrands.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} navigate={navigate} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Platform Statistics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{hotelBrands.length}</div>
              <div className="text-gray-600">Hotel Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {hotelBrands.reduce((sum, b) => sum + b.properties_count, 0)}
              </div>
              <div className="text-gray-600">Total Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {hotelBrands.filter(b => b.featured).length}
              </div>
              <div className="text-gray-600">Featured Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">15+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BrandCardProps {
  brand: Brand
  navigate: (path: string) => void
  featured?: boolean
}

function BrandCard({ brand, navigate, featured = false }: BrandCardProps) {
  // Function to get the appropriate image for the brand
  const getBrandImage = () => {
    if (brand.id === 'peninsula' || brand.id === 'grandhyatt' || brand.id === 'jpark' || 
        brand.id === 'lind' || brand.id === 'shangri-la' || brand.id === 'marriott' || 
        brand.id === 'nustar' || brand.id === 'dusit' || brand.id === 'savoy') {
      return brand.logo
    }
    
    // For other brands, use a placeholder or text
    return null
  }

  const brandImage = getBrandImage()

  return (
    <div
      onClick={() => navigate(`/brands/${brand.id}`)}
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group ${
        featured ? 'ring-2 ring-blue-200' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        {brandImage ? (
          <img
            src={brandImage}
            alt={brand.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-2xl font-bold text-gray-800">{brand.name.split(' ')[0]}</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
          {brand.properties_count} {brand.properties_count === 1 ? 'Property' : 'Properties'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {brand.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {brand.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-blue-600 text-sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            <span>View Properties</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Building className="h-4 w-4 mr-1" />
            <span>View Details</span>
          </div>
        </div>
      </div>
    </div>
  )
}