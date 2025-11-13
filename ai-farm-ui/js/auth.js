// Authentication and Authorization System
const AuthSystem = {
  users: [
    { email: 'farmer@demo.com', password: 'password', role: 'farmer', name: 'Demo Farmer' },
    { email: 'gov@demo.com', password: 'password', role: 'government', name: 'Government Official' }
  ],

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      const session = { email: user.email, role: user.role, name: user.name };
      localStorage.setItem('userSession', JSON.stringify(session));
      return { success: true, user: session };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  signup(name, email, phone, password, role) {
    if (this.users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    const newUser = { email, password, role: role || 'farmer', name };
    this.users.push(newUser);
    const session = { email, role: role || 'farmer', name };
    localStorage.setItem('userSession', JSON.stringify(session));
    return { success: true, user: session };
  },

  logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
  },

  getSession() {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  },

  isAuthenticated() {
    return this.getSession() !== null;
  },

  hasRole(role) {
    const session = this.getSession();
    return session && session.role === role;
  }
};

// Login Form Handler
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const result = AuthSystem.login(email, password);
    if (result.success) {
      alert('Login successful!');
      window.location.href = 'index.html';
    } else {
      alert(result.message);
    }
  });
}

// Signup Form Handler
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    const result = AuthSystem.signup(name, email, phone, password, role);
    if (result.success) {
      alert('Account created successfully!');
      window.location.href = 'index.html';
    } else {
      alert(result.message);
    }
  });
}

window.AuthSystem = AuthSystem;
