if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise(async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()})),i.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},i=(i,r)=>{Promise.all(i.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(i)};self.define=(i,s,b)=>{r[i]||(r[i]=Promise.resolve().then(()=>{let r={};const n={uri:location.origin+i.slice(1)};return Promise.all(s.map(i=>{switch(i){case"exports":return r;case"module":return n;default:return e(i)}})).then(e=>{const i=b(...e);return r.default||(r.default=i),r})}))}}define("./service-worker.js",["./workbox-87f0caec"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"314b7d5b7235d9ea5540f6833e6d6980"},{url:"css/bootstrap.min.css",revision:"816af0eddd3b4822c2756227c7e7b7ee"},{url:"figures/hebrew_month_0.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_1.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_10.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_11.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_12.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_13.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_14.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_2.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_3.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_4.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_5.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_6.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_7.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_8.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"figures/hebrew_month_9.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"img/app-icon-144.png",revision:"561d15ec76e892d1fded25e32a71f272"},{url:"img/app-icon-168.png",revision:"16825f96bced58e72fe184f6d560fc56"},{url:"img/app-icon-192.png",revision:"8698d0a9163f5f8edf28070b1a506b09"},{url:"img/app-icon-48.png",revision:"b7a23f7e19c2b1f6b6e774c742aa6809"},{url:"img/app-icon-512.png",revision:"3d68a04ed65b1ce668b3d76454fe4a18"},{url:"img/app-icon-72.png",revision:"f64362b5a50a70b81de91e723ef1426e"},{url:"img/app-icon-96.png",revision:"db638ad0321e46cc0f80a2b57432d65d"},{url:"img/icon-192.png",revision:"e59506221ef7f3b527d1b3b308d8c80d"},{url:"img/icon.png",revision:"bedcf43461c4204ddd5c5b984bf8cec7"},{url:"index.html",revision:"a2373bf7f26e663947fd7256d59f3ffc"},{url:"js/bootstrap.min.js",revision:"02d223393e00c273efdcb1ade8f4f8b1"},{url:"js/calendar.js",revision:"f2efa254b93789660dee0907eb2902be"},{url:"js/extras.js",revision:"b7689f2aa93e98e4696011a68c4c21c4"},{url:"js/jquery-3.5.1.slim.min.js",revision:"fb8409a092adc6e8be17e87d59e0595e"},{url:"js/popper.min.js",revision:"1022eaf388cc780bcfeb6456157adb7d"},{url:"manifest.json",revision:"31a8044c4b3d09f294328ac9db5d1adf"}],{})}));
//# sourceMappingURL=service-worker.js.map
