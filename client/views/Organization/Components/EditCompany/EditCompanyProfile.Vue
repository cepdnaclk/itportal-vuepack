<template>
	<div class="col-md-12 container px-3" v-if="i_company">

	    <a 
	    	class="btn d-flex with-icon p-2 edit-icon"
	    	@click="toggleEditing"
	    	:class="{'btn-primary editing': isEditing, 'btn-link': !isEditing }">
	    	<i class="material-icons responsive">{{isEditing?'check':'edit'}}</i>
	    	{{isEditing?'Done':'Edit'}}
	    </a>
		<photo-upload 
			v-if="i_company.photo"
            :enableEdits="isEditing"
            :photoDefault="defaultPhoto"
            :buttonClass="'btn btn-primary'"
            :showMessages="true"
            @photo-submit="photo_upload"
            @photo-change="photo_changed"
            >
        </photo-upload>
	    <h2 class="h2-responsive">
	    <live-edit v-model="i_company.name" :editable="isEditing" placeholder="Your Company Name"></live-edit>
	    </h2>
	    <h5 class="h5-responsive">
	    <live-edit v-model="i_company.description" :editable="isEditing" placeholder="A short description about your company"></live-edit>
	    </h5>
	    <div>
	    	<h6>Organization Representatives</h6>
	    	<div v-for="rep in i_company.organizationRepEmails">
	    		{{rep}}
	    	</div >

	    </div>
	    <hr class="mt-2">
	</div>
</template>
<style>
	
</style>

<script>
	
	import Vue from 'vue'

	export default{
		props: {
	        company: {
	            required: true,
	        },
	    },
		data: function(){
			return {
				restbaseurl: Vue.rest.restBaseUrl,
				isEditing: false,
				i_company: this.company,
			}
		},
		methods: {
			photo_upload: function(e, file){
				console.log(e, file);
                let vm = this;

                if(file){
                	let _payload = {
                		photo: file,
                		email: vm.i_company._id,
                		organizationId: vm.i_company._id
                	}

                	console.log('[photo_upload][payload]', _payload);

                    Vue.rest.putImageUpload(_payload,
                    'organization', function(data){
                        console.log(data);
                    });
                }
			},
			photo_changed: function(e){
				console.log('photo_changed', e)
            },
            toggleEditing: function(){
            	this.isEditing = !this.isEditing;

            	if(this.isEditing == false){
            		// returned from an editing view
            		this.setCompanyData();
            	}
            },
            setCompanyData: function(){
                let vm = this;
                Vue.rest.updateData(this.i_company, 'organization', '/' + this.i_company._id, function(res){
                	console.log('[editcompanyprofile][profileupdated]', res)
                });
                
            }
		},
		computed: {

            defaultPhoto: function(){
            	let _defaultImage = (this.i_company.photo ? (this.restbaseurl + 'photo/organization/large-' + this.i_company.photo) : '/img/company.png');
            	return _defaultImage;
            }
		},
		mounted: function(){
			this.i_company = this.company;
		}
	}
</script>