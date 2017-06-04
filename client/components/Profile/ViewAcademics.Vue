<template>
	<div class="row container" v-if="student">
        <div class="col-md-3 m-auto">
            <h1 class="green-text display-3 m-auto text-center">{{student.GPA}}</h1>
            <h4 class="green-text h4-responsive m-auto text-center">GPA</h4>
        </div>
        <div class="col-md-9" v-if="registrationNumberEntered">
            <div>
                <p class="green-text">Reg.Num.: {{student.registrationNumber}}</p>
                <div class="d-flex justify-content-start flex-wrap" v-if="studentResults">
                    <div 
                    v-for="result in studentResults_visible"
                    class="card green white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                        <span>{{result.field}}</span>
                        <span class="custom-badge primary-custom-badge align-content-end">{{result.grade}}</span>
                    </div>
                </div>
            </div>
            <div class="my-2">
                <a class="btn btn-primary btn-block" @click="toggleShowAll">
            		{{showAllCourses?'Minimize Courses view': 'View All Courses'}}
                </a>
            </div>
        </div>
        <div class="col-md-9" v-else>
        	<div class="alert alert-warning">You are required to add your LDAP account. Please contact Administrator</div>
        </div>
    </div>
</template>
<style></style>
<script>
	import Vue from 'vue'

	export default {
		props: {
			student: {
				required: true
			},
			results: {
				required: true
			}
		},
		data: ()=> {
			return {
				registrationNumberEntered: false,
				studentResults: null,
				showAllCourses: false,
			}
		},
		methods: {
			getStudentDetails: function(){

				let vm = this;
				let _baseUrl = Vue.rest.restBaseUrl;

				if(!this.student){
					return;
				}

				vm.studentResults = _.sortBy(vm.results, function(o){
					return -o.points;
				});

				vm.calculateGPA(vm.results);
			},
			calculateGPA: function(grades){


				let _creditHours = 0;
				let _gradePoints = 0;

				_.forEach(grades, function(o){
					_creditHours += +o.credits;
					_gradePoints += o.credits * o.points;
				});

				let _gpa = Math.round(100 * (_gradePoints/_creditHours) )/100;

				// console.log(_gpa);
				this.student.GPA = _gpa;

			},
			toggleShowAll: function(){
				this.showAllCourses = !this.showAllCourses;
			}
		},
		computed: {
			studentResults_visible: function(){
				if(this.showAllCourses){
					return this.studentResults;
				}
				return this.studentResults.slice(0,5);
			}
		},
		watch: {
			student_id: function(){
				this.getStudentDetails();
			}
		},
		mounted: function(){
			if(!_.isEqual(this.student.registrationNumber, 'E/XX/XXX')){
				this.registrationNumberEntered = true;
			}
			this.getStudentDetails();
		}
	}
</script>