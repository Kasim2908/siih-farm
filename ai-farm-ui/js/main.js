// AI Farm Advisory - Premium Professional JavaScript

// Global State Management
const AppState = {
  currentTheme: localStorage.getItem('theme') || 'light',
  currentRegion: 'region_1',
  iotData: {},
  charts: {},
  isSimulating: false,
  animations: {
    counters: new Set(),
    observers: new Map()
  }
};

// Advanced Utility Functions
const Utils = {
  // Enhanced debounce with immediate option
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Advanced throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Enhanced toast with multiple types and positions
  showToast(message, type = 'success', duration = 4000, position = 'top-right') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} toast-${position}`;
    
    const icon = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    }[type];
    
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <i class="${icon}" style="font-size: 1.25rem;"></i>
        <span style="font-weight: 500;">${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
    
    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    });
  },

  // Advanced counter animation with easing
  animateCounter(element, start, end, duration = 2000, easing = 'easeOutQuart') {
    if (AppState.animations.counters.has(element)) return;
    AppState.animations.counters.add(element);
    
    const easingFunctions = {
      easeOutQuart: t => 1 - (--t) * t * t * t,
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        else return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    };
    
    const easeFn = easingFunctions[easing] || easingFunctions.easeOutQuart;
    const range = end - start;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeFn(progress);
      const current = start + (range * easedProgress);
      
      element.textContent = Math.floor(current).toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        AppState.animations.counters.delete(element);
      }
    };
    
    requestAnimationFrame(animate);
  },

  // Generate realistic random data with constraints
  generateRandomData(base, variance = 0.05, min = 0, max = Infinity) {
    const variation = (Math.random() - 0.5) * 2 * variance * base;
    return Math.max(min, Math.min(max, base + variation));
  },

  // Format currency with locale support
  formatCurrency(amount, currency = 'INR', locale = 'en-IN') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Advanced element visibility checker
  isElementVisible(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold &&
      rect.left <= windowWidth * (1 - threshold) &&
      rect.right >= windowWidth * threshold
    );
  }
};

// Enhanced Theme Management
const ThemeManager = {
  init() {
    this.applyTheme(AppState.currentTheme);
    this.setupToggle();
    this.setupSystemThemeDetection();
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    AppState.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Animate theme transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  },

  setupToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        Utils.showToast(`Switched to ${newTheme} mode`, 'info', 2000);
      });
    }
  },

  setupSystemThemeDetection() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
};

// Advanced Navigation Manager
const NavigationManager = {
  init() {
    this.setupMobileMenu();
    this.setupScrollHeader();
    this.setupActiveLinks();
    this.setupBackToTop();
    this.setupSmoothScrolling();
  },

  setupMobileMenu() {
    const toggle = document.querySelector('.header__toggle');
    const nav = document.querySelector('.header__nav');
    
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isActive = nav.classList.contains('active');
        nav.classList.toggle('active');
        
        // Animate hamburger icon
        const icon = toggle.querySelector('i');
        icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
      });

      // Close menu on link click
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          document.body.style.overflow = '';
          const icon = toggle.querySelector('i');
          icon.style.transform = 'rotate(0deg)';
          icon.className = 'fas fa-bars';
        });
      });

      // Close menu on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  },

  setupScrollHeader() {
    const header = document.querySelector('.header');
    if (header) {
      let lastScrollY = window.pageYOffset;
      
      const handleScroll = Utils.throttle(() => {
        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
      }, 100);
      
      window.addEventListener('scroll', handleScroll);
    }
  },

  setupActiveLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header__nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  },

  setupBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    const handleScroll = Utils.throttle(() => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    backToTop.addEventListener('click', () => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    });
  },

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// Enhanced Modal Manager
const ModalManager = {
  activeModal: null,
  
  init() {
    this.setupModals();
    this.setupKeyboardHandlers();
  },

  setupModals() {
    // Open modal triggers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modal + 'Modal';
        this.openModal(modalId);
      });
    });

    // Close modal triggers
    document.querySelectorAll('.modal__close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.closeModal(e.target.closest('.modal').id);
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });
  },

  setupKeyboardHandlers() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal(this.activeModal);
      }
      
      // Tab trapping
      if (e.key === 'Tab' && this.activeModal) {
        this.trapFocus(e);
      }
    });
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      this.activeModal = modalId;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const firstFocusable = modal.querySelector('input, select, textarea, button');
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
      
      // Add entrance animation
      const content = modal.querySelector('.modal__content');
      if (content) {
        content.style.animation = 'slideUp 0.3s ease';
      }
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      const content = modal.querySelector('.modal__content');
      if (content) {
        content.style.animation = 'slideUp 0.3s ease reverse';
      }
      
      setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.activeModal = null;
      }, 300);
    }
  },

  trapFocus(e) {
    const modal = document.getElementById(this.activeModal);
    if (!modal) return;
    
    const focusableElements = modal.querySelectorAll(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
};

// Enhanced Form Manager
const FormManager = {
  init() {
    this.setupContactForm();
    this.setupJoinForm();
    this.setupRealTimeValidation();
  },

  setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      const errors = this.validateContactForm(data);
      this.displayFormErrors(form, errors);
      
      if (Object.keys(errors).length === 0) {
        this.simulateFormSubmission(form, 'Message sent successfully! We\'ll get back to you soon.');
      }
    });
  },

  setupJoinForm() {
    const form = document.getElementById('joinForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      const errors = this.validateJoinForm(data);
      this.displayFormErrors(form, errors);
      
      if (Object.keys(errors).length === 0) {
        this.simulateFormSubmission(form, 'Welcome aboard! Your account has been created successfully.');
        ModalManager.closeModal('joinModal');
      }
    });
  },

  setupRealTimeValidation() {
    document.querySelectorAll('input[type="email"]').forEach(input => {
      input.addEventListener('blur', () => {
        this.validateEmailField(input);
      });
    });

    document.querySelectorAll('input[type="tel"]').forEach(input => {
      input.addEventListener('input', (e) => {
        // Format phone number as user types
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
          value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        e.target.value = value;
      });
    });
  },

  validateContactForm(data) {
    const errors = {};
    
    if (!data.name?.trim()) errors.name = 'Name is required';
    else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    
    if (!data.email?.trim()) errors.email = 'Email is required';
    else if (!this.isValidEmail(data.email)) errors.email = 'Please enter a valid email address';
    
    if (!data.phone?.trim()) errors.phone = 'Phone number is required';
    else if (!this.isValidPhone(data.phone)) errors.phone = 'Please enter a valid phone number';
    
    if (!data.message?.trim()) errors.message = 'Message is required';
    else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    
    return errors;
  },

  validateJoinForm(data) {
    const errors = {};
    
    if (!data.name?.trim()) errors.name = 'Full name is required';
    else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    
    if (!data.email?.trim()) errors.email = 'Email address is required';
    else if (!this.isValidEmail(data.email)) errors.email = 'Please enter a valid email address';
    
    if (!data.role) errors.role = 'Please select your role';
    
    return errors;
  },

  validateEmailField(input) {
    const email = input.value.trim();
    const errorElement = input.parentNode.querySelector('.form-error');
    
    if (errorElement) errorElement.remove();
    
    if (email && !this.isValidEmail(email)) {
      const error = document.createElement('div');
      error.className = 'form-error';
      error.textContent = 'Please enter a valid email address';
      input.parentNode.appendChild(error);
      input.style.borderColor = 'var(--error)';
    } else {
      input.style.borderColor = '';
    }
  },

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  },

  displayFormErrors(form, errors) {
    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.style.borderColor = '';
    });
    
    // Display new errors with animation
    Object.entries(errors).forEach(([field, message]) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        error.style.animation = 'slideUp 0.3s ease';
        input.parentNode.appendChild(error);
        input.style.borderColor = 'var(--error)';
      }
    });
  },

  simulateFormSubmission(form, successMessage) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      Utils.showToast(successMessage, 'success');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Clear any error styles
      form.querySelectorAll('input, select, textarea').forEach(input => {
        input.style.borderColor = '';
      });
      form.querySelectorAll('.form-error').forEach(el => el.remove());
    }, 2000);
  }
};

// Advanced Animation Manager
const AnimationManager = {
  init() {
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
    this.setupHoverEffects();
  },

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationClass = element.dataset.animation || 'fade-in';
          const delay = element.dataset.delay || 0;
          
          setTimeout(() => {
            element.classList.add(animationClass);
          }, delay);
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .hero__text, .hero__image, .section__title').forEach((el, index) => {
      el.dataset.animation = 'slide-up';
      el.dataset.delay = index * 100;
      observer.observe(el);
    });
  },

  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-target]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target) || 0;
          const duration = parseInt(entry.target.dataset.duration) || 2000;
          const easing = entry.target.dataset.easing || 'easeOutQuart';
          
          Utils.animateCounter(entry.target, 0, target, duration, easing);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => observer.observe(counter));
  },

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
      const handleScroll = Utils.throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const rate = scrolled * (element.dataset.parallax || 0.5);
          element.style.transform = `translateY(${rate}px)`;
        });
      }, 16);
      
      window.addEventListener('scroll', handleScroll);
    }
  },

  setupHoverEffects() {
    // Enhanced card hover effects
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
};

// Enhanced Chart Manager
const ChartManager = {
  init() {
    if (typeof Chart === 'undefined') return;
    
    // Global chart configuration
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#64748b';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.9)';
    Chart.defaults.plugins.tooltip.cornerRadius = 12;
    Chart.defaults.plugins.tooltip.titleColor = '#f8fafc';
    Chart.defaults.plugins.tooltip.bodyColor = '#e2e8f0';
    Chart.defaults.elements.point.radius = 6;
    Chart.defaults.elements.point.hoverRadius = 8;
    Chart.defaults.elements.line.borderWidth = 3;
  },

  createLineChart(ctx, data, options = {}) {
    return new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: { 
            beginAtZero: true,
            grid: { color: 'rgba(148, 163, 184, 0.1)' }
          },
          x: { 
            grid: { display: false }
          }
        },
        elements: {
          line: { tension: 0.4 }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        ...options
      }
    });
  },

  createBarChart(ctx, data, options = {}) {
    return new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { 
            beginAtZero: true,
            grid: { color: 'rgba(148, 163, 184, 0.1)' }
          },
          x: { 
            grid: { display: false }
          }
        },
        ...options
      }
    });
  },

  createDoughnutChart(ctx, data, options = {}) {
    return new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        cutout: '65%',
        ...options
      }
    });
  }
};

// Enhanced IoT Manager
const IoTManager = {
  init() {
    this.loadIoTData();
    this.startSimulation();
    this.setupRealTimeUpdates();
  },

  async loadIoTData() {
    try {
      const response = await fetch(`./mock/iot_${AppState.currentRegion}.json`);
      AppState.iotData = await response.json();
      this.updateIoTCards(AppState.iotData.current);
    } catch (error) {
      console.error('Failed to load IoT data:', error);
      Utils.showToast('Failed to load sensor data', 'error');
    }
  },

  updateIoTCards(data) {
    Object.entries(data).forEach(([key, value]) => {
      const card = document.querySelector(`[data-iot="${key}"]`);
      if (card) {
        const valueEl = card.querySelector('.iot-value');
        if (valueEl) {
          const newValue = Utils.generateRandomData(
            value.value, 
            0.03, 
            value.value * 0.8, 
            value.value * 1.2
          );
          
          // Animate value change
          const currentValue = parseFloat(valueEl.textContent) || 0;
          this.animateValueChange(valueEl, currentValue, newValue, value.unit || '');
        }
      }
    });
  },

  animateValueChange(element, from, to, unit) {
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = from + (to - from) * progress;
      
      element.textContent = current.toFixed(1) + unit;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  setupRealTimeUpdates() {
    // Add visual indicators for real-time updates
    const liveIndicators = document.querySelectorAll('.pulse');
    liveIndicators.forEach(indicator => {
      indicator.style.animation = 'pulse 2s infinite';
    });
  },

  startSimulation() {
    if (AppState.isSimulating) return;
    AppState.isSimulating = true;
    
    setInterval(() => {
      if (AppState.iotData.current) {
        this.updateIoTCards(AppState.iotData.current);
      }
    }, 5000);
  }
};

// Page-specific managers remain the same but with enhanced error handling
const HomePageManager = {
  init() {
    this.setupMetrics();
    this.setupHeroAnimations();
  },

  setupMetrics() {
    const metrics = [
      { selector: '[data-target="500"]', target: 500, duration: 2500 },
      { selector: '[data-target="92"]', target: 92, duration: 2000 },
      { selector: '[data-target="1200"]', target: 1200, duration: 3000 },
      { selector: '[data-target="25"]', target: 25, duration: 1500 }
    ];

    metrics.forEach(metric => {
      const element = document.querySelector(metric.selector);
      if (element) {
        element.dataset.target = metric.target;
        element.dataset.duration = metric.duration;
        element.dataset.easing = 'easeOutBounce';
      }
    });
  },

  setupHeroAnimations() {
    const heroText = document.querySelector('.hero__text');
    const heroImage = document.querySelector('.hero__image');
    
    if (heroText) heroText.classList.add('slide-in-left');
    if (heroImage) heroImage.classList.add('slide-in-right');
  }
};

// Enhanced Analysis Page Manager
const AnalysisPageManager = {
  init() {
    this.setupRegionSelector();
    this.setupMap();
    this.setupCharts();
    IoTManager.init();
  },

  async setupRegionSelector() {
    try {
      const response = await fetch('./mock/regions.json');
      const regions = await response.json();
      
      const selector = document.getElementById('regionSelect');
      if (selector) {
        regions.forEach(region => {
          const option = document.createElement('option');
          option.value = region.id;
          option.textContent = region.name;
          selector.appendChild(option);
        });
        
        selector.addEventListener('change', (e) => {
          AppState.currentRegion = e.target.value;
          IoTManager.loadIoTData();
          Utils.showToast(`Switched to ${e.target.options[e.target.selectedIndex].text}`, 'info');
        });
      }
    } catch (error) {
      console.error('Failed to load regions:', error);
      Utils.showToast('Failed to load regions', 'error');
    }
  },

  setupMap() {
    if (typeof L === 'undefined') return;
    
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    try {
      const map = L.map('map').setView([20.5937, 78.9629], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      // Enhanced marker with custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<i class="fas fa-map-marker-alt" style="color: #059669; font-size: 2rem;"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });
      
      const marker = L.marker([20.5937, 78.9629], { icon: customIcon }).addTo(map);
      marker.bindPopup('<strong>Selected Region</strong><br>Real-time monitoring active');
    } catch (error) {
      console.error('Failed to initialize map:', error);
    }
  },

  setupCharts() {
    // Enhanced charts with better styling and animations
    const moistureTempCtx = document.getElementById('moistureTempChart');
    if (moistureTempCtx) {
      const gradient1 = moistureTempCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradient1.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
      gradient1.addColorStop(1, 'rgba(14, 165, 233, 0.05)');
      
      const gradient2 = moistureTempCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradient2.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
      gradient2.addColorStop(1, 'rgba(245, 158, 11, 0.05)');
      
      const data = {
        labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        datasets: [{
          label: 'Soil Moisture (%)',
          data: [68, 66, 65, 64, 62, 62, 63],
          borderColor: '#0ea5e9',
          backgroundColor: gradient1,
          fill: true,
          tension: 0.4
        }, {
          label: 'Temperature (°C)',
          data: [22, 23, 25, 26, 28, 27, 25],
          borderColor: '#f59e0b',
          backgroundColor: gradient2,
          fill: true,
          tension: 0.4
        }]
      };
      
      AppState.charts.moistureTemp = ChartManager.createLineChart(moistureTempCtx, data);
    }

    const npkCtx = document.getElementById('npkChart');
    if (npkCtx) {
      const data = {
        labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
        datasets: [{
          data: [45, 23, 178],
          backgroundColor: [
            'linear-gradient(135deg, #ef4444, #dc2626)',
            'linear-gradient(135deg, #3b82f6, #2563eb)',
            'linear-gradient(135deg, #10b981, #059669)'
          ],
          borderWidth: 0,
          borderRadius: 8
        }]
      };
      
      AppState.charts.npk = ChartManager.createBarChart(npkCtx, data);
    }
  }
};

// Enhanced Marketplace Manager
const MarketplacePageManager = {
  init() {
    this.setupFilters();
    this.loadMarketData();
    this.setupCSVExport();
  },

  setupFilters() {
    const filters = document.querySelectorAll('.marketplace-filters select, .marketplace-filters input');
    filters.forEach(filter => {
      filter.addEventListener('change', Utils.debounce(() => {
        this.loadMarketData();
        Utils.showToast('Filters updated', 'info', 2000);
      }, 500));
    });
  },

  async loadMarketData() {
    try {
      const response = await fetch('./mock/market_wheat.json');
      const data = await response.json();
      this.updatePriceTable(data.vendors);
      this.updateCharts(data);
    } catch (error) {
      console.error('Failed to load market data:', error);
      Utils.showToast('Failed to load market data', 'error');
    }
  },

  updatePriceTable(vendors) {
    const tbody = document.querySelector('.price-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = vendors.map((vendor, index) => `
      <tr style="animation: slideUp 0.3s ease ${index * 0.1}s both;">
        <td>
          <div style="font-weight: 600;">${vendor.name}</div>
          <div style="font-size: 0.875rem; color: var(--gray-500);">
            <i class="fas fa-star" style="color: #f59e0b;"></i> ${vendor.rating}/5
          </div>
        </td>
        <td style="font-weight: 700; color: var(--primary-solid);">₹${vendor.price.toLocaleString()}</td>
        <td>${vendor.quantity.toLocaleString()} kg</td>
        <td>${vendor.location}</td>
        <td>
          <span style="padding: 0.25rem 0.75rem; background: var(--success); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">
            ${vendor.quality}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="Utils.showToast('Contact feature coming soon!', 'info')">
            <i class="fas fa-phone"></i>
            Contact
          </button>
        </td>
      </tr>
    `).join('');
  },

  updateCharts(data) {
    const priceCtx = document.getElementById('priceChart');
    if (priceCtx) {
      const gradient = priceCtx.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(5, 150, 105, 0.3)');
      gradient.addColorStop(1, 'rgba(5, 150, 105, 0.05)');
      
      const chartData = {
        labels: data.priceHistory.map(d => d.date),
        datasets: [{
          label: 'Wheat Price (₹/quintal)',
          data: data.priceHistory.map(d => d.price),
          borderColor: '#059669',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4
        }]
      };
      
      AppState.charts.price = ChartManager.createLineChart(priceCtx, chartData);
    }

    const marketShareCtx = document.getElementById('marketShareChart');
    if (marketShareCtx && data.marketShare) {
      const chartData = {
        labels: Object.keys(data.marketShare),
        datasets: [{
          data: Object.values(data.marketShare),
          backgroundColor: [
            '#059669', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6'
          ],
          borderWidth: 0
        }]
      };
      
      AppState.charts.marketShare = ChartManager.createDoughnutChart(marketShareCtx, chartData);
    }
  },

  setupCSVExport() {
    const exportBtn = document.getElementById('exportCSV');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', () => {
      const table = document.querySelector('.price-table');
      if (!table) return;
      
      const csv = this.tableToCSV(table);
      this.downloadCSV(csv, `market-data-${new Date().toISOString().split('T')[0]}.csv`);
      Utils.showToast('Market data exported successfully!', 'success');
    });
  },

  tableToCSV(table) {
    const rows = Array.from(table.querySelectorAll('tr'));
    return rows.map(row => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      return cells.map(cell => `"${cell.textContent.trim().replace(/"/g, '""')}"`).join(',');
    }).join('\n');
  },

  downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Main Application Initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize core systems
  ThemeManager.init();
  NavigationManager.init();
  ModalManager.init();
  FormManager.init();
  AnimationManager.init();
  ChartManager.init();
  
  // Page-specific initialization
  const page = document.body.dataset.page;
  try {
    switch(page) {
      case 'home':
        HomePageManager.init();
        break;
      case 'analysis':
        AnalysisPageManager.init();
        break;
      case 'marketplace':
        MarketplacePageManager.init();
        break;
    }
  } catch (error) {
    console.error(`Failed to initialize ${page} page:`, error);
  }
  
  // Global event listeners
  window.addEventListener('resize', Utils.debounce(() => {
    Object.values(AppState.charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  }, 250));
  
  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Show welcome message
  setTimeout(() => {
    Utils.showToast('Welcome to AI Farm Advisory! 🌱', 'success', 3000);
  }, 1000);
});

// Export for global access
window.AppState = AppState;
window.Utils = Utils;