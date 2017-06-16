<template>
	<div class="p-3 mt-1 blue-grey lighten-5">
		<h1><i class="material-icons responsive">business</i><br>
        Create Company</h1>
		<form @submit.prevent="addFormData">

            <label>Company Name<input type="text" class="" v-model="company.name" placeholder="Your company name"></label>
            <label class="mt-1">Company Description<textarea type="text" class="md-textarea" v-model="company.description" placeholder="Description of your company"></textarea></label>
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
                organizationRepEmails: [Vue.auth.getUser().email],
            };
        }
    }
}
</script>

