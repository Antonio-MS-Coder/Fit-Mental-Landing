/* Turismo Mundial AO - Main JavaScript
 * PWA functionality and performance-optimized interactions
 * Government-grade security and accessibility compliance
 */

class TurismoMundialAO {
  constructor() {
    this.version = '1.2.0';
    this.apiBaseUrl = '/api/v1';
    this.currentLanguage = 'es';
    this.isOnline = navigator.onLine;
    this.swRegistration = null;
    
    // Performance monitoring
    this.performanceMetrics = {
      pageLoadStart: performance.now(),
      interactionCount: 0
    };
    
    // Initialize app
    this.init();
  }

  // Application initialization
  async init() {
    try {
      console.log(`[AO] Initializing Turismo Mundial AO v${this.version}`);
      
      // Core initialization
      await Promise.all([
        this.initServiceWorker(),
        this.initEventListeners(),
        this.initAccessibility(),
        this.initPerformanceMonitoring(),
        this.loadModulesContent()
      ]);
      
      // Set up offline/online detection
      this.initConnectivityHandling();
      
      // Initialize language system
      this.initLanguageSystem();
      
      // Load user preferences
      this.loadUserPreferences();
      
      console.log('[AO] Application initialized successfully');
      
    } catch (error) {
      console.error('[AO] Initialization error:', error);
      this.handleInitializationError(error);
    }
  }

  // Service Worker initialization
  async initServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('[AO] Service Worker registered successfully');
        
