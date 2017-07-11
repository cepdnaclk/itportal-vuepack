<template>
	<div class="d-inline">
		
		<!-- Button trigger modal -->
		<button type="button" class="btn btn-warning btn-xsm" data-toggle="modal" :data-target="'#edit_roles_' + user._id">
		    <i class="material-icons responsive">edit</i>
		</button>

		<!-- Modal -->
		<div class="modal fade" :id="'edit_roles_' + user._id" tabindex="-1" role="dialog" :aria-labelledby="'edit_roles_title' + user._id" aria-hidden="true">
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
			                <img :src="user.photo ? (restBaseUrl + 'photo/user/small-' + user.photo) : '/img/user.png'" class="rounded-circle m-auto" style="width: 100px; height: 100px;">
			                <h5 class="modal-title w-100 font-weight-bold" :id="'edit_roles_title' + user._id" >Change Roles for {{user.name}}</h5>
		                </div>
		            </div>
		            <!--Body-->
		            <div class="modal-body choices m-auto">
						<label>
							<input type="checkbox" @change="rolesChanged($event, 'STUDENT')" :checked="userRoles['STUDENT']"> Student
						</label>
						<label>
							<input type="checkbox" @change="rolesChanged($event, 'ADMIN')" :checked="userRoles['ADMIN']"> Admin
						</label>
						<label>
							<input type="checkbox" @change="rolesChanged($event, 'COMPANY')" :checked="userRoles['COMPANY']"> Company Representative
						</label>
						<label>
							<input type="checkbox" @change="rolesChanged($event, 'STAFF')" :checked="userRoles['STAFF']"> Staff
						</label>
		            </div>
		            {{userRoles}}
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
			userRoles: {
				'STUDENT': this._user.role.indexOf('STUDENT')>=0,
				'ADMIN': this._user.role.indexOf('ADMIN')>=0,
				'COMPANY': this._user.role.indexOf('COMPANY')>=0,
				'STAFF': this._user.role.indexOf('STAFF')>=0,
			},

			restBaseUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {
		updateRoleChanges: function(){
			let vm = this;

			let _url = vm.restBaseUrl + 'api/admin/editEntry/userRoles';

			let _data = {
				id: vm.user._id,
				roles: _.keys(_.pickBy(vm.userRoles, function(value, key) {
					return value;
				}))
			}

			console.log(_data);

			Vue.axios.post(_url, _data)
			.then(function(res){
				console.log(res);
				store.dispatch('showMessage', 'User roles updated')
				setTimeout(function(){
					$('#edit_roles_' + _data.id).modal('hide')
				},300);
				vm.$emit('userrolechanged', {
					id: _data.id, 
					roles: _data.roles}
				);
			})
			.catch(function(err){
				console.error(err);
			});

		},
		rolesChanged: function(e, role){
			this.userRoles[role] = e.srcElement.checked;
		}
	}
}
</script>