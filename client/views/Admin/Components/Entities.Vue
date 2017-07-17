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
					<th>Company Representatives</th>
					<th>actions</th>
				</tr>
				<tr v-for="company in companies">
					<td class="img-cell"><img :src="company.photo ? (restBaseUrl + 'photo/organization/small-' + company.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px !important; height: 40px !important;"></td>
					<td style="">{{company.name}} <span class="badge badge-primary" v-if="company.newOrganization">NEW</span> </td>
					<td style="vertical-align:middle;">
						<div class="btn btn-outline-warning" v-if="company.pending_OrganizationRep" v-for="(rep, index) in company.pending_OrganizationRep">
							<span class="badge badge-primary">NEW REQUEST</span>
							{{rep}}
							<span class="btn btn-warning btn-sm" @click="acceptCompanyRepFromQueue(index, true)">Accept</span>
							<span class="btn btn-danger btn-sm" @click="acceptCompanyRepFromQueue(index, false)">Decline</span>
						</div >
						<div v-for="rep in company.organizationRepEmails">{{rep}}</div >
					</td>
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
			queue_joinCompany: [],
			restBaseUrl: Vue.rest.restBaseUrl,																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;

			Vue.rest.getData('organization','', function(data){
				vm.companies = data

				let _url = vm.restBaseUrl + 'api/admin/getQueue_joinCompany';
				Vue.axios.post(_url)
				.then(function(res){

					let _queue = res.data;
					vm.queue_joinCompany = _queue;

					_.forEach(_queue, function(company_queue){

						let _company_id;
						let _company = _.forEach(vm.companies, function(company, i) {
							let _valid = (company._id == company_queue.user_new_organization_id);
							if(_valid){
								_company_id = i;
							}
						});


						if(_.isUndefined(_company_id)){
							return;
						}

						if(_.isUndefined(_company.pending_OrganizationRep)) {
							Vue.set(vm.companies[_company_id], 'pending_OrganizationRep', [company_queue.user_email]);
						} else {
							vm.companies[_company_id].pending_OrganizationRep.push(company_queue.user_email);
						}
					})

					store.dispatch('showMessage', 'Company Join Queue Updated');
				})
				.catch(function(err){
					console.error(err);
				});
			});

			
		},
		acceptCompanyRepFromQueue: function(_id, _accept){

			let vm = this;
			let _url = vm.restBaseUrl + 'api/admin/joinCompanyRequest';

			let _queue_instance = vm.queue_joinCompany[_id];

			let _data = {
				user_new_organization_id: _queue_instance.user_new_organization_id,
				user_email: _queue_instance.user_email,
				accept: _accept,
			}

			Vue.axios.post(_url, _data)
			.then(function(res){
				console.log(res);
				store.dispatch('showMessage', 'Request of company representative to join, accepted')
				setTimeout(function(){
					vm.getAllData();
				},300);
			})
			.catch(function(err){
				console.error(err);
			});
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