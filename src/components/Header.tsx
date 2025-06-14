import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, User, LogOut, Menu, X, Settings, Map, Building, Users, Search, MessageCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useMessaging } from '../contexts/MessagingContext'
import AuthModal from './AuthModal'

// Animated Logo Component
function AnimatedLogo() {
  const words = ['Philippines', 'Event', 'Venues']
  
  return (
    <div className="flex items-center space-x-3">
      <div className="animated-word-container w-28">
        {words.map((word, index) => (
          <div
            key={word}
            className="text-reveal text-xl font-bold text-gray-900"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  const { user, signOut, isAdmin, userProfile } = useAuth()
  const { unreadCount } = useMessaging()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const getDashboardLink = () => {
    if (!userProfile) return '/client-dashboard'
    
    switch (userProfile.user_type) {
      case 'space_provider': return '/space-provider-dashboard'
      case 'event_vendor': return '/vendor-dashboard'
      case 'sponsor': return '/sponsor-dashboard'
      case 'admin': return '/admin'
      default: return '/client-dashboard'
    }
  }

  const getUserTypeLabel = () => {
    if (!userProfile) return 'Client'
    
    switch (userProfile.user_type) {
      case 'space_provider': return 'Space Provider'
      case 'event_vendor': return 'Event Vendor'
      case 'sponsor': return 'Sponsor'
      case 'admin': return 'Admin'
      default: return 'Client'
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <AnimatedLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/venues" className="text-gray-700 hover:text-blue-600 transition-colors">
                Browse Venues
              </Link>
              <Link to="/hotels" className="text-gray-700 hover:text-blue-600 transition-colors">
                Hotels & Resorts
              </Link>
              <Link to="/brands" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Building className="h-4 w-4 mr-1" />
                Hotel Brands
              </Link>
              <Link to="/vendors" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Users className="h-4 w-4 mr-1" />
                Service Providers
              </Link>
              <Link to="/map" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Map className="h-4 w-4 mr-1" />
                Map View
              </Link>
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/messages"
                    className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Messages
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to={getDashboardLink()}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-4 w-4 mr-1" />
                    {getUserTypeLabel()} Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuth('signin')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/venues"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Browse Venues
                </Link>
                <Link
                  to="/hotels"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Hotels & Resorts
                </Link>
                <Link
                  to="/brands"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Building className="h-4 w-4 mr-1" />
                  Hotel Brands
                </Link>
                <Link
                  to="/vendors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Service Providers
                </Link>
                <Link
                  to="/map"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Map className="h-4 w-4 mr-1" />
                  Map View
                </Link>
                
                {user ? (
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to="/messages"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-3"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Messages</span>
                      {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-3"
                    >
                      <User className="h-4 w-4" />
                      <span>{getUserTypeLabel()} Dashboard</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 mb-3"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <div className="flex items-center space-x-2 text-gray-700 mb-3">
                      <User className="h-5 w-5" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                    <button
                      onClick={() => {
                        openAuth('signin')
                        setMobileMenuOpen(false)
                      }}
                      className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openAuth('signup')
                        setMobileMenuOpen(false)
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  )
}