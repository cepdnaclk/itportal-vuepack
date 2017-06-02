<template>
	<div class="container mt-2">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">
                <h2>My Interviews ({{interviews.length}})</h2>
                <ol>
	                <li v-for="interview in interviews">
	                	<h4>{{interview.company.name}} <span class="small">({{(new Date(interview.updatedAt)).toLocaleString()}})</span></h4>
	                	
	                </li>
                	
                </ol>
            </div>
        </div>
	</div>
</template>
<style scoped></style>
<script>

import Vue from 'vue'
import store from 'store'

export default {
	data: ()=> {
		return {
			interviews: [],
		}
	},
	methods: {
		getInterviews: function(){
			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;
			Vue.axios.get(_baseURL + 'api/student/interviews/all')
            .then(function(res){

                let _interview_data = res.data;
                console.log('_interview_data', _interview_data);

                vm.interviews = _interview_data;

                store.dispatch('showMessage', 'Retrieved interviews')
                
            })
            .catch(function(err){console.log(err)});
		}
	},
	mounted: function(){
		this.getInterviews();
	}
}
</script>