<template src="../templates/gettingstarted.html"></template>
<script>
import Vue from 'vue'
export default{
	data: function(){
		return {
			content: ''
		}
	},
	methods: {
		getAllContent: function(){
			let vm = this;
			let _baseUrl = Vue.rest.restBaseUrl;

			Vue.axios.get(_baseUrl + 'api/home/gettingStarted')
			.then(function(res){
				vm.content = res.data;
			})
			.catch(function(err){console.log(err)})
		}
	},
	mounted: function(){
		this.getAllContent();
	}
}
</script>