        // Handle service worker updates
        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          this.handleServiceWorkerMessage(event.data);
        });
        
      } catch (error) {
        console.error('[AO] Service Worker registration failed:', error);
      }
    }
  }

  // Event listeners setup
  initEventListeners() {
    // Navigation
    this.initNavigationListeners();
    
    // Language selector
    this.initLanguageListeners();
    
    // Module interactions
    this.initModuleListeners();
    
    // Form handling
    this.initFormListeners();
    
    // Keyboard navigation
    this.initKeyboardListeners();
    
    // Touch and gesture handling for mobile
    this.initTouchListeners();
    
    console.log('[AO] Event listeners initialized');
  }

  // Navigation event listeners
  initNavigationListeners() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
          this.closeMobileMenu();
        }
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          this.closeMobileMenu();
          mobileToggle.focus();
        }
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.smoothScrollTo(target);
        }
      });
    });
  }

  // Language system initialization
  initLanguageListeners() {
    const langSelector = document.querySelector('.lang-selector');
    
    if (langSelector) {
      langSelector.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLanguageMenu();
      });
    }
    
    // Language selection in footer
    document.querySelectorAll('.language-selector button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = this.getLangCodeFromButton(e.target);
        this.changeLanguage(lang);
      });
    });
  }

  // Module interaction listeners
  initModuleListeners() {
    // Lazy load module content when scrolling into view
    if ('IntersectionObserver' in window) {
      const moduleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadModuleContent(entry.target);
            moduleObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      document.querySelectorAll('.module-card').forEach(module => {
        moduleObserver.observe(module);
      });
    }
    
    // Module CTA button analytics
    document.querySelectorAll('.module-cta').forEach(cta => {
      cta.addEventListener('click', (e) => {
        const moduleName = this.getModuleName(e.target);
        this.trackModuleInteraction(moduleName, 'cta_click');
      });
    });
  }

  // Form handling
  initFormListeners() {
    // Search forms
    document.querySelectorAll('form[role="search"]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSearch(form);
      });
    });
    
    // Contact forms
    document.querySelectorAll('.contact-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactForm(form);
      });
    });
    
    // Job application forms
    document.querySelectorAll('.job-application-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleJobApplication(form);
      });
    });
  }

  // Keyboard navigation
  initKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      // Skip to main content (Alt + M)
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('#main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Quick module navigation (Alt + 1-6)
      if (e.altKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        this.navigateToModule(parseInt(e.key));
      }
      
      // Global search (Ctrl/Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openGlobalSearch();
      }
    });
  }

  // Touch and gesture handling
  initTouchListeners() {
    // Swipe gesture for mobile navigation
    let touchStartX = null;
    let touchStartY = null;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      if (!touchStartX || !touchStartY) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      // Horizontal swipe detection
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left - next section
          this.navigateNext();
        } else {
          // Swipe right - previous section
          this.navigatePrevious();
        }
      }
      
      touchStartX = null;
      touchStartY = null;
    }, { passive: true });
  }

  // Load modules content dynamically
  async loadModulesContent() {
    const loadingPlaceholder = document.querySelector('.loading-placeholder');
    
    try {
      // Create modules HTML content
      const modulesHTML = await this.generateModulesHTML();
      
      // Replace loading placeholder
      if (loadingPlaceholder) {
        const modulesSection = document.createElement('section');
        modulesSection.className = 'modules-overview';
        modulesSection.setAttribute('role', 'main');
        modulesSection.innerHTML = modulesHTML;
        
        loadingPlaceholder.parentNode.replaceChild(modulesSection, loadingPlaceholder);
        
        // Initialize module-specific functionality
        this.initModuleInteractions();
      }
      
    } catch (error) {
      console.error('[AO] Error loading modules content:', error);
      this.showModulesError();
    }
  }

  // Generate modules HTML
  async generateModulesHTML() {
    const modules = [
      {
        id: 'trabaja',
        name: 'Trabaja',
        subtitle: 'Empleos Verificados en Turismo',
        description: 'Accede a empleos verificados con certificaciones reconocidas. Perfil profesional validado y matches inteligentes.',
        stat: '2,500+',
        statLabel: 'empleos activos',
        features: ['Verificación de perfil', 'Matches por habilidades', 'Empleadores confiables'],
        cta: 'Explorar Empleos',
        icon: 'briefcase'
      },
      {
        id: 'aprende',
        name: 'Aprende',
        subtitle: 'Certificaciones Oficiales',
        description: 'Certifícate con estándares internacionales respaldados por AO. Cursos gratuitos y expediente digital verificable.',
        stat: '15,000+',
        statLabel: 'certificaciones emitidas',
        features: ['Cursos gratuitos AO', 'Alianzas educativas', 'Expediente digital'],
        cta: 'Ver Certificaciones',
        icon: 'certificate'
      },
      {
        id: 'descubre',
        name: 'Descubre',
        subtitle: 'Experiencias Auténticas',
        description: 'Experiencias turísticas auténticas creadas por locales verificados. Paquetes únicos a precios justos.',
        stat: '500+',
        statLabel: 'experiencias únicas',
        features: ['Proveedores verificados', 'Precios transparentes', 'Experiencias locales'],
        cta: 'Explorar Paquetes',
        icon: 'compass'
      },
      {
        id: 'explora-seguro',
        name: 'Explora Seguro',
        subtitle: 'Rutas con Apoyo Real',
        description: 'Rutas seguras con apoyo en tiempo real y puntos de auxilio. Integración con C5 y botón de emergencia.',
        stat: '200+',
        statLabel: 'rutas verificadas',
        features: ['Puntos de apoyo C5', 'Botón de emergencia', 'Actualizaciones en tiempo real'],
        cta: 'Ver Rutas Seguras',
        icon: 'shield'
      },
      {
        id: 'eventos',
        name: 'Eventos',
        subtitle: 'Calendario Cultural Oficial',
        description: 'Calendario oficial de eventos culturales y turísticos. Eventos verificados con integración de rutas seguras.',
        stat: '1,000+',
        statLabel: 'eventos mensuales',
        features: ['Eventos verificados', 'Filtros temáticos', 'Integración con rutas'],
        cta: 'Ver Calendario',
        icon: 'calendar'
      },
      {
        id: 'impacto',
        name: 'Impacto AO',
        subtitle: 'Transparencia Total',
        description: 'Transparencia total del impacto económico y social. Datos públicos actualizados en tiempo real.',
        stat: '24/7',
        statLabel: 'datos actualizados',
        features: ['Métricas públicas', 'BigQuery insights', 'Reportes descargables'],
        cta: 'Ver Dashboard',
        icon: 'chart'
      }
    ];
    
    return `
      <div class="container">
        <div class="section-header">
          <h2>Seis Módulos, Una Plataforma Integral</h2>
          <p>Todo lo que necesitas para impulsar tu carrera en turismo y explorar México de forma segura</p>
        </div>
        
        <div class="modules-grid">
          ${modules.map(module => this.generateModuleHTML(module)).join('')}
        </div>
      </div>
      
      ${this.generateTrustSectionHTML()}
      ${this.generateFinalCTAHTML()}
      ${this.generateFooterHTML()}
    `;
  }

  // Generate individual module HTML
  generateModuleHTML(module) {
    return `
      <article class="module-card ${module.id}" data-module="${module.id}">
        <div class="module-icon" aria-hidden="true">
          ${this.getIconSVG(module.icon)}
        </div>
        <div class="module-content">
          <h3>${module.name}</h3>
          <p class="module-subtitle">${module.subtitle}</p>
          <p class="module-description">${module.description}</p>
          <div class="module-stats">
            <span class="stat-highlight">${module.stat}</span>
            <span class="stat-label">${module.statLabel}</span>
          </div>
          <div class="module-features">
            <ul>
              ${module.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          <a href="/${module.id}" class="module-cta" aria-describedby="${module.id}-description">
            ${module.cta}
          </a>
        </div>
      </article>
    `;
  }

  // Get SVG icons
  getIconSVG(iconName) {
    const icons = {
      briefcase: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      certificate: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      compass: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5v10z"/></svg>',
      shield: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/></svg>',
      calendar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>',
      chart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>'
    };
    return icons[iconName] || icons.briefcase;
  }

  // Generate trust section HTML
  generateTrustSectionHTML() {
    return `
      <section class="trust-section">
        <div class="container">
          <div class="trust-grid">
            <div class="trust-content">
              <h2>Confianza Respaldada por Resultados</h2>
              <p>
                Turismo Mundial AO es la plataforma oficial respaldada por el gobierno mexicano, 
                diseñada para crear oportunidades reales y experiencias seguras para todos.
              </p>
              <div class="trust-features">
                <div class="trust-feature">
                  <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <div>
                    <h4>Verificación Oficial</h4>
                    <p>Todos los empleadores y proveedores pasan por un proceso de verificación riguroso</p>
                  </div>
                </div>
                <div class="trust-feature">
                  <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5v10z"/>
                  </svg>
                  <div>
                    <h4>Transparencia Total</h4>
                    <p>Acceso público a métricas de impacto y resultados en tiempo real</p>
                  </div>
                </div>
                <div class="trust-feature">
                  <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/>
                  </svg>
                  <div>
                    <h4>Seguridad Garantizada</h4>
                    <p>Integración directa con sistemas de seguridad C5 y LOCATEL</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="trust-stats">
              <div class="stat-card">
                <div class="stat-number">50,000+</div>
                <div class="stat-label">Usuarios Verificados</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">98%</div>
                <div class="stat-label">Satisfacción de Usuario</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">500+</div>
                <div class="stat-label">Empresas Asociadas</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">32</div>
                <div class="stat-label">Estados Cubiertos</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Generate final CTA HTML
  generateFinalCTAHTML() {
    return `
      <section class="final-cta">
        <div class="container">
          <div class="cta-content">
            <h2>Comienza Tu Crecimiento Profesional Hoy</h2>
            <p>
              Únete a miles de profesionales que ya han transformado su carrera 
              con Turismo Mundial AO. La plataforma oficial que conecta talento con oportunidades.
            </p>
            <div class="cta-buttons">
              <a href="/registro" class="cta-primary large">
                Registrarse Gratis
              </a>
              <a href="/sobre-ao" class="cta-secondary large">
                Conocer Más sobre AO
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Generate footer HTML
  generateFooterHTML() {
    return `
      <footer class="main-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <img src="/images/ao-logo-white.svg" alt="Turismo Mundial AO" width="160" height="54">
              <p>
                Plataforma oficial del gobierno mexicano para el desarrollo 
                del sector turístico a través de empleos, certificaciones y experiencias seguras.
              </p>
              <div class="social-links">
                <a href="#" aria-label="Facebook">${this.getIconSVG('facebook')}</a>
                <a href="#" aria-label="Twitter">${this.getIconSVG('twitter')}</a>
                <a href="#" aria-label="LinkedIn">${this.getIconSVG('linkedin')}</a>
                <a href="#" aria-label="YouTube">${this.getIconSVG('youtube')}</a>
              </div>
            </div>
            
            <div class="footer-links">
              <div class="link-group">
                <h4>Plataforma</h4>
                <ul>
                  <li><a href="/trabaja">Empleos</a></li>
                  <li><a href="/aprende">Certificaciones</a></li>
                  <li><a href="/descubre">Experiencias</a></li>
                  <li><a href="/explora-seguro">Rutas Seguras</a></li>
                  <li><a href="/eventos">Eventos</a></li>
                  <li><a href="/impacto">Impacto AO</a></li>
                </ul>
              </div>
              
              <div class="link-group">
                <h4>Soporte</h4>
                <ul>
                  <li><a href="/ayuda">Centro de Ayuda</a></li>
                  <li><a href="/contacto">Contacto</a></li>
                  <li><a href="/reportar">Reportar Problema</a></li>
                  <li><a href="/api">API Documentation</a></li>
                </ul>
              </div>
              
              <div class="link-group">
                <h4>Legal</h4>
                <ul>
                  <li><a href="/terminos">Términos de Uso</a></li>
                  <li><a href="/privacidad">Política de Privacidad</a></li>
                  <li><a href="/cookies">Política de Cookies</a></li>
                  <li><a href="/accesibilidad">Accesibilidad</a></li>
                </ul>
              </div>
              
              <div class="link-group">
                <h4>Sobre AO</h4>
                <ul>
                  <li><a href="/sobre-ao">Acerca de</a></li>
                  <li><a href="/mision">Misión y Visión</a></li>
                  <li><a href="/prensa">Sala de Prensa</a></li>
                  <li><a href="/transparencia">Transparencia</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <div class="government-info">
              <img src="/images/gobierno-mexico-white.svg" alt="Gobierno de México" width="120" height="40">
              <p>
                © 2024 Gobierno de México - Turismo Mundial AO. 
                Todos los derechos reservados. 
                Sitio oficial del gobierno mexicano.
              </p>
            </div>
            <div class="footer-meta">
              <div class="language-selector">
                <button class="lang-active">Español</button>
                <button>English</button>
                <button>Português</button>
              </div>
              <div class="certification-badges">
                <img src="/images/ssl-cert.svg" alt="SSL Certificado" width="60" height="30">
                <img src="/images/wcag-aa.svg" alt="WCAG 2.2 AA" width="60" height="30">
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Mobile menu controls
  toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
      const isActive = navMenu.classList.contains('active');
      navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', !isActive);
      
      // Trap focus in mobile menu when open
      if (!isActive) {
        this.trapFocusInMenu(navMenu);
      }
    }
  }

  closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Accessibility helpers
  initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        const mainContent = document.querySelector('#main-content');
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1');
          mainContent.focus();
        }
      });
    }
    
    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }
    
    // Reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduce-motion');
    }
    
    console.log('[AO] Accessibility features initialized');
  }

  // Performance monitoring
  initPerformanceMonitoring() {
    // Core Web Vitals measurement
    if ('performance' in window) {
      // Measure First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('[AO] FCP:', entry.startTime);
            this.performanceMetrics.fcp = entry.startTime;
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      
      // Measure Cumulative Layout Shift
      let cls = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
        console.log('[AO] CLS:', cls);
        this.performanceMetrics.cls = cls;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
    
    // Track user interactions
    ['click', 'touchstart', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.performanceMetrics.interactionCount++;
      }, { passive: true });
    });
  }

  // Connectivity handling
  initConnectivityHandling() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.handleOnlineStatusChange(true);
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.handleOnlineStatusChange(false);
    });
  }

  // Language system
  initLanguageSystem() {
    // Detect browser language
    const browserLang = navigator.language.substring(0, 2);
    const supportedLangs = ['es', 'en', 'pt'];
    
    if (supportedLangs.includes(browserLang) && !localStorage.getItem('ao-language')) {
      this.currentLanguage = browserLang;
    } else {
      this.currentLanguage = localStorage.getItem('ao-language') || 'es';
    }
    
    // Apply language
    document.documentElement.setAttribute('lang', this.currentLanguage);
  }

  // User preferences
  loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('ao-preferences') || '{}');
    
    // Apply theme preference
    if (preferences.theme) {
      document.body.classList.add(`theme-${preferences.theme}`);
    }
    
    // Apply accessibility preferences
    if (preferences.highContrast) {
      document.body.classList.add('high-contrast');
    }
    
    if (preferences.largeText) {
      document.body.classList.add('large-text');
    }
  }

  // Error handling
  handleInitializationError(error) {
    // Show user-friendly error message
    const errorBanner = document.createElement('div');
    errorBanner.className = 'error-banner';
    errorBanner.innerHTML = `
      <div class="container">
        <p>Ocurrió un error al cargar la plataforma. Por favor, recarga la página.</p>
        <button onclick="location.reload()" class="reload-button">Recargar</button>
      </div>
    `;
    document.body.insertBefore(errorBanner, document.body.firstChild);
  }

  // Service worker message handling
  handleServiceWorkerMessage(message) {
    if (message.type === 'UPDATE_AVAILABLE') {
      this.showUpdateNotification();
    }
  }

  // Show update notification
  showUpdateNotification() {
    if (this.updateNotificationShown) return;
    this.updateNotificationShown = true;
    
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <p>Nueva versión disponible</p>
        <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
        <button onclick="location.reload()">Actualizar</button>
      </div>
    `;
    document.body.appendChild(notification);
  }

  // Utility methods
  smoothScrollTo(element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  getModuleName(element) {
    const moduleCard = element.closest('.module-card');
    return moduleCard ? moduleCard.dataset.module : 'unknown';
  }

  getLangCodeFromButton(button) {
    const text = button.textContent.trim();
    return text === 'English' ? 'en' : text === 'Português' ? 'pt' : 'es';
  }

  // Analytics and tracking
  trackModuleInteraction(moduleName, action) {
    console.log(`[AO] Module interaction: ${moduleName} - ${action}`);
    // Integration with analytics service would go here
  }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.turismoAO = new TurismoMundialAO();
  });
} else {
  window.turismoAO = new TurismoMundialAO();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TurismoMundialAO;
}

