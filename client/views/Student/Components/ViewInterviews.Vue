<template>
	<div class="container mt-2" v-show="interviews.length > 0">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">
                <h4>My Interviews ({{interviews.length}})</h4>
                <table class="table">
	                <tr>
	                	<td colspan="2">Company</td>
	                	<td>updated on</td>
	                	<td>Interview Date</td>
	                	<td>Type</td>
	                	<td style="width:300px">Notes</td>
	                </tr>
                	<tr v-for="interview in interviews">
						<td class="align-middle"><img class="rounded-circle" :src="interview.company.photo ? (restUrl + 'photo/organization/large-' + interview.company.photo) : '/img/company.png'" style="width: 3em !important; border-radius: 3em;" alt=""/></td>
                		<td class="align-middle">{{interview.company.name}}</td>
	                	<td class="align-middle small">{{(new Date(interview.updatedAt)).toLocaleString()}}</td>
	                	<td class="align-middle">
	                		<span class="d-block">{{interview.time}}-{{interview.date}}</span>
	                		<span class="small text-success">{{getTimeRemaining(interview.time, interview.date)}}</span>
                		</td>
	                	<td class="align-middle">
		                	<span class="small text-success">{{interview.type}}</span> <br>
		                	<span>{{interview.type_other}}</span>
	                	</td>
	                	<td class="align-middle">{{interview.notes}}</td>
                	</tr>
                </table>
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

			restUrl: Vue.rest.restBaseUrl,
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

                vm.interviews = _.filter(_interview_data, function(o){
                	return !_.isNull(o.company);
                });

                store.dispatch('showMessage', 	'Retrieved interviews')
                
            })
            .catch(function(err){console.log(err)});
		},
		moment: function(e){
			return moment(e);
		},
		getTimeRemaining: function(time, date){

			if(_.isUndefined(time)) {
				return moment(date).fromNow();
			}
			if(_.isUndefined(date)){
				return 'Contact a company representative to schedule.'
			}

			return moment(date + " " + time).fromNow();
		}
	},
	mounted: function(){
		this.getInterviews();
	}
}
</script>