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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        console.log(response);
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
