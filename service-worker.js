const CACHE = 'workcalc-v01_00_013';

const ASSETS = [
  '/WorkCalc/',
  '/WorkCalc/index.html',
  '/WorkCalc/manifest.json',
  '/WorkCalc/css/main.css',
  '/WorkCalc/js/app.js',
  '/WorkCalc/js/units.js',
  '/WorkCalc/js/history.js',
  '/WorkCalc/js/calculators/concrete.js',
  '/WorkCalc/js/calculators/lumber.js',
  '/WorkCalc/js/calculators/masonry.js',
  '/WorkCalc/js/calculators/roofing.js',
  '/WorkCalc/js/calculators/paint.js',
  '/WorkCalc/js/calculators/excavation.js',
  '/WorkCalc/icons/favicon.svg',
  '/WorkCalc/icons/icon-192.png',
  '/WorkCalc/icons/icon-512.png',
  '/WorkCalc/icons/icon-maskable.png',
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
