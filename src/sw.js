workbox.routing.registerRoute(new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'), workbox.strategies.cacheFirst())
workbox.routing.registerNavigationRoute('/index.html', { blacklist: [/img/, /manifest\.json/] })
workbox.precaching.precacheAndRoute(self.__precacheManifest)

self.addEventListener('message', ({ data }) => {
	switch (data) {
		case 'skip':
			self.skipWaiting()
			return
	}
})

// workbox.routing.registerRoute(new RegExp('.jpg$|.png$'), ({ event: { request: req } }) => {
// 	const accept = req.headers.get('accept')
// 	const allowWebp = accept && accept.includes('image/webp')
// 	const url = allowWebp ? req.url.substr(0, req.url.lastIndexOf('.')) + '.webp' : req.url
// 	req.url = url
// 	return caches.match(req) || fetch(url, { mode: 'no-cors' })
// })
