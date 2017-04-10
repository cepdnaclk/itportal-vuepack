<template>
<div class="container section">

	<div class="form col-lg-4 offset-lg-4 login-itportal">
		<!-- Nav Tabs -->
		<ul class="nav nav-pills nav-fill z-depth-1" role="tablist">
			<li class="nav-item">
				<router-link class="nav-link" data-toggle="tab" role="tab" :to="{name: 'Auth_signup'}">Sign up</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" data-toggle="tab" role="tab" :to="{name: 'Auth_login'}">Login</router-link>
			</li>
		</ul>
		<div class="tab-content card">
			<!-- Load Signup Login views -->
			<router-view></router-view>
			
		</div>
		
	</div>
</div>
</template>