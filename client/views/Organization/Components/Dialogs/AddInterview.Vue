e<template>
	<div class="d-inline">
		
		<!-- Button trigger modal -->
		<a class="btn btn-primary btn-sm btn-block" @click="addNewInterview(_user)">Schedule Inverview</a>

		<!-- Modal -->
		<div class="modal fade" :id="'add_interview' + _user" tabindex="-1" role="dialog" :aria-labelledby="'add_interview_title' + _user" aria-hidden="true">
		    <div class="modal-dialog" role="document">
		        <!--Content-->
		        <div class="modal-content">
		            <!--Header-->
		            <div class="modal-header d-inline">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		                    <span class="" aria-hidden="true">&times;</span>
		                </button>
		                <div class="clearfix"></div>
		                <div class="text-center">
			                <img :src="_user.photo ? (restBaseUrl + 'photo/user/small-' + _user.photo) : '/img/user.png'" class="rounded-circle m-auto" style="width: 100px; height: 100px;">
			                <h5 class="modal-title w-100 font-weight-bold" :id="'add_interview_title' + _user" >Schedule interview for {{user.name}}</h5>
		                </div>
		            </div>
		            <!--Body-->
		            <div class="modal-body choices m-auto">
						<label>Time: <input type="text" v-model="_interview_data.time"></label>
						<label>Date: <input type="text" v-model="_interview_data.date"></label>
						<label>Location: <input type="text" v-model="_interview_data.location"></label>
						<label>Longitude: <input type="text" v-model="_interview_data.location_lat"></label>
						<label>Latitude: <input type="text" v-model="_interview_data.location_lon"></label>
						<label>Interview Type: <input type="text" v-model="_interview_data.type"></label>
						<label>Interview Type (Other): <input type="text" v-model="_interview_data.type_other"></label>
						<label>Notes: <input type="text" v-model="_interview_data.notes"></label>
		            </div>
		            <!--Footer-->
		            <div class="modal-footer text-center justify-content-center">
		                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
		                <button @click.stop="updateRoleChanges" type="button" class="btn btn-primary">Save changes</button>
		            </div>
		        </div>
		        <!--/.Content-->
		    </div>
		</div>
	</div>
</template>
<style>
	.rounded-circle{
		border-radius: 50% !important;
	}
</style>
<style scoped>
	.choices{
		font-size: normal;

		label{
			display: block;
		}
	}
</style>
<script>
	
import Vue from 'vue';
import store from 'store';

export default {
	props: {
		_user: {
			type: Object,
			required: true,
		}
	},
	components: {

	},
	data: function(){
		return {
			user: this._user,
			company_rep: Vue.auth.getUser().email,

			_interview_data: {
				time: new Date(),
				date: new Date(),
				location: '',
				location_lat: '',
				location_lon: '',
				type: 'ON_LOCATION',
				type_other: '',
				notes: '',
			},
			
			restBaseUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {

        addNewInterview: function(user){

            let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;
            
            let _this_interview = vm._interview_data;

            if(_this_interview.location == '') {
            	store.dispatch('showMessage', 'Location not set');
            	return;
            }
            if(_this_interview.time < new Date()) {
            	store.dispatch('showMessage', 'Please enter a valid time for the interview');
            	return;
            }

            let _interview_data = {
                companyRepEmail: vm.company.email,
                studentId: user._id,
                time: _this_interview.time,
                location: _this_interview.location,
                location_lat: _this_interview.location_lat,
                location_lon: _this_interview.location_lon,
                type: _this_interview.type,
                type_other: _this_interview.type_other,
                notes: _this_interview.notes,
            }
            Vue.axios.post(_baseURL + 'api/company/interview/new', _interview_data)
            .then(function(res){
                console.log(res.data);
                store.dispatch('showMessage', 'New Interview Added');

            })
            .catch(function(err){console.log(err)});

        },
	}
}
</script>