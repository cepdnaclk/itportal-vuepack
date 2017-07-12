<template>
	<div class="d-inline">
		
		<!-- Button trigger modal -->
		<button type="button" class="btn btn-primary btn-xsm" data-toggle="modal" data-target="#entity_editor_createCompany">
		    <span class="d-flex align-items-center"><i class="material-icons responsive">add</i> Add New Company</span>
		</button>

		<!-- Modal -->
		<div class="modal fade" id="entity_editor_createCompany" tabindex="-1" role="dialog" aria-labelledby="entity_editor_createCompany_title" aria-hidden="true">
		    <div class="modal-dialog" role="document">
		        <!--Content-->
		        <div class="modal-content">
		            <div class="modal-body choices m-auto">
						<add-new-company @company-uploaded="companyUploaded"></add-new-company>
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

import AddNewCompany from '../../../Organization/Components/EditCompany/Create'

export default {
	components:{
		AddNewCompany
	},
	data: function(){
		return {}
	},
	methods: {
		companyUploaded: function(res){

			store.dispatch('showMessage', 'New company added')
			setTimeout(function(){
				$('#entity_editor_createCompany').modal('hide')
			},300);
			this.$emit('company-uploaded', res);
		}
	}
}
</script>