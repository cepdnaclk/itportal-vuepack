<template src="views/templates/home.html"></template>
<style scoped>
	.hover-link{
		cursor: pointer;
	}
</style>
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
		    },
		    content: {}
		}
	},
	methods: {
		moment: function(date){
			return moment(date).format('LL');
		},
	},
	mounted: function(){
		let _baseUrl = Vue.rest.restBaseUrl;
		let vm = this;

		Vue.axios.get(_baseUrl + 'api/home/getData')
		.then(function(res){
			let _data = res.data;
			vm.counts = _data.count;
			vm.content = _data.content;
			console.log(_data);
		})
		.catch(function(err){console.log(err)})
	}
}
</script>
