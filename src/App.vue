<template lang="pug">
    main
      router-view
      utils
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    utils: () => import('@cmp/utils/index.vue')
  }
})
export default class App extends Vue { }
</script>

<style lang="stylus">
@require '~@stl/utils'
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800')

:root
  font-size 18px

*
  sc-reset()
  font-family 'Open Sans', sans-serif
  outline none
  scroll-behavior smooth

  &::-webkit-scrollbar-track
    box-shadow inset 0 0 6px rgba(0, 0, 0, .3)
    background-color #555

  &::-webkit-scrollbar
    width 12px
    background-color #F5F5F5

  &::-webkit-scrollbar-thumb
    box-shadow inset 0 0 6px rgba(0, 0, 0, .3)
    background-color #252525

  a
    :active
      color #e1c79b
      fill #e1c79b
</style>
