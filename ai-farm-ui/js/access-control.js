// Role-Based Access Control System
const AccessControl = {
  // Define what each role can access
  permissions: {
    visitor: {
      canView: ['home', 'about', 'public-info'],
      canModify: []
    },
    farmer: {
      canView: ['home', 'analysis', 'marketplace', 'services', 'iot-data', 'market-prices', 'weather'],
      canModify: []
    },
    government: {
      canView: ['home', 'analysis', 'marketplace', 'services', 'iot-data', 'market-prices', 'weather', 'admin'],
      canModify: ['crops', 'market-data', 'weather', 'iot-data', 'schemes', 'farmers']
    },
    researcher: {
      canView: ['home', 'analysis', 'marketplace', 'services', 'iot-data', 'market-prices', 'weather'],
      canModify: []
    }
  },

  getCurrentRole() {
    const session = AuthSystem.getSession();
    return session ? session.role : 'visitor';
  },

  canView(resource) {
    const role = this.getCurrentRole();
    return this.permissions[role].canView.includes(resource);
  },

  canModify(resource) {
    const role = this.getCurrentRole();
    return this.permissions[role].canModify.includes(resource);
  },

  restrictContent() {
    const role = this.getCurrentRole();
    
    // Hide restricted content for visitors
    if (role === 'visitor') {
      document.querySelectorAll('[data-auth="required"]').forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll('[data-role="farmer"], [data-role="government"]').forEach(el => {
        el.style.display = 'none';
      });
    }
    
    // Show farmer-specific content
    if (role === 'farmer') {
      document.querySelectorAll('[data-role="farmer"]').forEach(el => {
        el.style.display = '';
      });
      document.querySelectorAll('[data-role="government"]').forEach(el => {
        el.style.display = 'none';
      });
    }
    
    // Show government-specific content
    if (role === 'government') {
      document.querySelectorAll('[data-role="government"]').forEach(el => {
        el.style.display = '';
      });
    }
  },

  updateNavigation() {
    const session = AuthSystem.getSession();
    const navActions = document.querySelector('.header__actions');
    
    if (!navActions) return;
    
    if (session) {
      navActions.innerHTML = `
        <button class="theme-toggle" aria-label="Toggle dark mode">
          <i class="fas fa-moon"></i>
        </button>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <a href="profile.html" style="color: var(--gray-700); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-user-circle"></i> ${session.name}
          </a>
          <button onclick="AuthSystem.logout()" class="btn btn-outline btn-sm">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      `;
    } else {
      navActions.innerHTML = `
        <button class="theme-toggle" aria-label="Toggle dark mode">
          <i class="fas fa-moon"></i>
        </button>
        <a href="login.html" class="btn btn-outline btn-sm">
          <i class="fas fa-sign-in-alt"></i> Login
        </a>
        <a href="signup.html" class="btn btn-primary btn-sm">
          <i class="fas fa-user-plus"></i> Sign Up
        </a>
      `;
    }
  },

  checkPageAccess() {
    const page = document.body.dataset.page;
    const restrictedPages = ['analysis', 'marketplace'];
    
    if (restrictedPages.includes(page) && !AuthSystem.isAuthenticated()) {
      alert('Please login to access this page');
      window.location.href = 'login.html';
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  AccessControl.updateNavigation();
  AccessControl.restrictContent();
  AccessControl.checkPageAccess();
});

window.AccessControl = AccessControl;
