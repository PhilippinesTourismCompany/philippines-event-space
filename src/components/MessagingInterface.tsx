import React, { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  ArrowLeft, 
  User, 
  Trash2, 
  Star, 
  StarOff,
  MoreHorizontal,
  Copy,
  Reply
} from 'lucide-react'
import { useMessaging } from '../contexts/MessagingContext'
import { useAuth } from '../contexts/AuthContext'

interface MessagingInterfaceProps {
  onClose?: () => void
  className?: string
}

export default function MessagingInterface({ onClose, className = '' }: MessagingInterfaceProps) {
  const { user } = useAuth()
  const {
    conversations,
    activeConversation,
    messages,
    unreadCount,
    loading,
    setActiveConversation,
    sendMessage,
    markAsRead,
    deleteMessage,
    highlightMessage,
    unhighlightMessage,
    fetchMessages
  } = useMessaging()

  const [newMessage, setNewMessage] = useState('')
  const [showConversationList, setShowConversationList] = useState(true)
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set())
  const [showMessageActions, setShowMessageActions] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id)
      setShowConversationList(false)
    }
  }, [activeConversation])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !activeConversation) return

    try {
      await sendMessage(activeConversation.id, newMessage.trim())
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleConversationSelect = (conversation: any) => {
    setActiveConversation(conversation)
    // Mark unread messages as read
    const unreadMessages = messages.filter(m => m.sender_id !== user?.id && !m.read_at)
    unreadMessages.forEach(message => markAsRead(message.id))
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(messageId)
        setShowMessageActions(null)
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  const handleHighlightMessage = async (messageId: string, isHighlighted: boolean) => {
    try {
      if (isHighlighted) {
        await unhighlightMessage(messageId)
      } else {
        await highlightMessage(messageId)
      }
      setShowMessageActions(null)
    } catch (error) {
      console.error('Error toggling highlight:', error)
    }
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    setShowMessageActions(null)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const getOtherParticipant = (conversation: any) => {
    if (!user) return null
    return conversation.client_id === user.id ? conversation.vendor_profile : conversation.client_profile
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!showConversationList && (
              <button
                onClick={() => {
                  setShowConversationList(true)
                  setActiveConversation(null)
                }}
                className="p-1 hover:bg-blue-700 rounded-md transition-colors md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-lg font-semibold">
              {showConversationList ? 'Messages' : activeConversation?.subject}
            </h2>
            {unreadCount > 0 && showConversationList && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          {!showConversationList && activeConversation && (
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-blue-700 rounded-md transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-blue-700 rounded-md transition-colors">
                <Video className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-blue-700 rounded-md transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-blue-700 rounded-md transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex h-96">
        {/* Conversations List */}
        <div className={`${showConversationList ? 'w-full' : 'w-1/3 hidden md:block'} border-r border-gray-200`}>
          <div className="h-full overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No conversations yet</p>
                <p className="text-sm">Start messaging vendors to see conversations here</p>
              </div>
            ) : (
              conversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation)
                return (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {otherParticipant?.company_name || otherParticipant?.full_name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.last_message_at)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.subject}</p>
                        {conversation.last_message && (
                          <p className="text-xs text-gray-500 truncate">
                            {conversation.last_message.is_deleted 
                              ? 'This message has been deleted'
                              : conversation.last_message.content
                            }
                          </p>
                        )}
                      </div>
                      {conversation.unread_count && conversation.unread_count > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className={`${showConversationList ? 'hidden md:flex' : 'flex'} flex-1 flex-col`}>
          {activeConversation ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isOwnMessage = message.sender_id === user?.id
                  const isDeleted = message.is_deleted
                  const isHighlighted = message.is_highlighted
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}
                    >
                      <div className="relative max-w-xs lg:max-w-md">
                        <div
                          className={`px-4 py-2 rounded-lg relative ${
                            isDeleted
                              ? 'bg-gray-100 text-gray-500 italic border border-gray-200'
                              : isHighlighted
                              ? isOwnMessage
                                ? 'bg-yellow-200 text-gray-900 border-2 border-yellow-400'
                                : 'bg-yellow-100 text-gray-900 border-2 border-yellow-300'
                              : isOwnMessage
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          {isHighlighted && (
                            <Star className="absolute -top-2 -right-2 h-4 w-4 text-yellow-500 fill-current" />
                          )}
                          
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isDeleted
                                ? 'text-gray-400'
                                : isHighlighted
                                ? 'text-gray-600'
                                : isOwnMessage 
                                ? 'text-blue-100' 
                                : 'text-gray-500'
                            }`}
                          >
                            {formatTime(message.created_at)}
                            {isDeleted && ' • Deleted'}
                            {isHighlighted && ' • Highlighted'}
                          </p>
                        </div>

                        {/* Message Actions */}
                        {!isDeleted && (
                          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="relative">
                              <button
                                onClick={() => setShowMessageActions(
                                  showMessageActions === message.id ? null : message.id
                                )}
                                className="p-1 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                              >
                                <MoreHorizontal className="h-3 w-3 text-gray-600" />
                              </button>

                              {showMessageActions === message.id && (
                                <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[150px]">
                                  <button
                                    onClick={() => handleCopyMessage(message.content)}
                                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                  </button>
                                  
                                  <button
                                    onClick={() => handleHighlightMessage(message.id, isHighlighted)}
                                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    {isHighlighted ? (
                                      <>
                                        <StarOff className="h-4 w-4 mr-2" />
                                        Remove Highlight
                                      </>
                                    ) : (
                                      <>
                                        <Star className="h-4 w-4 mr-2" />
                                        Highlight
                                      </>
                                    )}
                                  </button>

                                  {isOwnMessage && (
                                    <button
                                      onClick={() => handleDeleteMessage(message.id)}
                                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}