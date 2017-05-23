<template>
	<div class="container">
		<h1>All Organizations</h1>
		<div class="row">
			<div class="col-sm-4 rounded" v-for="organization in organizations">
				<div class="white p-2 d-flex mb-1">
					<div class="pr-2">
						<img class="rounded-circle" :src="organization.photo ? (restUrl + 'photo/user/large-' + organization.photo) : '/img/user.png'" style="height: 6em; border-radius: 6em" alt="" />
					</div>
					<div class="d-flex flex-column">
						<span class="pt-1 organization_name" >{{organization.name}}</span>
						<span class="org-description">{{organization.description}}</span>
					</div>
				</div>

			</div>	
		</div>
	</div>
</template>

<style scoped>
	.organization_name{
		font-size: 1.3em;
	}
	.org-description{
		width: 200px;
		height: auto;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
<script>
	import Vue from 'vue';
	import config from 'config/rest';

	export default {
		data: () => {
			return {
				restUrl : config.url,
				organizations: [],
			}
		},
		methods: {
			getEntity: function(){
				// var _url = this.restUrl + this.entity;

				let vm = this;
				var _url = this.restUrl + 'api/v1/api/v1/organization';

				Vue.axios.get(_url).then( (res) => {
					// console.log(res);
					vm.organizations = res.data;

				});

			}
		},
		created: function(){
			this.getEntity();
		}
	}
</script>