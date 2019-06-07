import { register } from 'register-service-worker'
import i18n, { addTranslations } from '@core/i18n'
import Vue from 'vue'

addTranslations({
	en: {
		sw: {
			off: 'Ready to work offline',
			update: 'A new update is available ! please refresh the page to get the latest version',
			offline: 'No internet connection, you are now in offline mode'
		}
	},
	fr: {
		sw: {
			off: 'Prêt à fonctionner hors ligne',
			update:
				'Une mise à jour est disponible ! Veuillez recharger la page pour profiter de la nouvelle version',
			offline: 'Aucune connexion internet, vous êtes maintenant en mode hors ligne'
		}
	}
})

if (process.env.NODE_ENV === 'production') {
	register(`${process.env.BASE_URL}sw.js`, {
		ready() {
			console.log('App is being served from cache by a service worker.\n')
		},
		cached() {
			Vue.toasted.show(i18n.t('sw.off'), { icon: 'cloud_done' })
		},
		updated() {
			Vue.toasted.show(i18n.t('sw.update'), {
				duration: null,
				icon:'cloud_download',
				action: [
					{
						text: 'Refresh',
						async onClick() {
							await skip()
						}
					},
					{
						text: 'Dismiss',
						onClick(_, toast) {
							toast.goAway(100)
						}
					}
				]
			})
		},
		offline() {
			Vue.toasted.show(i18n.t('sw.offline'), { icon: 'airplanemode_active' })
		},
		error(error) {
			console.error('Error during service worker registration:', error)
		}
	})
}

export async function skip() {
	if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
		// making sure the serviceworker is ready
		const reg = await navigator.serviceWorker.ready
		if (!reg || !reg.waiting) return
		reg.waiting.postMessage('skip')
		setTimeout(() => window.location.reload(true), 1000)
	}
}
