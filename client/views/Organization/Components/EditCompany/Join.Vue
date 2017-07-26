<template>
    <div class="p-3 mt-1 blue-grey lighten-5" id="view_SelectedCompany">
        <h1><i class="material-icons responsive">business</i><br>
        Join Existing Company</h1>
        <hr>
        <div v-if="previous_request" class="alert alert-warning">
            <p>You have a previous request pending for, </p>
            <div>
                <span class="mr-2"><img class="rounded-circle d-inline" :src="previousCompanyRequest.photo ? (restUrl + 'photo/organization/small-' + previousCompanyRequest.photo) : '/img/company.png'" style="height: 3em; width: 3em !important; border-radius: 3em; width: 3em" alt=""/></span>
                <span style="padding-top:15px">{{previousCompanyRequest.name}}</span>
            </div>
        </div>
        <div class="selectedCompany" v-if="selectedCompany">
            <img class="rounded-circle d-inline mr-2 float-left z-depth-1" :src="selectedCompany.photo ? (restUrl + 'photo/organization/large-' + selectedCompany.photo) : '/img/company.png'" style="height: 8em; width: 8em !important; border-radius: 3em;" alt=""/>
            <h2> {{selectedCompany.name}}</h2>
            <div class="d-inline-block">{{selectedCompany.description}}</div>
            <button class="btn btn-primary" 
                @click="requestToJoinCompany(selectedCompany._id)">
                Request admin to join this Company
            </button>
        </div>
        <hr v-show="selectedCompany">
        <div class="all-companies">
    		<p>Select a company from below to represent within the ITPortal <input class="form-control" type="text" placeholder="Type to search for companies..." v-model="filter_companies"></p>
			<div class="company-label"
				v-for="(company, index) in allCompanies_sorted" 
				id="company._id"
				@click="setSelectedCompany(index)"
				>
				<div class="d-block" @click="scrollIntoSelected">
                    <span class="mr-2"><img class="rounded-circle d-inline" :src="company.photo ? (restUrl + 'photo/organization/small-' + company.photo) : '/img/company.png'" style="height: 3em; width: 3em !important; border-radius: 3em; width: 3em" alt=""/></span>
                    <span style="padding-top:15px">{{company.name}}</span>
                    <router-link class="btn btn-primary btn-sm d-inline-flex align-content-center with-icon float-right" :to="'/profile/organization/' + company._id"><i class="material-icons responsive">remove_red_eye</i> View Company</router-link>

                </div>
			</div>
		</div>
        <hr>
	</div>
</template>

<style scoped>
	.all-companies {

		.company-label{
			background: #fff;
			padding: 10px;
			margin: 2px;
            cursor: pointer;
		}
		
	}
</style>
<script>
import Vue from 'vue';
import store from 'store';

export default{

    data(){

        return{
            restUrl: Vue.rest.restBaseUrl,
            isEditing: false,
            company: {
                name: '',
                photo: '',
                description: '',
                organizationRepEmails: [Vue.auth.getUser().email],
            },
            allCompanies: [],
            selectedCompany: null,

            filter_companies: '',
            previous_request: null,


        }
    },
     methods: {
        getJoinQueue: function(){
            let vm = this;
            Vue.axios.get(Vue.rest.restBaseUrl + 'api/organization/joinCompany')
            .then(function(res){
                console.log(res.data);
                if(res.data){
                    setTimeout(function(){
                        store.dispatch('showMessage', 'You have previous requests to join a company, pending');
                        vm.previous_request = res.data;
                    }, 1000);
                } else {
                    vm.previous_request = null;
                    console.log('No previosu join requests');
                }
            })
            .catch(function(res){
                console.log(res);
            })

        },
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
        	this.selectedCompany = this.allCompanies_sorted[_id];
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
        },
        scrollIntoSelected: function(){
            document.getElementById('view_SelectedCompany').scrollIntoView();
        }
    },
    computed: {
        allCompanies_sorted: function(){
            let vm = this;
            let _sorted;
            _sorted = _.filter(vm.allCompanies, function(o){
                return o.name.toLowerCase().indexOf(vm.filter_companies) >=0 
            })

            _sorted =  _.sortBy(_sorted, function(o){
                return o.name.toUpperCase();
            })

            return _sorted;
        },
        previousCompanyRequest: function(){
            let vm = this;
            let _company = _.filter(vm.allCompanies, function(o){
                return o._id == vm.previous_request.user_new_organization_id;
            })

            console.log(_company)
            return _company[0];
        }
    },
    created: function(){
    	this.getExistingCompanies();
    },
    mounted: function(){
        this.getJoinQueue();
    }
}
</script>

