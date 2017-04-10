<template src="views/templates/home.html"></template>

<script>
import Vue from 'vue';
import AppHeaderLinks from 'components/Navigation/AppHeaderLinks'
export default {
	components:{
		AppHeaderLinks
	},
	data() {
		return {
			state: this.$store.state
		}
	}
}
</script>
