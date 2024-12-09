self.addEventListener('install', (event) => {
    console.log('Instalando Service Worker...');
    event.waitUntil(
        caches.open('v1').then((cache) => {
            console.log('Abrindo cache...');
            return cache.addAll([
                '/',
                '/login/assets/style.css',
                '/login/assets/script.js',
                '/icons/bolinhapraioou.svg',
            ]);
        }).catch((error) => {
            console.error('Erro ao adicionar ao cache:', error);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Interceptando fetch para:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
