import React, { useState, useEffect, useRef } from 'react'
import { Search, Camera, Utensils, Music, Palette, Users, Scissors, Flower, MapPin, Star, Phone, Mail, Link } from 'lucide-react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

interface ServiceProvider {
  id: string
  name: string
  category: string
  specialties: string[]
  location: string
  rating: number
  reviews: number
  price_range: string
  contact: {
    phone: string
    email: string
  }
  image: string
  featured: boolean
  slug?: string
  website?: string
}

// Mock service providers data
const serviceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Budots Media Philippines',
    category: 'photography',
    specialties: ['Wedding Photography', 'Event Videography', 'Live Streaming'],
    location: 'Lapu-Lapu City, Cebu',
    rating: 4.9,
    reviews: 127,
    price_range: '₱50,000 - ₱150,000',
    contact: {
      phone: '0915 405 2486',
      email: 'budots.media.philippines@gmail.com'
    },
    image: '/Budots Media Philippines logo_.png',
    featured: true,
    slug: 'budotsmedia',
    website: 'budotsmediaphilippines.com'
  },
  {
    id: '2',
    name: 'Cinematic Dreams',
    category: 'videographer',
    specialties: ['Wedding Films', 'Corporate Videos', 'Same Day Edit'],
    location: 'Quezon City',
    rating: 4.8,
    reviews: 89,
    price_range: '₱25,000 - ₱80,000',
    contact: {
      phone: '+63 918 234 5678',
      email: 'info@cinematicdreams.ph'
    },
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: '3',
    name: 'Unique Weddings & Events',
    category: 'designer',
    specialties: ['Wedding Design', 'Corporate Events', 'Floral Arrangements'],
    location: 'Pasig City',
    rating: 4.7,
    reviews: 64,
    price_range: '₱60,000 - ₱200,000',
    contact: {
      phone: '+63 919 345 6789',
      email: 'carlo@uniqueweddings.ph'
    },
    image: '/carlo-jubela-unique-wedings-logo.png',
    featured: true,
    slug: 'unique'
  },
  {
    id: '4',
    name: 'Beauty by Sarah',
    category: 'makeup',
    specialties: ['Airbrush Makeup', 'Traditional Makeup', 'Hair Styling'],
    location: 'Pasig City',
    rating: 4.6,
    reviews: 78,
    price_range: '₱2,500 - ₱6,000',
    contact: {
      phone: '+63 920 456 7890',
      email: 'sarah@beautybysarah.com'
    },
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: false
  },
  {
    id: '5',
    name: 'Frame Perfect Studios',
    category: 'videographer',
    specialties: ['Documentary Style', 'Cinematic Videos', 'Drone Footage'],
    location: 'Mandaluyong',
    rating: 4.8,
    reviews: 92,
    price_range: '₱30,000 - ₱100,000',
    contact: {
      phone: '+63 921 567 8901',
      email: 'contact@frameperfect.ph'
    },
    image: 'https://images.unsplash.com/photo-1569443693539-175ea9f007e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: false
  },
  {
    id: '6',
    name: 'Happy Seven Weddings & Events',
    category: 'designer',
    specialties: ['Garden Weddings', 'Rustic Themes', 'Minimalist Design'],
    location: 'Makati City',
    rating: 4.8,
    reviews: 89,
    price_range: '₱80,000 - ₱250,000',
    contact: {
      phone: '+63 918 234 5678',
      email: 'hello@happy7events.com'
    },
    image: '/h7-happyseven-weddings-events-logo.png',
    featured: true,
    slug: 'happy7'
  },
  {
    id: '7',
    name: 'Vania Romoff',
    category: 'designer',
    specialties: ['Bridal Couture', 'Custom Gowns', 'Luxury Fashion'],
    location: 'Makati City',
    rating: 4.9,
    reviews: 112,
    price_range: '₱100,000 - ₱500,000',
    contact: {
      phone: '+63 917 555 1234',
      email: 'info@vaniaromoff.com'
    },
    image: '/vaniaromoff-logo_468x392.webp',
    featured: true,
    slug: 'vaniaromoff'
  }
]

