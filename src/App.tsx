import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MessagingProvider } from './contexts/MessagingContext'
import { pageview } from './lib/analytics'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import HotelsPage from './pages/HotelsPage'
import MapPage from './pages/MapPage'
import VenuePage from './pages/VenuePage'
import VenuesPage from './pages/VenuesPage'
import BrandsPage from './pages/BrandsPage'
import BrandPage from './pages/BrandPage'
import VendorsPage from './pages/VendorsPage'
import VendorProfilePage from './pages/VendorProfilePage'
import ServicesPage from './pages/ServicesPage'
import MessagesPage from './pages/MessagesPage'
import ClientDashboard from './pages/ClientDashboard'
import SpaceProviderDashboard from './pages/SpaceProviderDashboard'
import VendorDashboard from './pages/VendorDashboard'
import SponsorDashboard from './pages/SponsorDashboard'
import BlogPage from './pages/BlogPage'

// Analytics wrapper component
function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    // Track page views
    pageview(location.pathname + location.search)
  }, [location])

  return <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <MessagingProvider>
        <Router>
          <AnalyticsWrapper>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/hotels" element={<HotelsPage />} />
                  <Route path="/brands" element={<BrandsPage />} />
                  <Route path="/brands/:brandId" element={<BrandPage />} />
                  <Route path="/vendors" element={<VendorsPage />} />
                  <Route path="/vendor/:vendorSlug" element={<VendorProfilePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/photography" element={<VendorProfilePage />} />
                  <Route path="/services/decoration" element={<VendorProfilePage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/client-dashboard" element={<ClientDashboard />} />
                  <Route path="/space-provider-dashboard" element={<SpaceProviderDashboard />} />
                  <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                  <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:articleId" element={<BlogPage />} />
                  
                  {/* Event type routes */}
                  <Route path="/venues" element={<VenuesPage />} />
                  <Route path="/venues/:eventType" element={<VenuesPage />} />
                  
                  {/* Dynamic venue routes */}
                  <Route path="/:city/:venue" element={<VenuePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AnalyticsWrapper>
        </Router>
      </MessagingProvider>
    </AuthProvider>
  )
}

export default App