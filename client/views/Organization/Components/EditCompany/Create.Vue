<template>
	<div class="p-3 mt-1 blue-grey lighten-5">
		<h1><i class="material-icons responsive">business</i><br>
        Create Company</h1>
		<form @submit.prevent="addFormData">

            <label>Company Name<input type="text" class="" v-model="company.name" placeholder="Your company name"></label>
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
			<input class="btn btn-primary text-uppercase" type="submit" value="Create Company">
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
                phone: '',
                address: '',
                link1: '',
                link2: '',
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
                phone: '',
                address: '',
                link1: '',
                link2: '',
                organizationRepEmails: [Vue.auth.getUser().email],
            };
        }
    }
}
</script>

