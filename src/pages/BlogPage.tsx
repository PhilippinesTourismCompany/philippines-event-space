import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, Tag, Clock, ArrowLeft, ChevronRight, Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured?: boolean
}

// Mock blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Wedding Venues in Manila for 2025',
    slug: 'top-wedding-venues-manila-2025',
    excerpt: 'Discover the most stunning and sought-after wedding venues in Manila for your special day.',
    content: `
      <p>Planning a wedding in Manila? The city offers a diverse range of stunning venues that cater to different styles, preferences, and budgets. From luxurious hotel ballrooms to garden settings and heritage sites, Manila has it all.</p>
      
      <h2>1. The Peninsula Manila</h2>
      <p>The Peninsula Manila stands as one of the most prestigious wedding venues in the city. Its Rigodon Ballroom, with its elegant chandeliers and timeless ambiance, can accommodate up to 450 guests for a sit-down dinner. The hotel's experienced wedding specialists ensure that every detail is perfect, from the menu to the decor.</p>
      
      <h2>2. Shangri-La at the Fort</h2>
      <p>For couples seeking a modern and sophisticated venue, Shangri-La at the Fort offers the Grand Ballroom, which can host up to 1,200 guests. The hotel's culinary team is known for their exceptional cuisine, making it a favorite among food-loving couples.</p>
      
      <h2>3. Manila Cathedral</h2>
      <p>For a traditional Catholic ceremony, the Manila Cathedral in Intramuros is a historic and majestic choice. Its Neo-Romanesque architecture, stained glass windows, and central location make it a popular choice for couples seeking a classic church wedding.</p>
      
      <h2>4. Sofitel Philippine Plaza</h2>
      <p>Sofitel offers a unique blend of Filipino and French hospitality. Its Grand Plaza Ballroom can accommodate up to 1,000 guests, while the Harbor Garden Tent provides an al fresco option with a view of Manila Bay's famous sunset.</p>
      
      <h2>5. Blue Leaf Cosmopolitan</h2>
      <p>This contemporary venue in Robinsons Bridgetowne features modern architecture and versatile spaces. The Cosmopolitan Hall can host up to 500 guests and can be transformed to match any wedding theme.</p>
      
      <h2>6. Fernwood Gardens</h2>
      <p>For couples dreaming of a garden wedding without worrying about the weather, Fernwood Gardens offers a glass-enclosed garden venue. Its European-inspired setting features a chapel, fountains, and lush greenery.</p>
      
      <h2>7. The Manila Hotel</h2>
      <p>As the oldest premier hotel in the Philippines, The Manila Hotel combines historic charm with modern amenities. Its Fiesta Pavilion can host up to 2,000 guests, making it ideal for grand celebrations.</p>
      
      <h2>8. Conrad Manila</h2>
      <p>Located in the Mall of Asia complex, Conrad Manila offers stunning views of Manila Bay. Its Forbes Ballroom can accommodate up to 1,200 guests and features state-of-the-art lighting and sound systems.</p>
      
      <h2>9. Palazzo Verde</h2>
      <p>This European-inspired venue in Las Piñas offers multiple ceremony and reception areas, including the Garden Pavilion and the Palazzo Hall. Its all-in-one packages make wedding planning more convenient.</p>
      
      <h2>10. Nustar Resort & Casino Cebu</h2>
      <p>While technically outside Manila, Nustar Resort & Casino in Cebu is worth mentioning for couples considering a destination wedding. Its grand ballroom and beachfront location offer a perfect setting for a tropical celebration.</p>
      
      <h3>Tips for Choosing Your Wedding Venue</h3>
      <ul>
        <li>Book early, especially for popular venues and peak wedding seasons (December to February)</li>
        <li>Consider your guest count and ensure the venue can comfortably accommodate everyone</li>
        <li>Check if the venue offers in-house catering or allows outside caterers</li>
        <li>Verify what's included in the package (chairs, tables, basic decor, etc.)</li>
        <li>Visit the venue at the same time of day as your planned wedding to check lighting and ambiance</li>
      </ul>
      
      <p>Remember, your venue sets the tone for your entire wedding, so choose a place that reflects your personality as a couple and provides the experience you want for your guests.</p>
    `,
    author: 'Maria Santos',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'Weddings',
    tags: ['Wedding Venues', 'Manila', 'Luxury Venues', 'Event Planning'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'How to Choose the Perfect Corporate Event Venue',
    slug: 'choose-perfect-corporate-event-venue',
    excerpt: 'A comprehensive guide to selecting the ideal venue for your next corporate event or business meeting.',
    content: `
      <p>Selecting the right venue for your corporate event is crucial to its success. The venue sets the tone, affects attendee experience, and can impact the overall effectiveness of your event. Here's a comprehensive guide to help you choose the perfect corporate event venue.</p>
      
      <h2>Define Your Event Objectives</h2>
      <p>Before you start venue hunting, clearly define what you want to achieve with your event. Is it a training session, product launch, team-building activity, or annual conference? Your objectives will influence your venue requirements.</p>
      
      <h2>Understand Your Audience</h2>
      <p>Consider who will be attending your event. Are they executives, clients, employees, or a mix? Their preferences, expectations, and needs should guide your venue selection.</p>
      
      <h2>Key Factors to Consider</h2>
      
      <h3>1. Location and Accessibility</h3>
      <p>Choose a venue that's easily accessible for most attendees. Consider proximity to airports, public transportation, and major highways. For multi-day events, nearby accommodation options are essential.</p>
      
      <h3>2. Capacity and Layout</h3>
      <p>Ensure the venue can comfortably accommodate your expected number of attendees. The layout should support your event format, whether it's a theater-style presentation, classroom setup, or networking reception.</p>
      
      <h3>3. Technology and Amenities</h3>
      <p>Modern corporate events require reliable technology. Check for high-speed WiFi, audio-visual equipment, video conferencing capabilities, and technical support. Other amenities like parking, restrooms, and break areas are also important.</p>
      
      <h3>4. Catering Options</h3>
      <p>Food and beverages play a significant role in attendee satisfaction. Does the venue offer in-house catering, or can you bring in external caterers? Can they accommodate dietary restrictions?</p>
      
      <h3>5. Budget Considerations</h3>
      <p>Beyond the base rental fee, consider additional costs like catering, equipment rental, staffing, and security. Some venues offer all-inclusive packages that might provide better value.</p>
      
      <h2>Top Corporate Venues in the Philippines</h2>
      
      <h3>Manila</h3>
      <ul>
        <li><strong>Shangri-La at the Fort</strong> - Offers versatile meeting spaces with state-of-the-art facilities</li>
        <li><strong>Grand Hyatt Manila</strong> - Features elegant ballrooms and meeting rooms with panoramic city views</li>
        <li><strong>SMX Convention Center</strong> - Ideal for large-scale conferences and exhibitions</li>
      </ul>
      
      <h3>Cebu</h3>
      <ul>
        <li><strong>Nustar Resort & Casino</strong> - Provides luxury meeting spaces with modern amenities</li>
        <li><strong>Radisson Blu Cebu</strong> - Offers flexible event spaces with professional planning services</li>
      </ul>
      
      <h3>Davao</h3>
      <ul>
        <li><strong>Dusit Thani Davao</strong> - Features sophisticated meeting rooms with Thai-inspired hospitality</li>
        <li><strong>SMX Convention Center Davao</strong> - Provides spacious venues for large corporate gatherings</li>
      </ul>
      
      <h2>Site Inspection Checklist</h2>
      <p>Always visit potential venues before making a decision. During your site inspection, check:</p>
      <ul>
        <li>Room dimensions and capacity</li>
        <li>Lighting and acoustics</li>
        <li>Available equipment and technology</li>
        <li>Accessibility features</li>
        <li>Restroom facilities</li>
        <li>Parking availability</li>
        <li>Loading and unloading areas</li>
        <li>Emergency exits and safety measures</li>
      </ul>
      
      <h2>Negotiating with Venues</h2>
      <p>Don't hesitate to negotiate terms with venues. Consider:</p>
      <ul>
        <li>Booking during off-peak times for better rates</li>
        <li>Bundling services for discounts</li>
        <li>Requesting complimentary amenities or upgrades</li>
        <li>Negotiating flexible payment terms</li>
      </ul>
      
      <p>Remember, the perfect venue aligns with your event objectives, meets attendee expectations, and fits within your budget. Take your time to research and visit multiple options before making your final decision.</p>
    `,
    author: 'Juan Dela Cruz',
    date: '2025-01-10',
    readTime: '10 min',
    category: 'Corporate Events',
    tags: ['Corporate Venues', 'Business Meetings', 'Event Planning', 'Professional Development'],
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    title: '5 Emerging Event Trends in the Philippines for 2025',
    slug: 'emerging-event-trends-philippines-2025',
    excerpt: 'Stay ahead of the curve with these innovative event trends that are shaping the Philippine events industry.',
    content: `
      <p>The events industry in the Philippines continues to evolve, with new trends emerging that reflect changing consumer preferences, technological advancements, and cultural shifts. Here are five key trends that are expected to shape the Philippine events landscape in 2025.</p>
      
      <h2>1. Hybrid Events Become the Standard</h2>
      <p>While in-person events have largely returned, the hybrid model is here to stay. Event organizers in the Philippines are investing in sophisticated technology to create seamless experiences for both physical and virtual attendees. This approach expands reach, increases accessibility, and provides valuable data insights.</p>
      
      <p>Key developments include:</p>
      <ul>
        <li>Interactive virtual platforms that mirror physical venues</li>
        <li>AI-powered networking tools that connect in-person and remote attendees</li>
        <li>Simultaneous translation services for international participants</li>
        <li>Extended event lifespans through on-demand content</li>
      </ul>
      
      <h2>2. Sustainability Takes Center Stage</h2>
      <p>Environmental consciousness is increasingly important to Filipino consumers and businesses alike. Sustainable event practices are no longer optional but expected. This trend is manifesting in various ways:</p>
      
      <ul>
        <li>Zero-waste catering options using local, seasonal ingredients</li>
        <li>Digital invitations and materials replacing printed collateral</li>
        <li>Venues powered by renewable energy sources</li>
        <li>Carbon offset programs for events</li>
        <li>Upcycled or biodegradable decor elements</li>
      </ul>
      
      <h2>3. Micro-Events and Intimate Gatherings</h2>
      <p>While grand celebrations remain popular for milestone events, there's a growing preference for smaller, more intimate gatherings. These micro-events allow for:</p>
      
      <ul>
        <li>More personalized experiences for guests</li>
        <li>Higher quality food and beverage offerings</li>
        <li>Unique venues that couldn't accommodate larger groups</li>
        <li>More meaningful interactions among attendees</li>
        <li>Better budget allocation for premium experiences</li>
      </ul>
      
      <p>Boutique hotels, private dining rooms, and exclusive venues are capitalizing on this trend by creating specialized packages for groups of 20-50 people.</p>
      
      <h2>4. Tech-Enhanced Experiences</h2>
      <p>Technology is transforming how events are experienced in the Philippines. Innovations include:</p>
      
      <ul>
        <li><strong>Augmented Reality (AR)</strong>: Creating interactive elements that enhance physical spaces</li>
        <li><strong>RFID Wristbands</strong>: Enabling cashless payments and personalized experiences</li>
        <li><strong>AI-Powered Personalization</strong>: Customizing event journeys based on attendee preferences</li>
        <li><strong>Holographic Presentations</strong>: Bringing remote speakers "on stage" virtually</li>
        <li><strong>Drone Shows</strong>: Replacing traditional fireworks with programmable light displays</li>
      </ul>
      
      <h2>5. Cultural Fusion and Heritage Celebration</h2>
      <p>There's a renewed interest in incorporating Filipino cultural elements into modern events. This trend reflects a desire to celebrate heritage while creating unique, Instagram-worthy moments:</p>
      
      <ul>
        <li>Traditional Filipino games reimagined as corporate team-building activities</li>
        <li>Indigenous textiles and crafts incorporated into event design</li>
        <li>Regional cuisine highlighted in innovative catering menus</li>
        <li>Cultural performances integrated into contemporary events</li>
        <li>Heritage venues repurposed for modern gatherings</li>
      </ul>
      
      <h2>What This Means for Event Planners</h2>
      <p>For event professionals in the Philippines, staying competitive means embracing these trends while maintaining the warm hospitality that the country is known for. Success will come to those who can:</p>
      
      <ul>
        <li>Invest in the right technology while keeping the human touch</li>
        <li>Develop sustainable practices without compromising quality</li>
        <li>Create intimate, personalized experiences at any scale</li>
        <li>Balance innovation with cultural authenticity</li>
        <li>Build flexible event models that can adapt to changing circumstances</li>
      </ul>
      
      <p>As the Philippine events industry continues to recover and grow, these trends represent exciting opportunities for venues, planners, and suppliers to differentiate themselves and deliver exceptional experiences.</p>
    `,
    author: 'Anna Reyes',
    date: '2025-01-05',
    readTime: '7 min',
    category: 'Industry Trends',
    tags: ['Event Trends', 'Technology', 'Sustainability', 'Filipino Culture'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
]

export default function BlogPage() {
  const { articleId } = useParams()
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (articleId) {
      // Find the specific post
      const post = blogPosts.find(post => post.slug === articleId)
      if (post) {
        setCurrentPost(post)
        
        // Find related posts (same category or shared tags)
        const related = blogPosts
          .filter(p => p.id !== post.id)
          .filter(p => 
            p.category === post.category || 
            p.tags.some(tag => post.tags.includes(tag))
          )
          .slice(0, 3)
        
        setRelatedPosts(related)
      }
    } else {
      setCurrentPost(null)
    }
  }, [articleId])

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPost ? (
        // Single Article View
        <div>
          {/* Article Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link to="/blog" className="inline-flex items-center text-blue-100 hover:text-white mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{currentPost.title}</h1>
              
              <div className="flex flex-wrap items-center text-blue-100 text-sm">
                <div className="flex items-center mr-6 mb-2">
                  <User className="h-4 w-4 mr-2" />
                  {currentPost.author}
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(currentPost.date)}
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  {currentPost.readTime} read
                </div>
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-2" />
                  {currentPost.category}
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Featured Image */}
              <div className="h-80 overflow-hidden">
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Article Body */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPost.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Share Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Share this article:</h3>
                  <div className="flex space-x-4">
                    <a 
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(currentPost.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(currentPost.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href={`mailto:?subject=${encodeURIComponent(currentPost.title)}&body=${encodeURIComponent(window.location.href)}`}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Blog Index View
        <div>
          {/* Blog Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Planning Insights</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Expert tips, industry trends, and inspiration for planning exceptional events across the Philippines
              </p>
            </div>
          </div>

          {/* Blog Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Featured Post */}
            {blogPosts.filter(post => post.featured).map(featuredPost => (
              <div key={featuredPost.id} className="mb-16">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="mb-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <div className="flex items-center mr-4">
                          <User className="h-4 w-4 mr-1" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center mr-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(featuredPost.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {featuredPost.readTime} read
                        </div>
                      </div>
                      <Link 
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                      >
                        Read Article
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* All Posts */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(post.date)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center text-sm text-blue-600 font-medium">
                        Read More
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}