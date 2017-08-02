<template>
	
	<div class="fluid-container white lighten-5 p-2">
		
		<h4>Student Allocation
			<router-link class="btn btn-primary" :to="{name: 'Admin_dashboard_StudentAllocation_SetRules'}">Set Rules</router-link>
			<router-link class="btn btn-primary" :to="{name: 'Admin_dashboard_StudentAllocation_SetRulesCompanies'}">Set Company Rules</router-link>
			<div class="d-inline small float-right" v-if="preferencesChanged">
				There are changes in preferences, not applied yet <a class="btn btn-warning"  @click="applyAdminPreferences">Save Preferences</a>
			</div>
		</h4>
		<div class="section col">
				<h4 class="h4-responsive">Company Preferences ({{companyPreferences.length}} records)</h4>
				<div>

					<h4>By Company</h4>
					<table class="table table-sm">
						<template v-for="(preference, index) in preferenceByCompany">
		
							<tr :id="'company_' +  preference[0].organization._id">
								<th colspan="5" class="py-1 pt-3">
									<img class="rounded-circle d-inline mr-1" :src="preference[0].organization.photo ? (restUrl + 'photo/organization/large-' + preference[0].organization.photo) : '/img/company.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/>
									{{preference[0].organization.name}}
									<router-link class="btn btn-primary btn-xsm ml-4" :to="'/profile/organization/' + preference[0].organization._id">View Company Profile</router-link>

								</th>
							</tr>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th class="text-center">GPA</th>
								<th class="text-center">Preference</th>
								<th class="text-center">Actions</th>
							</tr>
							<tr v-for="(pref, i) in preference">
								<td class="small">{{i+1}}</td>
								<td>
									<img class="rounded-circle d-inline mr-1" :src="students[pref.user._id].StudentDetails.photo ? (restUrl + 'photo/user/large-' + students[pref.user._id].StudentDetails.photo) : '/img/user.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/>
									{{pref.user.name}}
									<a class="btn btn-primary btn-sm" :href="'#student_' + pref.user._id"><i class="material-icons responsive">remove_red_eye</i></a>
								</td>
								<td class="text-center">{{students[pref.user._id].GPA}}</td>
								<td class="text-center"><span class="badge" :class="{
									'badge-primary': (pref.preference < 3),
									'badge-info': (pref.preference >= 3),
								}">{{pref.preference + 1}}</span></td>
								<td class="text-center">
									<router-link v-if="students[pref.user._id]" class="btn btn-primary btn-xsm" :to="'/profile/student/' + students[pref.user._id]._id">View Profile</router-link>
									<a @click="toggleAdminPreference(pref._id)"
										class="btn btn-xsm d-inline-flex align-items-center"
										:class="{
											'btn-primary':pref.admin_approved,
											'btn-warning':!pref.admin_approved
										}">
										<i class="material-icons responsive">{{(pref.admin_approved)?'done':'add'}}</i>
										<span>{{(pref.admin_approved)?'Allocated':'Allocate student'}}</span>
									</a>
								</td>
								</tr>
						</template>
					</table>

					<h4>By Student</h4>
					<table class="table table-sm">
						<template v-for="(preference, index) in preferenceByUser">
							<tr :id="'student_' + preference[0].user._id">
								<th colspan="4" class="py-1 pt-3">
									<img class="rounded-circle d-inline mr-1" :src="students[preference[0].user._id].StudentDetails.photo ? (restUrl + 'photo/user/large-' + students[preference[0].user._id].StudentDetails.photo) : '/img/user.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/>
									{{preference[0].user.name}}
									<router-link v-if="students[preference[0].user._id]" class="btn btn-primary btn-xsm" :to="'/profile/student/' + students[preference[0].user._id]._id">View Profile</router-link>
								</th>
							</tr>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th class="text-center">Preference</th>
								<th class="text-center">Actions</th>
							</tr>
							<tr v-for="(pref, i) in preference">
								<td class="small">{{i+1}}</td>
								<td>
									<img class="rounded-circle d-inline mr-1" :src="pref.organization.photo ? (restUrl + 'photo/organization/large-' + pref.organization.photo) : '/img/company.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/>
									{{pref.organization.name}}
									<a class="btn btn-primary btn-sm" :href="'#company_' + pref.organization._id"><i class="material-icons responsive">remove_red_eye</i></a>
								</td>
								<td class="text-center"><span class="badge" :class="{
									'badge-primary': (pref.preference < 3),
									'badge-info': (pref.preference >= 3),
								}">{{pref.preference + 1}}</span></td>
								<td class="text-center">

									<router-link class="btn btn-primary btn-xsm ml-4" :to="'/profile/organization/' + pref.organization._id">View Company Profile</router-link>
									<a @click="toggleAdminPreference(pref._id)"
										class="btn btn-xsm d-inline-flex align-items-center"
										:class="{
											'btn-primary':pref.admin_approved,
											'btn-warning':!pref.admin_approved
										}">
										<i class="material-icons">{{(pref.admin_approved)?'done':'add'}}</i>
										<span>{{(pref.admin_approved)?'Allocated':'Allocate student'}}</span>
									</a>

								</td>
							</tr>
						</template>
					</table>

				</div>
			</div>

	</div>
