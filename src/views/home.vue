<i18n>
en:
    hello: "Hello World"
fr:
    hello: "Bonjour Morray"
</i18n>

<template lang="pug">
    main
        p(v-t="'hello'")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>


<style lang="stylus" scoped>
main
  background #212121
  width 100%
  height 100vh
  display flex
  justify-content center
  align-items center

  p
    color white
</style>

