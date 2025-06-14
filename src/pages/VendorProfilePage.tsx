import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Calendar, 
  DollarSign, 
  Users, 
  Camera, 
  Utensils, 
  Music, 
  Palette,
  Edit,
  Save,
  X,
  MessageCircle,
  Facebook,
  Instagram,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { MessagingProvider } from '../contexts/MessagingContext'
import ContactVendorModal from '../components/ContactVendorModal'

interface VendorProfile {
  id: string
  slug: string
  company_name: string
  bio: string
  services: string[]
  rates: {
    service: string
    price_min: number
    price_max: number
    unit: string
  }[]
  contact: {
    phone: string
    email: string
    website: string
    address: string
  }
  social_media: {
    facebook?: string
    instagram?: string
  }
  portfolio: string[]
  rating: number
  total_reviews: number
  years_experience: number
  specialties: string[]
  coverage_areas: string[]
  logo: string
  featured: boolean
}

interface Review {
  id: string
  user_name: string
  user_avatar?: string
  rating: number
  comment: string
  date: string
  helpful_count: number
  user_voted?: 'helpful' | 'not_helpful' | null
}

// Mock vendor data with updated Budots Media Philippines details
const mockVendors: VendorProfile[] = [
  {
    id: 'budots-media',
    slug: 'budotsmedia',
    company_name: 'Budots Media Philippines',
    bio: 'Premier media production company specializing in wedding photography, videography, and live streaming services. We capture your most precious moments with artistic excellence and professional quality.',
    services: ['Wedding Photography', 'Event Videography', 'Live Streaming', 'Photo Booth', 'Drone Photography', 'Same Day Edit'],
    rates: [
      { service: 'Wedding Photography Package', price_min: 50000, price_max: 150000, unit: 'per event' },
      { service: 'Event Videography', price_min: 40000, price_max: 120000, unit: 'per event' },
      { service: 'Live Streaming', price_min: 15000, price_max: 35000, unit: 'per event' },
      { service: 'Photo Booth Rental', price_min: 8000, price_max: 20000, unit: 'per day' }
    ],
    contact: {
      phone: '0915 405 2486',
      email: 'budots.media.philippines@gmail.com',
      website: 'budotsmediaphilippines.com',
      address: 'Lapu-Lapu City, Cebu'
    },
    social_media: {
      facebook: 'facebook.com/budots.media.ph',
      instagram: 'https://www.instagram.com/budotsmediaph/'
    },
    portfolio: [
      '/Budots Media Philippines logo_.png',
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg'
    ],
    rating: 4.9,
    total_reviews: 127,
    years_experience: 8,
    specialties: ['Wedding Photography', 'Corporate Events', 'Social Media Content'],
    coverage_areas: ['Metro Manila', 'Laguna', 'Cavite', 'Rizal', 'Bulacan', 'Cebu'],
    logo: '/Budots Media Philippines logo_.png',
    featured: true
  },
  {
    id: 'happy-seven',
    slug: 'happy7',
    company_name: 'Happy Seven Weddings & Events',
    bio: 'Full-service wedding and event planning company dedicated to creating unforgettable celebrations. From intimate gatherings to grand celebrations, we handle every detail with precision and care.',
    services: ['Wedding Planning', 'Event Coordination', 'Venue Styling', 'Floral Arrangements', 'Catering Coordination', 'Entertainment Booking'],
    rates: [
      { service: 'Full Wedding Planning', price_min: 80000, price_max: 250000, unit: 'per event' },
      { service: 'Day-of Coordination', price_min: 25000, price_max: 60000, unit: 'per event' },
      { service: 'Event Styling', price_min: 30000, price_max: 100000, unit: 'per event' },
      { service: 'Consultation', price_min: 2500, price_max: 5000, unit: 'per hour' }
    ],
    contact: {
      phone: '+63 918 234 5678',
      email: 'hello@happy7events.com',
      website: 'www.happy7events.com',
      address: 'Makati City, Metro Manila'
    },
    social_media: {
      facebook: 'facebook.com/happy7events',
      instagram: 'instagram.com/happy7events'
    },
    portfolio: [
      '/h7-happyseven-weddings-events-logo.png',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    ],
    rating: 4.8,
    total_reviews: 89,
    years_experience: 6,
    specialties: ['Luxury Weddings', 'Corporate Events', 'Destination Weddings'],
    coverage_areas: ['Metro Manila', 'Tagaytay', 'Batangas', 'Boracay', 'Cebu'],
    logo: '/h7-happyseven-weddings-events-logo.png',
    featured: true
  },
  {
    id: 'unique-weddings',
    slug: 'unique',
    company_name: 'Unique Weddings & Events',
    bio: 'Boutique wedding and event planning service specializing in personalized, unique celebrations that reflect your individual style and vision. We create bespoke experiences that tell your story.',
    services: ['Bespoke Wedding Planning', 'Intimate Events', 'Destination Planning', 'Custom Decor', 'Vendor Coordination', 'Timeline Management'],
    rates: [
      { service: 'Custom Wedding Planning', price_min: 60000, price_max: 200000, unit: 'per event' },
      { service: 'Intimate Event Planning', price_min: 20000, price_max: 80000, unit: 'per event' },
      { service: 'Destination Wedding Planning', price_min: 100000, price_max: 300000, unit: 'per event' },
      { service: 'Design Consultation', price_min: 3000, price_max: 8000, unit: 'per session' }
    ],
    contact: {
      phone: '+63 919 345 6789',
      email: 'carlo@uniqueweddings.ph',
      website: 'www.uniqueweddings.ph',
      address: 'Pasig City, Metro Manila'
    },
    social_media: {
      facebook: 'facebook.com/uniqueweddings',
      instagram: 'instagram.com/uniqueweddings'
    },
    portfolio: [
      '/carlo-jubela-unique-wedings-logo.png',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg'
    ],
    rating: 4.7,
    total_reviews: 64,
    years_experience: 5,
    specialties: ['Intimate Weddings', 'Garden Parties', 'Artistic Events'],
    coverage_areas: ['Metro Manila', 'Antipolo', 'Tagaytay', 'Baguio'],
    logo: '/carlo-jubela-unique-wedings-logo.png',
    featured: true
  }
]

