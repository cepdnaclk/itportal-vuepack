<template>
	<div class="container py-4">
		<div class="row">
			<h1 class="col-md-6">
				All Organizations
			</h1>
			<div class="col-md-6 text-right mobile-left">
				<div class="btn-group align-items-center">
					<span class="mr-1">Sorted by {{(sort_by_alpha?"Alphabetic order": "Last Modified")}}</span>
					<a class="btn btn-sm btn-primary" :class="{'active': sort_by_last_modified}" @click="setSort('last_modified')"><i class="material-icons">date_range</i></a>
					<a class="btn btn-sm btn-primary" :class="{'active': sort_by_alpha}" @click="setSort('alpha')"><i class="material-icons">sort_by_alpha</i></a>
				</div>
				<div class="btn-group">
					<a class="btn btn-sm btn-primary" :class="{'active': view_tiles}" @click="setView('tile')"><i class="material-icons">view_module</i></a>
					<a class="btn btn-sm btn-primary" :class="{'active': view_list}" @click="setView('list')"><i class="material-icons">view_list</i></a>
				</div>
				
			</div>
		</div>
		<br>
		<div class="row">
			<table class="table" v-show="view_list">
				<tr v-for="organization in organizations_sorted" class="data-bar my-1">
					<td>
						<img class="rounded-circle profile-image z-depth-1" :src="organization.photo ? (restUrl + 'photo/organization/large-' + organization.photo) : '/img/company.png'" style="border-radius: 6em" alt="" />
					</td>
					<td class="mobile-name">{{organization.name}}</td>
					<!-- Decided to remove phone numbers for public view -->
					<td class="text-center" v-if="viewInExtendedMode">
	                    <span v-if="organization.phone" class="d-flex align-content-center mobile-center"><i class="material-icons responsive mr-1">call</i> {{organization.phone}}</span>
                    </td>
                    <td class="text-right">
	                    <a class="btn btn-primary btn-rounded" target="_blank" v-if="organization.linksLinkedin" title="Linkedin" :href="preProcessURL(organization.linksLinkedin)"><i class="fa fa-linkedin"></i></a>
	                    <a class="btn btn-primary btn-rounded" target="_blank" v-if="organization.linksGithub" title="Github" :href="preProcessURL(organization.linksGithub)"><i class="fa fa-github"></i></a>
	                    <a class="btn btn-primary btn-rounded" target="_blank" v-if="organization.linksWebpage" title="Official Page" :href="preProcessURL(organization.linksWebpage)"><i class="fa fa-link"></i></a>
	                    <a class="btn btn-primary btn-rounded" target="_blank" v-if="organization.linksFacebook" title="Facebook" :href="preProcessURL(organization.linksFacebook)"><i class="fa fa-facebook"></i></a>

                    </td>
                    <!-- Making the information not visible to the public -->
					<td class="text-center" v-if="viewInExtendedMode"><router-link :to="'/profile/organization/' + organization._id" class="btn btn-primary btn-xsm">View Company Profile</router-link></td>
				</tr>
			</table>
			<div class="col-md-6 col-lg-4 rounded" v-for="organization in organizations_sorted"  v-show="view_tiles">


				<router-link :to="'/profile/organization/' + organization._id">
					<div class="white p-2 d-flex mb-1">
						<div class="pr-2">
							<img class="rounded-circle" :src="organization.photo ? (restUrl + 'photo/organization/large-' + organization.photo) : '/img/company.png'" style="height: 6em; border-radius: 6em" alt="" />
						</div>
						<div class="d-flex flex-column">
							<span class="pt-1 organization_name" >{{organization.name}}</span>
							<span class="org-description">{{organization.description}}</span>
						</div>
					</div>
				</router-link>

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
	.container{
		min-height: 70vh;
	}
	.data-bar{
		background: #fff;
		border-radius: 2px;
	}
	.data-bar td{
		vertical-align: middle;
	}
	.profile-image{
		height: 3em; width: 3em;
	}

	@media screen and (max-width: 767px){
		.mobile-left{
			text-align: left !important;
		}
		table{
			max-width: 100%;

		}
		tr,td{
			display: block !important;
			text-align: center !important;
		}

		.profile-image{
			height: 40%; width: 40%;
			max-width: 256px;
			max-height: 256px;
		}
		.mobile-center{
			justify-content: center;
		}
		.mobile-name{
			font-size: 2em;
		}
	}
</style>
<script>
	import Vue from 'vue';
	import store from 'store';
	import config from 'config/rest';

	export default {
		data: () => {
			return {
				restUrl : config.url,
				organizations: [],

				sort_by_alpha: false,
				sort_by_last_modified: true,
				view_tiles: false,
				view_list: true,

				viewInExtendedMode: Vue.auth.isCompany() || Vue.auth.isAdmin() || Vue.auth.isStaff(),

			}
		},
		methods: {
			getEntity: function(){

				let vm = this;
				var _url = this.restUrl + 'api/all/organizations';
				store.dispatch('showLoader', 'Retrieving organization data..');
				Vue.axios.get(_url).then( (res) => {
					// console.log(res);
					vm.organizations = res.data;
					store.dispatch('hideLoader');

				});

			},
	        preProcessURL: function(url){
	            if(url.indexOf('//')<0){
	                return '//' + url;
	            }
	            return url;
	        },
	        setView: function(type){

	        	if(type == 'tile'){
	        		this.view_tiles = true;
	        		this.view_list = false;
	        	} else if(type == 'list') {
	        		
	        		this.view_tiles = false;
	        		this.view_list = true;
	        	}

	        },
	        setSort: function(type){
	        	if(type == 'alpha'){
	        		this.sort_by_alpha = true;
	        		this.sort_by_last_modified = false;
	        	} else if(type == 'last_modified') {

	        		this.sort_by_alpha = false;
	        		this.sort_by_last_modified = true;
	        	}
	        }
		},
		computed: {
			organizations_sorted: function(){
				let vm = this;
				if(vm.sort_by_alpha == true){
					return _.sortBy(vm.organizations, function(o){
						return o.name;
					})
				}
				if(vm.sort_by_last_modified == true){
					return _.sortBy(vm.organizations, function(o){
						return - (new Date(o.updatedAt));
					})
				}

			},
		},
		created: function(){
			this.getEntity();
		}
	}
</script>