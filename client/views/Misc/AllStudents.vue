<template>
	<div class="container py-4"><div class="row">
			<h1 class="col-md-6">
				All Students
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
				<tr v-for="student in students_sorted" class="data-bar my-1">
					<td>
						<img class="rounded-circle profile-image" :src="student.StudentDetails.photo ? (restUrl + 'photo/user/large-' + student.StudentDetails.photo) : '/img/user.png'" style="border-radius: 6em" alt="" />
					</td>
					<td class="mobile-name">{{student.StudentDetails.name}}</td>
					<td class="text-center">
	                    <span v-if="student.StudentDetails.phone" class="d-flex align-content-center mobile-center"><i class="material-icons responsive mr-1">call</i> {{student.StudentDetails.phone}}</span>
                    </td>
                    <td class="text-center">
	                    <a class="btn btn-primary btn-rounded btn-xsm" target="_blank" v-if="student.StudentDetails.linksLinkedin" title="Linkedin" :href="preProcessURL(student.StudentDetails.linksLinkedin)"><i class="fa fa-linkedin fa-small"></i></a>
	                    <a class="btn btn-primary btn-rounded btn-xsm" target="_blank" v-if="student.StudentDetails.linksGithub" title="Github" :href="preProcessURL(student.StudentDetails.linksGithub)"><i class="fa fa-github fa-small"></i></a>
	                    <a class="btn btn-primary btn-rounded btn-xsm" target="_blank" v-if="student.StudentDetails.linksPortfolio" title="Portfolio page" :href="preProcessURL(student.StudentDetails.linksPortfolio)"><i class="fa fa-link fa-small"></i></a>
	                    <a class="btn btn-primary btn-rounded btn-xsm" target="_blank" v-if="student.StudentDetails.linksStackoverflow" title="Stackoverflow page" :href="preProcessURL(student.StudentDetails.linksStackoverflow)"><i class="fa fa-stack-overflow fa-small"></i></a>
	                    <a class="btn btn-primary btn-rounded btn-xsm" target="_blank" v-if="student.StudentDetails.linksFacebook" title="Facebook" :href="preProcessURL(student.StudentDetails.linksFacebook)"><i class="fa fa-facebook fa-small"></i></a>

                    </td>
					<td class="text-center"><router-link :to="'/profile/student/' + student._id" class="btn btn-primary btn-xsm">View Student Profile</router-link></td>
				</tr>
			</table>
			<div class="col-md-6 col-lg-4 rounded" v-for="student in students_sorted" v-show="view_tiles">


			<router-link :to="'/profile/student/' + student._id">
				<div class="white p-2 d-flex mb-1">
					<div class="pr-2">
						<img class="rounded-circle" :src="student.StudentDetails.photo ? (restUrl + 'photo/user/large-' + student.StudentDetails.photo) : '/img/user.png'" style="height: 6em; border-radius: 6em" alt="" />
					</div>
					<div class="d-flex flex-column">
						<span class="pt-1 student_name" >{{student.StudentDetails.name}}</span>
						<span>{{student.StudentDetails.email}}</span>
					</div>
				</div>
			</router-link>
			</div>	
		</div>
	</div>
</template>

<style scoped>
	.student_name{
		font-size: 1.3em;
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
				students: [],

				sort_by_alpha: false,
				sort_by_last_modified: true,
				view_tiles: false,
				view_list: true,
			}
		},
		methods: {
			getEntity: function(){
				// var _url = this.restUrl + this.entity;

				let vm = this;
				var _url = this.restUrl + 'api/all/students';
				store.dispatch('showLoader', 'Retrieving student data..');

				Vue.axios.get(_url).then( (res) => {
					// console.log(res);
					vm.students = res.data;
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
			students_sorted: function(){
				let vm = this;
				if(vm.sort_by_alpha == true){
					return _.sortBy(vm.students, function(o){
						return o.registrationNumber;
					})
				}
				if(vm.sort_by_last_modified == true){
					return _.sortBy(vm.students, function(o){
						return - (new Date(o.updatedAt));
					})
				}
			},
		},
		created: function(){
			this.getEntity();
		},
	}
</script>