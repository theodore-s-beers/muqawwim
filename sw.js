/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [{
  "url": "figures/hebrew_month_0.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_1.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_10.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_11.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_12.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_13.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_14.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_2.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_3.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_4.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_5.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_6.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_7.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_8.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "figures/hebrew_month_9.gif",
  "revision": "28bebe0e91ef128a01697d4d43b08e89"
}, {
  "url": "img/app-icon-144.png",
  "revision": "561d15ec76e892d1fded25e32a71f272"
}, {
  "url": "img/app-icon-168.png",
  "revision": "16825f96bced58e72fe184f6d560fc56"
}, {
  "url": "img/app-icon-192.png",
  "revision": "8698d0a9163f5f8edf28070b1a506b09"
}, {
  "url": "img/app-icon-48.png",
  "revision": "b7a23f7e19c2b1f6b6e774c742aa6809"
}, {
  "url": "img/app-icon-512.png",
  "revision": "3d68a04ed65b1ce668b3d76454fe4a18"
}, {
  "url": "img/app-icon-72.png",
  "revision": "f64362b5a50a70b81de91e723ef1426e"
}, {
  "url": "img/app-icon-96.png",
  "revision": "db638ad0321e46cc0f80a2b57432d65d"
}, {
  "url": "img/icon-192.png",
  "revision": "e59506221ef7f3b527d1b3b308d8c80d"
}, {
  "url": "img/icon.png",
  "revision": "bedcf43461c4204ddd5c5b984bf8cec7"
}, {
  "url": "index.html",
  "revision": "1e5abf60f8c6d569e5a68f64abcf91ec"
}, {
  "url": "js/astro.js",
  "revision": "191882b8d8db45e7cc7c5884f707ba90"
}, {
  "url": "js/calendar.js",
  "revision": "43c89b059abe3de79279178d19897b0c"
}].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});