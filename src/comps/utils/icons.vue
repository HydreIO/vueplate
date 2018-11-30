<template lang="pug">
	//- wrapping in a icon so i can use font-size to scale 
	i 
		ic(:icon="icon" :size="size")
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Vue, Component, Prop } from 'vue-property-decorator'

library.add(faTimes)

@Component({
  components: {
    ic: FontAwesomeIcon,
  }
})
export default class Icons extends Vue {
  @Prop(String) fas
  @Prop(String) fab
  @Prop(String) far
  @Prop({ default: 'sm' }) size

  get icon() {
    return ['fas', 'far', 'fab'].map(e => [e, this[e]]).find(e => e[1])
  }
}
</script>