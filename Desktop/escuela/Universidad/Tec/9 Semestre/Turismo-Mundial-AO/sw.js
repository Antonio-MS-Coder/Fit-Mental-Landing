// Turismo Mundial AO Service Worker
// Performance-optimized offline functionality
// Designed for government-grade reliability and security

const CACHE_VERSION = 'turismo-ao-v1.2.0';
const STATIC_CACHE = 'turismo-ao-static-' + CACHE_VERSION;
const DYNAMIC_CACHE = 'turismo-ao-dynamic-' + CACHE_VERSION;
const API_CACHE = 'turismo-ao-api-' + CACHE_VERSION;

// Critical resources that should always be cached
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/main.js',
  '/manifest.json',
  '/images/ao-logo-official.svg',
  '/images/gobierno-mexico-seal.svg',
  '/fonts/inter-latin-400-normal.woff2',
  '/fonts/inter-latin-600-normal.woff2',
  '/fonts/inter-latin-700-normal.woff2',
  '/offline.html'
];

// Routes that should work offline
const OFFLINE_ROUTES = [
  '/trabaja',
  '/aprende', 
  '/descubre',
  '/explora-seguro',
  '/eventos',
  '/impacto'
];

// API endpoints to cache with network-first strategy
const API_ENDPOINTS = [
  '/api/v1/jobs',
  '/api/v1/courses',
  '/api/v1/packages',
  '/api/v1/routes',
  '/api/v1/events'
];

// Maximum age for cached items (7 days)
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000;

// Service Worker Installation
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker version:', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Service Worker Activation
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker version:', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      cleanupOldCaches(),
      
      // Claim all clients immediately
      self.clients.claim()
    ])
  );
});

// Main fetch handler with intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }
  
  // Route to appropriate caching strategy
  if (isStaticResource(request)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request, API_CACHE));
  } else if (isNavigationRequest(request)) {
    event.respondWith(navigationStrategy(request));
  } else if (isImageRequest(request)) {
    event.respondWith(cacheFirstStrategy(request, DYNAMIC_CACHE));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
  }
});

// Cache-first strategy for static resources
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse && !isExpired(cachedResponse)) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone response before caching
      const responseToCache = networkResponse.clone();
      await cache.put(request, responseToCache);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Cache-first failed for:', request.url);
    
    // Return cached version even if expired as fallback
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for critical resources
    if (request.url.includes('.html') || request.url === self.registration.scope) {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Network-first strategy for API requests
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseToCache = networkResponse.clone();
      
      // Add timestamp for cache expiry
      const timestampedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: {
          ...responseToCache.headers,
          'sw-cached-at': Date.now().toString()
        }
      });
      
      await cache.put(request, timestampedResponse);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Network-first failed for:', request.url);
    
    // Fallback to cache
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse && !isExpired(cachedResponse)) {
      return cachedResponse;
    }
    
    // Return offline API response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'Esta información no está disponible sin conexión',
        cached: false
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Stale-while-revalidate strategy for dynamic content
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Start background fetch
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached version if available
    return cachedResponse;
  });
  
  // Return cached version immediately if available
  if (cachedResponse && !isExpired(cachedResponse)) {
    return cachedResponse;
  }
  
  // Otherwise wait for network
  return fetchPromise;
}

// Navigation strategy for page routing
async function navigationStrategy(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Navigation failed for:', request.url);
    
    // Check if we have a cached version
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Check for cached root page
    const rootCache = await cache.match('/');
    if (rootCache) {
      return rootCache;
    }
    
    // Return offline page as last resort
    return caches.match('/offline.html');
  }
}

// Helper functions
function isStaticResource(request) {
  const url = new URL(request.url);
  return STATIC_RESOURCES.includes(url.pathname) ||
         url.pathname.includes('/css/') ||
         url.pathname.includes('/js/') ||
         url.pathname.includes('/fonts/') ||
         url.pathname.includes('/images/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.woff') ||
         url.pathname.endsWith('.svg');
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') ||
         API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint));
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

function isImageRequest(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i);
}

function isExpired(response) {
  const cachedAt = response.headers.get('sw-cached-at');
  if (!cachedAt) {
    return false; // If no timestamp, assume not expired
  }
  
  const cacheAge = Date.now() - parseInt(cachedAt);
  return cacheAge > MAX_CACHE_AGE;
}

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => {
    return name.startsWith('turismo-ao-') && !name.includes(CACHE_VERSION);
  });
  
  return Promise.all(oldCaches.map(name => {
    console.log('[SW] Deleting old cache:', name);
    return caches.delete(name);
  }));
}

// Background sync for form submissions when offline
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'job-application') {
    event.waitUntil(syncJobApplications());
  } else if (event.tag === 'booking-request') {
    event.waitUntil(syncBookingRequests());
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  let notificationData = {
    title: 'Turismo Mundial AO',
    body: 'Nueva actualización disponible',
    icon: '/images/notification-icon-192.png',
    badge: '/images/notification-badge-72.png',
    data: { url: '/' }
  };
  
  if (event.data) {
    try {
      const payload = event.data.json();
      notificationData = { ...notificationData, ...payload };
    } catch (error) {
      console.log('[SW] Error parsing push payload:', error);
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      data: notificationData.data,
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'Ver detalles'
        },
        {
          action: 'dismiss',
          title: 'Cerrar'
        }
      ]
    })
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if we already have the app open
        for (let client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window/tab
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Periodic background sync for data updates
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'update-job-listings') {
    event.waitUntil(updateJobListings());
  } else if (event.tag === 'update-safety-data') {
    event.waitUntil(updateSafetyData());
  }
});

// Helper functions for background sync
async function syncJobApplications() {
  try {
    // Implement job application sync logic
    console.log('[SW] Syncing job applications');
    
    // This would typically involve:
    // 1. Retrieving pending applications from IndexedDB
    // 2. Sending them to the server
    // 3. Removing successful applications from local storage
    
  } catch (error) {
    console.log('[SW] Error syncing job applications:', error);
  }
}

async function syncBookingRequests() {
  try {
    // Implement booking request sync logic
    console.log('[SW] Syncing booking requests');
    
  } catch (error) {
    console.log('[SW] Error syncing booking requests:', error);
  }
}

async function updateJobListings() {
  try {
    // Update job listings in the background
    const cache = await caches.open(API_CACHE);
    const response = await fetch('/api/v1/jobs');
    
    if (response.ok) {
      await cache.put('/api/v1/jobs', response.clone());
      console.log('[SW] Job listings updated in background');
    }
    
  } catch (error) {
    console.log('[SW] Error updating job listings:', error);
  }
}

async function updateSafetyData() {
  try {
    // Update safety data in the background
    const cache = await caches.open(API_CACHE);
    const response = await fetch('/api/v1/safety/points');
    
    if (response.ok) {
      await cache.put('/api/v1/safety/points', response.clone());
      console.log('[SW] Safety data updated in background');
    }
    
  } catch (error) {
    console.log('[SW] Error updating safety data:', error);
  }
}

// Error handling and logging
self.addEventListener('error', (event) => {
  console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});

// Service worker update notification
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service worker script loaded, version:', CACHE_VERSION);