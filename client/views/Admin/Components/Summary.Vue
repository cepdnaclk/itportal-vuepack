<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<div class="row">
			<div class="section col-md-4">
				<h4 class="h4-responsive">Students ({{students.length}})</h4>
				<div>
					<div v-for="student in students">{{student.email}}</div >
				</div>
			</div>
			<div class="section col-md-4">
				<h4 class="h4-responsive">Companies ({{companies.length}})</h4>
				<div>
					<div v-for="company in companies">{{company.name}}</div >
				</div>
			</div>
			<div class="section col-md-4">
				<h4 class="h4-responsive">Company Representatives ({{companyReps.length}})</h4>
				<div>
					<div v-for="companyRep in companyReps">{{companyRep.email}}</div >
				</div>
			</div>
			<div class="section col-md-4">
				
				<h4 class="h4-responsive">All users ({{allUsers.length}})</h4>
				<div>
					<div v-for="user in allUsers">{{user.email}}:: {{user.name}}</div >
				</div>
			</div>
			<div class="section col-md-4">
				
				<h4 class="h4-responsive">Company Preferences ({{companyPreferences.length}})</h4>
				<div>
					<h4>By Student</h4>
					<div v-for="pref in companyPreferences">
						<div class="name">{{pref.user.name}}</div>
						<ol>
							<li v-for="company in pref.preferences">{{company.name}}</li>
						</ol>
					</div >
					<h4>By Company</h4>
					<div v-for="pref in preferenceByCompany">
						<div class="name">{{pref.company.name}}</div>
						<ol>
							<li v-for="user in pref.user">{{user.name}}</li>
						</ol>
					</div >
				</div>
			</div>
		</div>
	</div>
</template>

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

                _.forEach(_company_preferences, function(o){
                	_.forEach(o.preferences, function(c, i){
                		c.preferenceOrder = i;
                	})
                })

               console.log('_company_preferences', _company_preferences);
                
                vm.companyPreferences = _company_preferences;
                store.dispatch('showMessage', 'Retrieved existing student preferences')
                
            })
		},
	},
	computed: {
		preferenceByCompany: function(){
			let vm = this;
			let _preferences = vm.companyPreferences;

			// push users to companies;
			let _preferencesByCompany = {};



			_.forEach(_preferences, function(o){	// preferences with o.user(with preference order) and o.companies

				_.forEach(o.preferences, function(c){  // c - company

					// each company
					let _user = Object.create(o.user);
					_user.preferenceOrder = c.preferenceOrder;

					if(_preferencesByCompany[c._id]){
						_preferencesByCompany[c._id].user.push(_user);
					} else {
						_preferencesByCompany[c._id] = {
							company: c,
							user: [_user]
						}
					}
				});

			});

			_.forEach(_preferencesByCompany, function(o){
				// console.log('o', o);
				o.user = _.sortBy(o.user, function(u){
					return u.preferenceOrder;
				})
			})

			// // test order
			// console.log('_preferencesByCompany', _preferencesByCompany);
			// _.forEach(_preferencesByCompany, function(o){
			// 	// console.log(o)
			// 	console.log(_.map(o.user, function(n){ return n.preferenceOrder+' '+n.email }))
			// })

			return _preferencesByCompany;
		}
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>