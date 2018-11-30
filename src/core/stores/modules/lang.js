import i18n from '@core/i18n'

const types = {
	UPDATE_LOCALE: 'LOCALE',
}

export const state = {
	locale: 'en',
}

export const mutations = {
	[types.UPDATE_LOCALE]: (store, lang) => (store.locale = lang),
}

export const actions = {
	changeLocale: ({ commit }, lang) => {
		commit(types.UPDATE_AVAILABLE, lang)
		localStorage.setItem('locale',lang)
		i18n.locale = lang
	}
}

export const getters = {
	locale: ({ locale }) => locale,
}