</template>
<style scoped>
	.btn-sm{
	    padding: 0.3em 1em;
	}
</style>
<script>
	
import Vue from 'vue';
import store from 'store';

export default {
	data: ()=>{
		return {
			companyPreferences: [],
			preferencesChanged: false,
			students: [],

			restUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;

            let _baseURL = Vue.rest.restBaseUrl;

            let _receiving_lock;
            store.dispatch('showLoader', 'Retrieving student preferences...');

            _receiving_lock = 2;

			Vue.rest.getData('student','?populate=StudentDetails', function(data){
				vm.students = _.mapKeys(data, function(student) {
				  return student.StudentDetails._id;
				});;
				_receiving_lock--;
				if(_receiving_lock == 0){ store.dispatch('hideLoader'); }
				Vue.axios.get(_baseURL + 'api/admin/companyPreferences')
		            .then(function(res){

		                let _company_preferences = res.data;

		                console.log('_company_preferences', _company_preferences);

		                vm.companyPreferences = _.filter(_company_preferences, function(o){
		                	return !_.isNull(o.organization);
		                });

						_receiving_lock--;
						if(_receiving_lock == 0){ store.dispatch('hideLoader'); }

		                store.dispatch('showMessage', 'Retrieved existing student preferences')
		                
		            })
			});

			
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


            let _chunked_preferences = _.chunk(vm.companyPreferences, 10);
            let _num_chunks = _.size(_chunked_preferences);
            
            let _loader_count = 0;
            store.dispatch('showLoader', 'Saving student preferences, (' + (Math.ceil(((1.0*_loader_count)/_num_chunks)*10000))/100 + '%)');
            for (let itr = _num_chunks - 1; itr >= 0; itr--) {
            	let _t_preferences = _chunked_preferences[itr];

            	setTimeout(function(){
					Vue.axios.post(_baseURL + 'api/admin/companyPreferences/set', {data: _t_preferences})
		            .then(function(res){
		            	vm.preferencesChanged = false;

		                _loader_count++;
			            store.dispatch('showLoader', 'Saving student preferences, (' + (Math.ceil(((1.0*_loader_count)/_num_chunks)*10000))/100 + '%)');

		                if(_loader_count == (_num_chunks-1)){
			            	store.dispatch('hideLoader');
			                store.dispatch('showMessage', 'Company-Student preferences were saved');
		                	
		                }
		            })
		            .catch(function(err){console.log(err)});
            		
            	}, 30*itr);

            }


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
					return p.preference + " " + (4-(vm.students[p.user._id].GPA));
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