// Global functions for UI interactions
// These functions are called from HTML onclick handlers

// Authentication functions
function isUserLoggedIn() {
  return window.firebase && window.firebase.isUserLoggedIn();
}

function getCurrentUser() {
  return window.firebase && window.firebase.getCurrentUser();
}

// Auth modal functions
function openAuthModal(mode = 'login') {
  const modal = document.getElementById('authModal');
  const modalContent = document.getElementById('authModalContent');
  
  if (!modal || !modalContent) {
    // If modal doesn't exist, redirect to appropriate page
    if (mode === 'register') {
      window.location.href = '/registro';
    } else {
      window.location.href = '/login';
    }
    return;
  }

  // Create modal content
  const isLogin = mode === 'login';
  modalContent.innerHTML = `
    <div class="auth-form">
      <div class="auth-header">
        <h2>${isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        <p>${isLogin ? 'Accede a tu cuenta de Turismo Mundial AO' : 'Únete a la plataforma oficial de turismo'}</p>
      </div>
      
      <form id="authForm" class="auth-form-fields">
        <div class="form-field">
          <label for="authEmail">Correo electrónico</label>
          <input type="email" id="authEmail" name="email" required 
                 placeholder="tu@email.com" autocomplete="email">
        </div>
        
        <div class="form-field">
          <label for="authPassword">Contraseña</label>
          <input type="password" id="authPassword" name="password" required 
                 placeholder="••••••••" autocomplete="${isLogin ? 'current-password' : 'new-password'}">
        </div>
        
        ${!isLogin ? `
          <div class="form-field">
            <label for="authConfirmPassword">Confirmar contraseña</label>
            <input type="password" id="authConfirmPassword" name="confirmPassword" required 
                   placeholder="••••••••" autocomplete="new-password">
          </div>
        ` : ''}
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-large">
            ${isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </div>
      </form>
      
      <div class="auth-footer">
        <p>
          ${isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <a href="#" onclick="switchAuthMode('${isLogin ? 'register' : 'login'}'); return false;">
            ${isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </a>
        </p>
      </div>
    </div>
  `;

  // Add form submission handler
  const authForm = document.getElementById('authForm');
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleAuthSubmission(mode, authForm);
  });

  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Focus on email input
  setTimeout(() => {
    document.getElementById('authEmail')?.focus();
  }, 100);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function switchAuthMode(newMode) {
  closeAuthModal();
  setTimeout(() => openAuthModal(newMode), 100);
}

