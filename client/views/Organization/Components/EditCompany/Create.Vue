<template>
	<div class="p-3 mt-1 blue-grey lighten-5">
		<h1><i class="material-icons responsive">business</i><br>
        Create Company</h1>
		<form @submit.prevent="addFormData">

            <!-- <label>Company Name<input type="text" class="" v-model="company.name" placeholder="Your company name"></label>
            <label class="mt-1">Company Description<textarea type="text" class="md-textarea" v-model="company.description" placeholder="Description of your company"></textarea></label>
            <label>
                <i class="material-icons">call</i><input type="text" class="" v-model="company.phone" placeholder="[Phone number]">
            </label>
            <label class="mt-1">
                <i class="fa fa-address-card-o" aria-hidden="true"></i>
                <textarea type="text" class="md-textarea" v-model="company.address" placeholder="[Company Address]"></textarea>
            </label>
            <label>
                <i class="fa fa-globe" aria-hidden="true"></i>
                <input type="text" class="" v-model="company.linksWebpage" placeholder="[Company Official Site]">
            </label>
            <label>
                <i class="fa fa-linkedin-square"></i>
                <input type="text" class="" v-model="company.linksLinkedin" placeholder="[Company LinkedIn account]"></label>
            <label>
                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                <input type="text" class="" v-model="company.linksFacebook" placeholder="[Company Facebook account]">
            </label>
            <label>
                <i class="fa fa-github" aria-hidden="true"></i>
                <input type="text" class="" v-model="company.linksGithub" placeholder="[Company Github account]">
            </label>
            <label>Salary (for interns) Rs.
                <input type="number" class="" v-model="company.salary" placeholder="0.00">
            </label>
			<input class="btn btn-primary text-uppercase" type="submit" value="Create Company"> -->
            <div class="card-block">
                    <div class="row container">
                        <div class="col-lg-3 m-auto">
                            <h4 class="h4-responsive my-1">Company Logo</h4>
                            <photo-upload 
                                :enableEdits="true"
                                :photoDefault="company.photo ? restbaseurl + 'photo/user/large-' + company.photo : '/img/user.png'"
                                :buttonClass="'btn btn-primary'"
                                :showMessages="true"
                                @photo-submit="photo_upload"
                                @photo-change="photo_changed"
                                >
                            </photo-upload>
                            
                        </div>
                        <div class="col-lg-4">
                            <h4 class="h4-responsive my-1">About Company</h4>
                            <h3 class="h3-responsive my-1">
                                <label>Company Name</label>
                                <input type="text" class="" v-model="company.name" placeholder="Your company name">
                            </h3>
                            <p class="text-blue-grey text-darken-1">
                                <label>Company Description<textarea type="text" class="md-textarea" v-model="company.description" placeholder="Description of your company"></textarea></label>
                            </p>
                            <p>
                                <label>Salary (for interns) Rs.
                                    <input type="number" class="" v-model="company.salary" placeholder="0.00">
                                </label>
                            </p>
                        </div>
                        <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                            <h4 class="h4-responsive my-1">Contact Information</h4>
                            <p class="p-responsive d-flex with-icon">
                                <i class="material-icons">email</i>
                                <input type="text" class="" v-model="company.email" placeholder="[Official Email Address]">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="material-icons">call</i>
                                <input type="text" class="" v-model="company.phone" placeholder="[Phone number]">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-address-card-o" aria-hidden="true"></i>
                                <textarea type="text" class="md-textarea" v-model="company.address" placeholder="[Company Address]"></textarea>
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-globe" aria-hidden="true"></i>
                                <input type="text" class="" v-model="company.linksWebpage" placeholder="[Company Official Site]">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-linkedin-square"></i>
                                <input type="text" class="" v-model="company.linksLinkedin" placeholder="[Company LinkedIn account]"></label>
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                <input type="text" class="" v-model="company.linksFacebook" placeholder="[Company Facebook account]">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-github" aria-hidden="true"></i>
                                <input type="text" class="" v-model="company.linksGithub" placeholder="[Company Github account]">
                            </p>                            
                        </div>
                        
                    </div>
                    <div class="offset-lg-1 d-flex flex-column justify-content-center">
                        <input class="btn btn-primary text-uppercase" type="submit" value="Create Company">
                    </div>
                </div>
		</form>
	</div>
</template>
<style scoped>
    input, textarea{
        margin: 0;
        padding-top: 0.3em;
    }
    label{
        width: 100%;
        &.dates{
            width: 48%;
        }
    }
</style>
<script>
import Vue from 'vue';

export default{

    data(){

        return{
            isEditing: false,
            company: {
                name: '',
                photo: '',
                description: '',
                email: '',
                phone: '',
                address: '',
                salary: '',

                linksFacebook: '',
                linksLinkedin: '',
                linksGithub: '',
                linksWebpage: '',

                organizationRepEmails: [Vue.auth.getUser().email],
            },



        }
    },
     methods: {
        addFormData: function(){
            let vm = this;
            Vue.rest.insertData(this.company, 'organization', null, function(res){
                if(res){
                    vm.$emit('company-uploaded', res);
                    vm.resetFormData();
                    vm.isEditing = false;
                    document.getElementById('mycompany_top').scrollIntoView();
                    location.reload();
                }
            });
        },
        toggleEditing: function(){
            this.isEditing = !this.isEditing;
            console.log(isEditing);
        },
        resetFormData: function(){
            this.company = {
                name: '',
                photo: '',
                description: '',
                email: '',
                phone: '',
                address: '',
                salary: '',

                linksFacebook: '',
                linksLinkedin: '',
                linksGithub: '',
                linksWebpage: '',
                organizationRepEmails: [Vue.auth.getUser().email],
            };
        }
    }
}
</script>

