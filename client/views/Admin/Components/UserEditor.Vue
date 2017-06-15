<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<h4>User Editor</h4>
		<div class="section">
			<h4 class="h4-responsive">Students ({{students.length}})</h4>
			<table class="table table-striped">
				<tr>
					<th></th>
					<th>Name</th>
					<th>Registration Number</th>
					<th>actions</th>
				</tr>
				<tr v-for="student in students">
					<td class="img-cell"><img :src="student.StudentDetails.photo ? (restBaseUrl + 'photo/user/small-' + student.StudentDetails.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px; height: 40px;"></td>
					<td>{{student.StudentDetails.name}}</td>
					<td>{{student.registrationNumber}}</td>
					<td>
						<div class="btn btn-danger btn-xsm">Delete</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="section">
			<h4 class="h4-responsive">Companies ({{companies.length}})</h4>
			<div>
				<div v-for="company in companies">{{company.name}}</div >
			</div>
		</div>
		<div class="section">
			<h4 class="h4-responsive">Company Representatives ({{companyReps.length}})</h4>
			<div>
				<div v-for="companyRep in companyReps">{{companyRep.email}}</div >
			</div>
		</div>
		<div class="section">
			
			<h4 class="h4-responsive">All users ({{allUsers.length}})</h4>
			<div>
				<div v-for="user in allUsers">{{user.email}}:: {{user.name}}</div >
			</div>
		</div>
	</div>
</template>

<style scoped>

	td{
		padding: 0.7em;
	}

	.img-cell{
		padding: 0.1em;
		display: flex;
		justify-content: center;
		align-items: center;

		.rounded-circle{

			box-shadow: none;
			border-radius: 50%;
			border: solid thin #ccc;
		}
		
	}
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

			restBaseUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;
			Vue.rest.getData('organization','', function(data){vm.companies = data});
			Vue.rest.getData('student','?populate=["StudentDetails"]', function(data){vm.students = data});
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