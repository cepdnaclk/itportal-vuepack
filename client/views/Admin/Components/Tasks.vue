<template>
	
	<div class="fluid-container white lighten-5 p-2 pb-4">
		<h4>Tasks</h4>
		<send-notification></send-notification>
	</div>
</template>

<script>
	
import Vue from 'vue';
import store from 'store';

import SendNotification from './Dialogs/SendNotification'

export default {

	components:{
		SendNotification
	},

	data: ()=>{
		return {}
	}
}
</script>