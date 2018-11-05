import Vue from 'vue'
import Router from 'vue-router'
import loading from '@cmp/loading.vue'
import error from '@cmp/error.vue'

Vue.use(Router)

function lazyLoadView(view) {
	const AsyncHandler = () => ({
		component: import(/* webpackChunkName: "view-[request]" */ `@v/${view}.vue`),
		loading,
		error, // TODO
		delay: 200,
		timeout: 10000, // TODO
	})

	return Promise.resolve({
		functional: true,
		render(h, { data, children }) {
			return h(AsyncHandler, data, children)
		},
	})
}

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => lazyLoadView('home'),
		},
		{
			path: '*',
			name: '404',
			component: () => lazyLoadView('404'),
		},
	],
})
