<i18n>
en:
    text: "No internet connection, you are now in offline mode"
fr:
    text: "Aucune connexion internet, vous êtes maintenant en mode hors ligne"
</i18n>

<template lang="pug">
    toast.t(v-if="toastOffline")
        p(v-t="'text'")
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
    @toasts.Getter toastOffline
}
</script>