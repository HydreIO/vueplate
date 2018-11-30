<i18n>
en:
    off: "Ready to work offline"
fr:
    off: "Prêt à fonctionner hors ligne"
</i18n>

<template lang="pug">
    toast.t(v-if="toastCached")
        p(v-t="'off'")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'

const toasts = namespace('toasts')

@Component({
  components: {
    toast: () => import('@cmp/modals/toast.vue')
  }
})
export default class Update extends Vue {
  @toasts.Getter toastCached
}
</script>