const serviceCategories = [
  { id: 'all', name: 'All Services', icon: Users, color: 'blue' },
  { id: 'photography', name: 'Photography & Videography', icon: Camera, color: 'blue' },
  { id: 'catering', name: 'Catering Services', icon: Utensils, color: 'green' },
  { id: 'entertainment', name: 'Entertainment & Music', icon: Music, color: 'purple' },
  { id: 'designer', name: 'Decoration & Styling', icon: Palette, color: 'pink' },
  { id: 'makeup', name: 'Makeup Artists', icon: Scissors, color: 'red' },
  { id: 'florist', name: 'Florists', icon: Flower, color: 'indigo' }
]

// WebGL Particle System
class ParticleSystem {
  private canvas: HTMLCanvasElement
  private gl: WebGLRenderingContext
  private program: WebGLProgram
  private particles: Float32Array
  private velocities: Float32Array
  private particleCount: number
  private animationId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl')!
    this.particleCount = 150
    
    this.initWebGL()
    this.initParticles()
    this.animate()
  }

  private initWebGL() {
    const vertexShaderSource = `
      attribute vec2 a_position;
      uniform vec2 u_resolution;
      uniform float u_time;
      varying float v_alpha;
      
      void main() {
        vec2 position = a_position / u_resolution * 2.0 - 1.0;
        position.y *= -1.0;
        
        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = 2.0 + sin(u_time * 0.01 + a_position.x * 0.01) * 1.0;
        
        v_alpha = 0.3 + sin(u_time * 0.02 + a_position.y * 0.01) * 0.3;
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      varying float v_alpha;
      
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        
        vec3 color = vec3(0.0, 0.8, 1.0);
        float glow = 1.0 - dist * 2.0;
        
        gl_FragColor = vec4(color * glow, v_alpha * glow);
      }
    `

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    this.program = this.createProgram(vertexShader, fragmentShader)
    this.gl.useProgram(this.program)
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type)!
    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)
    return shader
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = this.gl.createProgram()!
    this.gl.attachShader(program, vertexShader)
    this.gl.attachShader(program, fragmentShader)
    this.gl.linkProgram(program)
    return program
  }

  private initParticles() {
    this.particles = new Float32Array(this.particleCount * 2)
    this.velocities = new Float32Array(this.particleCount * 2)

    for (let i = 0; i < this.particleCount; i++) {
      this.particles[i * 2] = Math.random() * this.canvas.width
      this.particles[i * 2 + 1] = Math.random() * this.canvas.height
      
      this.velocities[i * 2] = (Math.random() - 0.5) * 0.5
      this.velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.5
    }
  }

  private animate = () => {
    this.updateParticles()
    this.render()
    this.animationId = requestAnimationFrame(this.animate)
  }

  private updateParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles[i * 2] += this.velocities[i * 2]
      this.particles[i * 2 + 1] += this.velocities[i * 2 + 1]

      // Wrap around edges
      if (this.particles[i * 2] < 0) this.particles[i * 2] = this.canvas.width
      if (this.particles[i * 2] > this.canvas.width) this.particles[i * 2] = 0
      if (this.particles[i * 2 + 1] < 0) this.particles[i * 2 + 1] = this.canvas.height
      if (this.particles[i * 2 + 1] > this.canvas.height) this.particles[i * 2 + 1] = 0
    }
  }

  private render() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    this.gl.clearColor(0, 0, 0, 1)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    this.gl.enable(this.gl.BLEND)
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)

    const positionBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particles, this.gl.DYNAMIC_DRAW)

    const positionLocation = this.gl.getAttribLocation(this.program, 'a_position')
    this.gl.enableVertexAttribArray(positionLocation)
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0)

    const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution')
    this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height)

    const timeLocation = this.gl.getUniformLocation(this.program, 'u_time')
    this.gl.uniform1f(timeLocation, Date.now())

    this.gl.drawArrays(this.gl.POINTS, 0, this.particleCount)
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }
}

