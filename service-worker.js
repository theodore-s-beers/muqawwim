const PRECACHE = "precache-v10",
  RUNTIME = "runtime",
  PRECACHE_URLS = ["index.html", "./", "js/calendar.js", "js/astro.js", "css/bootstrap.min.css", "img/icon.png", "img/icon-192.png", "figures/hebrew_month_0.gif", "figures/hebrew_month_1.gif", "figures/hebrew_month_2.gif", "figures/hebrew_month_3.gif", "figures/hebrew_month_4.gif", "figures/hebrew_month_5.gif", "figures/hebrew_month_6.gif", "figures/hebrew_month_7.gif", "figures/hebrew_month_8.gif", "figures/hebrew_month_9.gif", "figures/hebrew_month_10.gif", "figures/hebrew_month_11.gif", "figures/hebrew_month_12.gif", "figures/hebrew_month_13.gif", "figures/hebrew_month_14.gif", "js/popper.min.js", "js/bootstrap.min.js", "js/jquery-3.2.1.slim.min.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(PRECACHE).then(f => f.addAll(PRECACHE_URLS)).then(self.skipWaiting()))
}), self.addEventListener("activate", e => {
  const f = [PRECACHE, RUNTIME];
  e.waitUntil(caches.keys().then(g => {
    return g.filter(h => !f.includes(h))
  }).then(g => {
    return Promise.all(g.map(h => {
      return caches.delete(h)
    }))
  }).then(() => self.clients.claim()))
}), self.addEventListener("fetch", e => {
  e.request.url.startsWith(self.location.origin) && e.respondWith(caches.match(e.request).then(f => {
    return f ? f : caches.open(RUNTIME).then(g => {
      return fetch(e.request).then(h => {
        return g.put(e.request, h.clone()).then(() => {
          return h
        })
      })
    })
  }))
});