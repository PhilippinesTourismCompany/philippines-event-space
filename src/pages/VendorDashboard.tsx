import React, { useState, useEffect } from 'react'
import { Camera, Utensils, Music, Palette, Calendar, DollarSign, Users, Star, Plus, Edit, Eye, Package } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface Service {
  id: string
  name: string
  category: string
  description: string
  price_min: number
  price_max: number
  duration: string
  portfolio_images: string[]
  bookings_count: number
  rating: number
  status: 'active' | 'pending' | 'inactive'
}

interface Booking {
  id: string
  service_name: string
  client_name: string
  event_date: string
  event_type: string
  location: string
  amount: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
}

const serviceCategories = [
  { id: 'photography', name: 'Photography & Videography', icon: Camera, color: 'blue' },
  { id: 'catering', name: 'Catering Services', icon: Utensils, color: 'green' },
  { id: 'entertainment', name: 'Entertainment & Music', icon: Music, color: 'purple' },
  { id: 'decoration', name: 'Decoration & Styling', icon: Palette, color: 'pink' },
  { id: 'planning', name: 'Event Planning', icon: Calendar, color: 'orange' },
  { id: 'other', name: 'Other Services', icon: Package, color: 'gray' }
]

export default function VendorDashboard() {
  const { user, userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'bookings' | 'portfolio' | 'profile'>('overview')
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Mock services data
      setServices([
        {
          id: '1',
          name: 'Wedding Photography Package',
          category: 'photography',
          description: 'Complete wedding photography with pre-wedding shoot and same-day edit',
          price_min: 50000,
          price_max: 150000,
          duration: '8-12 hours',
          portfolio_images: ['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'],
          bookings_count: 15,
          rating: 4.9,
          status: 'active'
        },
        {
          id: '2',
          name: 'Corporate Event Catering',
          category: 'catering',
          description: 'Professional catering services for corporate events and conferences',
          price_min: 800,
          price_max: 2000,
          duration: 'Per person',
          portfolio_images: ['https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'],
          bookings_count: 28,
          rating: 4.7,
          status: 'active'
        }
      ])

      // Mock bookings data
      setBookings([
        {
          id: '1',
          service_name: 'Wedding Photography Package',
          client_name: 'Maria & Juan Santos',
          event_date: '2025-02-14',
          event_type: 'Wedding',
          location: 'Shangri-La Makati',
          amount: 120000,
          status: 'confirmed'
        },
        {
          id: '2',
          service_name: 'Corporate Event Catering',
          client_name: 'ABC Corporation',
          event_date: '2025-02-20',
          event_type: 'Corporate',
          location: 'Conrad Manila',
          amount: 85000,
          status: 'pending'
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0)
  const totalBookings = bookings.length
  const avgRating = services.reduce((sum, s) => sum + s.rating, 0) / services.length || 0
  const activeServices = services.filter(s => s.status === 'active').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'confirmed': case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    const cat = serviceCategories.find(c => c.id === category)
    return cat ? cat.icon : Package
  }

  const getCategoryColor = (category: string) => {
    const cat = serviceCategories.find(c => c.id === category)
    return cat ? cat.color : 'gray'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userProfile?.company_name || userProfile?.full_name}!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Calendar },
              { id: 'services', label: 'My Services', icon: Package },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'portfolio', label: 'Portfolio', icon: Camera },
              { id: 'profile', label: 'Profile', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₱{totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}/5</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Services</p>
                    <p className="text-2xl font-bold text-gray-900">{activeServices}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {serviceCategories.map(category => {
                  const Icon = category.icon
                  const serviceCount = services.filter(s => s.category === category.id).length
                  return (
                    <div key={category.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <div className={`p-3 rounded-lg bg-${category.color}-100`}>
                        <Icon className={`h-6 w-6 text-${category.color}-600`} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{serviceCount} services</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {bookings.slice(0, 3).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.service_name}</h4>
                        <p className="text-sm text-gray-600">{booking.client_name} • {booking.event_type}</p>
                        <p className="text-sm text-gray-500">{new Date(booking.event_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₱{booking.amount.toLocaleString()}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Services</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => {
                const Icon = getCategoryIcon(service.category)
                const color = getCategoryColor(service.category)
                return (
                  <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={service.portfolio_images[0]}
                      alt={service.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Icon className={`h-5 w-5 text-${color}-600 mr-2`} />
                          <h4 className="font-medium text-gray-900">{service.name}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>
                          <p className="text-gray-600">Price Range</p>
                          <p className="font-medium">₱{service.price_min.toLocaleString()} - ₱{service.price_max.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Bookings</p>
                          <p className="font-medium">{service.bookings_count}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium ml-1">{service.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">{service.duration}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {bookings.map(booking => (
                <div key={booking.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{booking.service_name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="font-medium">Client</p>
                          <p>{booking.client_name}</p>
                        </div>
                        <div>
                          <p className="font-medium">Event Date</p>
                          <p>{new Date(booking.event_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-medium">Event Type</p>
                          <p>{booking.event_type}</p>
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p>{booking.location}</p>
                        </div>
                        <div>
                          <p className="font-medium">Amount</p>
                          <p className="text-green-600 font-medium">₱{booking.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Gallery</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Images
              </button>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {services.flatMap(service => service.portfolio_images).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-3 py-1 rounded-md text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Vendor Profile</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      defaultValue={userProfile?.company_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      defaultValue={userProfile?.full_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue={userProfile?.phone_number || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Categories</label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {serviceCategories.map(category => (
                      <label key={category.id} className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>Over 10 years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Areas</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Metro Manila</option>
                      <option>Cebu</option>
                      <option>Davao</option>
                      <option>Nationwide</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your business and services..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}