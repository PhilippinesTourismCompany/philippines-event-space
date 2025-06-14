import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { trackUserLogin, trackUserRegistration } from '../lib/analytics'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string, userType?: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string, userType?: string, companyName?: string, phoneNumber?: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  isAdmin: boolean
  userProfile: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demonstration
const mockUsers = {
  'admin@venuefinderph.com': {
    id: 'admin-001',
    email: 'admin@venuefinderph.com',
    full_name: 'Admin User',
    user_type: 'admin',
    company_name: 'VenueFinder PH',
    phone_number: '+63 2 8123 4567',
    is_admin: true,
    profile_status: 'verified'
  },
  'client@example.com': {
    id: 'client-001',
    email: 'client@example.com',
    full_name: 'Maria Santos',
    user_type: 'client',
    company_name: null,
    phone_number: '+63 917 123 4567',
    is_admin: false,
    profile_status: 'verified'
  },
  'provider@example.com': {
    id: 'provider-001',
    email: 'provider@example.com',
    full_name: 'Juan dela Cruz',
    user_type: 'space_provider',
    company_name: 'Premium Venues Manila',
    phone_number: '+63 918 234 5678',
    is_admin: false,
    profile_status: 'verified'
  },
  'vendor@example.com': {
    id: 'vendor-001',
    email: 'vendor@example.com',
    full_name: 'Anna Reyes',
    user_type: 'event_vendor',
    company_name: 'Elite Event Services',
    phone_number: '+63 919 345 6789',
    is_admin: false,
    profile_status: 'verified'
  },
  'sponsor@example.com': {
    id: 'sponsor-001',
    email: 'sponsor@example.com',
    full_name: 'Robert Tan',
    user_type: 'sponsor',
    company_name: 'TechCorp Philippines',
    phone_number: '+63 920 456 7890',
    is_admin: false,
    profile_status: 'verified'
  },
  'budots.media.philippines@gmail.com': {
    id: 'vendor-002',
    email: 'budots.media.philippines@gmail.com',
    full_name: 'Budots Media',
    user_type: 'event_vendor',
    company_name: 'Budots Media Philippines',
    phone_number: '0915 405 2486',
    is_admin: false,
    profile_status: 'verified'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('mockUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser({ email: userData.email, id: userData.id } as User)
      setUserProfile(userData)
      setIsAdmin(userData.is_admin || false)
      setSession({ user: { email: userData.email, id: userData.id } } as Session)
    }
    setLoading(false)

    // Set up auth state listener for real Supabase integration
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user)
          setSession(session)
          // In a real app, you would fetch the user profile here
        } else {
          setUser(null)
          setSession(null)
          setUserProfile(null)
          setIsAdmin(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string, userType?: string) => {
    // Mock authentication - in production, this would validate against real credentials
    const mockUser = mockUsers[email as keyof typeof mockUsers]
    
    if (!mockUser) {
      throw new Error('Invalid email or password')
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Set user data
    setUser({ email: mockUser.email, id: mockUser.id } as User)
    setUserProfile(mockUser)
    setIsAdmin(mockUser.is_admin)
    setSession({ user: { email: mockUser.email, id: mockUser.id } } as Session)

    // Save to localStorage for persistence
    localStorage.setItem('mockUser', JSON.stringify(mockUser))

    // Track login event
    trackUserLogin(mockUser.user_type)
  }

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    userType?: string,
    companyName?: string,
    phoneNumber?: string
  ) => {
    // Check if email already exists
    if (mockUsers[email as keyof typeof mockUsers]) {
      throw new Error('Email already in use')
    }

    // Mock sign up - create new user profile
    const newUser = {
      id: `${userType}-${Date.now()}`,
      email,
      full_name: fullName,
      user_type: userType || 'client',
      company_name: companyName,
      phone_number: phoneNumber,
      is_admin: userType === 'admin',
      profile_status: 'pending'
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Set user data
    setUser({ email: newUser.email, id: newUser.id } as User)
    setUserProfile(newUser)
    setIsAdmin(newUser.is_admin)
    setSession({ user: { email: newUser.email, id: newUser.id } } as Session)

    // Save to localStorage
    localStorage.setItem('mockUser', JSON.stringify(newUser))

    // Track registration event
    trackUserRegistration(newUser.user_type)
  }

  const signOut = async () => {
    setUser(null)
    setSession(null)
    setUserProfile(null)
    setIsAdmin(false)
    localStorage.removeItem('mockUser')
  }

  const resetPassword = async (email: string) => {
    // Mock password reset
    if (!mockUsers[email as keyof typeof mockUsers]) {
      throw new Error('No account found with this email')
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, this would send a password reset email
    console.log(`Password reset requested for ${email}`)
    
    return true
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      isAdmin,
      userProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}