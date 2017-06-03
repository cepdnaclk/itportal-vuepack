<template>
	<div class="col-md-12 container px-3" v-if="i_company">
		<img :src="i_company.photo || '/img/company.png'" alt="">
		<photo-upload 
            :enableEdits="editingProfile"
            :photoDefault="i_company.photo ? restbaseurl + 'photo/organization/large-' + i_company.photo : '/img/company.png'"
            :buttonClass="'btn btn-primary'"
            :showMessages="true"
            @photo-submit="photo_upload"
            @photo-change="photo_changed"
            >
        </photo-upload>

	    <h2 class="h2-responsive">{{i_company.name}}</h2>
	    <h5 class="h5-responsive">{{i_company.description}}</h5>
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
				editingProfile: false,
				i_company: this.company
			}
		},
		methods: {
			photo_upload: function(){
				console.log(e, file);
                let vm = this;

                if(file){
                    Vue.rest.putImageUpload({
                        photo: file,
                        email: this.user.email,
                    },
                    'user', function(data){
                        console.log(data);

                        vm.user = data.user;
                        Vue.auth.setUser(data.user);

                    });
                }
			},
			photo_changed: function(){

			},
		}
	}
</script>