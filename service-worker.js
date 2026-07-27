const CACHE = 'cancalc-v01_00_005';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/main.css',
  '/js/app.js',
  '/js/units.js',
  '/js/history.js',
  '/js/calculators/concrete.js',
  '/js/calculators/lumber.js',
  '/js/calculators/masonry.js',
  '/js/calculators/roofing.js',
  '/js/calculators/paint.js',
  '/js/calculators/excavation.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached ?? fetch(e.request))
  );
});
