import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { MessagingProvider } from '../contexts/MessagingContext'
import MessagingInterface from '../components/MessagingInterface'
import { MessageCircle } from 'lucide-react'

export default function MessagesPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600">Please sign in to access your messages.</p>
        </div>
      </div>
    )
  }

  return (
    <MessagingProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Communicate with service providers and manage your conversations</p>
          </div>

          <MessagingInterface className="h-[600px]" />
        </div>
      </div>
    </MessagingProvider>
  )
}