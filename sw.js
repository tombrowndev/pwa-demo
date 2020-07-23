const cacheName = "FACTS-0.0.1";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(["/", "/index.html", "/assets/main.js", "/assets/styles.css"]);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return (
                response ||
                fetch(e.request).catch(() => {
                    return new Response(JSON.stringify({ text: "Sorry, you are offline" }));
                })
            );
        })
    );
});
