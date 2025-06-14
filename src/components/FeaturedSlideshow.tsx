import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import VenueCard from './VenueCard'

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

interface FeaturedSlideshowProps {
  venues: Venue[]
}

// Function to generate slug from venue name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '') // Remove spaces
    .replace(/the\s*/g, '') // Remove "the" prefix
    .replace(/hotel|resort|spa|&/g, '') // Remove common words
    .trim()
}

// Function to generate city slug
const generateCitySlug = (city: string): string => {
  return city.toLowerCase().replace(/\s+/g, '')
}

// Function to generate event type slug
const generateEventTypeSlug = (eventType: string): string => {
  return eventType
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

export default function FeaturedSlideshow({ venues }: FeaturedSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (venues.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % venues.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [venues.length])

  if (venues.length === 0) return null

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % venues.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + venues.length) % venues.length)
  }

  // Function to get the appropriate image for each venue
  const getVenueImage = (venue: Venue) => {
    // Use the new Peninsula Manila image if it's The Peninsula Manila
    if (venue.name.toLowerCase().includes('peninsula manila') || venue.name.toLowerCase().includes('peninsula')) {
      return '/image.png'
    }
    // Use the new Shangri-La image if it's Shangri-La
    if (venue.name.toLowerCase().includes('shangri-la') || venue.name.toLowerCase().includes('shangri la')) {
      return 'https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/E/7/%7BEE7945FF-E584-4C17-B5A8-0B6EACBA4EA6%7DSLM_YourShangriLaStory.jpg'
    }
    // Use the first image from the venue's images array, or fallback to default
    return venue.images[0] || 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
  }

  const handleViewDetails = (venue: Venue) => {
    const citySlug = generateCitySlug(venue.city)
    const venueSlug = venue.slug || generateSlug(venue.name)
    navigate(`/${citySlug}/${venueSlug}`)
  }

  const handleEventTypeClick = (eventType: string) => {
    const eventTypeSlug = generateEventTypeSlug(eventType)
    navigate(`/venues/${eventTypeSlug}`)
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Venues
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Discover the most popular and exclusive event venues across the Philippines
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {venues.map((venue, index) => (
                <div key={venue.id} className="w-full flex-shrink-0 px-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <img
                        src={getVenueImage(venue)}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                    
                    <div className="text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{venue.name}</h3>
                      <p className="text-blue-100 mb-4 text-lg">{venue.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                          <span className="font-semibold">Capacity:</span>
                          <p>{venue.capacity_min}-{venue.capacity_max} guests</p>
                        </div>
                        <div>
                          <span className="font-semibold">Size:</span>
                          <p>{venue.size_sqm} sqm</p>
                        </div>
                        <div>
                          <span className="font-semibold">Price Range:</span>
                          <p>₱{venue.price_min.toLocaleString()} - ₱{venue.price_max.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Location:</span>
                          <p>{venue.city}, {venue.province}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <span className="font-semibold block mb-2">Event Types:</span>
                        <div className="flex flex-wrap gap-2">
                          {venue.event_types.map((type, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleEventTypeClick(type)}
                              className="bg-blue-500 bg-opacity-50 px-3 py-1 rounded-full text-sm hover:bg-opacity-70 transition-colors flex items-center"
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleViewDetails(venue)}
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {venues.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}