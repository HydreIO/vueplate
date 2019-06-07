import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
	en: {},
	fr: {}
}

export function addTranslations({en={},fr={}}) {
	Object.assign(messages.en, en)
	Object.assign(messages.fr, fr)
}

export default new VueI18n({
	locale:
		localStorage.getItem('locale') ||
		(navigator.languages ? navigator.languages[0] : navigator.language).substring(0, 2),
	fallbackLocale: 'en',
	messages,
	missing: (locale, key) => {
		console.log(`translation missing: locale=${locale}, key=${key}`)
	}
})