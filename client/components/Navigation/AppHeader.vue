<template>
<transition name="fade">
	<div class="left-right-paddingless align-self-stretch"  v-if="$route.path !== '/'">
		<AppHeaderLinks class="navbar navbar-toggleable-md navbar-light nav-itportal white" ></AppHeaderLinks>
	</div>
</transition>
</template>
<script>
import AppHeaderLinks from 'components/Navigation/AppHeaderLinks'
export default {
	components: {
		AppHeaderLinks
	}
}
</script>