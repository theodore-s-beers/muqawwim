const PRECACHE = "precache-v15",
  RUNTIME = "runtime",
  PRECACHE_URLS = ["index.html", "./", "js/calendar.js", "js/astro.js", "css/bootstrap.min.css", "img/icon.png", "img/icon-192.png", "figures/hebrew_month_0.gif", "figures/hebrew_month_1.gif", "figures/hebrew_month_2.gif", "figures/hebrew_month_3.gif", "figures/hebrew_month_4.gif", "figures/hebrew_month_5.gif", "figures/hebrew_month_6.gif", "figures/hebrew_month_7.gif", "figures/hebrew_month_8.gif", "figures/hebrew_month_9.gif", "figures/hebrew_month_10.gif", "figures/hebrew_month_11.gif", "figures/hebrew_month_12.gif", "figures/hebrew_month_13.gif", "figures/hebrew_month_14.gif", "js/popper.min.js", "js/bootstrap.min.js", "js/jquery-3.2.1.slim.min.js"];
self.addEventListener("install", a => {
  a.waitUntil(caches.open(PRECACHE).then(b => b.addAll(PRECACHE_URLS)).then(self.skipWaiting()))
}), self.addEventListener("activate", a => {
  const b = [PRECACHE, RUNTIME];
  a.waitUntil(caches.keys().then(c => {
    return c.filter(d => !b.includes(d))
  }).then(c => {
    return Promise.all(c.map(d => {
      return caches.delete(d)
    }))
  }).then(() => self.clients.claim()))
}), self.addEventListener("fetch", a => {
  a.request.url.startsWith(self.location.origin) && a.respondWith(caches.match(a.request).then(b => {
    return b ? b : caches.open(RUNTIME).then(c => {
      return fetch(a.request).then(d => {
        return c.put(a.request, d.clone()).then(() => {
          return d
        })
      })
    })
  }))
});