async function handleAuthSubmission(mode, form) {
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  
  try {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Procesando...';
    submitBtn.disabled = true;
    
    if (mode === 'register') {
      // Validate password confirmation
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      // Create user
      await window.firebase.createUser(email, password);
      showNotification('Cuenta creada exitosamente. ¡Bienvenido!', 'success');
    } else {
      // Sign in user
      await window.firebase.signInUser(email, password);
      showNotification('Sesión iniciada correctamente', 'success');
    }
    
    // Close modal and refresh page
    closeAuthModal();
    setTimeout(() => window.location.reload(), 1000);
    
  } catch (error) {
    console.error('[Auth] Submission error:', error);
    showNotification(error.message || 'Error en la autenticación', 'error');
    
    // Reset button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

// Job search and management functions
function searchJobs() {
  const query = document.getElementById('jobQuery')?.value || '';
  const location = document.getElementById('location')?.value || '';
  
  console.log('[Jobs] Searching for:', query, 'in', location);
  
  // Show loading state
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<span class="btn-icon">🔄</span> Buscando...';
    searchBtn.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
      searchBtn.innerHTML = originalText;
      searchBtn.disabled = false;
      showNotification(`Se encontraron ${Math.floor(Math.random() * 50 + 10)} empleos para "${query}"`, 'success');
      
      // In a real app, this would update the job listings
      loadJobResults(query, location);
    }, 1500);
  }
}

