<template>
	
	<div class="fluid-container white lighten-5 p-2">
		
		<h4>Student Allocation
			<div class="d-inline small float-right" v-if="preferencesChanged">
				There are changes in preferences, not applied yet <a class="btn btn-warning"  @click="applyAdminPreferences">Save Preferences</a>
			</div>
		</h4>

		<div class="section col">
				
				<h4 class="h4-responsive">Company Preferences ({{companyPreferences.length}} records)</h4>
				<div>

					<h4>By Company</h4>
					<div v-for="(preference, index) in preferenceByCompany">

						<h5>{{preference[0].organization.name}}</h5>
						
						<table class="table table-sm">
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Preference</th>
								<th>Actions</th>
							</tr>
							<tr v-for="(pref, i) in preference">
								<td class="small">{{i+1}}</td>
								<td>{{pref.user.name}}</td>
								<td>{{pref.preference + 1}}</td>
								<td>
									<a @click="toggleAdminPreference(pref._id)"
										class="btn btn-sm"
										:class="{
											'btn-primary':pref.admin_approved,
											'btn-warning':!pref.admin_approved
										}">
										<i class="material-icons">{{(pref.admin_approved)?'done':'add'}}</i>
									</a>
								</td>
								</tr>
						</table>
					</div >

					<h4>By Student</h4>
					<div v-for="(preference, index) in preferenceByUser">

						<h5>{{preference[0].user.name}}</h5>
						
						<table class="table table-sm">
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Preference</th>
								<th>Actions</th>
							</tr>
							<tr v-for="(pref, i) in preference">
								<td class="small">{{i+1}}</td>
								<td>{{pref.organization.name}}</td>
								<td>{{pref.preference + 1}}</td>
								<td>

									<a @click="toggleAdminPreference(pref._id)"
										class="btn btn-sm"
										:class="{
											'btn-primary':pref.admin_approved,
											'btn-warning':!pref.admin_approved
										}">
										<i class="material-icons">{{(pref.admin_approved)?'done':'add'}}</i>
									</a>

								</td>
								</tr>
						</table>
					</div>

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
			companyPreferences: [],
			preferencesChanged: false,
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;

            let _baseURL = Vue.rest.restBaseUrl;
			Vue.axios.get(_baseURL + 'api/admin/companyPreferences')
            .then(function(res){

                let _company_preferences = res.data;

                vm.companyPreferences = _company_preferences;
                store.dispatch('showMessage', 'Retrieved existing student preferences')
                
            })
		},
		toggleAdminPreference: function(_id){
			let _all_prefs = this.companyPreferences;
			let _pref = _.find(_all_prefs, function(o){
				return o._id == _id;
			})

			_pref.admin_approved = !_pref.admin_approved;

			this.preferencesChanged = true;
		},
		applyAdminPreferences: function(){

			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;

			Vue.axios.post(_baseURL + 'api/admin/companyPreferences/set', {data: vm.companyPreferences})
            .then(function(res){
            	vm.preferencesChanged = false;
                store.dispatch('showMessage', 'Company-Student preferences were saved');
            })
            .catch(function(err){console.log(err)});
		}
	},
	computed: {
		preferenceByCompany: function(){
			let vm = this;
			let _preferences = vm.companyPreferences;

			// push users to companies;
			let _preferencesByCompany = _.groupBy(_preferences, function(o){
				return o.organization._id;
			});

			let _preferencesByCompany_sorted = [];
			_.forEach(_preferencesByCompany, function(o){
				let _o = _.sortBy(o, function(p){
					return p.preference;
				})
				_preferencesByCompany_sorted.push(_o);

			})
			
			return _preferencesByCompany_sorted;
		},
		preferenceByUser: function(){
			let vm = this;
			let _preferences = vm.companyPreferences;

			// push users to companies;
			let _preferencesByStudent = _.groupBy(_preferences, function(o){
				return o.user._id;
			});

			let _preferencesByStudent_sorted = [];
			_.forEach(_preferencesByStudent, function(o){
				let _o = _.sortBy(o, function(p){
					return p.preference;
				})
				_preferencesByStudent_sorted.push(_o);

			})
			return _preferencesByStudent_sorted;
		}
	},
	mounted: function(){
		this.getAllData();
	},
}
</script>