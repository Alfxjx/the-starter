// service-worker.js

const
  version = '1.0.2',
  CACHE = version + '::ZiyiMember',
  installFilesEssential = [
    '/',
    '/manifest.json',
    '/favicon.ico',
  ];

// install static assets
function installStaticFiles() {
  return caches.open(CACHE)
    .then(cache => {
      return cache.addAll(installFilesEssential);
    });
}

function clearOldCaches() {
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    });
}


self.addEventListener('install', event => {
  event.waitUntil(
    installStaticFiles()
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clearOldCaches()
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  let url = event.request.url;
  event.respondWith(
    caches.open(CACHE)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request)
              .then(newreq => {
                console.log('network fetch: ' + url);
                if (newreq.ok) cache.put(event.request, newreq.clone());
                return newreq;

              })
              .catch(()=>null);
          });

      })
  );
});

// 作者：Cloud9
// 链接：https://juejin.cn/post/6887759780128292871
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。