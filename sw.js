const CACHE_NAME='pembukuan-pengajian-pwa-v1';
const APP_SHELL=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname.includes('script.google.com')||u.hostname.includes('googleusercontent.com'))return;e.respondWith(caches.match(r).then(cached=>{const net=fetch(r).then(res=>{if(res&&res.ok&&u.origin===self.location.origin){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp));}return res}).catch(()=>cached);return cached||net}))});
