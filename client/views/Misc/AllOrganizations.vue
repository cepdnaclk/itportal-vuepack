<template>
	<div class="container">
		<h1>All Organizations</h1>
	</div>
</template>

<script>
	import Vue from 'vue';
	import config from 'config/rest';

	export default {

		data: () => {
			return {
				restUrl : config.url
			}
		},
		methods: {
			getEntity: function(){
				var _url = this.restUrl + 'secure/api/v1/listing';

				Vue.axios.get(_url).then( (res) => {
					console.log(res);
				});

			}
		},
		created: function(){
			this.getEntity();
		}
	}
</script>