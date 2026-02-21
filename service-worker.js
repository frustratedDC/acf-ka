self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("ka-cache").then(cache => {
            return cache.addAll([
                "index.html",
                "activation.html",
                "config.js",
                "activation.js",
                "graphAuth.js",
                "graphUpload.js",
                "completion.html",
                "admin.html",
                "style.css",
                "manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});