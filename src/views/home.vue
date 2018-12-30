<i18n>
en:
    hello: "Hello World"
fr:
    hello: "Bonjour Morray"
</i18n>

<template lang="pug">
    main
        flat-surface-shader.shader(type="webgl" :light="light" :mesh="mesh")
        p(v-t="'hello'")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Home extends Vue {

  light = {
    count: 2,
    xyScalar: 1,
    zOffset: 276,
    ambient: '#ffffff',
    diffuse: '#002b52',
    speed: .0007,
    autopilot: true,
    draw: true
  }

  mesh = {
    width: 1.2,
    height: 1.5,
    depth: 20,
    segments: 14,
    slices: 10,
    xRange: 0.15,
    yRange: 0.15,
    ambient: '#000000',
    diffuse: '#15639b',
    speed: 0.0007
  }
}
</script>


<style lang="stylus" scoped>
main
  background #212121
  width 100%
  height 150vh
  display flex
  flex-flow column nowrap
  justify-content flex-start
  align-items center

  p
    position absolute
    color white
    top 50%
    opacity .6
    font-weight 900

  .shader
    width 100%
    height 100vh
</style>

