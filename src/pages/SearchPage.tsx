import React, { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, DollarSign, Building, Filter, X, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import VenueCard from '../components/VenueCard'
import HotelCard from '../components/HotelCard'
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

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeFilters, setActiveFilters] = useState<SearchFiltersType | null>(null)

  const handleSearch = async (filters: SearchFiltersType) => {
    setLoading(true)
    setHasSearched(true)
    setActiveFilters(filters)

    try {
      const results: SearchResult[] = []

      // Search venues
      let venueQuery = supabase.from('venues').select('*')

      // Location filter for venues
      if (filters.location) {
        venueQuery = venueQuery.or(`city.ilike.%${filters.location}%,province.ilike.%${filters.location}%,location.ilike.%${filters.location}%`)
      }

      // Event type filter for venues
      if (filters.eventType) {
        venueQuery = venueQuery.contains('event_types', [filters.eventType])
      }

      // Capacity filter for venues
      if (filters.guests) {
        const [min, max] = filters.guests.split('-').map(n => parseInt(n))
        if (max) {
          venueQuery = venueQuery.gte('capacity_min', min).lte('capacity_max', max)
        } else {
          venueQuery = venueQuery.gte('capacity_min', min)
        }
      }

      // Price range filter for venues
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(n => parseInt(n))
        if (max) {
          venueQuery = venueQuery.gte('price_min', min).lte('price_max', max)
        } else {
          venueQuery = venueQuery.gte('price_min', min)
        }
      }

      // Amenities filter for venues
      if (filters.amenities.length > 0) {
        venueQuery = venueQuery.overlaps('amenities', filters.amenities)
      }

      // Essential features filters for venues
      if (filters.accessibility) {
        venueQuery = venueQuery.overlaps('amenities', ['Wheelchair Accessible', 'Wheelchair Accessible Entrance'])
      }

      if (filters.parking) {
        venueQuery = venueQuery.overlaps('amenities', ['Parking', 'Valet Parking'])
      }

      if (filters.catering) {
        venueQuery = venueQuery.overlaps('amenities', ['Catering Service', 'Kitchen Facilities'])
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
      if (filters.location) {
        hotelQuery = hotelQuery.or(`city.ilike.%${filters.location}%,province.ilike.%${filters.location}%,location.ilike.%${filters.location}%`)
      }

      // Amenities filter for hotels
      if (filters.amenities.length > 0) {
        hotelQuery = hotelQuery.overlaps('amenities', filters.amenities)
      }

      // Essential features filters for hotels
      if (filters.accessibility) {
        hotelQuery = hotelQuery.overlaps('amenities', ['Wheelchair Accessible', 'Wheelchair Accessible Entrance'])
      }

      if (filters.parking) {
        hotelQuery = hotelQuery.overlaps('amenities', ['Parking', 'Valet Parking'])
      }

      if (filters.catering) {
        hotelQuery = hotelQuery.overlaps('amenities', ['Catering Service', 'Kitchen Facilities', 'Multiple Restaurants'])
      }

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
      setLoading(false)
    }
  }

  const handleResetSearch = () => {
    setSearchResults([])
    setHasSearched(false)
    setActiveFilters(null)
  }

  const getActiveFiltersCount = () => {
    if (!activeFilters) return 0
    
    let count = 0
    if (activeFilters.location) count++
    if (activeFilters.date) count++
    if (activeFilters.guests) count++
    if (activeFilters.eventType) count++
    if (activeFilters.priceRange) count++
    if (activeFilters.amenities.length > 0) count++
    if (activeFilters.venueType) count++
    if (activeFilters.capacity) count++
    if (activeFilters.duration) count++
    if (activeFilters.accessibility) count++
    if (activeFilters.parking) count++
    if (activeFilters.catering) count++
    
    return count
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Venue Search
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use our advanced search filters to find the perfect venue for your event
            </p>
          </div>
        </div>

        {/* Search Filters */}
        <SearchFilters onSearch={handleSearch} onReset={handleResetSearch} />

        {/* Active Filters Display */}
        {hasSearched && activeFilters && getActiveFiltersCount() > 0 && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Filters ({getActiveFiltersCount()})
              </h3>
              <button
                onClick={handleResetSearch}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {activeFilters.location && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {activeFilters.location}
                </span>
              )}
              {activeFilters.date && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {activeFilters.date}
                </span>
              )}
              {activeFilters.guests && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  <Users className="h-3 w-3 mr-1" />
                  {activeFilters.guests}
                </span>
              )}
              {activeFilters.eventType && (
                <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {activeFilters.eventType}
                </span>
              )}
              {activeFilters.priceRange && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {activeFilters.priceRange}
                </span>
              )}
              {activeFilters.venueType && (
                <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  <Building className="h-3 w-3 mr-1" />
                  {activeFilters.venueType}
                </span>
              )}
              {activeFilters.amenities.map((amenity, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Searching...' : `${searchResults.length} Results Found`}
              </h2>
              
              {!loading && searchResults.length > 0 && (
                <div className="flex items-center space-x-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sort by Relevance</option>
                    <option>Sort by Price (Low to High)</option>
                    <option>Sort by Price (High to Low)</option>
                    <option>Sort by Capacity</option>
                    <option>Sort by Rating</option>
                  </select>
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <>
                {/* Featured Results */}
                {searchResults.some(result => result.data.featured) && (
                  <div className="mb-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Results</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults
                        .filter(result => result.data.featured)
                        .map((result, index) => (
                          <div key={`featured-${result.type}-${result.data.id}`}>
                            {result.type === 'venue' ? (
                              <VenueCard venue={result.data as Venue} />
                            ) : (
                              <HotelCard hotel={result.data as Hotel} />
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* All Results */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {searchResults.some(result => result.data.featured) ? 'All Results' : 'Search Results'}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults
                      .filter(result => !result.data.featured)
                      .map((result, index) => (
                        <div key={`${result.type}-${result.data.id}`}>
                          {result.type === 'venue' ? (
                            <VenueCard venue={result.data as Venue} />
                          ) : (
                            <HotelCard hotel={result.data as Hotel} />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-md p-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No venues found</h3>
                  <p className="text-gray-600 mb-6">
                    No venues match your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={handleResetSearch}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters & Search Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Tips */}
        {!hasSearched && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Search Tips</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Getting Better Results</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Start with your preferred location or city</li>
                  <li>• Select your event type for more relevant results</li>
                  <li>• Use the guest count filter to match venue capacity</li>
                  <li>• Set a realistic budget range</li>
                  <li>• Check essential amenities you need</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Wedding Venues in Manila</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Corporate Events Makati</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Beach Resorts Boracay</span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Conference Rooms BGC</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}