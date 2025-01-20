let version = '0.57';

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('eraktkosh').then(cache => {
      return cache.addAll([
        '../css/combined-cleaned.css',
        '/BLDAHIMS/bloodbank/transactions/bbpublicindexFast.html',
        '../css/main-cleaned.css',
        '../css/bbpubliccustom.min.css',
        '../css/bbpublic.min.css'
      ])
      .then(() => self.skipWaiting());
    })
  )
});


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	console.log(event.request.url);
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});