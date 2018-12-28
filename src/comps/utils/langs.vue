<template lang="pug">
    .langsSelec(v-if="$mq==='lg'")
        span(@click="changeLocale('fr')" :class="{'selected': $i18n.locale === 'fr'}") FR
        .sep
        span(@click="changeLocale('en')" :class="{'selected': $i18n.locale === 'en'}") EN
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'

const lang = namespace('lang')

@Component
export default class LangSelect extends Vue {
  @lang.Action changeLocale

}
</script>

<style lang="stylus" scoped>
.langsSelec
  display flex
  flex-flow row nowrap
  justify-content space-evenly
  width 100px
  position fixed
  top 50%
  z-index 99
  opacity .6
  transform rotate(-90deg) translateY(-25px)

  .sep
    width 1px
    background gold

  span
    font-size .875em
    font-weight 600
    color white
    cursor pointer
    opacity .5
    transition opacity 300ms

    &.selected
      opacity 1
</style>