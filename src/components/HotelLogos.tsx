import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, Star } from 'lucide-react'

interface Brand {
  id: string
  name: string
  logo: string
  featured: boolean
  properties_count: number
}

const hotelBrands: Brand[] = [
  {
    id: 'peninsula',
    name: 'The Peninsula Hotels',
    logo: '/peninsula-manila-logo_budotsmedia.svg',
    featured: true,
    properties_count: 1
  },
  {
    id: 'shangri-la',
    name: 'Shangri-La Hotels and Resorts',
    logo: '/shangrila-logo-golden-budotsmedia.webp',
    featured: true,
    properties_count: 3
  },
  {
    id: 'marriott',
    name: 'Marriott International',
    logo: '/Marriott_hotels_logo_Philippines.svg',
    featured: true,
    properties_count: 1
  },
  {
    id: 'dusit',
    name: 'Dusit Thani',
    logo: '/dusit-logo-black.svg',
    featured: true,
    properties_count: 1
  }
]

export default function HotelLogos() {
  const navigate = useNavigate()

  const handleBrandClick = (brandId: string) => {
    navigate(`/brands/${brandId}`)
  }

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Premium Hotel Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partner with the Philippines' most prestigious hotel brands and hospitality companies
          </p>
        </div>

        {/* Logo Grid - Completely separate from hotel listings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
          {hotelBrands.map((brand, index) => (
            <div
              key={index}
              onClick={() => handleBrandClick(brand.id)}
              className="flex items-center justify-center h-40 cursor-pointer group"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {brand.featured && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white p-1 rounded-full">
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                )}
                
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-center mb-2">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{hotelBrands.length}+</div>
            <div className="text-sm text-blue-700">Partner Brands</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">5-Star</div>
            <div className="text-sm text-green-700">Premium Quality</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center justify-center mb-2">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {hotelBrands.reduce((sum, brand) => sum + brand.properties_count, 0)}+
            </div>
            <div className="text-sm text-purple-700">Total Properties</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-orange-700">Support Service</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Explore all hotel brands and their properties across the Philippines
          </p>
          <button 
            onClick={() => navigate('/brands')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Brands
          </button>
        </div>
      </div>
    </section>
  )
}