import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { 
  Users, 
  Building, 
  Settings, 
  BarChart3, 
  Star, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  X, 
  Save,
  Image,
  Upload
} from 'lucide-react'
import AdminReports from '../components/AdminReports'

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
}

interface User {
  id: string
  email: string
  full_name: string
  user_type: string
  company_name: string | null
  phone_number: string | null
  profile_status: string
  is_admin: boolean
  created_at: string
}

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState<'venues' | 'hotels' | 'users' | 'reports'>('venues')
  const [venues, setVenues] = useState<Venue[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [newHotelData, setNewHotelData] = useState({
    name: '',
    description: '',
    location: '',
    city: '',
    province: '',
    images: [] as string[],
    amenities: [] as string[],
    featured: false
  })
  const [showAddHotelForm, setShowAddHotelForm] = useState(false)

  useEffect(() => {
    if (!isAdmin) return
    fetchData()
  }, [isAdmin, activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'venues' || activeTab === 'reports') {
        const { data: venueData, error: venueError } = await supabase
          .from('venues')
          .select('*')
          .order('name')

        if (venueError) throw venueError
        setVenues(venueData || [])
      }

      if (activeTab === 'hotels' || activeTab === 'reports') {
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .order('name')

        if (hotelError) throw hotelError
        setHotels(hotelData || [])
      }

      if (activeTab === 'users') {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (userError) throw userError
        setUsers(userData || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: any) => {
    setEditingItem(item.id)
    setEditData(item)
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setEditData({})
  }

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNewHotelInputChange = (field: string, value: any) => {
    setNewHotelData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayInputChange = (field: string, value: string) => {
    // Split by commas and trim whitespace
    const arrayValue = value.split(',').map(item => item.trim())
    setEditData(prev => ({
      ...prev,
      [field]: arrayValue
    }))
  }

  const handleNewHotelArrayInputChange = (field: string, value: string) => {
    // Split by commas and trim whitespace
    const arrayValue = value.split(',').map(item => item.trim())
    setNewHotelData(prev => ({
      ...prev,
      [field]: arrayValue
    }))
  }

  const handleToggleFeatured = async (item: any, type: 'venue' | 'hotel') => {
    try {
      const table = type === 'venue' ? 'venues' : 'hotels'
      const { error } = await supabase
        .from(table)
        .update({ featured: !item.featured })
        .eq('id', item.id)

      if (error) throw error

      // Update local state
      if (type === 'venue') {
        setVenues(prev => prev.map(venue => 
          venue.id === item.id ? { ...venue, featured: !venue.featured } : venue
        ))
      } else {
        setHotels(prev => prev.map(hotel => 
          hotel.id === item.id ? { ...hotel, featured: !hotel.featured } : hotel
        ))
      }

      setSuccess(`${item.name} featured status updated successfully`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error updating featured status:', error)
      setError('Failed to update featured status')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleSave = async (type: 'venue' | 'hotel' | 'user') => {
    setSaving(true)
    setError(null)
    try {
      let table = ''
      switch (type) {
        case 'venue':
          table = 'venues'
          break
        case 'hotel':
          table = 'hotels'
          break
        case 'user':
          table = 'profiles'
          break
      }

      const { error } = await supabase
        .from(table)
        .update(editData)
        .eq('id', editData.id)

      if (error) throw error

      // Update local state
      if (type === 'venue') {
        setVenues(prev => prev.map(venue => 
          venue.id === editData.id ? editData : venue
        ))
      } else if (type === 'hotel') {
        setHotels(prev => prev.map(hotel => 
          hotel.id === editData.id ? editData : hotel
        ))
      } else {
        setUsers(prev => prev.map(user => 
          user.id === editData.id ? editData : user
        ))
      }

      setEditingItem(null)
      setEditData({})
      setSuccess('Changes saved successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error saving changes:', error)
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleAddNewHotel = async () => {
    setSaving(true)
    setError(null)
    try {
      // Validate required fields
      if (!newHotelData.name || !newHotelData.description || !newHotelData.location || !newHotelData.city || !newHotelData.province) {
        throw new Error('Please fill in all required fields')
      }

      const { data, error } = await supabase
        .from('hotels')
        .insert([newHotelData])
        .select()

      if (error) throw error

      // Update local state
      if (data) {
        setHotels(prev => [...prev, ...data])
      }

      // Reset form
      setNewHotelData({
        name: '',
        description: '',
        location: '',
        city: '',
        province: '',
        images: [],
        amenities: [],
        featured: false
      })
      setShowAddHotelForm(false)
      setSuccess('New hotel added successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (error: any) {
      console.error('Error adding new hotel:', error)
      setError(error.message || 'Failed to add new hotel')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, type: 'venue' | 'hotel' | 'user') => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return
    }

    try {
      let table = ''
      switch (type) {
        case 'venue':
          table = 'venues'
          break
        case 'hotel':
          table = 'hotels'
          break
        case 'user':
          table = 'profiles'
          break
      }

      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error

      // Update local state
      if (type === 'venue') {
        setVenues(prev => prev.filter(venue => venue.id !== id))
      } else if (type === 'hotel') {
        setHotels(prev => prev.filter(hotel => hotel.id !== id))
      } else {
        setUsers(prev => prev.filter(user => user.id !== id))
      }

      setSuccess('Item deleted successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error deleting item:', error)
      setError('Failed to delete item')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleUpdateImages = async (id: string, type: 'venue' | 'hotel', newImageUrl: string) => {
    try {
      const table = type === 'venue' ? 'venues' : 'hotels'
      
      // Get current images
      const { data, error: fetchError } = await supabase
        .from(table)
        .select('images')
        .eq('id', id)
        .single()
      
      if (fetchError) throw fetchError
      
      // Add new image to array
      const updatedImages = [...(data.images || []), newImageUrl]
      
      // Update the record
      const { error: updateError } = await supabase
        .from(table)
        .update({ images: updatedImages })
        .eq('id', id)
      
      if (updateError) throw updateError
      
      // Update local state
      if (type === 'venue') {
        setVenues(prev => prev.map(venue => 
          venue.id === id ? { ...venue, images: updatedImages } : venue
        ))
      } else {
        setHotels(prev => prev.map(hotel => 
          hotel.id === id ? { ...hotel, images: updatedImages } : hotel
        ))
      }
      
      setSuccess('Image added successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error updating images:', error)
      setError('Failed to add image')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          profile_status: newStatus,
          verification_date: newStatus === 'verified' ? new Date().toISOString() : null
        })
        .eq('id', userId)

      if (error) throw error

      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userId ? { 
          ...user, 
          profile_status: newStatus,
          verification_date: newStatus === 'verified' ? new Date().toISOString() : null
        } : user
      ))

      setSuccess(`User status updated to ${newStatus}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error updating user status:', error)
      setError('Failed to update user status')
      setTimeout(() => setError(null), 3000)
    }
  }

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.province.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.province.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.company_name && user.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <Settings className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel. Please contact an administrator if you believe this is an error.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage venues, hotels, users, and view reports</p>
        </div>

        {/* Notification Messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('venues')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'venues'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building className="h-4 w-4 mr-2" />
              Venues
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'hotels'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building className="h-4 w-4 mr-2" />
              Hotels
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </button>
          </nav>
        </div>

        {/* Search and Filters */}
        {activeTab !== 'reports' && (
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              {activeTab === 'hotels' && (
                <button 
                  onClick={() => setShowAddHotelForm(!showAddHotelForm)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Hotel
                </button>
              )}
            </div>
          </div>
        )}

        {/* Add New Hotel Form */}
        {showAddHotelForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Hotel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                <input
                  type="text"
                  value={newHotelData.name}
                  onChange={(e) => handleNewHotelInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  value={newHotelData.location}
                  onChange={(e) => handleNewHotelInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  value={newHotelData.city}
                  onChange={(e) => handleNewHotelInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                <input
                  type="text"
                  value={newHotelData.province}
                  onChange={(e) => handleNewHotelInputChange('province', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={newHotelData.description}
                  onChange={(e) => handleNewHotelInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (comma separated URLs)</label>
                <input
                  type="text"
                  value={newHotelData.images.join(', ')}
                  onChange={(e) => handleNewHotelArrayInputChange('images', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
                <input
                  type="text"
                  value={newHotelData.amenities.join(', ')}
                  onChange={(e) => handleNewHotelArrayInputChange('amenities', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="WiFi, Spa, Restaurant"
                />
              </div>
              <div>
                <label className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    checked={newHotelData.featured}
                    onChange={(e) => handleNewHotelInputChange('featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Hotel</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddHotelForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddNewHotel}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Adding...' : 'Add Hotel'}
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'venues' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVenues.map((venue) => (
                    <tr key={venue.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === venue.id ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{venue.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === venue.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="City"
                            />
                            <input
                              type="text"
                              value={editData.province}
                              onChange={(e) => handleInputChange('province', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="Province"
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">{venue.city}, {venue.province}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === venue.id ? (
                          <div className="space-y-2">
                            <input
                              type="number"
                              value={editData.capacity_min}
                              onChange={(e) => handleInputChange('capacity_min', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="Min"
                            />
                            <input
                              type="number"
                              value={editData.capacity_max}
                              onChange={(e) => handleInputChange('capacity_max', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="Max"
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">{venue.capacity_min}-{venue.capacity_max} pax</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === venue.id ? (
                          <div className="space-y-2">
                            <input
                              type="number"
                              value={editData.price_min}
                              onChange={(e) => handleInputChange('price_min', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="Min"
                            />
                            <input
                              type="number"
                              value={editData.price_max}
                              onChange={(e) => handleInputChange('price_max', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="Max"
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">₱{venue.price_min.toLocaleString()} - ₱{venue.price_max.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeatured(venue, 'venue')}
                          className={`p-1 rounded-md ${
                            venue.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                          }`}
                          title={venue.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          <Star className={`h-5 w-5 ${venue.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{venue.images?.length || 0}</span>
                          {editingItem === venue.id && (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder="Add image URL"
                                className="w-40 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value) {
                                    handleUpdateImages(venue.id, 'venue', e.currentTarget.value)
                                    e.currentTarget.value = ''
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  const input = document.querySelector('input[placeholder="Add image URL"]') as HTMLInputElement
                                  if (input && input.value) {
                                    handleUpdateImages(venue.id, 'venue', input.value)
                                    input.value = ''
                                  }
                                }}
                                className="p-1 bg-blue-100 text-blue-600 rounded-md"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingItem === venue.id ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSave('venue')}
                              disabled={saving}
                              className="text-green-600 hover:text-green-900"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEdit(venue)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(venue.id, 'venue')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === hotel.id ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === hotel.id ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="City"
                            />
                            <input
                              type="text"
                              value={editData.province}
                              onChange={(e) => handleInputChange('province', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              placeholder="Province"
                            />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">{hotel.city}, {hotel.province}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingItem === hotel.id ? (
                          <textarea
                            value={editData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            rows={3}
                          />
                        ) : (
                          <div className="text-sm text-gray-500 line-clamp-2">{hotel.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeatured(hotel, 'hotel')}
                          className={`p-1 rounded-md ${
                            hotel.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                          }`}
                          title={hotel.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          <Star className={`h-5 w-5 ${hotel.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{hotel.images?.length || 0}</span>
                          {editingItem === hotel.id && (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder="Add image URL"
                                className="w-40 px-2 py-1 border border-gray-300 rounded-md text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value) {
                                    handleUpdateImages(hotel.id, 'hotel', e.currentTarget.value)
                                    e.currentTarget.value = ''
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  const input = document.querySelector('input[placeholder="Add image URL"]') as HTMLInputElement
                                  if (input && input.value) {
                                    handleUpdateImages(hotel.id, 'hotel', input.value)
                                    input.value = ''
                                  }
                                }}
                                className="p-1 bg-blue-100 text-blue-600 rounded-md"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingItem === hotel.id ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSave('hotel')}
                              disabled={saving}
                              className="text-green-600 hover:text-green-900"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEdit(hotel)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(hotel.id, 'hotel')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === user.id ? (
                          <input
                            type="text"
                            value={editData.full_name}
                            onChange={(e) => handleInputChange('full_name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === user.id ? (
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <div className="text-sm text-gray-500">{user.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === user.id ? (
                          <select
                            value={editData.user_type}
                            onChange={(e) => handleInputChange('user_type', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          >
                            <option value="client">Client</option>
                            <option value="space_provider">Space Provider</option>
                            <option value="event_vendor">Event Vendor</option>
                            <option value="sponsor">Sponsor</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <div className="text-sm text-gray-500">{user.user_type}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === user.id ? (
                          <input
                            type="text"
                            value={editData.company_name || ''}
                            onChange={(e) => handleInputChange('company_name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <div className="text-sm text-gray-500">{user.company_name || '-'}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === user.id ? (
                          <select
                            value={editData.profile_status}
                            onChange={(e) => handleInputChange('profile_status', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="suspended">Suspended</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        ) : (
                          <div className="flex items-center">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${user.profile_status === 'verified' ? 'bg-green-100 text-green-800' : 
                                user.profile_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                user.profile_status === 'suspended' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {user.profile_status}
                            </span>
                            {user.profile_status === 'pending' && (
                              <div className="ml-2 flex space-x-1">
                                <button 
                                  onClick={() => handleUpdateUserStatus(user.id, 'verified')}
                                  className="p-1 bg-green-100 text-green-600 rounded-md"
                                  title="Verify user"
                                >
                                  <Check className="h-3 w-3" />
                                </button>
                                <button 
                                  onClick={() => handleUpdateUserStatus(user.id, 'rejected')}
                                  className="p-1 bg-red-100 text-red-600 rounded-md"
                                  title="Reject user"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem === user.id ? (
                          <input
                            type="checkbox"
                            checked={editData.is_admin}
                            onChange={(e) => handleInputChange('is_admin', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        ) : (
                          <div className="text-sm text-gray-500">{user.is_admin ? 'Yes' : 'No'}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingItem === user.id ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSave('user')}
                              disabled={saving}
                              className="text-green-600 hover:text-green-900"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id, 'user')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <AdminReports />
        )}
      </div>
    </div>
  )
}