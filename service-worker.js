self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("ka-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "activation.html",
        "activation.js",
        "config.js",
        "graphAuth.js",
        "graphUpload.js",
        "completion.html",
        "admin.html",
        "session.html",
        "attendance.html",
        "scores.html",
        "progression.html",
        "results.html",
        "logbook.html",
        "style.css",
        "manifest.json"
      ]);
    })
  );
  self.skipWaiting(); // ensure new SW activates immediately
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== "ka-cache")
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // take control of all pages immediately
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});