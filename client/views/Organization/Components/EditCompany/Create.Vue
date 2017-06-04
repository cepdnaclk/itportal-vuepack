<template>
	<div class="m-3">
		<h1>Create Company</h1>
		<form @submit.prevent="addFormData">
			<input type="text" placeholder="Company Name" v-model="company.name">
			<textarea placeholder="Company Description" v-model="company.description"></textarea>
			<input type="submit" value="Create Company">
		</form>
	</div>
</template>

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

