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
            :enableEdits="isEditing"
            :photoDefault="getDefaultPhoto()"
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
	    <p class="p-responsive d-flex with-icon">
	    	<i class="material-icons">call</i>
	    	<live-edit v-model="i_company.phone" :editable="isEditing" placeholder="[Phone number]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-address-card-o" aria-hidden="true"></i>
	    	<live-edit v-model="i_company.address" :editable="isEditing" placeholder="[Company Address]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-linkedin-square"></i>
		    <a class="h7-responsive">
		    <live-edit v-model="i_company.link1" :editable="isEditing" placeholder="Link 1"></live-edit>
		    </a>
	    </p>
	    <p class="p-responsive d-flex with-icon"><i class="fa fa-facebook-official" aria-hidden="true"></i>
		    <a class="h7-responsive">
		    <live-edit v-model="i_company.link2" :editable="isEditing" placeholder="Link 2"></live-edit>
		    </a>
		</p>
	    <br>
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
                
            },
            getDefaultPhoto: function(){
            	let _defaultImage = (this.i_company.photo ? (this.restbaseurl + 'photo/organization/large-' + this.i_company.photo) : '/img/company.png');
	            	console.log('[editcompanyprofile] _defaultImage', _defaultImage)
            	return _defaultImage;
            }
		},
		computed: {
		},
		mounted: function(){
			this.i_company = this.company;
		}
	}
</script>