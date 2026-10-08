const CACHE_NAME = 'audiobooks-v2';
const ASSETS = [
	'./',
	'./index.html',
	'./style.css',
	'./manifest.json',
	'./icon-192.png',
	'./icon-512.png'
];

// Установка: кладём все файлы в кэш
self.addEventListener('install', event => {
	// event.waitUntil(
	// 	caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
	// ); пропускаем режим ожидания, сразу активируем новый
	self.skipWaiting();
});

// Активация: чистим старые кэши
self.addEventListener('activate', event => {
	event.waitUntil(
		/*caches.keys().then(keys =>
			Promise.all(
				keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
			)
		)*/
	self.clients.claim()
	);
});

// Запросы: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
	if (event.request.method !== 'GET') return;
	event.respondWith(
		caches.match(event.request).then(cached => cached || fetch(event.request))
	);
});