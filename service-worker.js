const CACHE_NAME = 'todo-list-cache-v1';
const urlsToCache = [
  '/assets/css/main.min.css',
  '/assets/js/anime.min.js',
  '/assets/js/task.js',
  '/assets/js/main.js',
  '/assets/favicon',
  '/index.html',
  '/'
];

const DATA_CACHE_NAME = 'todo-list-data-cache-v1';


self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
    if (response) {
      return response;
    }
      return fetch(event.request);
    })
  );
});