<template>
	<div>
		<h3>Change Password</h3>
		<label>Current password<input type="password" v-model="password_current"></label><br>
		<label>New password<input type="password" v-model="password_new"></label><br>
		<label>Confirm new password<input type="password" v-model="password_new_confirm"></label><br>
		<button @click="sendChangeRequest" class="btn btn-primary" :class="{'disabled': !isOkToContinue()}">Change Password</button>
	</div>
</template>
<style scoped></style>

<script>
import Vue from 'vue';
import store from 'store';

export default {
	data: function(){
		return {
			password_current: '',
			password_new: '',
			password_new_confirm: '',
		}
	},
	methods: {
		isNewAndconfirmPasswordSame: function(){
			return ((this.password_new.length != 0) && this.password_new == this.password_new_confirm);
		},
		isOkToContinue: function(){
			return this.isNewAndconfirmPasswordSame();
		},
		sendChangeRequest: function(){

			if(!this.isOkToContinue()) return;

			let _baseUrl = Vue.rest.restBaseUrl;
			let _url = _baseUrl + 'api/user/changePassword'

			let _data = {
				password_current: this.password_current,
				password_new: this.password_new,
			}

			let vm = this;

			Vue.axios.post(_url, _data)
			.then(function(res){
				let _data = res.data;
				if(_data){
		            store.dispatch('showMessage', 'Password changed successfully.')
		            setTimeout(function(){
		            	vm.resetForm();
		            }, 1000)
				}
			})
			.catch(function(err){
				console.error(err)
	            store.dispatch('showMessage', 'Failed to change password.')
			})
		},
		resetForm: function(){

			this.password_current ='';
			this.password_new ='';
			this.password_new_confirm ='';

            store.dispatch('showMessage', 'Please login with your new credentials.')
            setTimeout(function(){
				Vue.auth.logout()
            }, 1000)
			
		}
	}
}

</script>