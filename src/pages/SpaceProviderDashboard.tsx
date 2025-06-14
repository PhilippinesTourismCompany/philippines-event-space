import React, { useState, useEffect } from 'react'
import { Building, Calendar, DollarSign, Users, TrendingUp, Plus, Edit, Eye, BarChart3, MapPin, Save, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface Property {
  id: string
  name: string
  type: 'venue' | 'hotel'
  city: string
  province: string
  total_bookings: number
  monthly_revenue: number
  occupancy_rate: number
  rating: number
  status: 'active' | 'pending' | 'inactive'
  images: string[]
}

interface Booking {
  id: string
  property_name: string
  client_name: string
  event_date: string
  event_type: string
  guests: number
  amount: number
  status: 'confirmed' | 'pending' | 'cancelled'
}

interface ProfileFormData {
  business_name: string
  contact_person: string
  email: string
  phone_number: string
  business_license: string
  property_types: string[]
  total_properties: number
  years_in_business: string
  operating_hours: string
  cancellation_policy: string
  booking_lead_time: number
}

export default function SpaceProviderDashboard() {
  const { user, userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'bookings' | 'analytics' | 'profile'>('overview')
  const [properties, setProperties] = useState<Property[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileFormData>({
    business_name: '',
    contact_person: '',
    email: '',
    phone_number: '',
    business_license: '',
    property_types: [],
    total_properties: 0,
    years_in_business: '',
    operating_hours: '',
    cancellation_policy: '',
    booking_lead_time: 7
  })

  useEffect(() => {
    fetchDashboardData()
    initializeProfileData()
  }, [])

  const initializeProfileData = () => {
    if (userProfile) {
      setProfileData({
        business_name: userProfile.company_name || '',
        contact_person: userProfile.full_name || '',
        email: user?.email || '',
        phone_number: userProfile.phone_number || '',
        business_license: '',
        property_types: [],
        total_properties: properties.length,
        years_in_business: '',
        operating_hours: '',
        cancellation_policy: '',
        booking_lead_time: 7
      })
    }
  }

  const fetchDashboardData = async () => {
    try {
      // Mock properties data
      setProperties([
        {
          id: '1',
          name: 'Grand Ballroom Manila',
          type: 'venue',
          city: 'Manila',
          province: 'Metro Manila',
          total_bookings: 24,
          monthly_revenue: 480000,
          occupancy_rate: 75,
          rating: 4.8,
          status: 'active',
          images: ['https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg']
        },
        {
          id: '2',
          name: 'Seaside Resort Cebu',
          type: 'hotel',
          city: 'Cebu City',
          province: 'Cebu',
          total_bookings: 18,
          monthly_revenue: 360000,
          occupancy_rate: 68,
          rating: 4.6,
          status: 'active',
          images: ['https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg']
        }
      ])

      // Mock bookings data
      setBookings([
        {
          id: '1',
          property_name: 'Grand Ballroom Manila',
          client_name: 'Maria Santos',
          event_date: '2025-02-15',
          event_type: 'Wedding',
          guests: 200,
          amount: 150000,
          status: 'confirmed'
        },
        {
          id: '2',
          property_name: 'Seaside Resort Cebu',
          client_name: 'John Corporation',
          event_date: '2025-02-20',
          event_type: 'Corporate',
          guests: 100,
          amount: 80000,
          status: 'pending'
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveSuccess(false)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // In a real application, you would update the profile in Supabase
      // For now, we'll just simulate a successful save
      console.log('Profile data to save:', profileData)

      // Show success message
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Error saving profile:', error)
      // You could add error handling here
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ProfileFormData, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      property_types: checked 
        ? [...prev.property_types, type]
        : prev.property_types.filter(t => t !== type)
    }))
  }

  const totalRevenue = properties.reduce((sum, p) => sum + p.monthly_revenue, 0)
  const totalBookings = properties.reduce((sum, p) => sum + p.total_bookings, 0)
  const avgOccupancy = properties.reduce((sum, p) => sum + p.occupancy_rate, 0) / properties.length || 0
  const avgRating = properties.reduce((sum, p) => sum + p.rating, 0) / properties.length || 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Space Provider Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userProfile?.company_name || userProfile?.full_name}!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'properties', label: 'My Properties', icon: Building },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
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
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Occupancy</p>
                    <p className="text-2xl font-bold text-gray-900">{avgOccupancy.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}/5</p>
                  </div>
                </div>
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
                        <h4 className="font-medium text-gray-900">{booking.property_name}</h4>
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

            {/* Property Performance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Performance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {properties.map(property => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{property.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Monthly Revenue</p>
                        <p className="font-medium">₱{property.monthly_revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Bookings</p>
                        <p className="font-medium">{property.total_bookings}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Occupancy</p>
                        <p className="font-medium">{property.occupancy_rate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <p className="font-medium">{property.rating}/5</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Properties</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{property.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.city}, {property.province}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-medium">₱{property.monthly_revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Bookings</p>
                        <p className="font-medium">{property.total_bookings}</p>
                      </div>
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
              ))}
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
                        <h4 className="text-lg font-medium text-gray-900">{booking.property_name}</h4>
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
                          <p className="font-medium">Guests</p>
                          <p>{booking.guests}</p>
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

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Analytics & Insights</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-medium text-gray-900 mb-4">Revenue Trend</h4>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Revenue chart would go here</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-medium text-gray-900 mb-4">Booking Trends</h4>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Booking trends chart would go here</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-medium text-gray-900 mb-4">Performance Metrics</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">85%</p>
                  <p className="text-gray-600">Customer Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">92%</p>
                  <p className="text-gray-600">On-time Delivery</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">78%</p>
                  <p className="text-gray-600">Repeat Customers</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Business Profile</h3>
                {saveSuccess && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Profile saved successfully!</span>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={profileData.business_name}
                      onChange={(e) => handleInputChange('business_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      value={profileData.contact_person}
                      onChange={(e) => handleInputChange('contact_person', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business License Number</label>
                  <input
                    type="text"
                    value={profileData.business_license}
                    onChange={(e) => handleInputChange('business_license', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business license number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Types</label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {['Hotels', 'Event Venues', 'Conference Centers', 'Outdoor Spaces', 'Restaurants', 'Resorts'].map(type => (
                      <label key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={profileData.property_types.includes(type)}
                          onChange={(e) => handlePropertyTypeChange(type, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                        />
                        <span className="ml-2 text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Properties</label>
                    <input
                      type="number"
                      value={profileData.total_properties}
                      onChange={(e) => handleInputChange('total_properties', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
                    <select 
                      value={profileData.years_in_business}
                      onChange={(e) => handleInputChange('years_in_business', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select years in business</option>
                      <option value="less-than-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="over-10">Over 10 years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={profileData.operating_hours}
                    onChange={(e) => handleInputChange('operating_hours', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Monday-Sunday 8:00 AM - 10:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
                  <textarea
                    value={profileData.cancellation_policy}
                    onChange={(e) => handleInputChange('cancellation_policy', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your cancellation policy..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Lead Time (days)</label>
                  <input
                    type="number"
                    value={profileData.booking_lead_time}
                    onChange={(e) => handleInputChange('booking_lead_time', parseInt(e.target.value) || 7)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="365"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum number of days required for advance booking</p>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
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