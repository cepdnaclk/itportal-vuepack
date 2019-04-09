<template>
	<div class="d-inline email-modal">
		
		<!-- Button trigger modal -->
		<button type="button" class="btn btn-primary btn-xsm" data-toggle="modal" :data-target="'#send_notification'">
		    <i class="material-icons responsive">send</i> Send Notification
		</button> Send custom email notifications

		<!-- Modal -->
		<div class="modal fade" :id="'send_notification'" tabindex="-1" role="dialog" aria-labelledby="send_notification_title" aria-hidden="true">
		    <div class="modal-dialog modal-lg" role="document">
		        <!--Content-->
		        <div class="modal-content container-fluid">
		            <!--Header-->
		            <div class="modal-header d-inline">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		                    <span class="" aria-hidden="true">&times;</span>
		                </button>
		                <div class="clearfix"></div>
		                <div class="text-center">
			                <h5 class="modal-title w-100 font-weight-bold" id="send_notification_title" >Send Custom Notifications</h5>
		                </div>
		            </div>
		            <!--Body-->
		            <div class="modal-body choices row">
		            	<div class="col-sm-6">
			            	<span class="text-primary">To</span>
			            	<label class="d-flex align-items-center"><span style="width:100px;">Name </span><input type="text" v-model="data_name"></label>
			            	<label class="d-flex align-items-center"><span style="width:100px;">email </span><input type="text" v-model="data_email"></label>
			            	<button class="btn btn-primary btn-sm" @click="addToEmailQueue(data_name, data_email)">Add</button>
			            	<hr>
			            	<span class="text-primary">Recepients</span>
			            	<div>
				            	<button class="btn btn-primary btn-sm" @click="setStudentEmails">Students</button>
				            	<button class="btn btn-primary btn-sm" @click="setCompanyRepEmails">Company Reps</button>
				            	<button class="btn btn-warning btn-sm" @click="setNoEmails">Clear list</button>
			            	</div>
			            	 <table v-if="data_recepients.length != 0" class="table table-responsive table-sm">
			            	 	<tr>
			            	 		<th>Name</th>
			            	 		<th>Email</th>
			            	 		<th></th>
			            	 	</tr>
	 		            		<tr v-for="user in data_recepients">
	 		            			<td>{{user.name}}</td>
	 		            			<td><{{user.email}}></td>
	 		            			<td><i class="material-icons responsive delete-icon" @click="removeRecepient(user)">close</i></td>
 		            			</tr>
			            	 </table>
			            	 <div class="faded" v-else>No recepients selected yet</div>
		            	</div>
		            	<div class="col-sm-6">
			            	<span class="text-primary">Message</span>
			            	<label>Title <input type="text" v-model="data_title"></label>
			            	<label>Message <input type="text" v-model="data_message"></label>
			            	<label>Call to Action Link <input type="text" v-model="data_action_link"></label>
			            	<label>Call to Action Title<input type="text" v-model="data_action_title"></label>
		            	</div>
		            	<hr>
		            </div>
		            <!--Footer-->
		            <div class="modal-footer text-center justify-content-center">
		                <button type="button" class="btn btn-warning" data-dismiss="modal">Dismiss</button>
		                <button @click.stop="sendMessage" type="button" class="btn btn-primary">Send Notification</button>
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
	.delete-icon{
		cursor: pointer;
	}
	.choices{
		font-size: normal;

		label{
			display: block;
		}
	}
	#send_notification{
		z-index: 99999;
		margin-top: 70px;
	}
</style>
<script>
	
import Vue from 'vue';
import store from 'store';

export default {
	components: {

	},
	data: function(){
		return {
			restBaseUrl: Vue.rest.restBaseUrl,
			data_name: '',
			data_email: '',
			data_title: '',
			data_message: '',
			data_action_link: '',
			data_action_title: 'Go to ITPortal',
			students: [],
			companyReps: [],

			data_recepients: [],
		}
	},
	methods: {
		addToEmailQueue(data_name, data_email){
			if(!data_email) return;
			this.data_recepients.push({name: data_name, email: data_email});
			this.data_email = '';
		},
		removeRecepient:function(user){
			this.data_recepients = _.filter(this.data_recepients, function(u){
				console.log(u, user);
				return ((u.email != user.email) && (u.name != user.name)) ;
			})
		},
		setStudentEmails: function(){
			store.dispatch('showMessage', 'Recepients replaced with students');
			this.data_recepients = this.students;
		},
		setCompanyRepEmails: function(){
			store.dispatch('showMessage', 'Recepients replaced with company reps');
			this.data_recepients = this.companyReps;
		},
		setNoEmails: function(){
			store.dispatch('showMessage', 'Cleared recepients list');
			this.data_recepients = [];
		},
		getUserData: function(){
			let vm = this;

			Vue.rest.getData('student','?populate=StudentDetails', function(data){vm.students = _.map(data, function(o){
				return {name: o.StudentDetails.name, email: o.StudentDetails.email};
			})});
			Vue.rest.getData('organizationRep','?populate=OrganizationRepDetails', function(data){vm.companyReps = _.map(data, function(o){
				return {name: o.OrganizationRepDetails.name, email: o.OrganizationRepDetails.email};
			})});

		},
		sendMessage: function(){

			let vm = this;
			if(vm.data_recepients.length == 0){
				store.dispatch('showMessage', 'No recepients selected');
				return;
			}
			if(!confirm('You are about to send ' + vm.data_recepients.length +  ' messages. Continue?')){
				return;
			}

			let _url = vm.restBaseUrl + 'api/admin/notification';

			let _size = vm.data_recepients.length;
			let _index = 0;

			store.dispatch('showLoader', 'Sending notifications to queue.. (' + _index + '/' + _size + ')');

			_.forEach(vm.data_recepients, function(_user){

				setTimeout(function(){

					let _data = {
						name: _user.name,
						email: _user.email,
						title: vm.data_title,
						message: vm.data_message,
						action_link: vm.data_action_link,
						action_title: vm.data_action_title,
					}

					console.log(_data);
					Vue.axios.post(_url, _data)
					.then(function(res){
						_index++;

						if(_index == _size){
							store.dispatch('showLoader', 'Sending notifications to queue.. (' + _index + '/' + _size + ')');

							setTimeout(function(){
								$('#send_notification').modal('hide')
							},300);
						
							setTimeout(function(){
								store.dispatch('hideLoader');
								store.dispatch('showMessage', 'Custom Notification queued to be sent');
							}, 300)

						} else {
							store.dispatch('showLoader', 'Sending notifications to queue.. (' + _index + '/' + _size + ')');
						}
						console.log(res);

					})
					.catch(function(err){

						store.dispatch('hideLoader');
						store.dispatch('showMessage', 'Failed sending some messages. Check logs!');
						console.error(err);
					});

				}, 10);

				
			})

		},
	},
	mounted: function(){
		this.getUserData();
	}
}
</script>