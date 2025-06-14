import React, { useEffect, useState } from 'react'
import { Search, MapPin, Calendar, Users, TrendingUp, Star, Award, Facebook, Instagram, Twitter, Globe, Building } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import FeaturedSlideshow from '../components/FeaturedSlideshow'
import VenueCard from '../components/VenueCard'
import HotelCard from '../components/HotelCard'
import HotelLogos from '../components/HotelLogos'
import SearchFilters, { SearchFilters as SearchFiltersType } from '../components/SearchFilters'

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
  room_count?: number
}

interface SearchResult {
  type: 'venue' | 'hotel'
  data: Venue | Hotel
}

// Philippine cities for validation
const philippineCities = [
  'Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig', 'Mandaluyong', 'Marikina', 'Pasay', 'Parañaque', 'Las Piñas', 'Muntinlupa', 'Caloocan', 'Malabon', 'Navotas', 'Valenzuela',
  'Cebu City', 'Lapu-Lapu', 'Mandaue', 'Talisay', 'Toledo',
  'Davao City', 'Tagum', 'Panabo', 'Samal', 'Digos',
  'Iloilo City', 'Bacolod', 'Dumaguete', 'Bago', 'Cadiz',
  'Baguio', 'La Trinidad', 'Itogon', 'Sablan', 'Tuba',
  'Boracay', 'Kalibo', 'Roxas', 'Caticlan',
  'Palawan', 'Puerto Princesa', 'El Nido', 'Coron',
  'Bohol', 'Tagbilaran', 'Panglao', 'Loboc',
  'Siargao', 'Surigao', 'Butuan', 'Bayugan',
  'Tagaytay', 'Batangas', 'Lipa', 'Tanauan',
  'Subic', 'Olongapo', 'Angeles', 'San Fernando',
  'Clark', 'Mabalacat', 'Porac', 'Floridablanca',
  'Antipolo', 'Cainta', 'Taytay', 'Angono'
]

// Hotel brands for suggestions
const hotelBrands = [
  'Peninsula', 'Shangri-La', 'Marriott', 'Grand Hyatt', 'JPark', 'The Lind', 'Okada', 'Dusit', 'Sofitel', 'Savoy'
]

const capacityRanges = [
  { label: '1-50 guests', value: '1-50' },
  { label: '51-100 guests', value: '51-100' },
  { label: '101-200 guests', value: '101-200' },
  { label: '201-500 guests', value: '201-500' },
  { label: '500+ guests', value: '500+' }
]

