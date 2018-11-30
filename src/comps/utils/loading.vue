<template lang="pug">
    .loading
        .los
</template>

<style lang="stylus" scoped>
.loading
  display flex
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  z-index 100
  background #212121
  justify-content center
  align-items center

  .los
    width 70px
    position absolute
    height @width
    transform translateY(20px)
    background linear-gradient(180deg, #212121 40%, #EEE)
    clip-path polygon(10% 50%, 50% 100%, 50% 80%, 20% 50%, 50% 20%, 80% 50%, 50% 80%, 50% 100%, 90% 50%, 50% 0)
    animation load 1s ease-in infinite alternate

@keyframes load
  from
    transform translateY(20px) rotateX(0) rotateZ(0) scaleX(2)

  to
    transform translateY(20px) rotateX(30deg) rotateZ(10turn) scaleX(.6)
</style>