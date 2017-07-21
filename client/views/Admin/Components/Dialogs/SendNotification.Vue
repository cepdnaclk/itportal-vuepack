<template>
	<div class="d-inline">
		
		<!-- Button trigger modal -->
		<button type="button" class="btn btn-primary btn-xsm" data-toggle="modal" :data-target="'#send_notification'">
		    <i class="material-icons responsive">send</i> Send Notification
		</button> Send custom email notifications

		<!-- Modal -->
		<div class="modal fade" :id="'send_notification'" tabindex="-1" role="dialog" :aria-labelledby="send_notification_title" aria-hidden="true">
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
			                <h5 class="modal-title w-100 font-weight-bold" :id="send_notification_title" >Send Custom Notifications</h5>
		                </div>
		            </div>
		            <!--Body-->
		            <div class="modal-body choices m-auto">
		            	<span>To</span>
		            	<label>Name <input type="text" v-model="_data_name"></label>
		            	<label>email <input type="text" v-model="_data_email"></label>
		            	<hr>
		            	<span>Message</span>
		            	<label>Title <input type="text" v-model="_data_title"></label>
		            	<label>Message<input type="text" v-model="_data_message"></label>
		            	<label>Call to Action Link <input type="text" v-model="_data_action_link"></label>
		            	<label>Call to Action Title<input type="text" v-model="_data_action_title"></label>
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
	components: {

	},
	data: function(){
		return {
			restBaseUrl: Vue.rest.restBaseUrl,
			_data_name: '',
			_data_email: '',
			_data_title: '',
			_data_message: '',
			_data_action_link: Vue.rest.restBaseUrl,
			_data_action_title: 'Go to ITPortal',
		}
	},
	methods: {
		sendMessage: function(){
			let vm = this;

			let _url = vm.restBaseUrl + 'api/admin/notification';

			let _data = {
				name: vm._data_name,
				email: vm._data_email,
				title: vm._data_title,
				message: vm._data_message,
				action_link: vm._data_action_link,
				action_title: vm._data_action_title,
			}

			console.log(_data);

			store.dispatch('showLoader', 'Sending Custom Notification');
			Vue.axios.post(_url, _data)
			.then(function(res){
				console.log(res);
				store.dispatch('hideLoader');
				store.dispatch('showMessage', 'Custom Notification queued to be sent');

				setTimeout(function(){
					$('#send_notification').modal('hide')
				},300);
			})
			.catch(function(err){
				console.error(err);
			});

		},
	}
}
</script>