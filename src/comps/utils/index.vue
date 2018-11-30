<template lang="pug">
    .utils
        return-to-top(v-if="$mq==='lg'")
        toasts
</template>

<script>

export default {
    components: {
		returnToTop: () => import('@cmp/nav/returnToTop.vue'),
		toasts: () => import('@cmp/modals/toasts.vue'),
    }
}
</script>
