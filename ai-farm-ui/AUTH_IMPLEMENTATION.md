# SIIH-FARM Authentication & Authorization Implementation

## Overview
This document describes the role-based access control (RBAC) system implemented for SIIH-FARM platform.

## User Roles

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

**Cannot Modify:**
- Any government data
- Market prices
- IoT configurations

### 3. Government Officials
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

## File Structure

```
ai-farm-ui/
├── js/
│   ├── auth.js              # Authentication system
│   ├── access-control.js    # Role-based access control
│   └── main.js              # Main application logic
├── login.html               # Login page
├── signup.html              # Farmer registration page
├── admin.html               # Government admin dashboard
├── index.html               # Home page (public + authenticated)
├── analysis.html            # Analysis page (farmers + government)
└── marketplace.html         # Marketplace (farmers + government)
```

## Implementation Details

### Authentication System (auth.js)

**Features:**
- Login functionality
- Signup for farmers
- Session management using localStorage
- Role-based user identification

**Demo Credentials:**
- Farmer: `farmer@demo.com` / `password`
- Government: `gov@demo.com` / `password`

**Key Functions:**
```javascript
AuthSystem.login(email, password)      // Login user
AuthSystem.signup(name, email, phone, password)  // Register farmer
AuthSystem.logout()                    // Logout and clear session
AuthSystem.getSession()                // Get current user session
AuthSystem.isAuthenticated()           // Check if user is logged in
AuthSystem.hasRole(role)               // Check user role
```

### Access Control System (access-control.js)

**Features:**
- Permission-based content visibility
- Dynamic navigation updates
- Page access restrictions
- Role-specific content display

**Key Functions:**
```javascript
AccessControl.canView(resource)        // Check view permission
AccessControl.canModify(resource)      // Check modify permission
AccessControl.restrictContent()        // Hide restricted content
AccessControl.updateNavigation()       // Update nav based on auth state
AccessControl.checkPageAccess()        // Restrict page access
```

### Content Restriction Attributes

Use these HTML attributes to control content visibility:

```html
<!-- Require authentication -->
<div data-auth="required">
  Content only for logged-in users
</div>

<!-- Role-specific content -->
<div data-role="farmer">
  Content only for farmers
</div>

<div data-role="government">
  Content only for government officials
</div>
```

## Usage Guide

### For Visitors
1. Browse public pages (index.html)
2. View general information
3. Sign up as farmer or login

### For Farmers
1. Sign up at `/signup.html`
2. Login at `/login.html`
3. Access:
   - Market prices and trends
   - IoT sensor data
   - Weather forecasts
   - Crop recommendations
4. View-only access to government data

### For Government Officials
1. Login at `/login.html` with government credentials
2. Access admin dashboard at `/admin.html`
3. Manage:
   - Farmer accounts
   - Crop data
   - Market prices
   - Weather information
   - Government schemes

## Security Features

1. **Session Management:** User sessions stored in localStorage
2. **Role Verification:** Server-side role checks (to be implemented)
3. **Page Protection:** Automatic redirect for unauthorized access
4. **Content Hiding:** Dynamic content visibility based on role

## Integration Steps

### Step 1: Add Scripts to HTML Pages
```html
<script src="./js/auth.js"></script>
<script src="./js/access-control.js"></script>
<script src="./js/main.js"></script>
```

### Step 2: Mark Restricted Content
```html
<!-- For authenticated users only -->
<div data-auth="required">
  <h3>Market Prices</h3>
  <!-- content -->
</div>

<!-- For farmers only -->
<div data-role="farmer">
  <h3>Your Farm Data</h3>
  <!-- content -->
</div>

<!-- For government only -->
<div data-role="government">
  <h3>Admin Controls</h3>
  <!-- content -->
</div>
```

### Step 3: Set Page Type
```html
<body data-page="marketplace">
```

## Future Enhancements

1. **Backend Integration:**
   - Connect to actual authentication API
   - Implement JWT tokens
   - Add password hashing

2. **Enhanced Security:**
   - Two-factor authentication
   - Password reset functionality
   - Session timeout

3. **Additional Features:**
   - Email verification
   - Profile management
   - Activity logging
   - Farmer approval workflow

## Testing

### Test Scenarios

1. **Visitor Access:**
   - Visit index.html without login
   - Verify restricted content is hidden
   - Try accessing analysis.html → should redirect to login

2. **Farmer Access:**
   - Login as farmer
   - Verify access to market data and IoT sensors
   - Verify no access to admin features

3. **Government Access:**
   - Login as government official
   - Verify access to admin dashboard
   - Verify ability to manage data

## Troubleshooting

**Issue:** Content not hiding for visitors
**Solution:** Ensure `access-control.js` is loaded and `data-auth` attributes are set

**Issue:** Login not working
**Solution:** Check browser console for errors, verify auth.js is loaded

**Issue:** Redirect loop
**Solution:** Check page access restrictions in access-control.js

## Support

For issues or questions, refer to the main README.md or contact the development team.
