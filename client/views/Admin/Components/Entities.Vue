<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<h4>Entity Editor</h4>
		<div class="section">
			<h4 class="h4-responsive">
				Companies ({{companies.length}})
				<create-company @company-uploaded="companyUploaded"></create-company>
				<a class="btn btn-warning btn-sm" @click="getBulkData('company')">Get raw data</a>
				<a class="btn btn-warning btn-sm" @click="setBulkData('company')">Upload raw data</a>
			</h4>
			<table class="table table-striped table-responsive">
				<tr>
					<th></th>
					<th>Name</th>
					<th>Description</th>
					<th>Company Representatives</th>
					<th>actions</th>
				</tr>
				<tr v-for="company in companies">
					<td class="img-cell"><img :src="company.photo ? (restBaseUrl + 'photo/user/small-' + company.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px !important; height: 40px !important;"></td>
					<td style="">{{company.name}} <span class="badge badge-primary" v-if="company.newOrganization">NEW</span> </td>
					<td style="vertical-align:middle; max-width: 50vw">{{company.description}}</td>
					<td style="vertical-align:middle;"><div v-for="rep in company.organizationRepEmails">{{rep}}</div ></td>
					<td style="">
						<router-link class="btn btn-primary btn-xsm" :to="'/profile/organization/' + company._id">View Company</router-link>
						<a class="btn btn-danger btn-xsm" @click="deleteItem('company', company._id)">Delete</a>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<style>
	.img-cell{
		width: 80px;
	}
</style>
<script>
	
import Vue from 'vue';
import store from 'store';

import CreateCompany from './Dialogs/CreateCompany';

export default {

	components:{
		CreateCompany
	},
	data: ()=>{
		return {
			companies: [],
			restBaseUrl: Vue.rest.restBaseUrl,																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;
			Vue.rest.getData('organization','', function(data){vm.companies = data});
		},
		companyUploaded: function(res){
			this.companies.push(res);
		},
		deleteItem: function(_entity, _id){
			let vm = this;
			let _url = vm.restBaseUrl + 'api/admin/deleteEntry';
			let _data = {
				entity: _entity,
				id: _id
			}

			Vue.axios.post(_url, _data)
			.then(function(res){
				console.log(res);
				store.dispatch('showMessage', 'Company removed')
				setTimeout(function(){
					vm.getAllData();
				},300);
			})
			.catch(function(err){
				console.error(err);
			});

		},
		getBulkData: function(_entity){
			if(_entity == 'company'){
				console.log(JSON.stringify(this.companies));
				
			}
		},
		setBulkData: function(_entity){
			let vm = this;
			let _url = vm.restBaseUrl + 'api/admin/uploadBulkData';

			let _data_string = prompt('Enter the bulk data as a valid JSON string:');
			if(!_data_string){
				store.dispatch('showMessage', 'Updating process interrupted.')
				return;
			}
			let _data = {
				entity: _entity,
				data: JSON.parse(_data_string),
			}

			Vue.axios.post(_url, _data)
			.then(function(res){
				console.log(res);
				store.dispatch('showMessage', 'Company data updated.')
				setTimeout(function(){
					vm.getAllData();
				},300);
			})
			.catch(function(err){
				console.error(err);
			});
		},
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>