<template>
	<div class="d-inline">
		
		<!-- Button trigger modal -->

		<button type="button" class="btn btn-primary btn-sm btn-block my-1" data-toggle="modal" :data-target="'#add_interview' + user._id">
			Schedule Inverview
		</button>

		<!-- Modal -->
		<div class="modal fade" :id="'add_interview' + user._id" tabindex="-1" role="dialog" :aria-labelledby="'add_interview_title' + user._id" aria-hidden="true">
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
			                <img :src="user.photo ? (restBaseUrl + 'photo/user/large-' + user.photo) : '/img/user.png'" class="rounded-circle m-auto" style="width: 100px; height: 100px;">
			                <h5 class="modal-title w-100 font-weight-bold" :id="'add_interview_title' + user._id" >Schedule interview for {{user.name}}</h5>
		                </div>
		            </div>
		            <!--Body-->
		            <div class="modal-body choices m-auto">
						<label>Time: <input type="time" v-model="interview_data.time"></label>
						<label>Date: <input type="date" v-model="interview_data.date"></label>

						<label>Interview Type: 
			                <multiselect
								v-model="interview_data.type"
								:options="interview_data_types"
								:searchable="false"
								placeholder="Select an interview type"
								label="name"
								track-by="value"
			                ></multiselect>
		                </label>
						<label>{{interview_data_other_label_value}}: <input type="text" v-model="interview_data.type_other"></label>
						<label>Notes: <input type="text" v-model="interview_data.notes"></label>
		            </div>
		            <!--Footer-->
		            <div class="modal-footer text-center justify-content-center">
		                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
		                <button @click.stop="addNewInterview" type="button" class="btn btn-primary">Schedule Interview</button>
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
import Multiselect from 'vue-multiselect';

export default {
    components: { Multiselect },
	props: {
		curruser: {
			type: Object,
			required: true,
		},
		preference:{
			type: Object,
			required: true,
		}
	},
	data: function(){
		return {
			user: this.curruser,
			company_rep: Vue.auth.getUser().email,

			interview_data: {
				time: '10:00',
				date: moment().add(7, 'd').format('YYYY-MM-DD'),
				type: {value:'ON_LOCATION', name: 'On Location'},
				type_other: '',
				notes: '',
			},

			interview_data_types: [
				{value:'ON_LOCATION', name: 'On Location'},
				{value:'OVER_THE_PHONE', name: 'Over the phone'},
				{value:'SKYPE', name: 'Skype'},
				{value:'HANGOUTS', name: 'Hangouts'},
				{value:'OTHER', name:'Other' }
			],
			interview_data_other_label_value: 'Location of interview',
			
			restBaseUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {

        addNewInterview: function(){


            let vm = this;
        	let user = vm.user;

            let _baseURL = Vue.rest.restBaseUrl;
            
            let _this_interview = vm.interview_data;

            // if(_this_interview.location == '') {
            // 	store.dispatch('showMessage', 'Location not set');
            // 	return;
            // }

            let interview_data = {
                companyRepEmail: vm.company_rep,
                studentId: user._id,
                time: _this_interview.time,
                date: _this_interview.date,

                type: _this_interview.type.value,
                type_other: _this_interview.type_other,

                notes: _this_interview.notes,
            }

            Vue.axios.post(_baseURL + 'api/company/interview/new', interview_data)
                .then(function(res){
                    
                    console.log(res.data);

                    vm.$emit('setinterviewed', vm.preference);
                    store.dispatch('showMessage', 'New Interview Added');
                    
                    $('#add_interview' + user._id).modal('hide')

                })
                .catch(function(err){console.log(err)});


        },
        moment: function(e){
        	return moment(e);
        }
	},
	watch:{
		interview_data: {
			handler(e){
				let vm = this;

				if(!e.type || !e.type.value){
					return;
				}

				switch(e.type.value){
					case 'ON_LOCATION':
						vm.interview_data_other_label_value = 'Location of interview';
						break;
					case 'OVER_THE_PHONE':
						vm.interview_data_other_label_value = 'Phone number';
						break;
					case 'SKYPE':
						vm.interview_data_other_label_value = 'Skype ID';
						break;
					case 'HANGOUTS':
						vm.interview_data_other_label_value = 'Gmail ID';
						break;
					case 'OTHER':
						vm.interview_data_other_label_value = 'How would you like to perform the interview?';
						break;
				}
			},
			deep: true
		}
	}
}
</script>