import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, DollarSign, Square, Filter, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import VenueCard from '../components/VenueCard'
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
  slug?: string
}

// Event type mapping for display names
const eventTypeMapping: { [key: string]: string } = {
  'wedding': 'Wedding',
  'corporate': 'Corporate',
  'birthday': 'Birthday',
  'anniversary': 'Anniversary',
  'conference': 'Conference',
  'product-launch': 'Product Launch',
  'team-building': 'Team Building',
  'graduation': 'Graduation',
  'reunion': 'Reunion',
  'gala': 'Gala',
  'trade-show': 'Trade Show',
  'workshop': 'Workshop'
}

export default function VenuesPage() {
  const { eventType } = useParams()
  const navigate = useNavigate()
  const [venues, setVenues] = useState<Venue[]>([])
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchVenues()
  }, [])

  useEffect(() => {
    filterVenues()
  }, [venues, eventType, searchTerm])

  const fetchVenues = async () => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setVenues(data || [])
    } catch (error) {
      console.error('Error fetching venues:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterVenues = () => {
    let filtered = venues

    // Filter by event type if specified in URL
    if (eventType) {
      const displayEventType = eventTypeMapping[eventType] || eventType
      filtered = filtered.filter(venue => 
        venue.event_types.some(type => 
          type.toLowerCase() === displayEventType.toLowerCase()
        )
      )
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredVenues(filtered)
  }

  const handleSearch = (filters: SearchFiltersType) => {
    // This would implement the advanced search functionality
    // For now, we'll just use the basic search term
    console.log('Search filters:', filters)
  }

  const handleResetSearch = () => {
    setSearchTerm('')
    if (eventType) {
      navigate('/venues')
    }
  }

  const getPageTitle = () => {
    if (eventType) {
      const displayEventType = eventTypeMapping[eventType] || eventType
      return `${displayEventType} Venues`
    }
    return 'All Venues'
  }

  const getPageDescription = () => {
    if (eventType) {
      const displayEventType = eventTypeMapping[eventType] || eventType
      return `Find the perfect venues for your ${displayEventType.toLowerCase()} event across the Philippines`
    }
    return 'Discover amazing event venues across the Philippines'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          {eventType && (
            <button
              onClick={() => navigate('/venues')}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Venues
            </button>
          )}
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getPageDescription()}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Event Type Filter Pills */}
        {!eventType && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Event Type</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(eventTypeMapping).map(([slug, displayName]) => (
                <button
                  key={slug}
                  onClick={() => navigate(`/venues/${slug}`)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {displayName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Current Filter Display */}
        {eventType && (
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Calendar className="h-4 w-4 mr-1" />
                {eventTypeMapping[eventType] || eventType}
                <button
                  onClick={() => navigate('/venues')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} found
            </h2>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option>Sort by Relevance</option>
                <option>Sort by Price (Low to High)</option>
                <option>Sort by Price (High to Low)</option>
                <option>Sort by Capacity</option>
                <option>Sort by Rating</option>
              </select>
              
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Venues Grid */}
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
        ) : filteredVenues.length > 0 ? (
          <>
            {/* Featured Venues */}
            {filteredVenues.some(venue => venue.featured) && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Venues</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVenues
                    .filter(venue => venue.featured)
                    .map((venue) => (
                      <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
              </div>
            )}

            {/* All Venues */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {filteredVenues.some(venue => venue.featured) ? 'All Venues' : 'Venues'}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVenues
                  .filter(venue => !venue.featured)
                  .map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
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
                {eventType 
                  ? `No venues found for ${eventTypeMapping[eventType] || eventType} events.`
                  : 'No venues match your search criteria.'
                }
              </p>
              <div className="space-x-4">
                <button
                  onClick={handleResetSearch}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {eventType ? 'View All Venues' : 'Clear Search'}
                </button>
                {eventType && (
                  <button
                    onClick={() => navigate('/venues')}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Browse All Event Types
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Event Type Suggestions */}
        {eventType && filteredVenues.length > 0 && (
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Explore Other Event Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(eventTypeMapping)
                .filter(([slug]) => slug !== eventType)
                .slice(0, 6)
                .map(([slug, displayName]) => (
                  <button
                    key={slug}
                    onClick={() => navigate(`/venues/${slug}`)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
                  >
                    <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">{displayName}</div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {filteredVenues.length > 0 && (
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              {eventType ? `${eventTypeMapping[eventType]} Venue` : 'Venue'} Statistics
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{filteredVenues.length}</div>
                <div className="text-gray-600">Total Venues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(filteredVenues.reduce((sum, v) => sum + v.capacity_max, 0) / filteredVenues.length).toLocaleString()}
                </div>
                <div className="text-gray-600">Avg Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  ₱{Math.round(filteredVenues.reduce((sum, v) => sum + v.price_min, 0) / filteredVenues.length).toLocaleString()}
                </div>
                <div className="text-gray-600">Avg Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {filteredVenues.filter(v => v.featured).length}
                </div>
                <div className="text-gray-600">Featured Venues</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}