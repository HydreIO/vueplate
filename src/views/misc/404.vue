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

@Component
export default class e404 extends Vue {
    deltaX = 0
    deltaY = 0

    onMove({ screenX, screenY }) {
        if (this.lastX !== undefined && this.lastY !== undefined) {
            this.deltaX += (this.lastX - screenX) * 0.03
            this.deltaY += (this.lastY - screenY) * 0.03
        }
        this.lastX = screenX
        this.lastY = screenY
    }

    mounted() {
        window.addEventListener('mousemove', this.onMove,{passive: true})
    }

    beforeDestroy() {
        window.removeEventListener('mousemove', this.onMove)
    }
}
</script>


<style lang="stylus" scoped>
@require '~@stl/palette'
@require '~@stl/material'

.container
    transition font-size 300ms
    font-size .6rem
    display grid
    place-content center center
    text-align center
    background palette(1)
    width 100%
    height 100vh
    grid 'sign_lg sign' max-content '. nt' max-content '. nf' max-content '. btn' max-content / max-content max-content
    grid-column-gap 1em
    text-transform uppercase
    color palette(3)

    &.lg
        font-size 1rem

    :first-child
        font-size 8em
        color palette(2)
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
        border 1px solid palette(2)
        border-radius 1px
        padding .6em 1.5em
        font-weight 400
        text-decoration none
        color palette(3)
        material(1)
</style>
