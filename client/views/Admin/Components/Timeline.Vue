<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<h4>Timeline</h4>
		<div>
			<div v-for="log in logs">
				{{log.type}} {{log.createdAt}} {{(log.user)?log.user.email:''}}
			</div>
		</div>
	</div>
</template>

<script>
	
import Vue from 'vue';
import store from 'store';

export default {
	data: ()=>{
		return {
			logs: []
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;
			let _baseUrl = Vue.rest.restBaseUrl;

			Vue.axios.get(_baseUrl + 'api/admin/logs')
			.then(function(res){
				console.log('[Admin][Logging]' ,res.data)
				vm.logs = res.data;
			})
			.catch(function(err){console.log(err)})
		}
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>