export default function HomePage() {
  const navigate = useNavigate()
  const [featuredVenues, setFeaturedVenues] = useState<Venue[]>([])
  const [popularVenues, setPopularVenues] = useState<Venue[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)

  // Progressive search form state
  const [searchCity, setSearchCity] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [searchGuests, setSearchGuests] = useState('')
  const [cityValid, setCityValid] = useState(false)
  const [showDateField, setShowDateField] = useState(false)
  const [showGuestsField, setShowGuestsField] = useState(false)
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    fetchVenues()
  }, [])

  // Validate city input and check for hotel brand matches
  useEffect(() => {
    if (searchCity.length >= 2) {
      // Check for city matches
      const cityMatches = philippineCities.filter(city =>
        city.toLowerCase().includes(searchCity.toLowerCase())
      ).slice(0, 3)
      
      // Check for hotel brand matches
      const brandMatches = hotelBrands.filter(brand =>
        brand.toLowerCase().includes(searchCity.toLowerCase())
      ).slice(0, 3)
      
      setCitySuggestions(cityMatches)
      setBrandSuggestions(brandMatches)
      
      const isValidCity = philippineCities.some(city =>
        city.toLowerCase() === searchCity.toLowerCase()
      )
      
      const isValidBrand = hotelBrands.some(brand =>
        brand.toLowerCase() === searchCity.toLowerCase()
      )
      
      setCityValid(isValidCity || isValidBrand)
      setShowDateField(isValidCity || isValidBrand)
      setShowGuestsField(isValidCity || isValidBrand)
      setShowSuggestions((cityMatches.length > 0 || brandMatches.length > 0) && !isValidCity && !isValidBrand)
    } else {
      setCityValid(false)
      setShowDateField(false)
      setShowGuestsField(false)
      setShowSuggestions(false)
      setCitySuggestions([])
      setBrandSuggestions([])
    }
  }, [searchCity])

  const fetchVenues = async () => {
    try {
      // Fetch featured venues
      const { data: featured } = await supabase
        .from('venues')
        .select('*')
        .eq('featured', true)
        .limit(5)

      // Fetch popular venues
      const { data: popular } = await supabase
        .from('venues')
        .select('*')
        .eq('featured', false)
        .limit(8)

      setFeaturedVenues(featured || [])
      setPopularVenues(popular || [])
    } catch (error) {
      console.error('Error fetching venues:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (filters?: SearchFiltersType) => {
    if (!cityValid) return

    setSearchLoading(true)
    setShowResults(true)

    try {
      // Check if search is for a hotel brand
      const isBrandSearch = hotelBrands.some(brand => 
        brand.toLowerCase() === searchCity.toLowerCase()
      )

      if (isBrandSearch) {
        // Redirect to brand page
        const brandId = hotelBrands.find(brand => 
          brand.toLowerCase() === searchCity.toLowerCase()
        )?.toLowerCase().replace(/\s+/g, '')
        
        if (brandId) {
          navigate(`/brands/${brandId}`)
          return
        }
      }

      const results: SearchResult[] = []

      // Search venues
      let venueQuery = supabase.from('venues').select('*')

      // Location filter for venues
      venueQuery = venueQuery.or(`city.ilike.%${searchCity}%,province.ilike.%${searchCity}%,location.ilike.%${searchCity}%`)

      // Additional filters if provided
      if (filters) {
        if (filters.eventType) {
          venueQuery = venueQuery.contains('event_types', [filters.eventType])
        }
        if (filters.guests) {
          const [min, max] = filters.guests.split('-').map(n => parseInt(n))
          if (max) {
            venueQuery = venueQuery.gte('capacity_min', min).lte('capacity_max', max)
          } else {
            venueQuery = venueQuery.gte('capacity_min', min)
          }
        }
      } else if (searchGuests) {
        const [min, max] = searchGuests.split('-').map(n => parseInt(n))
        if (max) {
          venueQuery = venueQuery.gte('capacity_min', min).lte('capacity_max', max)
        } else {
          venueQuery = venueQuery.gte('capacity_min', min)
        }
      }

      const { data: venues, error: venueError } = await venueQuery.order('featured', { ascending: false })

      if (venueError) throw venueError

      // Add venues to results
      venues?.forEach(venue => {
        results.push({ type: 'venue', data: venue })
      })

      // Search hotels
      let hotelQuery = supabase.from('hotels').select(`
        *,
        rooms(count)
      `)

      // Location filter for hotels
      hotelQuery = hotelQuery.or(`city.ilike.%${searchCity}%,province.ilike.%${searchCity}%,location.ilike.%${searchCity}%`)

      const { data: hotels, error: hotelError } = await hotelQuery.order('featured', { ascending: false })

      if (hotelError) throw hotelError

      // Add hotels to results with room count
      hotels?.forEach(hotel => {
        const hotelWithRoomCount = {
          ...hotel,
          room_count: hotel.rooms?.[0]?.count || 0
        }
        results.push({ type: 'hotel', data: hotelWithRoomCount })
      })

      // Sort results by featured status
      results.sort((a, b) => {
        if (a.data.featured && !b.data.featured) return -1
        if (!a.data.featured && b.data.featured) return 1
        return 0
      })

      setSearchResults(results)
    } catch (error) {
      console.error('Error searching venues and hotels:', error)
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  const handleResetSearch = () => {
    setShowResults(false)
    setSearchResults([])
    setSearchCity('')
    setSearchDate('')
    setSearchGuests('')
    setCityValid(false)
    setShowDateField(false)
    setShowGuestsField(false)
  }

  const handleCitySelect = (city: string) => {
    setSearchCity(city)
    setShowSuggestions(false)
  }

  const handleBrandSelect = (brand: string) => {
    // Redirect to brand page
    const brandId = brand.toLowerCase().replace(/\s+/g, '')
    navigate(`/brands/${brandId}`)
  }

  const handleQuickSearch = () => {
    if (cityValid) {
      // Check if search is for a hotel brand
      const isBrandSearch = hotelBrands.some(brand => 
        brand.toLowerCase() === searchCity.toLowerCase()
      )

      if (isBrandSearch) {
        // Redirect to brand page
        const brandId = hotelBrands.find(brand => 
          brand.toLowerCase() === searchCity.toLowerCase()
        )?.toLowerCase().replace(/\s+/g, '')
        
        if (brandId) {
          navigate(`/brands/${brandId}`)
          return
        }
      }
      
      handleSearch()
    }
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Dynamic Gradient - No Title */}
      <section className="relative overflow-hidden text-white py-20">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-purple-500/60 to-pink-500/40 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-400/30 via-blue-500/20 to-purple-600/40 animate-gradient-y"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-300/15 rounded-full blur-2xl animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progressive Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {/* City Input - Always Visible */}
                <div className="relative">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-6 w-6 text-white/70" />
                    <input
                      type="text"
                      placeholder="Enter city or hotel brand (e.g., Manila, Shangri-La, Peninsula)"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      onFocus={() => setShowSuggestions((citySuggestions.length > 0 || brandSuggestions.length > 0) && !cityValid)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className={`w-full pl-14 pr-6 py-4 bg-white/90 border-2 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-gray-900 placeholder-gray-500 text-lg font-medium transition-all ${
                        cityValid ? 'border-green-400 bg-green-50' : searchCity ? 'border-yellow-400' : 'border-white/30'
                      }`}
                    />
                    {cityValid && (
                      <div className="absolute right-4 top-4 text-green-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* City and Brand Suggestions */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-60 overflow-y-auto">
                      {/* Hotel Brand Suggestions */}
                      {brandSuggestions.length > 0 && (
                        <div className="py-2">
                          <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                            Hotel Brands
                          </div>
                          {brandSuggestions.map((brand, index) => (
                            <button
                              key={`brand-${index}`}
                              onClick={() => handleBrandSelect(brand)}
                              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-900"
                            >
                              <div className="flex items-center">
                                <Building className="h-4 w-4 text-blue-600 mr-3" />
                                <span className="font-medium">{brand}</span>
                                <span className="ml-2 text-xs text-gray-500">View brand page</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* City Suggestions */}
                      {citySuggestions.length > 0 && (
                        <div className="py-2">
                          {brandSuggestions.length > 0 && (
                            <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                              Cities
                            </div>
                          )}
                          {citySuggestions.map((city, index) => (
                            <button
                              key={`city-${index}`}
                              onClick={() => handleCitySelect(city)}
                              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-900"
                            >
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-blue-600 mr-3" />
                                {city}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Date Input - Shows when city is valid (Optional) */}
                <div className={`transition-all duration-500 ease-in-out ${
                  showDateField ? 'opacity-100 max-h-20 transform translate-y-0' : 'opacity-0 max-h-0 transform -translate-y-4 overflow-hidden'
                }`}>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 h-6 w-6 text-white/70" />
                    <input
                      type="date"
                      value={searchDate}
                      min={minDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      placeholder="Event date (optional)"
                      className="w-full pl-14 pr-6 py-4 bg-white/90 border-2 border-white/30 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-gray-900 text-lg font-medium transition-all"
                    />
                    <div className="absolute right-4 top-4 text-gray-400 text-sm">
                      Optional
                    </div>
                  </div>
                </div>

                {/* Guests Input - Shows when city is valid (Optional) */}
                <div className={`transition-all duration-500 ease-in-out ${
                  showGuestsField ? 'opacity-100 max-h-20 transform translate-y-0' : 'opacity-0 max-h-0 transform -translate-y-4 overflow-hidden'
                }`}>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 h-6 w-6 text-white/70" />
                    <select 
                      value={searchGuests}
                      onChange={(e) => setSearchGuests(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-white/90 border-2 border-white/30 rounded-xl focus:ring-4 focus:ring-white/30 focus:border-white text-gray-900 text-lg font-medium transition-all"
                    >
                      <option value="">Number of guests (optional)</option>
                      {capacityRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Action Buttons - Shows when city is valid */}
                <div className={`transition-all duration-500 ease-in-out ${
                  cityValid ? 'opacity-100 max-h-32 transform translate-y-0' : 'opacity-0 max-h-0 transform -translate-y-4 overflow-hidden'
                }`}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleQuickSearch}
                      disabled={!cityValid || searchLoading}
                      className="bg-gradient-to-r from-white to-blue-50 text-blue-600 px-8 py-4 rounded-xl hover:from-blue-50 hover:to-white transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {searchLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      ) : (
                        <>
                          <Search className="h-6 w-6 mr-3" />
                          Search Perfect Venues
                        </>
                      )}
                    </button>
                    
                    <Link
                      to="/search"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                    >
                      <TrendingUp className="h-6 w-6 mr-3" />
                      Detailed Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Hotel Logo Banner */}
      {!showResults && (
        <section className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Event space and hospitality providers
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Working with the Philippines' most prestigious venues and hospitality brands
              </p>
            </div>

            {/* Animated Logo Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex space-x-24 animate-scroll whitespace-nowrap py-4">
                {/* First set of logos */}
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/shangrila-logo-golden-budotsmedia.webp"
                    alt="Shangri-La"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/Marriott_hotels_logo_Philippines.svg"
                    alt="Marriott"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/nustar-resort-casino-logo-budotsmedia.webp"
                    alt="Nustar Resort & Casino"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/jpark--hotel-mactan-logo.png"
                    alt="JPark Island Resort"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/lind-hotel-boracay-logo-philippines-venue.svg"
                    alt="The Lind Boracay"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/dusit-logo-black.svg"
                    alt="Dusit Thani Davao"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/peninsula-manila-logo_budotsmedia.svg"
                    alt="The Peninsula Manila"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/SAVOY-BORACAY-BEACHFRONT.webp"
                    alt="Savoy Boracay"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/shangrila-logo-golden-budotsmedia.webp"
                    alt="Shangri-La"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/Marriott_hotels_logo_Philippines.svg"
                    alt="Marriott"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/nustar-resort-casino-logo-budotsmedia.webp"
                    alt="Nustar Resort & Casino"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/jpark--hotel-mactan-logo.png"
                    alt="JPark Island Resort"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/lind-hotel-boracay-logo-philippines-venue.svg"
                    alt="The Lind Boracay"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/dusit-logo-black.svg"
                    alt="Dusit Thani Davao"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/peninsula-manila-logo_budotsmedia.svg"
                    alt="The Peninsula Manila"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/SAVOY-BORACAY-BEACHFRONT.webp"
                    alt="Savoy Boracay"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>

            {/* Partner Stats */}
            <div className="mt-12 grid md:grid-cols-4 gap-6 text-center">
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-gray-300">Premium Partners</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-300">Venues Nationwide</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-300">Events Hosted</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-300">Cities Covered</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Venues Slideshow */}
      {!showResults && !loading && featuredVenues.length > 0 && (
        <FeaturedSlideshow venues={featuredVenues} />
      )}

      {/* Animated Vendor Logo Banner */}
      {!showResults && (
        <section className="py-16 bg-gradient-to-r from-purple-900 via-pink-800 to-red-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Premium Vendor Partners
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Collaborating with the Philippines' most talented event service providers
              </p>
            </div>

            {/* Animated Logo Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex space-x-24 animate-scroll whitespace-nowrap py-4" style={{ animationDirection: 'reverse' }}>
                {/* First set of logos */}
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/Budots Media Philippines logo_.png"
                    alt="Budots Media Philippines"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/h7-happyseven-weddings-events-logo.png"
                    alt="Happy Seven Weddings & Events"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/carlo-jubela-unique-wedings-logo.png"
                    alt="Unique Weddings & Events"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/vaniaromoff-logo_468x392.webp"
                    alt="Vania Romoff"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <div className="text-white font-bold text-lg">Josiah's Catering</div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/Budots Media Philippines logo_.png"
                    alt="Budots Media Philippines"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/h7-happyseven-weddings-events-logo.png"
                    alt="Happy Seven Weddings & Events"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/carlo-jubela-unique-wedings-logo.png"
                    alt="Unique Weddings & Events"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <img
                    src="/vaniaromoff-logo_468x392.webp"
                    alt="Vania Romoff"
                    className="max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
                  <div className="text-white font-bold text-lg">Josiah's Catering</div>
                </div>
              </div>
            </div>

            {/* Vendor Stats */}
            <div className="mt-12 grid md:grid-cols-4 gap-6 text-center">
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">20+</div>
                <div className="text-gray-300">Elite Vendors</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-300">Service Categories</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">1,000+</div>
                <div className="text-gray-300">Events Serviced</div>
              </div>
              <div className="backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">4.8</div>
                <div className="text-gray-300">Average Rating</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Results */}
      {showResults && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Search Results ({searchResults.length} locations found)
              </h2>
              <button
                onClick={handleResetSearch}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>

            {searchLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
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
            ) : searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.map((result, index) => (
                  <div key={`${result.type}-${result.data.id}`}>
                    {result.type === 'venue' ? (
                      <VenueCard venue={result.data as Venue} />
                    ) : (
                      <HotelCard hotel={result.data as Hotel} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No venues or hotels found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse our featured venues below.</p>
                <button
                  onClick={handleResetSearch}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Venues
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Service Providers Section with Red Border */}
      {!showResults && (
        <section className="py-16 border-4 border-red-500" style={{ backgroundColor: '#FFC0CB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Service Providers
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Trusted partners providing exceptional event services across the Philippines
              </p>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid md:grid-cols-3 gap-12 items-center max-w-4xl">
                {/* Budots Media Philippines */}
                <div className="text-center">
                  <Link to="/vendor/budotsmedia" className="flex justify-center mb-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 w-full max-w-xs cursor-pointer group">
                      <img
                        src="/Budots Media Philippines logo_.png"
                        alt="Budots Media Philippines"
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        style={{ maxHeight: '120px' }}
                      />
                    </div>
                  </Link>
                  {/* Social Media Links */}
                  <div className="flex justify-center space-x-3">
                    <a href="https://facebook.com/budots.media.ph" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com/budotsmediaph/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="https://twitter.com/budotsmedia" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://budotsmediaphilippines.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 transition-colors">
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Happy Seven Weddings & Events */}
                <div className="text-center">
                  <Link to="/vendor/happy7" className="flex justify-center mb-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 w-full max-w-xs cursor-pointer group">
                      <img
                        src="/h7-happyseven-weddings-events-logo.png"
                        alt="Happy Seven Weddings & Events"
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        style={{ maxHeight: '120px' }}
                      />
                    </div>
                  </Link>
                  {/* Social Media Links */}
                  <div className="flex justify-center space-x-3">
                    <a href="https://facebook.com/happy7events" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="https://instagram.com/happy7events" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="https://twitter.com/happy7events" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://happy7events.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 transition-colors">
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Unique Weddings & Events */}
                <div className="text-center">
                  <Link to="/vendor/unique" className="flex justify-center mb-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 w-full max-w-xs cursor-pointer group">
                      <img
                        src="/carlo-jubela-unique-wedings-logo.png"
                        alt="Unique Weddings & Events"
                        className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        style={{ maxHeight: '120px' }}
                      />
                    </div>
                  </Link>
                  {/* Social Media Links */}
                  <div className="flex justify-center space-x-3">
                    <a href="https://facebook.com/uniqueweddings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="https://instagram.com/uniqueweddings" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="https://twitter.com/uniqueweddings" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://uniqueweddings.ph" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 transition-colors">
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Provider Stats */}
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-gray-900 mb-2">3+</div>
                <div className="text-gray-700">Trusted Partners</div>
              </div>
              <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-700">Events Served</div>
              </div>
              <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-700">Client Satisfaction</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <p className="text-gray-700 mb-6 text-lg">
                Looking for professional event services? Connect with our trusted partners
              </p>
              <div className="space-x-4">
                <Link 
                  to="/vendors"
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold shadow-lg inline-block"
                >
                  View All Service Providers
                </Link>
                <Link 
                  to="/services/photography"
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-lg inline-block border-2 border-red-700"
                >
                  🔍 Photography Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Venues */}
      {!showResults && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Venues
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore venues that are loved by event organizers across the Philippines
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
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
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
                View All Venues
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {!showResults && (
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Verified Venues</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Events Hosted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hotel Logos Section */}
      {!showResults && <HotelLogos />}
    </div>
  )
}