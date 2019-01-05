<template lang="pug">
    main
      router-view
      utils
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import config from '@root/hydre.toml'

@Component({
  components: {
    utils: () => import('@cmp/utils/index.vue')
  },

  metas() {
    const configLang = config[this.$i18n.locale]

    const og = [
      { property: 'og:description', content: configLang.description },
      { property: 'og:image', content: config.ogImage }
    ]

    const tw = [
      { property: 'twitter:description', content: configLang.description },
      { property: 'twitter:image', content: config.ogImage }
    ]

    config.og.forEach(meta => og.push(meta))
    config.tw.forEach(meta => tw.push(meta))

    return {
      title: configLang.title,
      titleTemplate: eval(configLang.titleTemplate),
      meta: [
        { name: 'description', content: configLang.description },
        { property: 'og:title', content: configLang.ogTitle, template: configLang.ogTemplate },
        { name: 'msapplication-TileColor', content: config.tileColor },
        { name: 'theme-color', content: config.themeColor },
        ...og,
        ...tw
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: config.touchIconSize, href: '<%= BASE_URL %>img/icons/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '<%= BASE_URL %>img/icons/safari-pinned-tab.svg', color: config.maskIconColor }
      ]
    }
  }
})
export default class App extends Vue {
}
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

