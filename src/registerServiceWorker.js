import store from '@core/stores'
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
	register(`${process.env.BASE_URL}sw.js`, {
		ready() {
			console.log('App is being served from cache by a service worker.\n')
		},
		cached() {
			store.dispatch('toasts/notifyCached')
		},
		updated() {
			store.dispatch('toasts/notifyUpdate')
		},
		offline() {
			store.dispatch('toasts/notifyOffline')
		},
		error(error) {
			console.error('Error during service worker registration:', error)
		},
	})
}

export async function skip() {
	if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
		// making sure the serviceworker is ready
		const reg = await navigator.serviceWorker.ready
		if (!reg || !reg.waiting) return;
		reg.waiting.postMessage('skip')
		setTimeout(() => window.location.reload(true), 1000)
	}
}
