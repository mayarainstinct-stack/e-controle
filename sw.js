// Guarda o app no aparelho pra abrir sem internet.
const CACHE = 'econtrole-v2';
const ARQUIVOS = ['./', 'index.html', 'manifest.json', 'icone-ec.png', 'icone-ec-192.png', 'logo-econtrole.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  // rede primeiro (pega versão nova), cai pro guardado quando estiver sem internet
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
