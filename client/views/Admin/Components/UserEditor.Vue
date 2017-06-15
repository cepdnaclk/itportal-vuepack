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
					<template v-if="!student.StudentDetails" >
						<td colspan="3" class="bg-danger text-white text-center">Missing user records for [{{student.email}}]</td>
					</template>
					<template v-else>
						<td class="img-cell"><img :src="student.StudentDetails.photo ? (restBaseUrl + 'photo/user/small-' + student.StudentDetails.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px; height: 40px;"></td>
						<td>{{student.StudentDetails.name}}</td>
						<td>{{student.registrationNumber}}</td>
						
					</template>
					<td>
						<router-link v-if="student.StudentDetails" class="btn btn-primary btn-xsm" :to="'/profile/student/' + student._id">View Profile</router-link>
						<a class="btn btn-danger btn-xsm" @click="deleteItem('student', student._id)">Delete</a>
					</td>
				</tr>
			</table>
		</div>
		<div class="section">
			<h4 class="h4-responsive">Companies ({{companies.length}})</h4>

			<table class="table table-striped">
				<tr>
					<th></th>
					<th>Company Name</th>
					<th>Representative</th>
					<th>actions</th>
				</tr>
				<tr v-for="company in companies">
					<td class="img-cell"><img :src="company.photo ? (restBaseUrl + 'photo/organization/small-' + company.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px; height: 40px;"></td>
					<td>{{company.name}}</td>
					<td>{{company.organizationRepEmails.length}} Represntatives</td>
					<td>
						<div class="btn btn-danger btn-xsm">Delete</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="section">
			<h4 class="h4-responsive">Company Representatives ({{companyReps.length}})</h4>

			<table class="table table-striped">
				<tr>
					<th></th>
					<th>Name</th>
					<th>Email</th>
					<th>actions</th>
				</tr>
				<tr v-for="companyRep in companyReps">
					<template v-if="!companyRep.OrganizationRepDetails" >
						<td colspan="3" class="bg-danger text-white text-center">Missing user records for [{{companyRep.email}}]</td>
					</template>
					<template v-else>
						<td class="img-cell"><img :src="companyRep.OrganizationRepDetails.photo ? (restBaseUrl + 'photo/user/small-' + companyRep.OrganizationRepDetails.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px; height: 40px;"></td>
						<td>{{companyRep.OrganizationRepDetails.name}}</td>
						<td>{{companyRep.OrganizationRepDetails.email}}</td>
					</template>
					<td>
						<div class="btn btn-danger btn-xsm" @click="deleteItem('organizationRep', companyRep._id)">Delete</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="section">
			
			<h4 class="h4-responsive">All users ({{allUsers.length}})</h4>

			<table class="table table-striped">
				<tr>
					<th></th>
					<th>Name</th>
					<th>Roles</th>
					<th>Email</th>
					<th>actions</th>
				</tr>
				<tr v-for="user in allUsers">
					<td class="img-cell"><img :src="user.photo ? (restBaseUrl + 'photo/user/small-' + user.photo) : '/img/user.png'" class="rounded-circle" style="width: 40px; height: 40px;"></td>
					<td>{{user.name}}</td>
					<td><span v-for="role in user.role" class="badge badge-primary">{{role}}</span></td>
					<td>{{user.email}}</td>
					<td>
						<div class="btn btn-danger btn-xsm" @click="deleteItem('user', user._id)">Delete</div>
					</td>
				</tr>
			</table>
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
			Vue.rest.getData('organizationRep','?populate=["OrganizationRepDetails"]', function(data){vm.companyReps = data});
			Vue.rest.getData('user','', function(data){vm.allUsers = data});
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
				store.dispatch('showMessage', 'User removed')
				setTimeout(function(){
					vm.getAllData();
				},300);
			})
			.catch(function(err){
				console.error(err);
			});

		}
	},
	computed: {
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>