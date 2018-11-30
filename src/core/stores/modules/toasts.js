const TOAST_EXPIRATION = 4000

const types = {
	UPDATE_AVAILABLE: 'NEW_UPDATE',
	OFFLINE_USE: 'OFFLINE',
	CACHED: 'CACHED',
}

export const state = {
	newUpdate: false,
	offlineMode: false,
	contentCached: false,
}

export const mutations = {
	[types.UPDATE_AVAILABLE]: (store, val) => (store.newUpdate = val),
	[types.OFFLINE_USE]: (store, val) => (store.offlineMode = val),
	[types.CACHED]: (store, val) => (store.contentCached = val),
}

export const actions = {
	notifyUpdate: ({ commit }, val = true) => commit(types.UPDATE_AVAILABLE, val),
	notifyOffline: ({ commit }) => {
		commit(types.OFFLINE_USE, true)
		setTimeout(() => commit(types.OFFLINE_USE, false), TOAST_EXPIRATION)
	},
	notifyCached: ({ commit }) => {
		commit(types.CACHED, true)
		setTimeout(() => commit(types.CACHED, false), TOAST_EXPIRATION)
	},
}

export const getters = {
	toastUpdate: ({ newUpdate }) => newUpdate,
	toastOffline: ({ offlineMode }) => offlineMode,
	toastCached: ({ contentCached }) => contentCached,
}
