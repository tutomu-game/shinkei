const CACHE = "shinkei-v45";
const FILES = ["./img/abyss.webp","./img/aya.webp","./img/blaze.webp","./img/chrono.webp","./img/flora.webp","./img/gaia.webp","./img/gareth.webp","./img/garuze.webp","./img/ginga.webp","./img/gold.webp","./img/knez.webp","./img/leviathan.webp","./img/lumi.webp","./img/luna.webp","./img/mite.webp","./img/mordre.webp","./img/nemea.webp","./img/nerga.webp","./img/nihil.webp","./img/popo.webp","./img/serena.webp","./img/shadow.webp","./img/silva.webp","./img/sol.webp","./img/terra.webp","./img/valdora.webp","./img/vamp.webp","./img/walta.webp","./img/yoru.webp","./img/yoru2.webp","./img/zeno.webp","./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// ネットワーク優先：オンラインなら常に最新、オフラインならキャッシュ
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return res; }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
});
