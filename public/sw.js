// MASR JOBS Matrouh Service Worker
const CACHE_NAME = 'matrouh-jobs-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Support offline and fast caching
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
