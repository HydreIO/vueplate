<template lang="pug">
    .toasts
        toast-update
        toast-offline
        toastCached
        cookies
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
	components: {
		toastOffline: () => import('@cmp/modals/offlineMode.vue'),
		toastUpdate: () => import('@cmp/modals/updateFound.vue'),
		toastCached: () => import('@cmp/modals/contentCached.vue'),
		cookies: () => import('@cmp/modals/cookies.vue')
	}
})
export default class Toasts extends Vue { }
</script>