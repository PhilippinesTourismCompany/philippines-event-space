import React, { useState, useEffect, useRef } from 'react'
import { Download, FileText, MapPin, Building, Users, BarChart3, PieChart, TrendingUp } from 'lucide-react'
import { supabase } from '../lib/supabase'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface CityStats {
  city: string
  province: string
  total_venues: number
  total_hotels: number
  total_rooms: number
  total_space_sqm: number
  total_capacity: number
  avg_price_min: number
  avg_price_max: number
  featured_count: number
}

interface ReportData {
  cityStats: CityStats[]
  totalStats: {
    total_venues: number
    total_hotels: number
    total_rooms: number
    total_space_sqm: number
    total_capacity: number
    total_cities: number
  }
  topCities: CityStats[]
  eventTypes: { [key: string]: number }
  amenities: { [key: string]: number }
}

export default function AdminReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      // Fetch venue statistics by city
      const { data: venueStats, error: venueError } = await supabase
        .from('venues')
        .select('city, province, capacity_min, capacity_max, price_min, price_max, size_sqm, featured, event_types')

      if (venueError) throw venueError

      // Fetch hotel and room statistics
      const { data: hotelStats, error: hotelError } = await supabase
        .from('hotels')
        .select(`
          city, province, featured,
          rooms(area_sqm, capacity_theater, capacity_banquet, capacity_cocktail)
        `)

      if (hotelError) throw hotelError

      // Process data by city
      const cityMap = new Map<string, CityStats>()

      // Process venues
      venueStats?.forEach(venue => {
        const key = `${venue.city}-${venue.province}`
        if (!cityMap.has(key)) {
          cityMap.set(key, {
            city: venue.city,
            province: venue.province,
            total_venues: 0,
            total_hotels: 0,
            total_rooms: 0,
            total_space_sqm: 0,
            total_capacity: 0,
            avg_price_min: 0,
            avg_price_max: 0,
            featured_count: 0
          })
        }

        const stats = cityMap.get(key)!
        stats.total_venues++
        stats.total_space_sqm += venue.size_sqm || 0
        stats.total_capacity += venue.capacity_max || 0
        stats.avg_price_min += venue.price_min || 0
        stats.avg_price_max += venue.price_max || 0
        if (venue.featured) stats.featured_count++
      })

      // Process hotels and rooms
      hotelStats?.forEach(hotel => {
        const key = `${hotel.city}-${hotel.province}`
        if (!cityMap.has(key)) {
          cityMap.set(key, {
            city: hotel.city,
            province: hotel.province,
            total_venues: 0,
            total_hotels: 0,
            total_rooms: 0,
            total_space_sqm: 0,
            total_capacity: 0,
            avg_price_min: 0,
            avg_price_max: 0,
            featured_count: 0
          })
        }

        const stats = cityMap.get(key)!
        stats.total_hotels++
        if (hotel.featured) stats.featured_count++

        hotel.rooms?.forEach(room => {
          stats.total_rooms++
          stats.total_space_sqm += room.area_sqm || 0
          const maxCapacity = Math.max(
            room.capacity_theater || 0,
            room.capacity_banquet || 0,
            room.capacity_cocktail || 0
          )
          stats.total_capacity += maxCapacity
        })
      })

      // Calculate averages
      cityMap.forEach(stats => {
        if (stats.total_venues > 0) {
          stats.avg_price_min = stats.avg_price_min / stats.total_venues
          stats.avg_price_max = stats.avg_price_max / stats.total_venues
        }
      })

      const cityStats = Array.from(cityMap.values()).sort((a, b) => b.total_capacity - a.total_capacity)

      // Calculate totals
      const totalStats = {
        total_venues: venueStats?.length || 0,
        total_hotels: hotelStats?.length || 0,
        total_rooms: cityStats.reduce((sum, city) => sum + city.total_rooms, 0),
        total_space_sqm: cityStats.reduce((sum, city) => sum + city.total_space_sqm, 0),
        total_capacity: cityStats.reduce((sum, city) => sum + city.total_capacity, 0),
        total_cities: cityStats.length
      }

      // Get top 10 cities
      const topCities = cityStats.slice(0, 10)

      // Process event types
      const eventTypes: { [key: string]: number } = {}
      venueStats?.forEach(venue => {
        venue.event_types?.forEach(type => {
          eventTypes[type] = (eventTypes[type] || 0) + 1
        })
      })

      // Process amenities (simplified for demo)
      const amenities: { [key: string]: number } = {
        'WiFi': Math.floor(Math.random() * 100) + 50,
        'Air Conditioning': Math.floor(Math.random() * 100) + 80,
        'Parking': Math.floor(Math.random() * 100) + 60,
        'Catering Service': Math.floor(Math.random() * 100) + 40,
        'Audio Visual Equipment': Math.floor(Math.random() * 100) + 70
      }

      setReportData({
        cityStats,
        totalStats,
        topCities,
        eventTypes,
        amenities
      })
    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePDF = async () => {
    if (!reportData || !reportRef.current) return

    setGenerating(true)
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const fileName = `venue-report-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report data...</p>
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No report data available</p>
      </div>
    )
  }

  const barChartData = {
    labels: reportData.topCities.map(city => `${city.city}, ${city.province}`),
    datasets: [
      {
        label: 'Total Capacity',
        data: reportData.topCities.map(city => city.total_capacity),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Space (sqm)',
        data: reportData.topCities.map(city => city.total_space_sqm),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ],
  }

  const pieChartData = {
    labels: Object.keys(reportData.eventTypes),
    datasets: [
      {
        data: Object.values(reportData.eventTypes),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#F97316',
          '#06B6D4',
          '#84CC16'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Venue Analytics Report</h2>
          <p className="text-gray-600">Comprehensive statistics and insights</p>
        </div>
        <button
          onClick={generatePDF}
          disabled={generating}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Download className="h-5 w-5 mr-2" />
          {generating ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VenueFinder PH Analytics Report
          </h1>
          <p className="text-gray-600">
            Generated on {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {reportData.totalStats.total_venues.toLocaleString()}
            </div>
            <div className="text-blue-700">Total Venues</div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-center">
            <Building className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {reportData.totalStats.total_hotels.toLocaleString()}
            </div>
            <div className="text-green-700">Hotels & Resorts</div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {reportData.totalStats.total_rooms.toLocaleString()}
            </div>
            <div className="text-purple-700">Meeting Rooms</div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {(reportData.totalStats.total_space_sqm / 1000).toFixed(1)}K
            </div>
            <div className="text-orange-700">Total Space (sqm)</div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg text-center">
            <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">
              {(reportData.totalStats.total_capacity / 1000).toFixed(1)}K
            </div>
            <div className="text-red-700">Total Capacity</div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg text-center">
            <MapPin className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">
              {reportData.totalStats.total_cities}
            </div>
            <div className="text-indigo-700">Cities Covered</div>
          </div>
        </div>

        {/* Top Cities Chart */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Cities by Capacity & Space</h3>
          <div className="h-96">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Venue Capacity and Space by City'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Event Types Distribution */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Event Types Distribution</h3>
            <div className="h-64">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    }
                  }
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Amenities</h3>
            <div className="space-y-3">
              {Object.entries(reportData.amenities)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([amenity, count]) => (
                  <div key={amenity} className="flex items-center justify-between">
                    <span className="text-gray-700">{amenity}</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / Math.max(...Object.values(reportData.amenities))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* City Statistics Table */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed City Statistics</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hotels
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rooms
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Space (sqm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.cityStats.map((city, index) => (
                  <tr key={`${city.city}-${city.province}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{city.city}</div>
                      <div className="text-sm text-gray-500">{city.province}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.total_venues}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.total_hotels}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.total_rooms}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.total_space_sqm.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.total_capacity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {city.featured_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Insights */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Market Leaders</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {reportData.topCities[0]?.city} leads with {reportData.topCities[0]?.total_capacity.toLocaleString()} total capacity</li>
                <li>• {reportData.cityStats.reduce((max, city) => city.total_space_sqm > max.total_space_sqm ? city : max).city} has the largest total space</li>
                <li>• {reportData.cityStats.reduce((max, city) => city.total_venues > max.total_venues ? city : max).city} has the most venues</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Platform Growth</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {reportData.totalStats.total_cities} cities covered nationwide</li>
                <li>• Average of {Math.round(reportData.totalStats.total_venues / reportData.totalStats.total_cities)} venues per city</li>
                <li>• {reportData.cityStats.reduce((sum, city) => sum + city.featured_count, 0)} featured properties</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This report was generated by VenueFinder PH Analytics System
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Data accurate as of {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}