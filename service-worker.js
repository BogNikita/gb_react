var doCache = true;

var CACHE_NAME = 'react-chat-cache';

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
      caches.keys()
          .then(keyList =>
              Promise.all(keyList.map(key => {
                  if (!cacheWhitelist.includes(key)) {
                      console.log('Deleting cache: ' + key);
                      return caches.delete(key);
                  }
              }))
          )
  );
});

self.addEventListener('install', function(event) {
  if (doCache) {
      event.waitUntil(
          caches.open(CACHE_NAME)
              .then(function(cache) {
                  fetch('manifest/manifest.json')
                      .then(response => {
                          response.json()
                      })
                      .then(assets => {
                          const urlsToCache = [
                              '',
                              '/chat/*',
                          ];
                          cache.addAll(urlsToCache);
                          console.log('cached');
                      })
              })
      );
  }
});

self.addEventListener('fetch', function(event) {
  if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
  }
});


self.addEventListener('push', function(event) {

    console.info('Event: Push');
   
    var title = 'Тут новый пуш прилетел!';
   
    var body = {
      'body': 'Нажми сюда, чтобы открыть',
      'tag': 'pwa',
      'icon': './manifest/logo-pwa-48.png'
    };
   
    event.waitUntil(
      self.registration.showNotification(title, body)
    );
   });
   
