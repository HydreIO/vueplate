<i18n>
en:
    update: "A new update is available ! please refresh the page to get the latest version"
fr:
    update: "Une mise à jour est disponible ! Veuillez recharger la page pour profiter de la nouvelle version"
</i18n>

<template lang="pug">
    transition(name="toast")
        .toast(v-if="toastUpdate" :class="$mq")
            p(v-t="'update'")
            span(@click="updateWorker()") Refresh
            span(@click="notifyUpdate(false)") Dismiss
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action, namespace } from 'vuex-class'
import { skip } from '@/registerServiceWorker'

const toasts = namespace('toasts')

@Component
export default class Update extends Vue {

  @toasts.Getter toastUpdate
  @toasts.Action notifyUpdate

  updateWorker() {
    skip()
  }
}
</script>


<style lang="stylus" scoped>
.toast
  position fixed
  z-index 9999999999
  bottom 20px
  left 50vw
  transform translateX(-50%)
  background #212121
  color #EEE
  padding 1em
  display grid
  width 450px
  grid-template-columns 1fr repeat(2, max-content)
  grid-template-rows auto
  place-items center center
  border-radius 5px
  grid-gap 1em
  opacity 1

  &.sm
    width 100vw
    bottom 0
    border-radius 0
    grid 't r' 1fr 't d' 1fr / 70% max-content
    justify-content space-evenly

    p
      grid-area t

    span:first-of-type
      grid-area r

  &.toast-enter-active, &.toast-leave-active
    transition all 600ms ease-in-out

  &.toast-enter, &.toast-leave-to
    opacity 0
    bottom -10px

  p
    font-weight 300
    font-size .875em

  span
    font-weight 700
    color #AB47BC
    font-size .95em
    opacity .7
    cursor pointer
    text-transform uppercase

    &:hover
      text-decoration underline
      opacity 1
</style>