<template>
<div class="fluid-container p-2">
	<h1 class="h1-responsive">Admin Dashboard</h1>
	<div class="fluid-container white lighten-5 p-2">
		<div class="section">
			<h4>Students {{students.length}}</h4>
			<div>
				<div v-for="student in students">{{student.email}}</div >
			</div>
		</div>
		<div class="section">
			<h4>Companies {{companies.length}}</h4>
			<div>
				<div v-for="company in companies">{{company.name}}</div >
			</div>
		</div>
		<div class="section">
			<h4>Company Representatives {{companyReps.length}}</h4>
			<div>
				<div v-for="companyRep in companyReps">{{companyRep.email}}</div >
			</div>
		</div>
		<div class="section">
			
			<h4>All users {{allUsers.length}}</h4>
			<div>
				<div v-for="user in allUsers">{{user.email}}:: {{user.name}}</div >
			</div>
		</div>
		<div class="section">
			
			<h4>Company Preferences {{companyPreferences.length}}</h4>
			<div>
				<div v-for="pref in companyPreferences">{{pref}}</div >
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
	
</style>

<script>
	
import Vue from 'vue';
import store from 'store';

export default {
	data: () => {
		return {
			companies: [],
			students: [],
			companyReps: [],
			allUsers: [],
			companyPreferences: [],
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;
			Vue.rest.getData('organization','', function(data){vm.companies = data});
			Vue.rest.getData('student','', function(data){vm.students = data});
			Vue.rest.getData('organizationRep','', function(data){vm.companyReps = data});
			Vue.rest.getData('user','', function(data){vm.allUsers = data});

            let _baseURL = Vue.rest.restBaseUrl;
			Vue.axios.get(_baseURL + 'api/admin/companyPreferences')
            .then(function(res){

                let _company_preferences = res.data;
                if(!_company_preferences){
                    return;
                }

               console.log('_company_preferences', _company_preferences);
                
                vm.companyPreferences = _company_preferences;
                store.dispatch('showMessage', 'Retrieved existing student preferences')
                
            })
		}
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>