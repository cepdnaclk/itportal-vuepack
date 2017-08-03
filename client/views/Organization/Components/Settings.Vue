<template>
	
	<div class="fluid-container white lighten-5 p-2">
		<h4>Settings</h4>
		<change-password></change-password>
	</div>
</template>

<script>
	
import Vue from 'vue';
import store from 'store';
import changePassword from 'components/UserSettings/ChangePassword'

export default {
	components: {
		changePassword
	},
	data: ()=>{
		return {}
	}
}
</script>
