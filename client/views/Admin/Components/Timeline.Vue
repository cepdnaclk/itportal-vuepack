<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<h4>Timeline</h4>
		<div>
			<table class="table table-sm">
				<tr>
					<th>Time</th>
					<th>Event</th>
					<th>User</th>
				</tr>
				<tr v-for="log in logs">	
					<td>{{moment(log.createdAt)}}</td>
					<td>{{log.type}}</td>
					<td>{{(log.user)?log.user.email:''}}</td>
				</tr>
			</table>
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

			store.dispatch('showLoader', 'Retrieving timeline..');

			Vue.axios.get(_baseUrl + 'api/admin/logs')
			.then(function(res){
				console.log('[Admin][Logging]' ,res.data)
				vm.logs = res.data;

				store.dispatch('hideLoader');
			})
			.catch(function(err){console.log(err)})
		},
        moment: function(date){
            return moment(date).calendar();
        },
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>