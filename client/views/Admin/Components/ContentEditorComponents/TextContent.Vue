<template>
	
	<div class="mt-2">
		<h4>Text Content</h4>
		<form @submit.prevent="addNewContent">
			<input type="text" v-model="newTextContent.label">
			<textarea v-model="newTextContent.value"></textarea>
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
					<td><input type="text" v-model="content.value"></td>
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
			contents:{},
			newTextContent:{
				label: '',
				value: '',
			},
		}
	},
	methods: {
		addNewContent: function(){

			if(this.newTextContent.label){
				this.contents.push(this.newTextContent);

				this.resetNewContent()
				return;
			}


		},
		resetNewContent: function(){

			this.newTextContent = {
				label: '',
				value: '',
			};

		},
		getNewContent: function(){
			let vm = this;
			let _baseUrl = Vue.rest.restBaseUrl;

			let _url = _baseUrl + 'api/admin/content/text';

			Vue.axios.get(_url)
			.then(function(res){
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

					let _url = _baseUrl + 'api/admin/update/text';
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