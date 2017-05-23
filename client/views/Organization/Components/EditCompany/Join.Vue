<template>
	<div class="m-3">
		<h1>Join Company</h1>
		<p>Join an existing company!</p>
		<div class="all-companies">
			<div class="company-label"
				v-for="(company, index) in allCompanies" 
				id="company._id"
				@click="setSelectedCompany(index)"
				>
				<span>{{company.name}}</span>
			</div>
		</div>
		<div class="selectedCompany" v-if="selectedCompany">
			<h2>{{selectedCompany.name}}</h2>
			<!-- <img src="" alt=""> -->
			<p>{{selectedCompany.description}}</p>
			<button class="" 
				@click="requestToJoinCompany(selectedCompany._id)">
				Request admin to join this Company
			</button>
		</div>
	</div>
</template>

<style scoped>
	.all-companies {

		.company-label{
			display: inline-block;
			background: #f34;
			padding: 10px;
			margin: 2px;
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
            allCompanies: [],
            selectedCompany: null,




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
        },
        setSelectedCompany(_id){
        	this.selectedCompany = this.allCompanies[_id];
        },
        getExistingCompanies: function(){
        	let vm = this;

            Vue.rest.getData('organization', '', function(data){
            	console.log(data);
            	vm.allCompanies = data;
            })
        },
        requestToJoinCompany(_id){
        	Vue.axios.post(Vue.rest.restBaseUrl + 'api/organization/joinCompany', {id: _id})
        	.then(function(res){
        		location.reload();
        	})
        	.catch(function(res){
        		console.log(res);
        	})
        }
    },
    created: function(){
    	this.getExistingCompanies();
    }
}
</script>

