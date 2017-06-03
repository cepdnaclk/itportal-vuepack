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
                    v-for="result in studentResults"
                    class="card green white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                        <span>{{result.field}}</span>
                        <span class="custom-badge primary-custom-badge align-content-end">{{result.grade}}</span>
                    </div>
                </div>
            </div>
            <div class="my-2">
                <a class="btn btn-primary btn-block">View all courses</a>
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
			student_id: {
				required: true
			}
		},
		data: ()=> {
			return {
				student: null,
				registrationNumberEntered: false,
				studentResults: null,
			}
		},
		methods: {
			getStudentDetails: function(){

				let vm = this;
				let _baseUrl = Vue.rest.restBaseUrl;


				if(!this.student_id){
					return;
				}
				Vue.rest.getData('student/' + this.student_id, '', function(_student){

					console.log('_student', _student);
					vm.student = _student;

					if(!_.isEqual(_student.registrationNumber, 'E/XX/XXX')){
						vm.registrationNumberEntered = true;
						Vue.axios.get(_baseUrl + 'api/student/getResults?regNum='+ _student.registrationNumber)
						.then(function(res){
							// console.log(res.data);
							vm.studentResults = _.sortBy(res.data, function(o){
								return -o.points;
							});

							vm.calculateGPA(res.data);
						})
						.catch(function(err){
							console.error(err);
						})
					}

                });
			},
			calculateGPA: function(grades){


				let _creditHours = 0;
				let _gradePoints = 0;

				_.forEach(grades, function(o){
					_creditHours += +o.credits;
					_gradePoints += o.credits * o.points;
				});

				let _gpa = Math.round(100 * (_gradePoints/_creditHours) )/100;

				console.log(_gpa);
				this.student.GPA = _gpa;

			}
		},
		watch: {
			student_id: function(){
				this.getStudentDetails();
			}
		},
		mounted: function(){
			this.getStudentDetails();
		}
	}
</script>