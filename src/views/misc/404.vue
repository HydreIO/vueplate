<template lang="pug">
    .container(:class="$mq")
        h1(:class="$mq" ref="smile" :style="`transform: translate(${deltaX}px,${deltaY}px) rotate(60deg)`") :(
        span 404
        p The page was not found&nbsp!
        router-link.link(:to="'/'" :class="$mq") Return Home
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import dyn from 'dynamics.js'
import { touchListen, touchRemove } from '@core/misc/touch'

@Component
export default class e404 extends Vue {
  deltaX = 0
  deltaY = 0

  drag = {
    active: false,
    lastX: 0,
    lastY: 0,
    offsetX: 0,
    offsetY: 0,
  }

  dragMove(e) {
    if (!this.drag.active) {
      this.drag.active = this.smile.contains(e.target)
      this.drag.lastX = e.touches[0].pageX
      this.drag.lastY = e.touches[0].pageY
    } else {
      const x = this.drag.lastX - e.touches[0].pageX
      const y = this.drag.lastY - e.touches[0].pageY
      const sizeX = window.innerWidth
      const sizeY = window.innerHeight

      this.drag.offsetX -= x / 5
      this.drag.offsetY -= y / 5

      this.drag.lastX = e.touches[0].pageX
      this.drag.lastY = e.touches[0].pageY
    }
  }

  dragEnd(e) {
    if (this.drag.active) {
      dyn.animate(
        this.smile,
        {
          translateX: 0,
          translateY: 0,
        },
        {
          type: dyn.spring,
          duration: 600,
          frequency: 423,
          friction: 300,
        },
      )
      this.drag.offsetX = 0
      this.drag.offsetY = 0
      this.drag.active = false
    }
  }

  get smile() {
    return this.$refs.smile
  }

  get style() {
    return this.$mq === 'lg' ?
      `transform: translate(${this.deltaX}px,${this.deltaY}px) rotate(30deg)` :
      `transform: translate(${this.drag.offsetX}px,${this.drag.offsetY}px)`
  }

  onMove({ screenX, screenY }) {
    if (this.lastX !== undefined && this.lastY !== undefined) {
      this.deltaX += (this.lastX - screenX) * 0.03
      this.deltaY += (this.lastY - screenY) * 0.03
    }
    this.lastX = screenX
    this.lastY = screenY
  }

  mounted() {
    if (this.$mq === 'sm') touchListen(null, this.dragMove, this.dragEnd)
    else window.addEventListener('mousemove', this.onMove, { passive: true })
  }

  beforeDestroy() {
    touchRemove(null, this.dragMove, this.dragEnd)
    window.removeEventListener('mousemove', this.onMove)
  }
}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'

.container
  transition font-size 300ms
  font-size .6rem
  display grid
  place-content center center
  text-align center
  background #F5F5F5
  width 100%
  height 100vh
  grid 'sign_lg sign' max-content '. nt' max-content '. nf' max-content '. btn' max-content / max-content max-content
  grid-column-gap 1em
  text-transform uppercase
  color #424242

  &.lg
    font-size 1rem

  :first-child
    font-size 8em
    color #1565C0
    grid-area sign
    place-self start start

    &.lg
      grid-area sign_lg

  :nth-child(2)
    font-size 8em
    font-weight 800
    grid-area nt
    place-self center start

  :nth-child(3)
    font-size 1.5em
    grid-area nf
    place-self start start
    margin-bottom 1em
    text-align start

  :nth-child(4)
    width 100%
    font-size 1.2em

    &.lg
      width fit-content
      font-size 1em

    grid-area btn
    place-self start end
    border 1px solid #1565C0
    border-radius 1px
    padding .6em 1.5em
    font-weight 400
    text-decoration none
    color #424242
    material(1)
</style>
