const CACHE_NAME = 'resource-cache';

self.addEventListener('install', function(event) {
	caches.open(CACHE_NAME).then(function(cache) {
		return cache.addAll(["index.html"]);
	});
});

const cacheFirst = (request) => {
	return caches.match(request).then((cachedResponse) => {
		if (cachedResponse) {
			return cachedResponse;
		}
		return fetch(request).then((networkResponse) => {
			return caches.open(CACHE_NAME).then((cache) => {
				cache.put(request, networkResponse.clone());
				return networkResponse;
			});
		});
	});
};

self.addEventListener('fetch', (event) => {
	event.respondWith(cacheFirst(event.request));
});

