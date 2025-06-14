import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ExternalLink, Bell, Shield } from 'lucide-react'
import AuthModal from './AuthModal'

export default function Footer() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [userType, setUserType] = useState<string>('')

  const handleLoginClick = (type: string) => {
    setUserType(type)
    setAuthMode('signin')
    setShowAuthModal(true)
  }

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Philippine Venue Platform</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                The Philippines' premier platform for discovering and booking exceptional event venues, 
                hotels, and meeting spaces across the archipelago.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">philippines.travel.company@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">+44 07494325565</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                <a 
                  href="https://www.facebook.com/ph.travel.company" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="https://x.com/phtravelco" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com/budots_media" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/bartsakwerda" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/venues" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Browse Venues
                  </Link>
                </li>
                <li>
                  <Link to="/hotels" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Hotels & Resorts
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Map View
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/services/venue-booking" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Venue Booking
                  </Link>
                </li>
                <li>
                  <Link to="/services/event-planning" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Event Planning
                  </Link>
                </li>
                <li>
                  <Link to="/services/catering" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Catering Services
                  </Link>
                </li>
                <li>
                  <Link to="/services/photography" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Photography
                  </Link>
                </li>
                <li>
                  <Link to="/services/decoration" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Event Decoration
                  </Link>
                </li>
                <li>
                  <Link to="/services/entertainment" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Entertainment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Login Portal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Login Portal</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleLoginClick('client')}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span>Login as Client</span>
                    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLoginClick('space_provider')}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span>Login as Space Provider</span>
                    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLoginClick('event_vendor')}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span>Login as Event Service Vendor</span>
                    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLoginClick('sponsor')}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span>Login as Sponsor</span>
                    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span>Admin Dashboard</span>
                    <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li className="pt-4 mt-4 border-t border-gray-800">
                  <Link
                    to="/admin"
                    className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Admin Content Management</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Admin Notifications</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Philippine Venue Platform. All rights reserved.
              </div>
              
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                Philippine Venue Platform is the leading platform for event venues in the Philippines. 
                We connect event organizers with the perfect spaces for their celebrations, 
                corporate events, and special occasions across Metro Manila, Cebu, Boracay, and beyond.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
        userType={userType}
      />
    </>
  )
}