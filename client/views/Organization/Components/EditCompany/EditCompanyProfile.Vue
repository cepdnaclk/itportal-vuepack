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
		    <label>
		    	Company Name
		    </label>
		    <live-edit v-model="i_company.name" :editable="isEditing" placeholder="Your Company Name"></live-edit>
	    </h2>
	    <div class="row container">
	    	<div :class="{'col-md-6': isEditing, 'col-md-auto': !isEditing}">
		    	<label>Company Description
		    		<div v-show="isEditing" class="alert alert-info my-1">
		    			You may use Markdown for basic formatting. <br>
		    			For help, try this <a href="http://commonmark.org/help/" target="_blank">cheatsheet</a>
		    		</div>
	    		</label>
		    	<live-edit class="" v-show="isEditing" v-model="i_company.description" :editable="isEditing" placeholder="A short description about your company" multiline="true" @input="update_description"></live-edit>
	    	</div>
	    	<div class="col-md-6">
	    		<span class="badge badge-primary mb-1" v-show="isEditing">Preview</span>
		    	<div id="rich_desc" class="rich_desc" v-html="compiledMarkdown_description"></div>
	    	</div>
	    </div>
	    <hr>
	    <p class="p-responsive d-flex with-icon">
	    	Salary for interns : Rs.
	    	<live-edit v-model="i_company.salary" :editable="isEditing" placeholder="0.00"></live-edit>
	    </p>
	    <hr>
    	<h6>Links</h6>

	    <p class="p-responsive d-flex with-icon">
	    	No.of vacancies available : 
	    	<live-edit type="number" v-model="i_company.vacancies" :editable="isEditing" placeholder="0" ></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="material-icons">email</i>
	    	<live-edit v-model="i_company.email" :editable="isEditing" placeholder="[Official Email Address]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="material-icons">call</i>
	    	<live-edit v-model="i_company.phone" :editable="isEditing" placeholder="[Phone number]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-address-card-o" aria-hidden="true"></i>
	    	<live-edit v-model="i_company.address" :editable="isEditing" placeholder="[Company Address]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-globe" aria-hidden="true"></i>
		    <live-edit v-model="i_company.linksWebpage" :editable="isEditing" placeholder="[Company Official Site]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-linkedin-square"></i>
		    <live-edit v-model="i_company.linksLinkedin" :editable="isEditing" placeholder="[Linkedin Account]"></live-edit>
	    </p>
	    <p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-facebook-official" aria-hidden="true"></i>
		    <live-edit v-model="i_company.linksFacebook" :editable="isEditing" placeholder="[Facebook Account]"></live-edit>
		</p>
		<p class="p-responsive d-flex with-icon">
	    	<i class="fa fa-github" aria-hidden="true"></i>
		    <live-edit v-model="i_company.linksGithub" :editable="isEditing" placeholder="[Github Account]"></live-edit>
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
    
#rich_desc{
    *{
        font-size: 1em !important;
    }
    h1, h2, h3, h4, h5, h6{
        font-weight: bold;
        font-size: 1.2em !important;
    }
    ul, ol{
        list-style: auto;
        padding-left: 4em;

        li{
            list-style: disc;
            
        }
    }
    blockquote p{
        border-left: solid thick #ccc !important;
    }
    hr{
    	border-top: solid thin #ccc;
    }
    code{
    	font-family: consolas;
    }
}

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
				input: this.company.description,
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
                let _company = _.cloneDeep(this.i_company);
                delete _company.photo;
                
                Vue.rest.updateData(_company, 'organization', '/' + this.i_company._id, function(res){
                	console.log('[editcompanyprofile][profileupdated]', res)
                });
                
            },
            getDefaultPhoto: function(){
            	let _defaultImage = (this.i_company.photo ? (this.restbaseurl + 'photo/organization/large-' + this.i_company.photo) : '/img/company.png');
	            	console.log('[editcompanyprofile] _defaultImage', _defaultImage)
            	return _defaultImage;
            },
			update_description: _.debounce(function (e) {
				this.input = e.target.value
			}, 300)
		},
		computed: {
			compiledMarkdown_description: function(){
				return marked(this.i_company.description, { sanitize: true });
			}
		},
		mounted: function(){
			this.i_company = this.company;
		}
	}
</script>