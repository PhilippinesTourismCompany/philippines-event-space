import React, { useState, useEffect } from 'react'
import { Gift, TrendingUp, Users, DollarSign, Calendar, Target, BarChart3, Eye, Plus, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SponsorshipOpportunity {
  id: string
  event_name: string
  event_type: string
  event_date: string
  location: string
  expected_attendance: number
  sponsorship_tiers: {
    name: string
    price: number
    benefits: string[]
  }[]
  organizer: string
  status: 'available' | 'interested' | 'confirmed'
  target_audience: string[]
}

interface ActiveSponsorship {
  id: string
  event_name: string
  tier: string
  amount: number
  event_date: string
  location: string
  status: 'active' | 'completed' | 'upcoming'
  roi_metrics: {
    impressions: number
    engagement: number
    leads: number
  }
}

export default function SponsorDashboard() {
  const { user, userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'sponsorships' | 'analytics' | 'profile'>('overview')
  const [opportunities, setOpportunities] = useState<SponsorshipOpportunity[]>([])
  const [sponsorships, setSponsorships] = useState<ActiveSponsorship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Mock opportunities data
      setOpportunities([
        {
          id: '1',
          event_name: 'Philippine Business Summit 2025',
          event_type: 'Corporate Conference',
          event_date: '2025-03-15',
          location: 'Manila Marriott Hotel',
          expected_attendance: 500,
          sponsorship_tiers: [
            {
              name: 'Platinum',
              price: 500000,
              benefits: ['Logo on all materials', 'Speaking slot', 'Premium booth space']
            },
            {
              name: 'Gold',
              price: 300000,
              benefits: ['Logo on materials', 'Booth space', 'Networking access']
            }
          ],
          organizer: 'Philippine Chamber of Commerce',
          status: 'available',
          target_audience: ['Business Executives', 'Entrepreneurs', 'Investors']
        },
        {
          id: '2',
          event_name: 'Tech Innovation Expo',
          event_type: 'Technology Exhibition',
          event_date: '2025-04-20',
          location: 'Conrad Manila',
          expected_attendance: 800,
          sponsorship_tiers: [
            {
              name: 'Title Sponsor',
              price: 800000,
              benefits: ['Event naming rights', 'Keynote slot', 'Premium branding']
            },
            {
              name: 'Silver',
              price: 200000,
              benefits: ['Logo placement', 'Booth space', 'Digital marketing']
            }
          ],
          organizer: 'Tech Philippines',
          status: 'available',
          target_audience: ['Tech Professionals', 'Startups', 'Investors']
        }
      ])

      // Mock active sponsorships data
      setSponsorships([
        {
          id: '1',
          event_name: 'Digital Marketing Conference 2024',
          tier: 'Gold Sponsor',
          amount: 250000,
          event_date: '2024-12-15',
          location: 'Shangri-La Makati',
          status: 'completed',
          roi_metrics: {
            impressions: 50000,
            engagement: 1200,
            leads: 85
          }
        },
        {
          id: '2',
          event_name: 'Startup Pitch Competition',
          tier: 'Platinum Sponsor',
          amount: 400000,
          event_date: '2025-02-28',
          location: 'BGC Arts Center',
          status: 'upcoming',
          roi_metrics: {
            impressions: 0,
            engagement: 0,
            leads: 0
          }
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalInvestment = sponsorships.reduce((sum, s) => sum + s.amount, 0)
  const totalImpressions = sponsorships.reduce((sum, s) => sum + s.roi_metrics.impressions, 0)
  const totalLeads = sponsorships.reduce((sum, s) => sum + s.roi_metrics.leads, 0)
  const activeCount = sponsorships.filter(s => s.status === 'active' || s.status === 'upcoming').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': case 'active': case 'upcoming': return 'bg-green-100 text-green-800'
      case 'interested': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sponsor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userProfile?.company_name || userProfile?.full_name}!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'opportunities', label: 'Opportunities', icon: Target },
              { id: 'sponsorships', label: 'My Sponsorships', icon: Gift },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'profile', label: 'Profile', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Investment</p>
                    <p className="text-2xl font-bold text-gray-900">₱{totalInvestment.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Impressions</p>
                    <p className="text-2xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Gift className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Sponsorships</p>
                    <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Opportunities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">New Opportunities</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {opportunities.slice(0, 3).map(opportunity => (
                  <div key={opportunity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Target className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{opportunity.event_name}</h4>
                        <p className="text-sm text-gray-600">{opportunity.event_type} • {opportunity.expected_attendance} attendees</p>
                        <p className="text-sm text-gray-500">{new Date(opportunity.event_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">From ₱{opportunity.sponsorship_tiers[opportunity.sponsorship_tiers.length - 1].price.toLocaleString()}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                        {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Performance</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{totalImpressions > 0 ? (totalInvestment / totalImpressions * 1000).toFixed(2) : '0'}</p>
                  <p className="text-gray-600">Cost per 1K Impressions</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{totalLeads > 0 ? (totalInvestment / totalLeads).toFixed(0) : '0'}</p>
                  <p className="text-gray-600">Cost per Lead</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{totalImpressions > 0 ? ((totalLeads / totalImpressions) * 100).toFixed(2) : '0'}%</p>
                  <p className="text-gray-600">Conversion Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Sponsorship Opportunities</h3>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Event Types</option>
                  <option>Corporate</option>
                  <option>Technology</option>
                  <option>Marketing</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Budgets</option>
                  <option>Under ₱100K</option>
                  <option>₱100K - ₱500K</option>
                  <option>Over ₱500K</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6">
              {opportunities.map(opportunity => (
                <div key={opportunity.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{opportunity.event_name}</h4>
                      <p className="text-gray-600">{opportunity.event_type} • {opportunity.organizer}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(opportunity.event_date).toLocaleDateString()} • {opportunity.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(opportunity.status)}`}>
                      {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Event Details</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Expected Attendance: {opportunity.expected_attendance.toLocaleString()}</p>
                        <p>Target Audience: {opportunity.target_audience.join(', ')}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Sponsorship Tiers</h5>
                      <div className="space-y-2">
                        {opportunity.sponsorship_tiers.map((tier, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{tier.name}</span>
                            <span className="font-medium text-gray-900">₱{tier.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                    <div className="space-x-2">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Express Interest
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sponsorships Tab */}
        {activeTab === 'sponsorships' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">My Sponsorships</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {sponsorships.map(sponsorship => (
                <div key={sponsorship.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{sponsorship.event_name}</h4>
                      <p className="text-gray-600">{sponsorship.tier} • ₱{sponsorship.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{new Date(sponsorship.event_date).toLocaleDateString()} • {sponsorship.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sponsorship.status)}`}>
                      {sponsorship.status.charAt(0).toUpperCase() + sponsorship.status.slice(1)}
                    </span>
                  </div>

                  {sponsorship.status === 'completed' && (
                    <div className="grid md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{sponsorship.roi_metrics.impressions.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{sponsorship.roi_metrics.engagement.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Engagement</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{sponsorship.roi_metrics.leads}</p>
                        <p className="text-sm text-gray-600">Leads Generated</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Sponsorship Analytics</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-medium text-gray-900 mb-4">Investment Over Time</h4>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Investment chart would go here</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-medium text-gray-900 mb-4">ROI Performance</h4>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">ROI chart would go here</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-medium text-gray-900 mb-4">Sponsorship Impact</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-gray-600">Events Sponsored</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">25K</p>
                  <p className="text-gray-600">People Reached</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">4.2x</p>
                  <p className="text-gray-600">Average ROI</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">89%</p>
                  <p className="text-gray-600">Brand Recall</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Sponsor Profile</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      defaultValue={userProfile?.company_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>Retail</option>
                      <option>Manufacturing</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      defaultValue={userProfile?.full_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-1000 employees</option>
                      <option>1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue={userProfile?.phone_number || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Marketing Budget</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Under ₱500K</option>
                    <option>₱500K - ₱1M</option>
                    <option>₱1M - ₱5M</option>
                    <option>₱5M - ₱10M</option>
                    <option>Over ₱10M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {['Business Executives', 'Entrepreneurs', 'Tech Professionals', 'Students', 'General Public', 'Industry Specialists'].map(audience => (
                      <label key={audience} className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">{audience}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsorship Interests</label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {['Corporate Events', 'Technology Conferences', 'Trade Shows', 'Networking Events', 'Awards Ceremonies', 'Product Launches'].map(interest => (
                      <label key={interest} className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}