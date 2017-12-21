var preloads = [
      'deer.jpeg',
      'parrot.jpeg',
      'tree.jpeg'
    ],
    cacheName = 'preload-cache';

// Install
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      let promises = preloads.map((loader) => {
        var url = new URL(loader, location.href),
            time = `t=${Date.now()}`;
        url.search += url.search? `&${time}`: `?${time}`;

        return fetch(new Request(url)).then((resp) => {
          if (resp.status !== 200) {
            throw new Error(`Error Fetching ${loader}, Status ${resp.status}`);
          }

          console.log(`Cached ${loader}`);
          return cache.put(loader, resp);
        }, (error) => {
          console.error(`Error Fetching ${loader}, Status ${error}`);
        });
      });

      return Promise.all(promises).then(() => {
        console.log('Preload Completed');
      });
    }).catch((error) => {
      console.log('Preload Failed To Complete');
    })
  );
});

// Fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        console.log(`Response From Cache ${resp}`);
        return resp;
      }

      console.log('Fetching Request');

      return fetch(event.request).then((resp) => {
        console.log(`Response From Network${resp}`);
        return resp;
      }).catch((error) => {
        console.error(`Request Failed ${error}`);
        throw error;
      });
    })
  );
});

// Activate
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cName) => {
          if (cacheName === cName) {
            caches.delete(cacheName);
            console.log('Preload Cache Cleared');
          }
        })
      );
    })
  );
});
