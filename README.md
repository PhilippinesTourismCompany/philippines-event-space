# VenueFinder PH 🏨

**The Philippines' Premier Venue Discovery Platform**

A comprehensive platform for discovering and booking exceptional event venues, hotels, and meeting spaces across the Philippines. Built with React, TypeScript, and Tailwind CSS.

This project is part of Bolt hackathon 2025 [https://bolt.new]

## 🌟 Features

### 🏢 **Multi-User Platform**
- **Clients** - Browse and book venues for events
- **Space Providers** - List and manage properties
- **Event Vendors** - Offer services (catering, photography, etc.)
- **Sponsors** - Partner with events and venues, open to sponsorships, beverage, vendors, other technology providers§  
- **Event Organizers** - Manage events and bookings
- **Venue Managers** - Update venue details and availability
- **Event Planners** - Plan and coordinate events
- **Event Attendees** - View event details and RSVP
- **Event Hosts** - Create and manage events
- **Event Coordinators** - Assist in event logistics
- **Event Sponsors** - Promote events and venues
- **Event Speakers** - Participate in events as speakers
- **Event Guests** - Attend events and provide feedback
- **Event Staff** - Assist in event operations
- **Admins** - Platform management and analytics

### 🗺️ **Smart Discovery**
- **Interactive Map** - Explore venues by location
- **Brand Navigation** - Browse by hotel brands (Peninsula, Shangri-La, etc.)
- **Advanced Search** - Filter by capacity, price, amenities, event type
- **Dynamic URLs** - SEO-friendly paths like `/manila/peninsula` or `/boracay/shangrila`

### 📱 **Modern Experience**
- **Responsive Design** - Perfect on all devices
- **Real-time Search** - Instant results as you type
- **Image Galleries** - High-quality venue photos
- **Detailed Profiles** - Comprehensive venue information

## 🚀 Live Demo

**Production Site:** [philippines-event-space.netlify.app](https://philippines-event-space.netlify.app)



## 🏗️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Routing:** React Router v6 with dynamic paths
- **Maps:** React Leaflet for interactive venue mapping
- **Icons:** Lucide React
- **Charts:** Chart.js for analytics
- **PDF Generation:** jsPDF for reports
- **Build Tool:** Vite
- **Deployment:** Netlify

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation with brand links
│   ├── VenueCard.tsx   # Venue display cards
│   ├── HotelCard.tsx   # Hotel display cards
│   ├── SearchFilters.tsx # Advanced search functionality
│   └── VenueMap.tsx    # Interactive map component
├── pages/              # Route components
│   ├── HomePage.tsx    # Landing page with search
│   ├── VenuePage.tsx   # Individual venue details
│   ├── BrandsPage.tsx  # Hotel brands directory
│   ├── BrandPage.tsx   # Brand-specific properties
│   └── *Dashboard.tsx  # User-specific dashboards
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
└── lib/               # Utilities
    └── supabase.ts    # Database configuration
```

## 🎯 Key Features

### **Brand-Based Navigation**
- Browse venues by hotel brands (Peninsula, Shangri-La, Marriott, etc.)
- Dedicated brand pages with property listings
- SEO-optimized URLs for better discoverability

### **Dynamic Venue Routes**
- Clean URLs: `/manila/peninsula`, `/cebu/nustar`, `/boracay/shangrila`
- Automatic slug generation from venue names
- City-based organization for easy navigation

### **Advanced Search & Filtering**
- Location-based search with autocomplete
- Capacity range filtering (1-50, 51-100, etc.)
- Price range selection
- Event type matching
- Amenity filtering (WiFi, parking, catering, etc.)
- Accessibility options

### **Interactive Mapping**
- Real-time venue locations
- Clustered markers for better performance
- Popup details with venue information
- Filter by venue type (hotels vs. event spaces)

### **Comprehensive Analytics**
- Admin dashboard with detailed reports
- Revenue tracking and occupancy rates
- PDF report generation
- Interactive charts and visualizations




## 🚀 Development 

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/venuefinder-ph.git
   cd venuefinder-ph
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
npm run preview
```

## 🗺️ Venue Coverage

### **Major Cities**
- **Metro Manila** - Makati, BGC, Ortigas, Pasay
- **Cebu** - Cebu City, Lapu-Lapu, Mactan
- **Boracay** - Station 1, Station 2, Station 3
- **Davao** - Davao City, Tagum
- **Baguio** - Session Road, Burnham Park area

### **Featured Hotel Brands**
- 🏨 **The Peninsula Hotels** - Luxury hospitality excellence
- 🏨 **Shangri-La Hotels** - Asian hospitality from the heart
- 🏨 **Marriott International** - Global hospitality leader
- 🏨 **Conrad Hotels** - Sophisticated luxury accommodations
- 🏨 **Hyatt Hotels** - Premium hospitality experiences
- 🏨 **Okada Manila** - Integrated resort entertainment

## 📊 Platform Statistics

- **500+** Verified venues across the Philippines
- **50+** Cities and municipalities covered
- **6** Major hotel brands represented
- **200+** Meeting rooms and event spaces
- **10,000+** Events successfully hosted

## 🛠️ Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Code Style**
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Tailwind CSS for styling

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is NOT licensed. It is property of the Philippines Travel Company and is intended for use in the Philippine hospitality industry. Unauthorized use or distribution is prohibited.

## 🙏 Acknowledgments

- **Pexels** for high-quality venue photography
- **Leaflet** for mapping capabilities
- **Lucide** for beautiful icons
- **Tailwind CSS** for rapid UI development

## 📞 Contact

**VenueFinder PH Team**
- 📧 Email: philippines.travel.company@gmail.com
- 🌐 Website: [philippines-event-space.netlify.app](https://philippines-event-space.netlify.app)

---

**Built with ❤️ for the Philippine hospitality industry**