if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let f={};const o=e=>s(e,c),d={module:{uri:c},exports:f,require:o};i[c]=Promise.all(r.map((e=>d[e]||o(e)))).then((e=>(n(...e),f)))}}define(["./workbox-bf4b2f60"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"10d8e27063a5396ead75fed8dbcf8738"},{url:"css/bootstrap.min.css",revision:"e451b87914db6243b6afa3c5e484ec16"},{url:"css/styles.css",revision:"77bab33bb7fc22fb34ff5ae4aa98c572"},{url:"img/app-icon-144.png",revision:"561d15ec76e892d1fded25e32a71f272"},{url:"img/app-icon-168.png",revision:"16825f96bced58e72fe184f6d560fc56"},{url:"img/app-icon-192.png",revision:"8698d0a9163f5f8edf28070b1a506b09"},{url:"img/app-icon-48.png",revision:"b7a23f7e19c2b1f6b6e774c742aa6809"},{url:"img/app-icon-512.png",revision:"3d68a04ed65b1ce668b3d76454fe4a18"},{url:"img/app-icon-72.png",revision:"f64362b5a50a70b81de91e723ef1426e"},{url:"img/app-icon-96.png",revision:"db638ad0321e46cc0f80a2b57432d65d"},{url:"img/check.svg",revision:"e57646bf81e25f195d079a5fd65a682c"},{url:"img/icon-192.png",revision:"e59506221ef7f3b527d1b3b308d8c80d"},{url:"img/icon.png",revision:"bedcf43461c4204ddd5c5b984bf8cec7"},{url:"img/maskable-icon.png",revision:"ce4596d5d63581915fe2b929edf2fd12"},{url:"index.html",revision:"517ec8c33f5235b41e5f2c546dd89c9a"},{url:"js/bootstrap.bundle.min.js",revision:"715756e65b9ff107f4cf927e3e8bbf76"},{url:"js/calendar.min.js",revision:"82801850cfc75778e110f2b4e5733fbb"},{url:"js/registerSW.js",revision:"403035ad56ee65583062726f12f55a08"},{url:"report/updated_sources/css/styles.css",revision:"433636282435d9f7eda9919c9051099d"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
