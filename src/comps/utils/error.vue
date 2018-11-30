<i18n>
en:
    err: "Something went wrong"
fr:
    err: "Une erreur est survenue"
</i18n>

<template lang="pug">
    .error
        fa(fas="times" size="6x")
        h1 Oooups
        p(v-t="'err'") 
        iframe(title="google dino game" v-if="$mq === 'lg'" src="http://wayou.github.io/t-rex-runner/" scrolling="no")
</template>

<style lang="stylus" scoped>
.error
  position fixed
  z-index 100
  width 100%
  height 100%
  top 0
  left 0
  background #EEE
  display flex
  flex-flow column nowrap
  justify-content center
  align-items center

  >:first-child
    color #212121

    @media screen and (min-width: 815px)
      transform translate(-150px, -50px) rotate(15deg)

  h1
    font-weight 700
    font-size 4em
    color #b71c1c

  p
    font-weight 300
    color #212121
    padding-bottom 2em

  iframe
    width 600px
    height auto
    border none
</style>
