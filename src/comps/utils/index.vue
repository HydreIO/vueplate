<template lang="pug">
    .utils
        return-to-top(v-if="$mq==='lg'")
        toasts
        langs
</template>

<script>

export default {
  components: {
    returnToTop: () => import('@cmp/nav/returnToTop.vue'),
    toasts: () => import('@cmp/modals/toasts.vue'),
    langs: () => import('@cmp/utils/langs.vue')
  }
}
</script>
