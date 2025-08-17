// This imports OneSignal's service worker code into existing service worker
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js')

// Define the cache name. Update this version number (e.g., v1, v2, v3)
// whenever you make changes to the files listed in urlsToCache, or
// if you want to force all users to get fresh versions of these assets.
const CACHE_NAME = 'yusuf-alhelou-cache-v4'; // Consider incrementing this to v3 for this update!

// List of URLs to precache during the service worker installation.
// These are assets critical for basic site functionality, even offline.
const urlsToCache = [
  '/',             // Cache the homepage (root URL)
  '/index.html',   // Ensure index.html is also cached
// REMOVED: '/OneSignalSDKWorker.js', // This file is no longer on server
  // paths to critical static assets
  // Example: your main stylesheet
  // Example: a critical image
  // Example: your main JavaScript file
  '/site.webmanifest',
  // Add any specific HTML pages that do not have front matter
  // and you want to ensure are available offline, e.g.:
];

// 1. Install Event: Caches essential assets during service worker installation and forces activation.
self.addEventListener('install', event => {
  // `waitUntil` ensures the service worker isn't activated until caching is complete.
  event.waitUntil(
    caches.open(CACHE_NAME) // Open the named cache
      .then(cache => {
        console.log('[Service Worker] Opened cache:', CACHE_NAME);
        // Add all specified URLs to the cache.
        // If any file fails to add, the entire installation fails.
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // IMPORTANT: self.skipWaiting() forces the new service worker to
        // activate immediately, even if older versions are still controlling clients.
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Failed to open cache or add URLs:', error);
      })
  );
});

// 2. Fetch Event: Intercepts network requests and applies the "Network First" strategy.
self.addEventListener('fetch', event => {
  // `respondWith` tells the browser to use the service worker's custom response.
  event.respondWith(
    // First, try to fetch the resource from the network.
    fetch(event.request)
      .then(response => {
        // If the network request is successful, clone the response.
        // A response can only be read once, so we clone it to both
        // serve it to the browser and put it in the cache.
        const responseToCache = response.clone();

        // Open the cache and put the fresh network response into it.
        // This ensures the cache is always up-to-date when online.
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          })
          .catch(error => {
            console.warn('[Service Worker] Failed to cache response:', error);
          });

        // Return the fresh network response to the browser.
        return response;
      })
      .catch(() => {
        // If the network request fails (e.g., offline, network error),
        // try to find the resource in the cache.
        console.log('[Service Worker] Network failed, falling back to cache for:', event.request.url);
        return caches.match(event.request);
      })
  );
});

// 3. Activate Event: Cleans up old caches and takes control of clients.
self.addEventListener('activate', event => {
  // Define a whitelist of active caches (only the current CACHE_NAME).
  const cacheWhitelist = [CACHE_NAME];

  // `waitUntil` ensures old caches are deleted before the new service worker becomes active.
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache name is NOT in our whitelist, delete it.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // `clients.claim()` makes the current service worker take control of all clients
      // (tabs/windows) within its scope immediately, without requiring a page refresh.
      // This is important when using skipWaiting() in the install phase.
      return self.clients.claim();
    })
  );
});
