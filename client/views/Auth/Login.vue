<template>
<div class="tab-pane active" id="panel2" role="tabpanel">
	<div class="card-block">
		<!--Body-->
		<h4 class="h4-responsive my-1">Welcome Back!</h4>
		<br>
		<form v-on:submit.prevent.stop="submitlogin">
			<div class="md-form my-1">
				<i class="material-icons prefix">face</i>
				<input type="text" id="formLogin_1" class="form-control" name="username" v-model="user.email">
				<label for="formLogin_1">Your email/username</label>
			</div>
			<div class="md-form my-1">
				<i class="material-icons prefix">lock</i>
				<input type="password" id="formLogin_2" class="form-control" name="password" v-model="user.password">
				<label for="formLogin_2">Your password</label>
			</div>
			<div class="text-center">
				<button type="submit" class="btn btn-block btn-primary">Login</button>
			</div>
		</form>
	</div>
</div>
</template>

<script>

import Vue from 'vue';
	
export default {
	data: () => {
		return {
			user: {
				email: '',
				password: '',	
			}
		}
	},
	methods: {
		submitlogin: function(){
			if(this.userIsStudent()){
				Vue.auth.loginLDAP(this.user);
				return;
			}
			Vue.auth.login(this.user);
		},
		userIsStudent: function(){
			let _email = this.user.email;
			let _match = _email.match(/e\d{5}/);
			if((_email.length == 6) && _match.length==1 && _match.index == 0){
				console.log(_match);
				return true;
			}
			return false;
		}
	}
}
</script>