<template lang="pug">
    transition(name="toast")
        .toast(:class="[$mq, pos]")
            slot
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {
  @Prop(String) pos
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
  max-width 400px
  display flex
  justify-content center
  align-items center
  border-radius 5px
  opacity 1
  font-weight 300
  font-size .875em

  &.top-full
    top 0
    width 100%
    border-radius 0
    max-width 100%
    bottom auto

    &.toast-enter, &.toast-leave-to
      bottom auto
      top -10px

  &.sm
    width 100vw
    bottom 0
    border-radius 0
    &.top-full
      top 0
      width 100%
      border-radius 0
      max-width 100%
      bottom auto

  &.toast-enter-active, &.toast-leave-active
    transition all 600ms ease-in-out

  &.toast-enter, &.toast-leave-to
    opacity 0
    bottom -10px
</style>