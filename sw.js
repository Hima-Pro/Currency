/*
  put needed files paths only not folder path to cache files correctly !
*/

var fileList=[
  "./index.html",
  "./sw.js",
  "./README.md",
  "./assets/js/script.js",
  "./assets/css/style.css",
  "./assets/css/core.css",
  "./assets/css/fontawesome/css/all.css",
  "./assets/css/fontawesome/webfonts/fa-brands-400.eot",
  "./assets/css/fontawesome/webfonts/fa-brands-400.svg",
  "./assets/css/fontawesome/webfonts/fa-brands-400.ttf",
  "./assets/css/fontawesome/webfonts/fa-brands-400.woff",
  "./assets/css/fontawesome/webfonts/fa-brands-400.woff2",
  "./assets/css/fontawesome/webfonts/fa-regular-400.eot",
  "./assets/css/fontawesome/webfonts/fa-regular-400.svg",
  "./assets/css/fontawesome/webfonts/fa-regular-400.ttf",
  "./assets/css/fontawesome/webfonts/fa-regular-400.woff",
  "./assets/css/fontawesome/webfonts/fa-regular-400.woff2",
  "./assets/css/fontawesome/webfonts/fa-solid-900.eot",
  "./assets/css/fontawesome/webfonts/fa-solid-900.svg",
  "./assets/css/fontawesome/webfonts/fa-solid-900.ttf",
  "./assets/css/fontawesome/webfonts/fa-solid-900.woff",
  "./assets/css/fontawesome/webfonts/fa-solid-900.woff2",
  "./assets/images/logo-192.png",
  "./assets/images/logo-512.png",
  "./assets/images/logo.svg",
  "./assets/images/logo-ui.svg",
  "./assets/images/screenshot-mobile.png",
  "./assets/images/screenshot-desktop.png",
  "./assets/offline.html",
  "./assets/manifest.json",
  "./all.html"
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      var files;
      for(i=0;i<=fileList.length;i++){
        files += + cache.add(fileList[i]);
      }
      return files;
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});