// Mock reviews data
const mockReviews: { [vendorId: string]: Review[] } = {
  'budots-media': [
    {
      id: '1',
      user_name: 'Maria Santos',
      rating: 5,
      comment: 'Absolutely amazing work! Budots Media captured our wedding perfectly. The team was professional, creative, and delivered beyond our expectations. Highly recommended!',
      date: '2024-12-15',
      helpful_count: 12,
      user_voted: null
    },
    {
      id: '2',
      user_name: 'John Dela Cruz',
      rating: 5,
      comment: 'Outstanding photography and videography services. The same-day edit was incredible and had all our guests in tears. Worth every peso!',
      date: '2024-12-10',
      helpful_count: 8,
      user_voted: null
    },
    {
      id: '3',
      user_name: 'Anna Reyes',
      rating: 4,
      comment: 'Great quality work and very accommodating team. The drone shots were spectacular. Only minor issue was slight delay in delivery but overall excellent service.',
      date: '2024-12-05',
      helpful_count: 5,
      user_voted: null
    }
  ],
  'happy-seven': [
    {
      id: '4',
      user_name: 'Carlos Mendoza',
      rating: 5,
      comment: 'Happy Seven made our dream wedding come true! Their attention to detail and coordination was flawless. Highly professional team.',
      date: '2024-12-12',
      helpful_count: 15,
      user_voted: null
    },
    {
      id: '5',
      user_name: 'Lisa Garcia',
      rating: 4,
      comment: 'Excellent planning services. They handled everything smoothly and our guests were impressed with the setup and coordination.',
      date: '2024-12-08',
      helpful_count: 7,
      user_voted: null
    }
  ],
  'unique-weddings': [
    {
      id: '6',
      user_name: 'Miguel Torres',
      rating: 5,
      comment: 'Unique Weddings truly lives up to their name. They created a one-of-a-kind celebration that perfectly reflected our personality.',
      date: '2024-12-14',
      helpful_count: 9,
      user_voted: null
    }
  ]
}

