import React, { useEffect, useState } from 'react'
import { MapPin, Building, Hotel, Filter, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import VenueMap from '../components/VenueMap'
import VenueCard from '../components/VenueCard'
import HotelCard from '../components/HotelCard'

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

export default function MapPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [selectedItem, setSelectedItem] = useState<(Venue | Hotel) | null>(null)
  const [selectedType, setSelectedType] = useState<'venue' | 'hotel' | null>(null)
  const [loading, setLoading] = useState(true)
  const [showVenues, setShowVenues] = useState(true)
  const [showHotels, setShowHotels] = useState(true)
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.8797, 121.7740])
  const [mapZoom, setMapZoom] = useState(6)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [venuesResponse, hotelsResponse] = await Promise.all([
        supabase.from('venues').select('*').order('featured', { ascending: false }),
        supabase.from('hotels').select(`
          *,
          rooms(count)
        `).order('featured', { ascending: false })
      ])

      if (venuesResponse.error) throw venuesResponse.error
      if (hotelsResponse.error) throw hotelsResponse.error

      setVenues(venuesResponse.data || [])
      
      const hotelsWithRoomCount = hotelsResponse.data?.map(hotel => ({
        ...hotel,
        room_count: hotel.rooms?.[0]?.count || 0
      })) || []
      
      setHotels(hotelsWithRoomCount)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkerClick = (item: Venue | Hotel, type: 'venue' | 'hotel') => {
    setSelectedItem(item)
    setSelectedType(type)
    
    // Focus map on selected item (approximate coordinates based on city)
    const cityCoordinates: { [key: string]: [number, number] } = {
      'Manila': [14.5995, 120.9842],
      'Quezon City': [14.6760, 121.0437],
      'Makati': [14.5547, 121.0244],
      'Cebu City': [10.3157, 123.8854],
      'Lapu-Lapu City': [10.3103, 123.9494],
      'Davao City': [7.1907, 125.4553],
      'Iloilo City': [10.7202, 122.5621],
      'Baguio': [16.4023, 120.5960],
      'Boracay': [11.9674, 121.9248],
      'Palawan': [9.8349, 118.7384],
      'Bohol': [9.8349, 124.1436],
      'Siargao': [9.8601, 126.0570],
      'Tagaytay': [14.1159, 120.9621],
      'Subic': [14.8201, 120.2720],
      'Clark': [15.1855, 120.5360],
      'Batangas': [13.7565, 121.0583]
    }
    
    const coords = cityCoordinates[item.city] || cityCoordinates['Manila']
    setMapCenter(coords)
    setMapZoom(12)
  }

  const resetMapView = () => {
    setMapCenter([12.8797, 121.7740])
    setMapZoom(6)
    setSelectedItem(null)
    setSelectedType(null)
  }

  const filteredVenues = showVenues ? venues : []
  const filteredHotels = showHotels ? hotels : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Venue Locations Map
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore venues and hotels across the Philippines on our interactive map
          </p>
        </div>

        {/* Map Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-gray-900">Show on Map:</h3>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showVenues}
                  onChange={(e) => setShowVenues(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm text-gray-700">Venues ({venues.length})</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showHotels}
                  onChange={(e) => setShowHotels(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mr-2"
                />
                <Hotel className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-gray-700">Hotels ({hotels.length})</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              {selectedItem && (
                <button
                  onClick={resetMapView}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset View
                </button>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                  <span>Venues</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-1"></div>
                  <span>Hotels</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                  <span>Featured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Details Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-lg shadow-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            ) : (
              <VenueMap
                venues={filteredVenues}
                hotels={filteredHotels}
                center={mapCenter}
                zoom={mapZoom}
                height="600px"
                onMarkerClick={handleMarkerClick}
              />
            )}
          </div>

          {/* Selected Item Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {selectedItem && selectedType ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Selected Location</h3>
                    <button
                      onClick={() => {
                        setSelectedItem(null)
                        setSelectedType(null)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {selectedType === 'venue' ? (
                    <VenueCard venue={selectedItem as Venue} />
                  ) : (
                    <HotelCard hotel={selectedItem as Hotel} />
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Location
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Click on any marker on the map to view details about venues and hotels.
                  </p>
                  
                  <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Total Venues:</span>
                      <span className="font-medium">{venues.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Hotels:</span>
                      <span className="font-medium">{hotels.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Featured Locations:</span>
                      <span className="font-medium">
                        {venues.filter(v => v.featured).length + hotels.filter(h => h.featured).length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{venues.length}</div>
            <div className="text-gray-600">Event Venues</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Hotel className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{hotels.length}</div>
            <div className="text-gray-600">Hotels & Resorts</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {hotels.reduce((sum, hotel) => sum + (hotel.room_count || 0), 0)}
            </div>
            <div className="text-gray-600">Meeting Rooms</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Filter className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {venues.filter(v => v.featured).length + hotels.filter(h => h.featured).length}
            </div>
            <div className="text-gray-600">Featured Locations</div>
          </div>
        </div>
      </div>
    </div>
  )
}