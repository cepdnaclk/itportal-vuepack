<template>
	<div class="dropdown-menu">
		<a class="dropdown-item"><span class="small">{{date}}</span></a>
		<a class="dropdown-item" href="#">No new notifications</a>
		<div class="dropdown-divider"></div>
	</div>
</template>

<script>

export default {
	data: function(){
		return {
			date: this.getDate()
		}
	},
	methods: {
		getDate: function(){
			return (new Date()).toLocaleString();
		}
	}
}
</script>