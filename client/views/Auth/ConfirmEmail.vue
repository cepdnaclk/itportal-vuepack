<template>
<div class="container">
	<div class="card col-md-4 offset-md-4 p-2 text-center">
		<h3 class="h3-responsive pt-1">Confirm Your Account</h3>
		<a class="btn btn-primary" @click="confirmAccount">Confirm</a>
	</div>
	
</div>
</template>

<script>

import Vue from 'vue';
	
export default {
	props: {
		token: {
			type: String,
			required: true,
		}
	},
	methods: {
		confirmAccount: function(){
			Vue.auth.confirm(this.token);
		}
	}
}
</script>