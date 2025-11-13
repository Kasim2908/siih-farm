# SIH-FARM Platform 🌾

**Smart India Hackathon 2025 Project**

An intelligent agricultural platform that empowers farmers with AI-driven crop recommendations, real-time market insights, IoT sensor monitoring, and data-driven decision-making tools.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [User Roles](#user-roles)
- [How to Use](#how-to-use)
- [AI Crop Recommendation System](#ai-crop-recommendation-system)
- [Authentication System](#authentication-system)
- [File Structure](#file-structure)
- [Demo Credentials](#demo-credentials)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

SIIH-FARM is a comprehensive agricultural platform designed to bridge the gap between farmers, government officials, and modern technology. The platform provides:

- **AI-Powered Crop Recommendations** based on region, season, and market trends
- **Real-Time Market Intelligence** with price predictions
- **IoT Sensor Integration** for soil moisture, temperature, and humidity monitoring
- **Role-Based Access Control** for farmers and government officials
- **Data-Driven Insights** to maximize crop yield and profitability

---

## ✨ Features

### 🌱 For Farmers

1. **AI Crop Recommendations**
   - Get top 3 crop suggestions based on your region and season
   - View expected prices and demand trends
   - Real-time updates when changing filters

2. **Market Intelligence**
   - Live market prices for various crops
   - Historical price trends (7 months)
   - AI-predicted prices (3 months ahead)
   - Vendor listings with ratings and contact info

3. **Farm Analysis**
   - Real-time IoT sensor data (soil moisture, temperature, pH, humidity)
   - Weather forecasts and irrigation recommendations
   - Crop health monitoring
   - NPK (Nitrogen, Phosphorus, Potassium) level tracking

4. **Profile Management**
   - Store farm details (land area, crop type, region)
   - View and edit profile anytime
   - Personalized dashboard

### 🏛️ For Government Officers

1. **Admin Dashboard**
   - Manage registered farmers (view, approve, suspend)
   - Add/update crop data and market prices
   - Update weather insights and soil reports
   - Manage government schemes and subsidies

2. **Data Management**
   - Full CRUD operations on agricultural data
   - Monitor platform usage and farmer activity
   - Generate reports and analytics

3. **All Farmer Features**
   - Access to all farmer-level features
   - View market trends and insights

### 👁️ For Visitors (Public Access)

- View general platform information
- Learn about IoT-based smart farming
- Access public awareness content
- View government initiatives overview

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Charts:** Chart.js for data visualization
- **Maps:** Leaflet.js for geographic visualization
- **Icons:** Font Awesome 6.4.0
- **Storage:** LocalStorage for session management
- **Authentication:** Custom role-based access control

---

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required (runs locally)

### Steps

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd siih-farm/ai-farm-ui
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

3. **Start Using**
   - Sign up as a new user or use demo credentials
   - Complete your profile
   - Explore the platform!

---

## 👥 User Roles

### 1. Visitors (Non-Logged-In Users)

**Access Level:** Public Only

**Can View:**
- General information about SIIH-FARM
- Overview of IoT-based smart farming benefits
- Public awareness content
- Government initiatives overview

**Cannot View:**
- Market demand and pricing details
- Real-time IoT sensor insights
- Government internal updates
- Detailed analysis data

---

### 2. Farmers (Registered Users)

**Access Level:** Extended Features

**Can View:**
- Real-time market demand and crop pricing trends
- Personalized farm insights:
  - Soil moisture, temperature, and humidity readings (IoT data)
  - Suggested crops based on soil and climate
  - Regional weather updates
  - Irrigation recommendations
- All government-updated data (read-only)
- AI crop recommendations
- Price trend predictions

**Cannot Modify:**
- Any government data
- Market prices
- IoT configurations

**Profile Fields:**
- Full Name
- Contact Number
- Address
- Land Area (0-1, 1-2, 2-5, 5-10, 10+ hectares)
- Crop Type (Wheat, Rice, Maize, Sugarcane, Cotton, Pulses, Vegetables, Fruits)
- Region (North/South/East/West/Central/Northeast India)

---

### 3. Government Officers

**Access Level:** Full Access

**Can View:**
- Everything farmers can view
- Admin dashboard
- Registered farmers list
- System analytics

**Can Modify:**
- Crop data and market demand information
- Weather insights and soil reports
- IoT data summaries
- Announcements and government schemes
- Subsidy details
- Farmer account management (approve/suspend)

**Profile Fields:**
- Full Name
- Contact Number
- Address
- Department Name
- Designation
- Region of Responsibility

---

## 📖 How to Use

### First Time Users

1. **Sign Up**
   - Click "Sign Up" button on homepage
   - Select your role (Farmer or Government Officer)
   - Fill in basic details:
     - Full Name
     - Email Address
     - Phone Number
     - Password
   - Click "Create Account"

2. **Complete Profile**
   - You'll be redirected to profile setup page
   - Fill in role-specific details:
     - **Farmers:** Land area, crop type, region
     - **Government:** Department, designation, region
   - Upload profile photo (optional)
   - Click "Complete Profile"

3. **Access Dashboard**
   - Farmers → Redirected to home page
   - Government Officers → Redirected to admin dashboard

### Existing Users

1. **Login**
   - Click "Login" button
   - Enter email and password
   - Click "Sign In"

2. **Navigate Platform**
   - Use top navigation menu
   - Click your name to view/edit profile
   - Access role-specific features

---

## 🤖 AI Crop Recommendation System

### How It Works

The AI system analyzes multiple factors to recommend the best crops:

1. **Historical Market Data**
   - Past 7 months of price trends
   - Demand patterns
   - Supply-demand balance

2. **Regional Factors**
   - Climate conditions
   - Soil type
   - Water availability
   - Local market demand

3. **Seasonal Analysis**
   - Kharif (Jun-Oct): Monsoon crops
   - Rabi (Nov-Mar): Winter crops
   - Zaid (Mar-Jun): Summer crops

4. **Crop Categories**
   - Cereals: Wheat, Rice, Maize, Barley, etc.
   - Pulses: Chickpea, Lentil, Moong, Urad, etc.
   - Cash Crops: Cotton, Sugarcane, Groundnut, etc.

### Using the Recommendation System

1. **Navigate to Marketplace**
   - Login as a farmer
   - Go to Marketplace page

2. **Select Filters**
   - **Region:** Choose your farming region
   - **Season:** Select upcoming planting season
   - **Crop Category:** Pick category or view all

3. **View Recommendations**
   - Top 3 crops displayed with:
     - Ranking (1, 2, 3)
     - Expected price per quintal
     - Demand trend percentage
     - Recommendation status (High/Moderate/Stable)

4. **Analyze Price Trends**
   - View historical prices (7 months)
   - See AI predictions (3 months ahead)
   - Read AI insights below the chart

### Example Recommendations

**North India + Rabi Season + Cereals:**
1. Wheat - ₹2,650/quintal - ↑ 15% demand
2. Barley - ₹1,750/quintal - ↑ 10% demand
3. Oats - ₹2,200/quintal - ↑ 7% demand

**South India + Kharif Season + Pulses:**
1. Redgram - ₹6,500/quintal - ↑ 18% demand
2. Greengram - ₹7,200/quintal - ↑ 14% demand
3. Blackgram - ₹6,800/quintal - ↑ 12% demand

---

## 🔐 Authentication System

### Features

- **Session Management:** Uses localStorage for user sessions
- **Role-Based Access:** Content visibility based on user role
- **Auto-Redirect:** Unauthorized users redirected to login
- **Profile Completion:** Enforces profile setup after signup

### Security Measures

1. **Session Validation**
   - Checks authentication on every page load
   - Validates user role before showing content

2. **Content Protection**
   - Uses `data-auth="required"` attribute
   - Uses `data-role="farmer"` or `data-role="government"` attributes
   - Automatically hides restricted content

3. **Page Protection**
   - Analysis and Marketplace pages require login
   - Admin dashboard requires government role
   - Profile setup enforced for incomplete profiles

### Demo Credentials

**Farmer Account:**
- Email: `farmer@demo.com`
- Password: `password`

**Government Officer Account:**
- Email: `gov@demo.com`
- Password: `password`

---

## 👥 User Roles

### Visitors (Not Logged In)
- View public information
- See platform overview
- Access general content

### Farmers
**Login:** `farmer@demo.com` / `password`

**Can Access:**
- Market prices and trends
- IoT sensor data (soil, weather)
- AI crop recommendations
- Price predictions
- Farm analysis tools

**Cannot:**
- Modify any data
- Access admin features

### Government Officers
**Login:** `gov@demo.com` / `password`

**Can Access:**
- Everything farmers can see
- Admin dashboard
- Manage crop data
- Update market prices
- Manage farmer accounts

## 📝 How to Sign Up

1. Click "Sign Up" button
2. Select your role: Farmer or Government Officer
3. Fill in basic details (name, email, phone, password)
4. Complete profile setup:
   - **Farmers:** Land area, crop type, region
   - **Government:** Department, designation, region

## 🌾 AI Crop Recommendations

**Location:** Marketplace page (farmers only)

**Features:**
- Select Region (North/South/East/West India)
- Choose Season (Kharif/Rabi/Zaid)
- Pick Crop Category (Cereals/Pulses/Cash Crops)
- Get top 3 crop recommendations with:
  - Expected prices
  - Demand trends
  - AI insights

**Updates in Real-Time:** Change filters to see different recommendations instantly.

## 📊 Price Trend & Prediction

Shows historical prices (7 months) and AI predictions (3 months ahead) for the top recommended crop.

**Changes automatically** when you select different region/season/category.

## 📁 File Structure

```
siih-farm/
└── ai-farm-ui/
    ├── index.html              # Home page - Platform introduction
    ├── login.html              # Login page - User authentication
    ├── signup.html             # Registration page - New user signup
    ├── profile-setup.html      # Profile completion after signup
    ├── profile.html            # View/edit user profile
    ├── admin.html              # Government admin dashboard
    ├── marketplace.html        # Market prices + AI recommendations
    ├── analysis.html           # Farm analysis + IoT sensor data
    ├── services.html           # Additional farming services
    ├── contact.html            # Contact form
    │
    ├── js/
    │   ├── auth.js             # Authentication system (login/signup)
    │   ├── access-control.js   # Role-based access control
    │   └── main.js             # Main app functionality + charts
    │
    ├── css/
    │   └── styles.css          # All styling and themes
    │
    ├── mock/
    │   ├── regions.json        # Region data
    │   ├── iot_region_1.json   # IoT sensor mock data
    │   ├── market_wheat.json   # Market price mock data
    │   └── analysis_region_1.json  # Analysis mock data
    │
    ├── assets/
    │   ├── icons/              # Platform icons
    │   └── images/             # Images and graphics
    │
    ├── README.md               # This file
    └── AUTH_IMPLEMENTATION.md  # Technical authentication docs
```

### Key Files Explained

**HTML Pages:**
- `index.html` - Landing page with platform overview
- `login.html` - User login with demo credentials
- `signup.html` - Registration with role selection
- `profile-setup.html` - Complete profile after signup
- `profile.html` - View and edit user profile
- `admin.html` - Government officer dashboard
- `marketplace.html` - AI recommendations + market data
- `analysis.html` - IoT sensors + farm analysis

**JavaScript Files:**
- `auth.js` - Handles login, signup, logout, session management
- `access-control.js` - Controls what users can see based on role
- `main.js` - Charts, animations, IoT data, form handling

**CSS:**
- `styles.css` - Complete styling including dark mode support

---

## 📱 Page-by-Page Guide

### 🏠 Home Page (index.html)
- Platform introduction and features
- Key metrics and statistics
- Call-to-action buttons
- Public access (no login required)

### 📊 Analysis Page (analysis.html)
**Requires:** Farmer or Government login

**Features:**
- Real-time IoT sensor data
- Soil moisture, temperature, pH, humidity
- Interactive map with farm location
- NPK level charts
- AI insights and recommendations
- Detailed sensor readings table

### 🛒 Marketplace Page (marketplace.html)
**Requires:** Farmer or Government login

**Features:**
- AI Crop Recommendation System
- Top 3 crop suggestions with prices
- Price Trend & AI Prediction chart
- Market filters (crop, region, price, timeframe)
- Vendor listings with ratings
- Market insights (price forecast, supply status, quality index)
- CSV export functionality

### 👤 Profile Page (profile.html)
**Requires:** Login

**Features:**
- View complete profile
- Edit profile details
- Role-specific information display
- Save changes functionality

### 🏛️ Admin Dashboard (admin.html)
**Requires:** Government Officer login

**Features:**
- Manage registered farmers
- Add/update crop data
- Update market prices
- Manage government schemes
- View platform analytics

---

## 🎨 UI/UX Features

### Design Elements
- **Modern Gradient Design:** Eye-catching color schemes
- **Responsive Layout:** Works on desktop, tablet, and mobile
- **Dark Mode Support:** Toggle between light and dark themes
- **Smooth Animations:** Fade-ins, slide-ups, hover effects
- **Interactive Charts:** Hover to see detailed data
- **Icon Integration:** Font Awesome icons throughout

### User Experience
- **Intuitive Navigation:** Clear menu structure
- **Toast Notifications:** Success/error messages
- **Loading States:** Visual feedback during operations
- **Form Validation:** Real-time input validation
- **Accessibility:** ARIA labels and semantic HTML

---

## 🔄 Data Flow

### User Registration Flow
```
1. User visits signup.html
2. Selects role (Farmer/Government)
3. Fills basic details
4. Submits form
5. Redirected to profile-setup.html
6. Completes role-specific profile
7. Redirected to dashboard
```

### AI Recommendation Flow
```
1. User selects region, season, category
2. System filters crop database
3. Sorts by demand trend
4. Returns top 3 crops
5. Updates recommendation cards
6. Updates price prediction chart
7. Displays AI insights
```

### Authentication Flow
```
1. User enters credentials
2. System validates against user database
3. Creates session in localStorage
4. Stores user role and details
5. Redirects to appropriate dashboard
6. Loads role-specific content
```

---

## 🚀 Future Enhancements

### Planned Features

1. **Backend Integration**
   - Connect to real database (MongoDB/PostgreSQL)
   - Implement REST API
   - Add JWT authentication

2. **Advanced AI**
   - Machine learning models for predictions
   - Weather API integration
   - Satellite imagery analysis

3. **Real IoT Integration**
   - Connect actual IoT sensors
   - Real-time data streaming
   - Automated alerts and notifications

4. **Mobile App**
   - Native Android/iOS apps
   - Push notifications
   - Offline mode support

5. **Additional Features**
   - Multi-language support
   - Voice commands
   - Chatbot assistance
   - Video tutorials
   - Community forum

6. **Enhanced Security**
   - Two-factor authentication
   - Password encryption
   - Session timeout
   - Activity logging

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Can't see restricted content after login
**Solution:** Clear browser cache and localStorage, then login again

**Issue:** Profile not saving
**Solution:** Check browser console for errors, ensure all required fields are filled

**Issue:** Charts not displaying
**Solution:** Ensure Chart.js library is loaded, check internet connection

**Issue:** Redirected to login repeatedly
**Solution:** Check if profile is complete, complete profile setup if needed

---

## 📊 Data Structure

### User Session Object
```javascript
{
  email: "farmer@demo.com",
  role: "farmer",
  name: "Demo Farmer",
  profileComplete: true
}
```

### User Profile Object
```javascript
{
  fullName: "John Doe",
  phone: "9876543210",
  address: "Village, District, State",
  role: "farmer",
  // Farmer-specific
  landArea: "2-5",
  cropType: "Wheat",
  region: "North India"
}
```

### Crop Recommendation Object
```javascript
{
  name: "Wheat",
  price: 2650,
  trend: 15
}
```

---

## 🤝 Contributing

This project was built for Smart India Hackathon 2025. For contributions or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is developed for Smart India Hackathon 2025.

---

## 👨‍💻 Development Team

**Project:** SIIH-FARM Platform  
**Event:** Smart India Hackathon 2025  
**Category:** Agriculture & Rural Development

---

## 📞 Contact & Support

- **Technical Issues:** Check AUTH_IMPLEMENTATION.md
- **Feature Requests:** Use the contact form
- **Bug Reports:** Document and report via contact page

---

## 🎯 Project Goals

1. ✅ Empower farmers with data-driven decisions
2. ✅ Provide AI-powered crop recommendations
3. ✅ Enable real-time market intelligence
4. ✅ Facilitate government-farmer communication
5. ✅ Promote sustainable farming practices
6. ✅ Increase agricultural productivity
7. ✅ Reduce crop losses through better planning

---

**Built with ❤️ for Indian Farmers**  
