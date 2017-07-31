<template>
	<div class="p-3 mt-1 blue-grey lighten-5">
		<h1><i class="material-icons responsive">business</i><br>
        Create Company</h1>
		<form @submit.prevent="addFormData">

            
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
                                <input type="text" class="" v-model="company.name" placeholder="Your company name" v-on:keydown.enter.prevent="focusOnNext('description')">
                            </h3>
                            <p class="text-blue-grey text-darken-1" >
                                <label>Company Description
                                    <textarea type="text" id='description' class="md-textarea" v-model="company.description" placeholder="Description of your company" v-on:keydown.enter.prevent="focusOnNext('salary')"></textarea>
                                </label>
                            </p>
                            <p>
                                <label>Salary (for interns) Rs.
                                    <input type="number" id="salary" class="" v-model="company.salary" placeholder="0.00" step="500" v-on:keydown.enter.prevent="focusOnNext('vacancies')">
                                </label>
                            </p>
                            <p>
                                <label>No. of vacancies available
                                    <input type="number" id="vacancies" class="" v-model="company.vacancies" placeholder="0" v-on:keydown.enter.prevent="focusOnNext('email')">
                                </label>
                            </p>
                        </div>
                        <div class="col-lg-4 offset-lg-1 d-flex flex-column justify-content-center">
                            <h4 class="h4-responsive my-1">Contact Information</h4>
                            <p class="p-responsive d-flex with-icon">
                                <i class="material-icons">email</i>
                                <input type="text" id="email" class="" v-model="company.email" placeholder="[Official Email Address]" v-on:keydown.enter.prevent="focusOnNext('phone')">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="material-icons">call</i>
                                <input type="text" id="phone" class="" v-model="company.phone" placeholder="[Phone number]" v-on:keydown.enter.prevent="focusOnNext('address')">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-address-card-o" aria-hidden="true"></i>
                                <textarea type="text" id="address" class="md-textarea" v-model="company.address" placeholder="[Company Address]" v-on:keydown.enter.prevent="focusOnNext('website')"></textarea>
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-globe" aria-hidden="true"></i>
                                <input type="text" id="website" class="" v-model="company.linksWebpage" placeholder="[Company Official Site]" v-on:keydown.enter.prevent="focusOnNext('linkedIn')">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-linkedin-square"></i>
                                <input type="text" id="linkedIn" class="" v-model="company.linksLinkedin" placeholder="[Company LinkedIn account]" v-on:keydown.enter.prevent="focusOnNext('facebook')"></label>
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                <input type="text" id="facebook" class="" v-model="company.linksFacebook" placeholder="[Company Facebook account]" v-on:keydown.enter.prevent="focusOnNext('github')">
                            </p>
                            <p class="p-responsive d-flex with-icon">
                                <i class="fa fa-github"  aria-hidden="true"></i>
                                <input type="text" id="github" class="" v-model="company.linksGithub" placeholder="[Company Github account]" v-on:keydown.enter.prevent="focusOnNext('submitButton')">
                            </p>                            
                        </div>
                        
                    </div>
                    <div class="offset-lg-1 d-flex flex-column justify-content-center">
                        <input class="btn btn-primary text-uppercase" id="submitButton" type="submit" value="Create Company" >
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
                vacancies: '',

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
                vacancies: '',

                linksFacebook: '',
                linksLinkedin: '',
                linksGithub: '',
                linksWebpage: '',
                organizationRepEmails: [Vue.auth.getUser().email],
            };
        },
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
        focusOnNext: function(id){
            document.getElementById(id).focus();
        }
    }
}
</script>