async function loadJobResults(query, location) {
  const jobsContainer = document.getElementById('featuredJobs');
  if (!jobsContainer) return;
  
  try {
    // In a real app, this would query Firebase
    const mockJobs = generateMockJobs(query, location);
    displayJobs(mockJobs, jobsContainer);
  } catch (error) {
    console.error('[Jobs] Load results error:', error);
    showNotification('Error al cargar los empleos', 'error');
  }
}

function generateMockJobs(query, location) {
  const jobTitles = [
    'Recepcionista de Hotel', 'Guía Turístico', 'Chef Ejecutivo', 'Mesero Bilingüe',
    'Concierge de Lujo', 'Coordinador de Eventos', 'Bartender Especializado',
    'Gerente de Restaurante', 'Animador Turístico', 'Sommelier'
  ];
  
  const companies = [
    'Hotel Rosewood', 'Grupo Vidanta', 'Xcaret Experiencias', 'Hotel Banyan Tree',
    'Marriott International', 'Hilton Worldwide', 'Iberostar Group', 'RIU Hotels'
  ];
  
  const locations = [
    'Cancún, Q. Roo', 'Playa del Carmen, Q. Roo', 'Puerto Vallarta, Jal.',
    'Los Cabos, BCS', 'Tulum, Q. Roo', 'Cozumel, Q. Roo', 'Mérida, Yuc.'
  ];
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `job-${Date.now()}-${i}`,
    title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    location: location || locations[Math.floor(Math.random() * locations.length)],
    salary: `$${Math.floor(Math.random() * 20000 + 15000).toLocaleString()} - $${Math.floor(Math.random() * 15000 + 25000).toLocaleString()}`,
    experience: ['Entrada', '1+ años', '2+ años', '3+ años'][Math.floor(Math.random() * 4)],
    type: 'Tiempo completo',
    description: 'Excelente oportunidad de crecimiento profesional en el sector turístico mexicano.',
    benefits: ['Seguro médico', 'Vacaciones pagadas', 'Capacitación continua'],
    postedTime: `hace ${Math.floor(Math.random() * 24 + 1)} horas`,
    applicants: Math.floor(Math.random() * 50 + 5)
  }));
}