export default function ServicesPage() {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleSystemRef = useRef<ParticleSystem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    // Check if we need to pre-select a category based on URL
    const path = window.location.pathname
    if (path.includes('/services/photography')) {
      setSelectedCategory('photography')
    } else if (path.includes('/services/decoration')) {
      setSelectedCategory('designer')
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      
      particleSystemRef.current = new ParticleSystem(canvas)
      
      return () => {
        window.removeEventListener('resize', resizeCanvas)
        if (particleSystemRef.current) {
          particleSystemRef.current.destroy()
        }
      }
    }
  }, [])

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory
    
    const matchesLocation = selectedLocation === 'all' || 
                           provider.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = serviceCategories.find(cat => cat.id === categoryId)
    return category ? category.icon : Users
  }

  const getCategoryColor = (categoryId: string) => {
    const category = serviceCategories.find(cat => cat.id === categoryId)
    return category ? category.color : 'blue'
  }

  const handleProviderClick = (provider: ServiceProvider) => {
    if (provider.slug) {
      navigate(`/vendor/${provider.slug}`)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* WebGL Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ background: 'black' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Perfect Service Provider
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow">
              Connect with talented makeup artists, videographers, wedding designers, and more across the Philippines
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-12 border border-white/20">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/90 border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-900"
              >
                {serviceCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-white/90 border border-white/30 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-900"
              >
                <option value="all">All Locations</option>
                <option value="makati">Makati City</option>
                <option value="quezon">Quezon City</option>
                <option value="cebu">Cebu</option>
                <option value="pasig">Pasig City</option>
                <option value="mandaluyong">Mandaluyong</option>
                <option value="alabang">Alabang</option>
              </select>

              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg">
                Search Now
              </button>
            </div>
          </div>

          {/* Service Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {serviceCategories.map(category => {
                const Icon = category.icon
                const providerCount = serviceProviders.filter(provider => 
                  category.id === 'all' || provider.category === category.id
                ).length

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center backdrop-blur-md ${
                      selectedCategory === category.id
                        ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-lg shadow-cyan-500/25'
                        : 'border-white/20 bg-white/10 text-gray-200 hover:border-white/40 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-8 w-8 mx-auto mb-3" />
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs opacity-75">{providerCount} providers</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
              {filteredProviders.length} Service Providers Found
            </h2>
            
            {filteredProviders.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => handleProviderClick(provider)}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-xl cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      {provider.featured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        {React.createElement(getCategoryIcon(provider.category), {
                          className: `h-6 w-6 text-white drop-shadow-lg`
                        })}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {provider.name}
                      </h3>
                      
                      <div className="flex items-center text-gray-300 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{provider.location}</span>
                      </div>

                      <div className="flex items-center mb-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-white font-medium">{provider.rating}</span>
                        <span className="text-gray-300 text-sm ml-1">({provider.reviews} reviews)</span>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-300 mb-2">Specialties:</div>
                        <div className="flex flex-wrap gap-1">
                          {provider.specialties.slice(0, 2).map((specialty, index) => (
                            <span key={index} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                          {provider.specialties.length > 2 && (
                            <span className="text-xs text-gray-300">+{provider.specialties.length - 2} more</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-cyan-300 font-semibold">{provider.price_range}</span>
                      </div>

                      <div className="flex space-x-2">
                        <RouterLink 
                          to={provider.slug ? `/vendor/${provider.slug}` : '#'}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium flex items-center justify-center"
                        >
                          View Profile
                        </RouterLink>
                        {provider.website && (
                          <a 
                            href={`https://${provider.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <Link className="h-4 w-4" />
                          </a>
                        )}
                        <a 
                          href={`tel:${provider.contact.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                        <a 
                          href={`mailto:${provider.contact.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center w-10 h-10 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">No providers found</h3>
                  <p className="text-gray-300 mb-6">Try adjusting your search criteria or browse all categories.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setSelectedLocation('all')
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Platform Statistics</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{serviceProviders.length}+</div>
                <div className="text-gray-300">Service Providers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{serviceCategories.length - 1}</div>
                <div className="text-gray-300">Service Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {serviceProviders.filter(p => p.featured).length}
                </div>
                <div className="text-gray-300">Featured Providers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {(serviceProviders.reduce((sum, p) => sum + p.rating, 0) / serviceProviders.length).toFixed(1)}
                </div>
                <div className="text-gray-300">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}