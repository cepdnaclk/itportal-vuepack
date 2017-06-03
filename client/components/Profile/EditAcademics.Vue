<template>
	<div class="row container">
        <div class="col-md-3 m-auto">
            <h1 class="green-text display-3 m-auto text-center">{{student.GPA}}</h1>
            <h4 class="green-text h4-responsive m-auto text-center">GPA</h4>
        </div>
        <div class="col-md-9" v-if="registrationNumberEntered">
            <div>
                <p class="green-text">Reg.Num.: {{student.registrationNumber}}</p>
                <div class="d-flex justify-content-start flex-wrap">
                    <div class="card green white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                        <span>CO424: Networking</span>
                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                    </div>
                    <div class="card green darken-1 white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                        <span>CO424: Networking</span>
                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                    </div>
                    <div class="card green darken-1 white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                        <span>CO424: Information Systems</span>
                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                    </div>
                    <div class="card green darken-1 white-text px-3 py-1 mx-0 d-flex-inline flex-row align-items-center tag">
                        <span>CO424: Information Systems</span>
                        <span class="custom-badge primary-custom-badge align-content-end">A+</span>
                    </div>
                </div>
            </div>
            <div class="my-2">
                <a class="btn btn-primary btn-block">View all courses</a>
            </div>
        </div>
        <div class="col-md-9" v-else>
        	
        </div>
    </div>
</template>
<style></style>
<script>
	import Vue from 'vue'

	export default {
		props: {
			student_id: {
				type: String,
				required: true
			}
		},
		data: ()=> {
			return {
				student: null,
				registrationNumberEntered: false,
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

					if(_.isEqual(_student.registrationNumber, 'E/XX/XXX')){
						vm.registrationNumberEntered = true;
						Vue.axios.get(_baseUrl + 'api/student/getResults/'+ _student.registrationNumber)
						.then(function(res){
							console.log(res.data);
						})
						.catch(function(err){
							console.error(err);
						})
					}

                });
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