<template>
	
	<div class="mt-2">
		<h4>Date Content</h4>
		<form @submit.prevent="addNewContent">
			<input type="text" v-model="newDateContent.label">
			<input type="date" v-model="newDateContent.value">
			<button>Add Content</button>
		</form>
		<div>
			<table>
				<tr>
					<th>Label</th>
					<th>Value</th>
				</tr>
				<tr v-for="content in contents">
					<td><input type="text" v-model="content.label"></td>
					<td><input type="date" v-model="content.value"></td>
				</tr>
			</table>
		</div>
	</div>

</template>


<script>
	
import Vue from 'vue';
import store from 'store';
import _ from 'lodash';

export default {
	data: ()=>{
		return {
			contents:{},
			newDateContent:{
				label: '',
				value: new Date(),
			},
		}
	},
	methods: {
		addNewContent: function(){

			if(this.newDateContent.label){
				this.contents.push(this.newDateContent);

				this.resetNewContent()
				return;
			}


		},
		resetNewContent: function(){

			this.newDateContent = {
				label: '',
				value: '',
			};

		},
		getNewContent: function(){
			let vm = this;
			let _baseUrl = Vue.rest.restBaseUrl;

			let _url = _baseUrl + 'api/admin/content/date';

			Vue.axios.get(_url)
			.then(function(res){

				_.forEach(res.data, function(o){
					o.value = moment(o.value).format('YYYY-MM-DD');
				})
				
				console.log(res.data);
				vm.contents = res.data;
			})
			.catch(function(err){console.log(err)})
		}
	},
	watch: {
		contents: {
			handler:_.debounce(function(data){
					console.log('[ADMIN][update] data::', data)

					let _baseUrl = Vue.rest.restBaseUrl;

					let _url = _baseUrl + 'api/admin/update/date';
					let _data = data;

					console.log('[ADMIN][update]', _data)

					Vue.axios.post(_url, {data:_data})
					.then(function(res){
						console.log(res.data);
					})
					.catch(function(err){console.log(err)})
				},1000),
			deep: true
		}
	},
	mounted: function(){
		this.getNewContent();
	}
}
</script>