// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-PKHCGDTNHT'

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track events
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track venue views
export const trackVenueView = (venueName: string, city: string) => {
  event('view_venue', 'venue', `${venueName} - ${city}`)
}

// Track search queries
export const trackSearch = (query: string, filters: any) => {
  event('search', 'venue_search', query)
}

// Track booking inquiries
export const trackBookingInquiry = (venueName: string, eventType: string) => {
  event('booking_inquiry', 'conversion', `${venueName} - ${eventType}`)
}

// Track user registration
export const trackUserRegistration = (userType: string) => {
  event('sign_up', 'user', userType)
}

// Track user login
export const trackUserLogin = (userType: string) => {
  event('login', 'user', userType)
}