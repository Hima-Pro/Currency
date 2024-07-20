const CACHE = "sw-cache";
var fileList = [
  "./assets/images/logo-192.png",
  "./assets/images/logo-512.png",
  "./assets/index-BpUobiFV.css",
  "./assets/index-Dzz37GO5.js",
  "./assets/manifest-BAMcHGVG.json",
  "./favicon.ico",
  "./index.html",
  "./sw.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(fileList);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    return fetch(e.request).catch(async () => await caches.match(e.request));
  })());
});