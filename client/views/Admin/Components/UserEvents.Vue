<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<div>
			<h4>Organization Representation Events</h4>
			<table class="table table-responsive">
				<tr>
					<th>organizationRep</th>
					<th>add_projects</th>
					<th>add_skills</th>
					<th>add_awards</th>
					<th>add_interests</th>
					<th>join_company</th>
					<th>view_students</th>
					<th>view_company</th>
					<th>interview_view</th>
					<th>interview_add</th>
					<th>interview_accept</th>
					<th>interview_reject</th>
				</tr>
				<tr v-for="tasks in taskOrganizationRep_data">
					<td>{{tasks.organizationRep.email}}</td>
					<td class="dot" :class="{active: tasks.add_projects}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_skills}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_awards}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_interests}"><span></span></td>
					<td class="dot" :class="{active: tasks.join_company}"><span></span></td>
					<td class="dot" :class="{active: tasks.view_students}"><span></span></td>
					<td class="dot" :class="{active: tasks.view_company}"><span></span></td>
					<td class="dot" :class="{active: tasks.interview_view}"><span></span></td>
					<td class="dot" :class="{active: tasks.interview_add}"><span></span></td>
					<td class="dot" :class="{active: tasks.interview_accept}"><span></span></td>
					<td class="dot" :class="{active: tasks.interview_reject}"><span></span></td>
				</tr>
			</table>
			
		</div>
		<div>
			<h4>Student Events</h4>
			<table class="table table-responsive">
				<tr>
					<th>student</th>
					<th>add_registrationNumber</th>
					<th>add_projects</th>
					<th>add_skills</th>
					<th>add_competitions</th>
					<th>add_awards</th>
					<th>add_cocurriculars</th>
					<th>add_extracurriculars</th>
					<th>add_interests</th>
					<th>view_company</th>
					<th>view_company_rep</th>
					<th>set_company_preference</th>
					<th>set_interview_state</th>
					<th>set_offer_state_accept</th>
					<th>set_offer_state_reject</th>
				</tr>
				<tr v-for="tasks in taskStudent_data">
					<td>{{tasks.student.email}}</td>
					<td class="dot" :class="{active: tasks.add_registrationNumber}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_projects}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_skills}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_competitions}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_awards}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_cocurriculars}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_extracurriculars}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_interests}"><span></span></td>
					<td class="dot" :class="{active: tasks.view_company}"><span></span></td>
					<td class="dot" :class="{active: tasks.view_company_rep}"><span></span></td>
					<td class="dot" :class="{active: tasks.set_company_preference}"><span></span></td>
					<td class="dot" :class="{active: tasks.set_interview_state}"><span></span></td>
					<td class="dot" :class="{active: tasks.set_offer_state_accept}"><span></span></td>
					<td class="dot" :class="{active: tasks.set_offer_state_reject}"><span></span></td>
				</tr>
			</table>
			
		</div>
		<div>
			<h4>User Events</h4>
			<table class="table table-responsive">
				<tr>
					<th>user</th>
					<th>create_account</th>
					<th>confirm_email</th>
					<th>changed_password</th>
					<th>add_intro</th>
					<th>add_profilepic</th>
					<th>add_phone</th>
					<th>add_link_linkedIn</th>
					<th>add_link_github</th>
					<th>add_link_stackoverflow</th>
					<th>add_link_personal</th>
					<th>add_link_facebook</th>
				</tr>
				<tr v-for="tasks in taskUser_data">
					<td>{{tasks.user.name}}</td>
					<td class="dot" :class="{active: tasks.create_account}"><span></span></td>
					<td class="dot" :class="{active: tasks.confirm_email}"><span></span></td>
					<td class="dot" :class="{active: tasks.changed_password}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_intro}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_profilepic}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_phone}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_link_linkedIn}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_link_github}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_link_stackoverflow}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_link_personal}"><span></span></td>
					<td class="dot" :class="{active: tasks.add_link_facebook}"><span></span></td>
				</tr>
			</table>
			
		</div>
	</div>
</template>
<style>
	.dot{
		text-align: center;

		span{
			border-radius: 50%;
			background: #E1E9EB;
			width: 10px;
			height: 10px;
			display: inline-block;
		}
		&.active span{
			background: #41b883;
		}
	}
</style>
<script>
	
import Vue from 'vue';
import store from 'store';

export default {
	data: ()=>{
		return {
			taskUser_data: {},
			taskStudent_data: {},
			taskOrganizationRep_data: {},
		}
	},
	methods: {
		getAllData: function(){
			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;
			Vue.axios.get(_baseURL + 'api/admin/userEvents')
            .then(function(res){

            	vm.taskUser_data = res.data.taskUser_data;
            	vm.taskStudent_data = res.data.taskStudent_data;
            	vm.taskOrganizationRep_data = res.data.taskOrganizationRep_data;

                store.dispatch('showMessage', 'Retrieved user task data');
                
            })
            .catch(function(err){console.log(err)});
		}
	},
	mounted: function(){
		this.getAllData();
	}
}
</script>