<template>
	<div>
		<div class="" v-if="interviews.length > 0">
	        <div class="row">
	            <div class="form col-md-12 dashboard-itportal">
	                <h4>Scheduled interviews <span class="small">({{interviews.length}})</span></h4>
	                <table class="table table-striped white decision-student">
		                <tr>
		                	<td colspan="2">Student</td>
		                	<td>updated on</td>
		                	<td>Interview Date</td>
		                	<td>Type</td>
		                	<td style="width:300px">Notes</td>
		                	<td class="text-right">Action</td>
		                </tr>
	                	<tr v-for="interview in interviews">
							<td class="align-middle"><img class="rounded-circle" :src="studentphotos[interview.student] ? (restUrl + 'photo/user/small-' + studentphotos[interview.student]) : '/img/user.png'" style="width: 3em !important; border-radius: 3em;" alt=""/></td>
	                		<td class="align-middle">{{studentnames[interview.student]}}</td>
		                	<td class="align-middle small">{{(new Date(interview.updatedAt)).toLocaleString()}}</td>
		                	<td class="align-middle">
		                		<span class="d-block">{{interview.time}} {{interview.date}}</span>
		                		<span class="small text-success">{{getTimeRemaining(interview.time, interview.date)}}</span>
	                		</td>
		                	<td class="align-middle">
			                	<span class="small text-success">{{interview.type}}</span> <br>
			                	<span>{{interview.type_other}}</span>
		                	</td>
		                	<td class="align-middle">{{interview.notes}}</td>
		                	<td class="text-right">
		                		<div class="btn btn-danger btn-sm" @click="removeInterview(interview._id)">Remove interview</div>
		                	</td>
	                	</tr>
	                </table>
	            </div>
	        </div>
		</div>
		<div v-else class="">
            <h4>Scheduled interviews</h4>
            <p class="alert alert-info">No interviews scheduled. Go ahead and schedule one.</p>
			
		</div>
	</div>
</template>
<style scoped></style>
<script>

import Vue from 'vue'
import store from 'store'

export default {
	props: [
		"studentphotos",
		"studentnames"
	],
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

            store.dispatch('showLoader', 'Retrieving scheduled interviews...');
			Vue.axios.get(_baseURL + 'api/company/interview/all/' + Vue.auth.getUser().email)
            .then(function(res){

                let _interview_data = res.data;
                console.log('_interview_data', _interview_data);

                let _interview_data_filtered = _.filter(_interview_data, function(o){
                	return !_.isNull(o.company);
                });

                vm.interviews = _.sortBy(_interview_data_filtered, function(o){
                	return -o.updatedAt;
                })

                
	            if(!vm.studentnames || _.size(vm.studentnames) == 0){
					setTimeout(function(){vm.$forceUpdate();}, 200);
	            }

                store.dispatch('showMessage', 	'Retrieved interviews')
                
            })
            .catch(function(err){console.error(err)});

		},

		removeInterview: function(_id){
			
			if(!confirm('This will remove the scheduled interview. Continue?')){
				return;
			}

			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;

            store.dispatch('showLoader', 'Retrieving scheduled interviews...');
			Vue.axios.post(_baseURL + 'api/company/interview/remove/' + _id)
            .then(function(res){
                store.dispatch('showMessage', 	'Interview removed successfully.');
                vm.getInterviews();
                
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