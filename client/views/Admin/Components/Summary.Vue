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
		},
	},
	computed: {
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>