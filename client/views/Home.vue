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
			state: this.$store.state,
			counts: {
		        students: 0,
		        companies: 0,
		        students_selected: 0,
		    }
		}
	},
	mounted: function(){
		let _baseUrl = Vue.rest.restBaseUrl;
		let vm = this;

		Vue.axios.get(_baseUrl + 'api/home/getCounts')
		.then(function(res){
			let _counts = res.data;
			vm.counts = _counts;
		})
		.catch(function(err){console.log(err)})
	}
}
</script>
