const CACHE_NAME = "exelita-v2"
const urlsToCache = ["/", "/images/exelita-logo.png", "/manifest.json"]

// Install event - cache resources
self.addEventListener("install", (event) => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache resources:", error)
      })
    }),
  )
})

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return

  // Skip API requests and dynamic content
  const url = new URL(event.request.url)
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/")) {
    return
  }

  event.respondWith(
    // Network first strategy for better updates
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        if (response.ok) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache only if network fails
        return caches.match(event.request)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Claim all clients immediately
      self.clients.claim(),
      // Delete old caches
      caches
        .keys()
        .then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== CACHE_NAME) {
                console.log("Deleting old cache:", cacheName)
                return caches.delete(cacheName)
              }
            }),
          )
        }),
    ]),
  )
})

// Handle messages from the page
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting()
  }
})
