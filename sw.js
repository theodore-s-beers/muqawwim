if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise((async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},i=(i,r)=>{Promise.all(i.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(i)};self.define=(i,s,c)=>{r[i]||(r[i]=Promise.resolve().then((()=>{let r={};const n={uri:location.origin+i.slice(1)};return Promise.all(s.map((i=>{switch(i){case"exports":return r;case"module":return n;default:return e(i)}}))).then((e=>{const i=c(...e);return r.default||(r.default=i),r}))})))}}define("./sw.js",["./workbox-7f7af1c3"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"314b7d5b7235d9ea5540f6833e6d6980"},{url:"css/bootstrap.min.css",revision:"e451b87914db6243b6afa3c5e484ec16"},{url:"css/styles.css",revision:"ce354772054b74232431a751f7cf5115"},{url:"img/app-icon-144.png",revision:"561d15ec76e892d1fded25e32a71f272"},{url:"img/app-icon-168.png",revision:"16825f96bced58e72fe184f6d560fc56"},{url:"img/app-icon-192.png",revision:"8698d0a9163f5f8edf28070b1a506b09"},{url:"img/app-icon-48.png",revision:"b7a23f7e19c2b1f6b6e774c742aa6809"},{url:"img/app-icon-512.png",revision:"3d68a04ed65b1ce668b3d76454fe4a18"},{url:"img/app-icon-72.png",revision:"f64362b5a50a70b81de91e723ef1426e"},{url:"img/app-icon-96.png",revision:"db638ad0321e46cc0f80a2b57432d65d"},{url:"img/icon-192.png",revision:"e59506221ef7f3b527d1b3b308d8c80d"},{url:"img/icon.png",revision:"bedcf43461c4204ddd5c5b984bf8cec7"},{url:"img/maskable-icon.png",revision:"ce4596d5d63581915fe2b929edf2fd12"},{url:"index.html",revision:"9cf4786c5484ed525cdc063db1d68084"},{url:"js/bootstrap.bundle.min.js",revision:"715756e65b9ff107f4cf927e3e8bbf76"},{url:"js/calendar.js",revision:"e1196d87a6f002ff45059db1fc9bfcb0"},{url:"js/calendar.min.js",revision:"56b2539e61599e24124a3c1f6c78e6e0"},{url:"js/extras.js",revision:"bbbed3662e78a67c287d67c94cd5acf6"},{url:"js/registerSW.js",revision:"403035ad56ee65583062726f12f55a08"},{url:"manifest.json",revision:"4a9efba3acdebf485446c726504b2071"},{url:"package-lock.json",revision:"fc5053cdb6cc1b518e5976f8a4765a54"},{url:"package.json",revision:"31f274b77a6fdaf452147bdc90cfca9e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
