import React, { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, DollarSign, Building, Filter, X } from 'lucide-react'
import { trackSearch } from '../lib/analytics'

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
  onReset: () => void
  initialLocation?: string
}

export interface SearchFilters {
  location: string
  date: string
  guests: string
  eventType: string
  priceRange: string
  amenities: string[]
  venueType: string
  capacity: string
  duration: string
  accessibility: boolean
  parking: boolean
  catering: boolean
}

const eventTypes = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Anniversary',
  'Conference',
  'Product Launch',
  'Team Building',
  'Graduation',
  'Reunion',
  'Gala',
  'Trade Show',
  'Workshop'
]

const amenityOptions = [
  'WiFi',
  'Audio Visual Equipment',
  'Air Conditioning',
  'Parking',
  'Catering Service',
  'Outdoor Space',
  'Swimming Pool',
  'Spa Services',
  'Business Center',
  'Valet Parking',
  'Garden',
  'Terrace',
  'Dance Floor',
  'Stage',
  'Kitchen Facilities'
]

const priceRanges = [
  { label: 'Under ₱50,000', value: '0-50000' },
  { label: '₱50,000 - ₱100,000', value: '50000-100000' },
  { label: '₱100,000 - ₱200,000', value: '100000-200000' },
  { label: '₱200,000 - ₱500,000', value: '200000-500000' },
  { label: 'Over ₱500,000', value: '500000+' }
]

const capacityRanges = [
  { label: '1-50 guests', value: '1-50' },
  { label: '51-100 guests', value: '51-100' },
  { label: '101-200 guests', value: '101-200' },
  { label: '201-500 guests', value: '201-500' },
  { label: '500+ guests', value: '500+' }
]

const durationOptions = [
  { label: 'Half Day (4 hours)', value: 'half_day' },
  { label: 'Full Day (8 hours)', value: 'full_day' },
  { label: 'Multi-day', value: 'multi_day' },
  { label: 'Hourly', value: 'hourly' }
]

// Hotel brands for suggestions
const hotelBrands = [
  'Peninsula', 'Shangri-La', 'Marriott', 'Grand Hyatt', 'JPark', 'The Lind', 'Okada', 'Dusit', 'Sofitel'
]

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

export default function SearchFilters({ onSearch, onReset, initialLocation = '' }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    location: initialLocation,
    date: '',
    guests: '',
    eventType: '',
    priceRange: '',
    amenities: [],
    venueType: '',
    capacity: '',
    duration: '',
    accessibility: false,
    parking: false,
    catering: false
  })
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [brandSuggestions, setBrandSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (initialLocation) {
      setFilters(prev => ({ ...prev, location: initialLocation }))
    }
  }, [initialLocation])

  // Update suggestions when location changes
  useEffect(() => {
    if (filters.location.length >= 2) {
      // Check for city matches
      const cityMatches = philippineCities.filter(city =>
        city.toLowerCase().includes(filters.location.toLowerCase())
      ).slice(0, 3)
      
      // Check for hotel brand matches
      const brandMatches = hotelBrands.filter(brand =>
        brand.toLowerCase().includes(filters.location.toLowerCase())
      ).slice(0, 3)
      
      setLocationSuggestions(cityMatches)
      setBrandSuggestions(brandMatches)
      setShowLocationSuggestions((cityMatches.length > 0 || brandMatches.length > 0))
    } else {
      setLocationSuggestions([])
      setBrandSuggestions([])
      setShowLocationSuggestions(false)
    }
  }, [filters.location])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity]
    handleFilterChange('amenities', newAmenities)
  }

  const handleSearch = () => {
    // Track search event
    trackSearch(filters.location || 'all', filters)
    onSearch(filters)
  }

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      location: '',
      date: '',
      guests: '',
      eventType: '',
      priceRange: '',
      amenities: [],
      venueType: '',
      capacity: '',
      duration: '',
      accessibility: false,
      parking: false,
      catering: false
    }
    setFilters(resetFilters)
    onReset()
  }

  const handleLocationSelect = (location: string) => {
    handleFilterChange('location', location)
    setShowLocationSuggestions(false)
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'boolean') return value
    return value !== ''
  }).length

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Basic Search */}
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="City, Location, or Hotel Brand"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            onFocus={() => setShowLocationSuggestions(locationSuggestions.length > 0 || brandSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Location Suggestions */}
          {showLocationSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              {/* Hotel Brand Suggestions */}
              {brandSuggestions.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                    Hotel Brands
                  </div>
                  {brandSuggestions.map((brand, index) => (
                    <div
                      key={`brand-${index}`}
                      onClick={() => handleLocationSelect(brand)}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center"
                    >
                      <Building className="h-4 w-4 text-blue-600 mr-2" />
                      <span>{brand}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* City Suggestions */}
              {locationSuggestions.length > 0 && (
                <div className="py-1">
                  {brandSuggestions.length > 0 && (
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                      Cities
                    </div>
                  )}
                  {locationSuggestions.map((city, index) => (
                    <div
                      key={`city-${index}`}
                      onClick={() => handleLocationSelect(city)}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center"
                    >
                      <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={filters.date}
            min={minDate}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select 
            value={filters.guests}
            onChange={(e) => handleFilterChange('guests', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Guests</option>
            {capacityRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </button>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>
        
        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center text-gray-600 hover:text-gray-700 transition-colors text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* Event Type & Venue Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={filters.eventType}
                onChange={(e) => handleFilterChange('eventType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Event Type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
              <select
                value={filters.venueType}
                onChange={(e) => handleFilterChange('venueType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Venue Type</option>
                <option value="hotel">Hotel & Resort</option>
                <option value="venue">Event Venue</option>
                <option value="outdoor">Outdoor Space</option>
                <option value="restaurant">Restaurant</option>
                <option value="conference">Conference Center</option>
              </select>
            </div>
          </div>

          {/* Price Range & Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Price Range</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Duration</option>
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Essential Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Essential Features</label>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.accessibility}
                  onChange={(e) => handleFilterChange('accessibility', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Wheelchair Accessible</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.parking}
                  onChange={(e) => handleFilterChange('parking', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Parking Available</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.catering}
                  onChange={(e) => handleFilterChange('catering', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Catering Available</span>
              </label>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities ({filters.amenities.length} selected)
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-3">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-1 text-gray-700 text-xs">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export { SearchFilters }