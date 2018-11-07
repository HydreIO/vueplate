import Vue from 'vue'
import App from '@/sidy.vue'
import router from '@/router'
import VueMq from 'vue-mq'
import Ripple from 'vue-ripple-directive'
import VueWaypoint from 'vue-waypoint'
import Webp from '@core/webpDirective'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Icons from '@cmp/icons.vue'
import store from '@/store'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.directive('webp', Webp)
Vue.directive('rp', Ripple)
Vue.component('fa', Icons)
Vue.use(VueWaypoint)
Vue.use(VueMq, {
	breakpoints: {
		sm: 700,
		lg: Infinity,
	},
})

new Vue({
	router,
	methods: {
		// litle npm script to disable body scroll on all devices (because those IOS suckers think different)
		lockScroll: el => disableBodyScroll(el),
		unlockScroll: el => enableBodyScroll(el),
	},
	store,
	render: h => h(App),
}).$mount('#app')
