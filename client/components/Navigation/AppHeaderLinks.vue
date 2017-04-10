<template>
<nav id="app_header">
	<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
	<span class="navbar-toggler-icon"></span>
	</button>
	<router-link to='/' class="navbar-brand" href="#">
	<img v-if="$route.path==='/'" src="/img/logo_plain.png" style="height: 1.1em" alt="" /><img v-else src="/img/logo_plain_dark.png" style="height: 1.1em" alt="" /> <strong class="hidden-sm-down">Industrial Training Portal</strong>
	</router-link>
	<div class="collapse navbar-collapse" id="navbarNav1">
		<ul class="navbar-nav mr-auto">
			<router-link tag="li" class="nav-item" to="/gettingstarted">
			<a class="nav-link">Getting started</a>
			</router-link>
			<router-link tag="li" class="nav-item" to="/all/students">
			<a class="nav-link">Students</a>
			</router-link>
			<router-link tag="li" class="nav-item" to="/all/organizations">
			<a class="nav-link">Organizations</a>
			</router-link>
		</ul>
		<ul class="navbar-nav hidden-xs-up">
			<li class="nav-item" @click="printStatus">
				<a class="nav-link" >Test</a>
			</li>
		</ul>
		<ul class="navbar-nav" v-if="!state.loggedIn">
			<router-link tag="li" class="nav-item" to="/auth/signup">
			<a class="nav-link">Sign up</a>
			</router-link>
			<router-link tag="li" class="nav-item" to="/auth/login">
			<a class="nav-link">Login</a>
			</router-link>
		</ul>
		<ul class="navbar-nav" v-else>
			<img :src="(restbaseurl + 'photo/user/small-' + state.user.photo) || '/img/user.png'" class="rounded-circle hidden-lg-down" style="width: 40px; height: 40px;">
			<router-link tag="li" class="nav-item" to="/dashboard" v-if="user" exact>
			<a class="nav-link d-flex hidden-lg-down">{{state.user.name}}</a>
			</router-link>
			<li class="nav-item hidden-xl-up">
				<a class="nav-link d-flex with-icon"><i class="material-icons responsive">home</i> <span class="hidden-lg-up">Dashboard</span> </a>
			</li>
			<li class="nav-item">
				<div class="btn-group">
					<a class="nav-link d-flex" v-if="$route.path!=='/'"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="material-icons responsive mr-md-0 mr-sm-1">notifications</i><span class="hidden-lg-up">Notifications</span></a>
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#">Action</a>
						<a class="dropdown-item" href="#">Another action</a>
						<a class="dropdown-item" href="#">Something else here</a>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="#">Separated link</a>
					</div>
				</div>
			</li>
			<li class="nav-item">
				<a class="nav-link d-flex with-icon" @click="logout"><i class="material-icons responsive">power_settings_new</i>Logout</a>
			</li>
		</ul>
		<ul class="navbar-nav">
			
		</ul>
	</div>
</nav>
</template>
<script>
import Vue from 'vue';
import restconfig from 'config/rest';

export default{
	data() {
		return {
			state: this.$store.state,
			user: Vue.auth.getUser(),
			restbaseurl: restconfig.url,
		}
	},
	watch:{
		$route : function() {
			this.user = Vue.auth.getUser()
		}
	},
	methods: {
		logout: function(){
			Vue.auth.logout()
		},
		printStatus: function(){
			console.log(this.user, this.state.loggedIn)
		},
	},
}
</script>