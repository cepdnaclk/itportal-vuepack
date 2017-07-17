<template>
	<div class="container py-4">
		<h1>All Students</h1>
		<div class="row">
			<div class="col-sm-4 rounded" v-for="student in students_sorted">


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

			}
		},
		computed: {
			students_sorted: function(){
				let vm = this;
				return _.sortBy(vm.students, function(o){
					return - (new Date(o.updatedAt));
				})
			},
		},
		created: function(){
			this.getEntity();
		}
	}
</script>