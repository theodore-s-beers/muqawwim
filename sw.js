if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise(async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()})),i.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},i=(i,r)=>{Promise.all(i.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(i)};self.define=(i,s,n)=>{r[i]||(r[i]=Promise.resolve().then(()=>{let r={};const c={uri:location.origin+i.slice(1)};return Promise.all(s.map(i=>{switch(i){case"exports":return r;case"module":return c;default:return e(i)}})).then(e=>{const i=n(...e);return r.default||(r.default=i),r})}))}}define("./sw.js",["./workbox-87f0caec"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"404.html",revision:"314b7d5b7235d9ea5540f6833e6d6980"},{url:"css/bootstrap.min.css",revision:"816af0eddd3b4822c2756227c7e7b7ee"},{url:"figures/hebrew_month_0.gif",revision:"28bebe0e91ef128a01697d4d43b08e89"},{url:"img/app-icon-144.png",revision:"561d15ec76e892d1fded25e32a71f272"},{url:"img/app-icon-168.png",revision:"16825f96bced58e72fe184f6d560fc56"},{url:"img/app-icon-192.png",revision:"8698d0a9163f5f8edf28070b1a506b09"},{url:"img/app-icon-48.png",revision:"b7a23f7e19c2b1f6b6e774c742aa6809"},{url:"img/app-icon-512.png",revision:"3d68a04ed65b1ce668b3d76454fe4a18"},{url:"img/app-icon-72.png",revision:"f64362b5a50a70b81de91e723ef1426e"},{url:"img/app-icon-96.png",revision:"db638ad0321e46cc0f80a2b57432d65d"},{url:"img/icon-192.png",revision:"e59506221ef7f3b527d1b3b308d8c80d"},{url:"img/icon.png",revision:"bedcf43461c4204ddd5c5b984bf8cec7"},{url:"img/maskable-icon.png",revision:"ce4596d5d63581915fe2b929edf2fd12"},{url:"img/muqawwim-og.jpg",revision:"cd97cdc02178a8fc9184f0b83d734dca"},{url:"index.html",revision:"71871ed2a7fa2f0740b3d469995d996a"},{url:"js/bootstrap.min.js",revision:"02d223393e00c273efdcb1ade8f4f8b1"},{url:"js/calendar.js",revision:"67fd790d78136df0aa32c07ef3c1db28"},{url:"js/calendar.min.js",revision:"79ed1009cf78b9007e772554f85dc9dc"},{url:"js/extras.js",revision:"08e35129d481f332fab1fcf0dfff3cf5"},{url:"js/jquery-3.5.1.slim.min.js",revision:"fb8409a092adc6e8be17e87d59e0595e"},{url:"js/popper.min.js",revision:"1022eaf388cc780bcfeb6456157adb7d"},{url:"manifest.json",revision:"444ae6506ed7fc4f8e5cd4029392668e"},{url:"package-lock.json",revision:"1771ade2bbc071c3a574882a2ba71584"},{url:"package.json",revision:"b58170a02414473cec895da53207ac19"}],{})}));
//# sourceMappingURL=sw.js.map
