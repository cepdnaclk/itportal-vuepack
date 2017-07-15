<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<div class="row">
			<div class="section col-6">
				<h4 class="h4-responsive" style="margin-left:20px">Students ({{students.length}})</h4>

				<table class="table table-sm" style="margin-left:20px">
					<tr>
						<th>&nbsp;</th>
						<th>Name</th>
						<th>Email</th>
					</tr>
					<tr v-for="student in students">
						<td ><img class="rounded-circle" :src="student.StudentDetails.photo ? (restUrl + 'photo/user/large-' + student.StudentDetails.photo) : '/img/user.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/></td>
						<td style="padding-top:15px">{{student.StudentDetails.name}}</td>
						<td style="padding-top:15px" >{{student.StudentDetails.email}}</td>
						
						</tr>
				</table>
			</div>
			<div class="section col-6">
				<h4 class="h4-responsive" style="margin-left:20px">Companies ({{companies.length}})</h4>
				
				<table class="table table-sm" style="margin-left:20px; padding-right:40px">
					<tr>
						<th>&nbsp;</th>
						<th>Name</th>
						<th>Email</th>
					</tr>
					<tr v-for="company in companies">
						<td ><img class="rounded-circle" :src="company.photo ? (restUrl + 'photo/organization/large-' + company.photo) : '/img/user.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/></td>
						<td style="padding-top:15px">{{company.name}}</td>
						<td style="padding-top:15px">{{company.organizationRepEmails}}</td>
					</tr>
				</table>
			</div>
			
		</div>

		<div class="row">
			<div class="section col-6">
				<h4 class="h4-responsive" style="margin-left:20px">Company Representatives ({{companyReps.length}})</h4>

				<table class="table table-sm" style="margin-left:20px; padding-right:40px">
					<tr>
						<th>&nbsp;</th>
						<th>Name</th>
						<th>Email</th>
					</tr>
					<tr v-for="companyRep in companyReps">
						<td ><img class="rounded-circle" :src="companyRep.OrganizationRepDetails.photo ? (restUrl + 'photo/user/large-' + companyRep.OrganizationRepDetails.photo) : '/img/user.png'" style="height: 3em; border-radius: 3em; width: 3em" alt=""/></td>
						<td style="padding-top:15px">{{companyRep.OrganizationRepDetails.name}}</td>
						<td style="padding-top:15px">{{companyRep.email}}</td>
					</tr>
				</table>
			</div>

			<div class="section col-6">
				
				<h4 class="h4-responsive" style="margin-left:20px">All users ({{allUsers.length}})</h4>
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
			restUrl : Vue.rest.restBaseUrl,
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
			Vue.rest.getData('student','?populate=StudentDetails', function(data){vm.students = data});
			Vue.rest.getData('organizationRep','?populate=OrganizationRepDetails', function(data){vm.companyReps = data});
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