function displayJobs(jobs, container) {
  container.innerHTML = jobs.map(job => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="company-info">
          <div class="company-logo">
            <div class="company-placeholder">${job.company.charAt(0)}</div>
          </div>
          <div class="company-details">
            <h3 class="job-title">${job.title}</h3>
            <p class="company-name">${job.company}</p>
            <p class="job-location">📍 ${job.location}</p>
          </div>
        </div>
        <div class="job-actions">
          <button class="btn-icon-small" onclick="saveJob('${job.id}')" aria-label="Guardar empleo">
            <span class="icon">🤍</span>
          </button>
        </div>
      </div>
      
      <div class="job-card-content">
        <div class="job-highlights">
          <div class="highlight">
            <span class="highlight-icon">💰</span>
            <span class="highlight-text">${job.salary}</span>
          </div>
          <div class="highlight">
            <span class="highlight-icon">⭐</span>
            <span class="highlight-text">${job.experience}</span>
          </div>
          <div class="highlight">
            <span class="highlight-icon">⏰</span>
            <span class="highlight-text">${job.type}</span>
          </div>
        </div>
        
        <p class="job-description">${job.description}</p>
        
        <div class="job-benefits">
          ${job.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('')}
        </div>
        
        <div class="job-card-footer">
          <div class="job-meta">
            <span class="posted-time">${job.postedTime}</span>
            <span class="applicants">${job.applicants} aplicantes</span>
          </div>
          <button class="btn btn-primary" onclick="applyToJob('${job.id}')">
            Aplicar Ahora
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function applyToJob(jobId) {
  console.log('[Jobs] Applying to job:', jobId);
  
  // Check if user is authenticated
  if (!isUserLoggedIn()) {
    openAuthModal('register');
    return;
  }
  
  // Show application modal or redirect
  showNotification('¡Aplicación enviada exitosamente!', 'success');
  
  // In a real app, this would submit the application to Firebase
  // and possibly redirect to an application form
}

function saveJob(jobId) {
  console.log('[Jobs] Toggling save for job:', jobId);
  
  // Toggle save state visually
  const button = event.target.closest('button');
  const icon = button.querySelector('.icon');
  const isSaved = icon.textContent === '❤️';
  
  icon.textContent = isSaved ? '🤍' : '❤️';
  
  // Show feedback
  showNotification(
    isSaved ? 'Empleo removido de guardados' : 'Empleo guardado exitosamente',
    'info'
  );
  
  // In a real app, this would update the user's saved jobs in Firebase
}

function filterByCategory(category) {
  console.log('[Jobs] Filtering by category:', category);
  
  // Show loading state and simulate filtering
  showNotification(`Mostrando empleos en ${category}`, 'info');
  
  // In a real app, this would filter the job listings
  // For demo, just reload with category filter
  setTimeout(() => {
    loadJobResults('', ''); // Reload jobs
  }, 1000);
}

function startRegistration() {
  openAuthModal('register');
}

function showJobAlerts() {
  if (!isUserLoggedIn()) {
    openAuthModal('register');
    return;
  }
  
  showNotification('Función de alertas próximamente disponible', 'info');
}

function loadMoreJobs() {
  const jobsContainer = document.getElementById('featuredJobs');
  if (!jobsContainer) return;
  
  // Generate and append more jobs
  const moreJobs = generateMockJobs('', '');
  const existingJobs = jobsContainer.innerHTML;
  
  // Show loading state
  showNotification('Cargando más empleos...', 'info');
  
  setTimeout(() => {
    jobsContainer.innerHTML = existingJobs + displayJobsHTML(moreJobs);
    showNotification(`Se cargaron ${moreJobs.length} empleos adicionales`, 'success');
  }, 1500);
}

function displayJobsHTML(jobs) {
  return jobs.map(job => `
    <div class="job-card">
      <!-- Job card HTML here - same as in displayJobs function -->
    </div>
  `).join('');
}

// Utility functions
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">
        ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  console.log(`[Notification] ${type.toUpperCase()}: ${message}`);
}

// Language selector functions
function showLanguageMenu() {
  const selector = document.querySelector('.lang-selector');
  const currentLang = selector.textContent.trim();
  
  // Create dropdown menu
  const menu = document.createElement('div');
  menu.className = 'language-dropdown';
  menu.innerHTML = `
    <button onclick="changeLanguage('es')" ${currentLang === 'ES' ? 'class="active"' : ''}>
      🇲🇽 Español
    </button>
    <button onclick="changeLanguage('en')" ${currentLang === 'EN' ? 'class="active"' : ''}>
      🇺🇸 English  
    </button>
    <button onclick="changeLanguage('pt')" ${currentLang === 'PT' ? 'class="active"' : ''}>
      🇧🇷 Português
    </button>
  `;
  
  // Position and show menu
  const rect = selector.getBoundingClientRect();
  menu.style.position = 'absolute';
  menu.style.top = rect.bottom + 'px';
  menu.style.left = rect.left + 'px';
  menu.style.zIndex = '1000';
  
  document.body.appendChild(menu);
  
  // Close menu when clicking outside
  setTimeout(() => {
    const closeHandler = (e) => {
      if (!menu.contains(e.target) && e.target !== selector) {
        menu.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    document.addEventListener('click', closeHandler);
  }, 100);
}

function changeLanguage(langCode) {
  console.log('[Language] Switching to:', langCode);
  
  // Update selector
  const selector = document.querySelector('.lang-selector');
  if (selector) {
    selector.textContent = langCode.toUpperCase();
  }
  
  // Save preference
  localStorage.setItem('ao-language', langCode);
  
  // Show notification
  const langNames = { es: 'Español', en: 'English', pt: 'Português' };
  showNotification(`Idioma cambiado a ${langNames[langCode]}`, 'success');
  
  // Close dropdown
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown) {
    dropdown.remove();
  }
  
  // In a real app, this would reload content in the new language
}

// Additional utility functions for other pages
function openProfileBuilder() {
  if (!isUserLoggedIn()) {
    openAuthModal('register');
    return;
  }
  
  window.location.href = '/dashboard/profile';
}

function scrollToJobSearch() {
  const element = document.getElementById('jobSearch');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleFilter(filterType) {
  console.log('[Filters] Toggling filter:', filterType);
  showNotification(`Filtro ${filterType} próximamente disponible`, 'info');
}

// Initialize global functions after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Set up modal close handlers
  const modal = document.getElementById('authModal');
  if (modal) {
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAuthModal();
      }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeAuthModal();
      }
    });
  }
  
  // Add notification styles if not already present
  if (!document.querySelector('#notification-styles')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.id = 'notification-styles';
    notificationStyles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
      }
      
      .notification-success {
        border-left: 4px solid #10b981;
      }
      
      .notification-error {
        border-left: 4px solid #ef4444;
      }
      
      .notification-info {
        border-left: 4px solid #3b82f6;
      }
      
      .notification-content {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .notification-message {
        flex: 1;
        font-size: 14px;
        color: #374151;
      }
      
      .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #9ca3af;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .notification-close:hover {
        color: #374151;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .language-dropdown {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        padding: 8px 0;
        min-width: 150px;
      }
      
      .language-dropdown button {
        display: block;
        width: 100%;
        text-align: left;
        padding: 8px 16px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
      }
      
      .language-dropdown button:hover {
        background: #f3f4f6;
      }
      
      .language-dropdown button.active {
        background: #1f2937;
        color: white;
      }
      
      .company-placeholder {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 18px;
      }
    `;
    document.head.appendChild(notificationStyles);
  }
});

console.log('[AO] Global functions loaded successfully');