import Vue from 'vue'
import App from '@/App.vue'
import './registerServiceWorker'
import router from '@core/routes'
import VueMq from 'vue-mq'
import Ripple from 'vue-ripple-directive'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import store from '@core/stores'
import Icons from '@cmp/utils/icons.vue'
import aos from 'aos'
import SmoothScroll from 'smoothscroll-for-websites'
import i18n from '@core/i18n'
import '@core/misc/scrollFire' // init
import 'aos/dist/aos.css'
import FlatSurfaceShader from 'vue-flat-surface-shader'

Vue.config.productionTip = false

Vue.directive('rp', Ripple)
Vue.component('fa', Icons)
Vue.use(FlatSurfaceShader)
Vue.use(VueMq, {
  breakpoints: {
    sm: 813, // iphoneX max
    lg: Infinity,
  },
})

aos.init({
  offset: 200,
  duration: 1000,
  easing: 'ease-in-sine',
  delay: 100,
  disable: () => window.innerWidth < 814,
  anchorPlacement: 'top-bottom'
})

new Vue({
	router,
	i18n,
	methods: {
		// litle npm script to disable body scroll on all devices (because those IOS suckers think different)
		lockScroll: el => disableBodyScroll(el),
		unlockScroll: el => enableBodyScroll(el),
	},
	store,
	mounted() {
		SmoothScroll({
			animationTime: 700,
			accelerationDelta: 30,
			accelerationMax: 3,
		  })
	},
	render: h => h(App),
}).$mount('#app')
