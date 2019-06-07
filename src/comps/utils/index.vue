<template lang="pug">
    .utils
        return-to-top(v-if="$mq==='lg'")
        transition(name="load")
          manual-loading.load(v-if="isLoading")
</template>

<script>
	import { Vue, Component } from 'vue-property-decorator'
	import { namespace } from 'vuex-class'

	const lay = namespace('layout')

	@Component({
		components: {
			returnToTop: () => import('@cmp/nav/returnToTop.vue'),
			manualLoading: () => import('./loading.vue')
		}
	})
	export default class Sign extends Vue {

		@lay.Getter isLoading
	}
</script>

<style lang="stylus" scoped>
.load-enter-active, .load-leave-active
	transition opacity 400ms

.load-enter, .load-leave-to
	opacity 0
</style>
