if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let o={};const c=e=>s(e,f),t={module:{uri:f},exports:o,require:c};i[f]=Promise.all(r.map((e=>t[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-edadad33"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"76f4a1fe2975cb5965e6cbe997b383f1"},{url:"css/bootstrap.min.css",revision:"e451b87914db6243b6afa3c5e484ec16"},{url:"css/styles.css",revision:"205b4bbf66147235dd591c8c9c5a652f"},{url:"img/apple-touch-icon.png",revision:"1a54920c0f1e458ad4f1aba4a4909b18"},{url:"img/check.svg",revision:"e57646bf81e25f195d079a5fd65a682c"},{url:"img/icon-192.png",revision:"1e3f694a74984dadb62bdc216f7f0f4f"},{url:"img/icon-512.png",revision:"2b654cc1d593ef9f6ff6811d5889d4e9"},{url:"img/icon.svg",revision:"b063a1d3ba1858330916ad6644aea96c"},{url:"index.html",revision:"2033588a0f23f68b843e90213227b318"},{url:"js/bootstrap.bundle.min.js",revision:"715756e65b9ff107f4cf927e3e8bbf76"},{url:"js/calendar.min.js",revision:"3724626a99aeed849f9f0d350fb43a4f"},{url:"js/registerSW.js",revision:"403035ad56ee65583062726f12f55a08"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
