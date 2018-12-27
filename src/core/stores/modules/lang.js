import i18n from '@core/i18n'

const types = {
	UPDATE_LOCALE: 'LOCALE',
}

export const mutations = {
	[types.UPDATE_LOCALE]: (store, lang) => (i18n.locale = lang),
}

export const actions = {
	changeLocale: ({ commit }, lang) => {
		commit(types.UPDATE_LOCALE, lang)
		localStorage.setItem('locale', lang)
	},
}

export const getters = {
	locale: () => i18n.locale,
}
