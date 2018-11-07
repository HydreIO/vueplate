<template lang="pug">
    ic(:icon="icon")
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {  } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faBars, faUser, faSearch)

export default {
	props: ['fas', 'far', 'fab'],
	computed: {
		icon() {
			return ['fas', 'far', 'fab'].map(e => [e, this[e]]).find(e => e[1])
		},
	},
	components: {
		ic: FontAwesomeIcon,
	},
}
</script>