export default function VendorProfilePage() {
  const { vendorSlug } = useParams()
  const navigate = useNavigate()
  const { user, userProfile } = useAuth()
  const [vendor, setVendor] = useState<VendorProfile | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<VendorProfile>>({})
  const [showContactModal, setShowContactModal] = useState(false)
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    fetchVendorProfile()
  }, [vendorSlug])

  const fetchVendorProfile = async () => {
    try {
      // Find vendor by slug
      const foundVendor = mockVendors.find(v => v.slug === vendorSlug)
      
      if (foundVendor) {
        setVendor(foundVendor)
        setEditData(foundVendor)
        // Load reviews for this vendor
        setReviews(mockReviews[foundVendor.id] || [])
      } else {
        navigate('/vendors')
      }
    } catch (error) {
      console.error('Error fetching vendor profile:', error)
      navigate('/vendors')
    } finally {
      setLoading(false)
    }
  }

  const canEdit = user && userProfile?.user_type === 'event_vendor' && 
    (vendor?.slug === vendorSlug || userProfile?.is_admin)

  const handleSave = async () => {
    try {
      // In a real app, this would save to the database
      if (vendor && editData) {
        setVendor({ ...vendor, ...editData })
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error saving vendor profile:', error)
    }
  }

  const handleCancel = () => {
    setEditData(vendor || {})
    setIsEditing(false)
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !vendor) return

    setSubmittingReview(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const review: Review = {
        id: Date.now().toString(),
        user_name: userProfile?.full_name || user.email?.split('@')[0] || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        helpful_count: 0,
        user_voted: null
      }

      setReviews(prev => [review, ...prev])
      setNewReview({ rating: 5, comment: '' })
      setShowReviewForm(false)

      // Update vendor rating (simplified calculation)
      const newTotalReviews = vendor.total_reviews + 1
      const newRating = ((vendor.rating * vendor.total_reviews) + newReview.rating) / newTotalReviews
      setVendor(prev => prev ? {
        ...prev,
        rating: Math.round(newRating * 10) / 10,
        total_reviews: newTotalReviews
      } : null)

    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setSubmittingReview(false)
    }
  }

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean) => {
    if (!user) return

    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        const wasHelpful = review.user_voted === 'helpful'
        const wasNotHelpful = review.user_voted === 'not_helpful'
        
        let newHelpfulCount = review.helpful_count
        let newUserVoted: 'helpful' | 'not_helpful' | null = null

        if (isHelpful) {
          if (wasHelpful) {
            // Remove helpful vote
            newHelpfulCount -= 1
          } else {
            // Add helpful vote
            newHelpfulCount += 1
            newUserVoted = 'helpful'
            // If was not helpful, remove that vote
            if (wasNotHelpful) {
              newHelpfulCount += 1 // Compensate for the helpful vote
            }
          }
        } else {
          if (wasNotHelpful) {
            // Remove not helpful vote
            newUserVoted = null
          } else {
            // Add not helpful vote
            newUserVoted = 'not_helpful'
            // If was helpful, remove that vote
            if (wasHelpful) {
              newHelpfulCount -= 1
            }
          }
        }

        return {
          ...review,
          helpful_count: Math.max(0, newHelpfulCount),
          user_voted: newUserVoted
        }
      }
      return review
    }))
  }

  const getServiceIcon = (service: string) => {
    const lowerService = service.toLowerCase()
    if (lowerService.includes('photo') || lowerService.includes('video')) return <Camera className="h-5 w-5" />
    if (lowerService.includes('catering') || lowerService.includes('food')) return <Utensils className="h-5 w-5" />
    if (lowerService.includes('music') || lowerService.includes('entertainment')) return <Music className="h-5 w-5" />
    if (lowerService.includes('decor') || lowerService.includes('styling')) return <Palette className="h-5 w-5" />
    return <Star className="h-5 w-5" />
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
          <p className="text-gray-600 mb-6">The service provider you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/vendors')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Vendors
          </button>
        </div>
      </div>
    )
  }

  return (
    <MessagingProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={vendor.logo}
                    alt={vendor.company_name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.company_name || ''}
                      onChange={(e) => setEditData({ ...editData, company_name: e.target.value })}
                      className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900">{vendor.company_name}</h1>
                  )}
                  
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      {renderStars(vendor.rating, 'md')}
                      <span className="ml-1 font-medium">{vendor.rating}</span>
                      <span className="text-gray-600 ml-1">({vendor.total_reviews} reviews)</span>
                    </div>
                    <span className="text-gray-600">{vendor.years_experience} years experience</span>
                    {vendor.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center mt-3 space-x-3">
                    {vendor.social_media?.facebook && (
                      <a
                        href={`https://${vendor.social_media.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {vendor.social_media?.instagram && (
                      <a
                        href={vendor.social_media.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {user && !canEdit && (
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Vendor
                  </button>
                )}
                
                {canEdit && (
                  <>
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About Us</h2>
                {isEditing ? (
                  <textarea
                    value={editData.bio || ''}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{vendor.bio}</p>
                )}
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {vendor.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getServiceIcon(service)}
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rates */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Rates</h2>
                <div className="space-y-4">
                  {vendor.rates.map((rate, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{rate.service}</h3>
                        <p className="text-sm text-gray-600">{rate.unit}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ₱{rate.price_min.toLocaleString()} - ₱{rate.price_max.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Reviews ({reviews.length})
                  </h2>
                  {user && (
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Write a Review
                    </button>
                  )}
                </div>

                {/* Review Form */}
                {showReviewForm && user && (
                  <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">Write Your Review</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReview.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300 hover:text-yellow-400'
                              } transition-colors`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Share your experience with this vendor..."
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={submittingReview || !newReview.comment.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {submittingReview ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-medium">
                                {review.user_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{review.user_name}</h4>
                              <div className="flex items-center space-x-2">
                                {renderStars(review.rating, 'sm')}
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        
                        {user && (
                          <div className="flex items-center space-x-4 text-sm">
                            <button
                              onClick={() => handleHelpfulVote(review.id, true)}
                              className={`flex items-center space-x-1 transition-colors ${
                                review.user_voted === 'helpful' 
                                  ? 'text-green-600' 
                                  : 'text-gray-500 hover:text-green-600'
                              }`}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>Helpful ({review.helpful_count})</span>
                            </button>
                            <button
                              onClick={() => handleHelpfulVote(review.id, false)}
                              className={`flex items-center space-x-1 transition-colors ${
                                review.user_voted === 'not_helpful' 
                                  ? 'text-red-600' 
                                  : 'text-gray-500 hover:text-red-600'
                              }`}
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span>Not Helpful</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                      <p className="text-gray-600">Be the first to review this vendor!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {vendor.portfolio.map((image, index) => (
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

              {/* Specialties & Coverage */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Coverage Areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.coverage_areas.map((area, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{vendor.contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{vendor.contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                    <a 
                      href={`https://${vendor.contact.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {vendor.contact.website}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{vendor.contact.address}</span>
                  </div>
                </div>

                {/* Social Media Links in Sidebar */}
                {(vendor.social_media?.facebook || vendor.social_media?.instagram) && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Follow Us</h4>
                    <div className="flex space-x-3">
                      {vendor.social_media?.facebook && (
                        <a
                          href={`https://${vendor.social_media.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="Facebook"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {vendor.social_media?.instagram && (
                        <a
                          href={vendor.social_media.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {user ? (
                    <>
                      <button 
                        onClick={() => setShowContactModal(true)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Message
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Request Quote
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-3">Sign in to contact this vendor</p>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Sign In to Contact
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">{vendor.years_experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-medium text-gray-900">{vendor.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews</span>
                    <span className="font-medium text-gray-900">{vendor.total_reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Services</span>
                    <span className="font-medium text-gray-900">{vendor.services.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        <ContactVendorModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          vendor={{
            id: vendor.id,
            company_name: vendor.company_name,
            full_name: vendor.company_name,
            services: vendor.services
          }}
          initialSubject="Service Inquiry"
        />
      </div>
    </MessagingProvider>
  )
}