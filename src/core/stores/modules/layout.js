const types = {
	LOADING: 'LOADING'
}

export const state = {
	loading: false
}

export const mutations = {
	[types.LOADING]: (store, val) => (store.loading = val)
}

export const actions = {
	showLoading: ({ commit }, val) => commit(types.LOADING, val)
}

export const getters = {
	isLoading: ({ loading }) => loading
}
