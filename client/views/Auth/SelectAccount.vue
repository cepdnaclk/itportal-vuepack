<template>
<div class="container">
	<h1 class="h1-responsive">Select Account</h1>
	<router-link v-if="userRoles['STUDENT']" :to="{name: 'Student_dashboard_summary'}" class="btn btn-primary">Student</router-link>
	<router-link v-if="userRoles['COMPANY']" :to="{name: 'Organization_dashboard_summary'}" class="btn btn-primary">Company Representative</router-link>
	<router-link v-if="userRoles['STAFF']" :to="{name: 'Admin_dashboard_summary'}" class="btn btn-primary">Staff</router-link>
	<router-link v-if="userRoles['ADMIN']" :to="{name: 'Admin_dashboard_summary'}" class="btn btn-primary">Admin</router-link>
</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		data: function(){
			return {
				userRoles: {
					'STUDENT': Vue.auth.getUser().role.indexOf('STUDENT')>=0,
					'ADMIN': Vue.auth.getUser().role.indexOf('ADMIN')>=0,
					'COMPANY': Vue.auth.getUser().role.indexOf('COMPANY')>=0,
					'STAFF': Vue.auth.getUser().role.indexOf('STAFF')>=0,
				},
			}
		}
	}
</script>