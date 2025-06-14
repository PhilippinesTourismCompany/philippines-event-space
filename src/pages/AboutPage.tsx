import React from 'react'
import { MapPin, Users, Award, TrendingUp, Heart, Globe, Phone, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Philippine Venue Platform
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Connecting event organizers with the perfect spaces for their celebrations, 
              corporate events, and special occasions across the Philippines
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Founder Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="md:flex items-start gap-8">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img 
                  src="/2025-robot-AISUMMIT-BART-SAKWERDA.jpg" 
                  alt="Bart Sakwerda" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Founder</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Bart Sakwerda is the visionary founder of a Philippines travel company, driven by a deep passion for showcasing the archipelago's beauty and vibrant culture. His commitment to the Philippines extends beyond tourism; he dedicated his time to volunteering in the aftermath of Typhoon Yolanda, assisting with recovery efforts.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  A keen technologist, Bart is also recognized for his work in writing chatbots and for organizing the first Cebu Chatbot Developer Meetup, fostering a local community of innovation. He further contributes to cultural exchange through Japanese language exchange initiatives.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Bart is also the founder of Budots Media, a dynamic enterprise that collaborates closely with the Department of Tourism, JPark, Korean resort owners, boat operators, and scuba dive shops, playing a significant role in promoting and enhancing the Philippine tourism experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Philippine Venue Platform is the leading platform for event venues in the Philippines. 
              We connect event organizers with the perfect spaces for their celebrations, 
              corporate events, and special occasions across Metro Manila, Cebu, Boracay, and beyond.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded with a vision to simplify venue discovery and booking, we've grown to become 
              the most trusted platform for finding exceptional event spaces throughout the archipelago. 
              Our commitment to quality, transparency, and customer service has made us the go-to 
              resource for event planners, wedding coordinators, and corporate organizers.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to premium event venues across the Philippines by providing 
                a transparent, user-friendly platform that connects event organizers with the 
                perfect spaces for their special occasions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To become the premier destination for venue discovery in Southeast Asia, 
                empowering every celebration with the perfect setting while supporting 
                local hospitality businesses across the region.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Philippine Venue Platform?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're more than just a booking platform - we're your trusted partner in creating unforgettable events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                Deep knowledge of the Philippines' hospitality landscape, helping you find venues 
                in every major city and province with insider insights and local connections.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Verified Quality</h3>
              <p className="text-gray-600">
                All venues undergo rigorous verification and quality checks to ensure your event 
                meets the highest standards of excellence and professionalism.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seamless Experience</h3>
              <p className="text-gray-600">
                Intuitive platform design with transparent pricing, instant confirmation, 
                and dedicated support throughout your event planning journey.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-blue-100 text-lg">
                Trusted by thousands of event organizers across the Philippines
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Verified Venues</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Events Hosted</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Passion</h4>
                <p className="text-sm text-gray-600">We're passionate about creating memorable experiences</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                <p className="text-sm text-gray-600">We strive for excellence in everything we do</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
                <p className="text-sm text-gray-600">We believe in building strong community connections</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                <p className="text-sm text-gray-600">We continuously innovate to improve our platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">+44 07494325565</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">philippines.travel.company@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Philippines</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}