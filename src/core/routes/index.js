import Vue from 'vue'
import Router from 'vue-router'
import loading from '@cmp/utils/loading.vue'
import error from '@cmp/utils/loading.vue'
import Routes from '@core/routes/routes'

Vue.use(Router)

function lazyLoadView(view) {
	const AsyncHandler = () => ({
		component: import(/* webpackChunkName: "view-[request]" */ `@v/${view}.vue`),
		loading,
		error,
		delay: 200,
		timeout: 10000,
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
	routes: Routes(lazyLoadView),
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				offset: { x: 0, y: 0 },
			}
		}
		if (savedPosition) return savedPosition
		return { x: 0, y: 0 }
	},
})
