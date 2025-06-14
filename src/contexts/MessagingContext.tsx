import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

interface Conversation {
  id: string
  client_id: string
  vendor_id: string
  subject: string
  status: 'active' | 'archived' | 'closed'
  last_message_at: string
  created_at: string
  updated_at: string
  client_profile?: any
  vendor_profile?: any
  unread_count?: number
  last_message?: Message
}

interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'file'
  read_at: string | null
  created_at: string
  sender_profile?: any
  attachments?: MessageAttachment[]
  is_deleted?: boolean
  is_highlighted?: boolean
  deleted_at?: string | null
  highlighted_at?: string | null
}

interface MessageAttachment {
  id: string
  message_id: string
  file_name: string
  file_url: string
  file_type: string
  file_size: number
  created_at: string
}

interface MessagingContextType {
  conversations: Conversation[]
  activeConversation: Conversation | null
  messages: Message[]
  unreadCount: number
  loading: boolean
  setActiveConversation: (conversation: Conversation | null) => void
  sendMessage: (conversationId: string, content: string, type?: 'text' | 'image' | 'file') => Promise<void>
  createConversation: (vendorId: string, subject: string, initialMessage: string) => Promise<Conversation>
  markAsRead: (messageId: string) => Promise<void>
  deleteMessage: (messageId: string) => Promise<void>
  highlightMessage: (messageId: string) => Promise<void>
  unhighlightMessage: (messageId: string) => Promise<void>
  fetchConversations: () => Promise<void>
  fetchMessages: (conversationId: string) => Promise<void>
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined)

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchConversations()
      fetchUnreadCount()
      
      // Set up real-time subscriptions
      const conversationsSubscription = supabase
        .channel('conversations')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'conversations' },
          () => fetchConversations()
        )
        .subscribe()

      const messagesSubscription = supabase
        .channel('messages')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'messages' },
          (payload) => {
            if (payload.eventType === 'INSERT' && activeConversation) {
              fetchMessages(activeConversation.id)
            }
            if (payload.eventType === 'UPDATE' && activeConversation) {
              fetchMessages(activeConversation.id)
            }
            fetchUnreadCount()
          }
        )
        .subscribe()

      return () => {
        conversationsSubscription.unsubscribe()
        messagesSubscription.unsubscribe()
      }
    }
  }, [user, activeConversation])

  const fetchConversations = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          client_profile:profiles!conversations_client_id_fkey(id, full_name, company_name, user_type),
          vendor_profile:profiles!conversations_vendor_id_fkey(id, full_name, company_name, user_type)
        `)
        .or(`client_id.eq.${user.id},vendor_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false })

      if (error) throw error

      // Fetch last message and unread count for each conversation
      const conversationsWithDetails = await Promise.all(
        (data || []).map(async (conv) => {
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .eq('is_deleted', false)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .neq('sender_id', user.id)
            .eq('is_deleted', false)
            .is('read_at', null)

          return {
            ...conv,
            last_message: lastMessage,
            unread_count: unreadCount || 0
          }
        })
      )

      setConversations(conversationsWithDetails)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender_profile:profiles(id, full_name, company_name, user_type),
          attachments:message_attachments(*)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const fetchUnreadCount = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.rpc('get_unread_message_count', {
        user_id: user.id
      })

      if (error) throw error
      setUnreadCount(data || 0)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  const sendMessage = async (conversationId: string, content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          message_type: type,
          is_deleted: false,
          is_highlighted: false
        })

      if (error) throw error
      
      // Refresh messages
      await fetchMessages(conversationId)
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  const createConversation = async (vendorId: string, subject: string, initialMessage: string): Promise<Conversation> => {
    if (!user) throw new Error('User not authenticated')

    try {
      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('*')
        .eq('client_id', user.id)
        .eq('vendor_id', vendorId)
        .eq('subject', subject)
        .single()

      if (existingConv) {
        // Send message to existing conversation
        await sendMessage(existingConv.id, initialMessage)
        return existingConv
      }

      // Create new conversation
      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert({
          client_id: user.id,
          vendor_id: vendorId,
          subject
        })
        .select()
        .single()

      if (convError) throw convError

      // Send initial message
      await sendMessage(newConv.id, initialMessage)

      // Refresh conversations
      await fetchConversations()

      return newConv
    } catch (error) {
      console.error('Error creating conversation:', error)
      throw error
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .neq('sender_id', user?.id)

      if (error) throw error
      
      // Refresh unread count
      await fetchUnreadCount()
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ 
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          content: 'This message has been deleted'
        })
        .eq('id', messageId)
        .eq('sender_id', user?.id) // Only allow users to delete their own messages

      if (error) throw error
      
      // Refresh messages
      if (activeConversation) {
        await fetchMessages(activeConversation.id)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  }

  const highlightMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ 
          is_highlighted: true,
          highlighted_at: new Date().toISOString()
        })
        .eq('id', messageId)

      if (error) throw error
      
      // Refresh messages
      if (activeConversation) {
        await fetchMessages(activeConversation.id)
      }
    } catch (error) {
      console.error('Error highlighting message:', error)
      throw error
    }
  }

  const unhighlightMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ 
          is_highlighted: false,
          highlighted_at: null
        })
        .eq('id', messageId)

      if (error) throw error
      
      // Refresh messages
      if (activeConversation) {
        await fetchMessages(activeConversation.id)
      }
    } catch (error) {
      console.error('Error unhighlighting message:', error)
      throw error
    }
  }

  return (
    <MessagingContext.Provider value={{
      conversations,
      activeConversation,
      messages,
      unreadCount,
      loading,
      setActiveConversation,
      sendMessage,
      createConversation,
      markAsRead,
      deleteMessage,
      highlightMessage,
      unhighlightMessage,
      fetchConversations,
      fetchMessages
    }}>
      {children}
    </MessagingContext.Provider>
  )
}

export function useMessaging() {
  const context = useContext(MessagingContext)
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider')
  }
  return context
}