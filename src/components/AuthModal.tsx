import React, { useState, useEffect } from 'react'
import { X, Eye, EyeOff, Building, Users, Gift, Shield, User, AlertCircle, Mail, Lock, UserPlus, Phone } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface AuthModalProps {
  show: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  onSwitchMode?: (mode: 'signin' | 'signup') => void
  userType?: string
}

const userTypeConfig = {
  client: {
    icon: User,
    title: 'Client',
    description: 'Book venues and plan events',
    color: 'blue',
    mockCredentials: {
      email: 'client@example.com',
      password: 'password123'
    }
  },
  space_provider: {
    icon: Building,
    title: 'Space Provider',
    description: 'List and manage your venues',
    color: 'green',
    mockCredentials: {
      email: 'provider@example.com',
      password: 'password123'
    }
  },
  event_vendor: {
    icon: Users,
    title: 'Event Service Vendor',
    description: 'Offer catering, photography, and more',
    color: 'purple',
    mockCredentials: {
      email: 'vendor@example.com',
      password: 'password123'
    }
  },
  sponsor: {
    icon: Gift,
    title: 'Sponsor',
    description: 'Partner with events and venues',
    color: 'orange',
    mockCredentials: {
      email: 'sponsor@example.com',
      password: 'password123'
    }
  },
  admin: {
    icon: Shield,
    title: 'Admin',
    description: 'Platform administration',
    color: 'red',
    mockCredentials: {
      email: 'admin@venuefinderph.com',
      password: 'admin123'
    }
  }
}

export default function AuthModal({ show, onClose, mode = 'signin', onSwitchMode, userType = '' }: AuthModalProps) {
  const { signIn, signUp, resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setCompanyName('')
    setPhoneNumber('')
    setShowPassword(false)
    setError('')
    setSuccess('')
    setResetEmail('')
  }

  // Reset form when modal is opened/closed
  useEffect(() => {
    if (show) {
      setError('')
      setSuccess('')
      setShowResetForm(false)
      setResetSent(false)
    } else {
      resetForm()
    }
  }, [show])

  if (!show) return null

  const config = userTypeConfig[userType as keyof typeof userTypeConfig]
  const IconComponent = config?.icon || User

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signin') {
        await signIn(email, password, userType)
        setSuccess('Sign in successful!')
        setTimeout(() => {
          onClose()
          resetForm()
        }, 1000)
      } else {
        await signUp(email, password, fullName, userType, companyName, phoneNumber)
        setSuccess('Account created successfully! You can now sign in.')
        setTimeout(() => {
          if (onSwitchMode) onSwitchMode('signin')
          resetForm()
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await resetPassword(resetEmail)
      setResetSent(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode: 'signin' | 'signup') => {
    if (onSwitchMode) {
      onSwitchMode(newMode)
    }
    resetForm()
    setShowResetForm(false)
  }

  const useMockCredentials = () => {
    if (config?.mockCredentials) {
      setEmail(config.mockCredentials.email)
      setPassword(config.mockCredentials.password)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {config && (
              <div className={`p-2 rounded-lg bg-${config.color}-100`}>
                <IconComponent className={`h-6 w-6 text-${config.color}-600`} />
              </div>
            )}
            <div>
              {showResetForm ? (
                <h2 className="text-xl font-semibold text-gray-900">Reset Password</h2>
              ) : (
                <h2 className="text-xl font-semibold text-gray-900">
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                  {config && ` - ${config.title}`}
                </h2>
              )}
              {config && !showResetForm && (
                <p className="text-sm text-gray-600">{config.description}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mock Credentials Notice */}
        {mode === 'signin' && config?.mockCredentials && !showResetForm && (
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-900">Demo Account</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Use these credentials for testing:
                </p>
                <div className="mt-2 text-xs font-mono bg-blue-100 p-2 rounded">
                  <div>Email: {config.mockCredentials.email}</div>
                  <div>Password: {config.mockCredentials.password}</div>
                </div>
                <button
                  onClick={useMockCredentials}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Use Demo Credentials
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-50 border-b border-green-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {showResetForm ? (
          <form onSubmit={handleResetPassword} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {resetSent ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                <p>Password reset instructions have been sent to your email.</p>
                <p className="mt-2">Please check your inbox and follow the instructions to reset your password.</p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="resetEmail"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !resetEmail}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
              </>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowResetForm(false)
                  setResetEmail('')
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {(userType === 'space_provider' || userType === 'event_vendor' || userType === 'sponsor') && (
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company/Organization Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="companyName"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+63 9XX XXX XXXX"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>

            {mode === 'signup' && userType && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Account Benefits:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {userType === 'client' && (
                    <>
                      <li>• Browse and book premium venues</li>
                      <li>• Access exclusive deals and packages</li>
                      <li>• Manage your event bookings</li>
                      <li>• Get personalized recommendations</li>
                    </>
                  )}
                  {userType === 'space_provider' && (
                    <>
                      <li>• List your venues on our platform</li>
                      <li>• Manage bookings and availability</li>
                      <li>• Access analytics and insights</li>
                      <li>• Connect with event organizers</li>
                    </>
                  )}
                  {userType === 'event_vendor' && (
                    <>
                      <li>• Showcase your services</li>
                      <li>• Connect with event planners</li>
                      <li>• Manage service bookings</li>
                      <li>• Build your portfolio</li>
                    </>
                  )}
                  {userType === 'sponsor' && (
                    <>
                      <li>• Partner with premium events</li>
                      <li>• Access sponsorship opportunities</li>
                      <li>• Brand visibility and marketing</li>
                      <li>• Networking opportunities</li>
                    </>
                  )}
                  {userType === 'admin' && (
                    <>
                      <li>• Platform administration access</li>
                      <li>• User and content management</li>
                      <li>• Analytics and reporting</li>
                      <li>• System configuration</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Please wait...
                </>
              ) : (
                <>
                  {mode === 'signin' ? (
                    <>Sign In</>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Create Account
                    </>
                  )}
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            {mode === 'signin' && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowResetForm(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}