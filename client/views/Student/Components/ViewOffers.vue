<template>
	<div class="container mt-2" v-show="offers.length > 0">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">
                <h4>My Offers ({{offers.length}})</h4>
                <table class="table">
	                <tr>
	                	<td colspan="2">Company</td>
	                	<td>Date offered</td>
	                	<td class="right">Actions</td>
	                </tr>
                	<tr v-for="offer in offers">
						<td class="align-middle"><img class="rounded-circle" :src="offer.company.photo ? (restUrl + 'photo/organization/large-' + offer.company.photo) : '/img/company.png'" style="height: 3em; width: 3em !important; border-radius: 3em; width: 3em" alt=""/></td>
	                	<td class="align-middle">{{offer.company.name}}</td>
	                	<td class="align-middle small">{{(new Date(offer.updatedAt)).toLocaleString()}}</td>
	                	<td class="align-middle">
	                		<span class="btn btn-danger" :class="{'faded': (offer.accepted==true)}" @click="rejectOffer(offer)">{{!offer.accepted?'Rejected':'Reject'}}</span>
		                	<span class="btn btn-success" :class="{'faded': (offer.accepted==false)}" @click="acceptOffer(offer)">{{offer.accepted?'Accepted':'Accept'}}</span>
	                	</td>
                	</tr>
                </table>
            </div>
        </div>
	</div>
</template>
<style scoped>
	.faded{
		opacity: 0.5;
		filter: grayscale(0.5);
	}
</style>
<script>

import Vue from 'vue'
import store from 'store'

export default {
	data: ()=> {
		return {
			offers: [],

			restUrl: Vue.rest.restBaseUrl,
		}
	},
	methods: {
		getoffers: function(){
			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;
			Vue.axios.get(_baseURL + 'api/student/offers/all')
            .then(function(res){

                let _interview_data = res.data;
                console.log('_interview_data', _interview_data);

                vm.offers = _.filter(_interview_data, function(o){
                	return !_.isNull(o.company);
                });

                store.dispatch('showMessage', 'Retrieved offers')
                
            })
            .catch(function(err){console.log(err)});
		},
		acceptOffer: function(offer){

			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;
            
            let _payload = {
            	offer_id: offer._id
            }
			Vue.axios.post(_baseURL + 'api/student/offers/accept', _payload)
            .then(function(res){
            	console.log(res);
            	if(_.isEqual(res.data, "success")){
	                store.dispatch('showMessage', 'Offer Accepted')
	                Vue.set(offer, 'accepted', true);
	                return;
            	}
                store.dispatch('showMessage', 'Failed to Accept Offer.')
                
            })
            .catch(function(err){console.log(err)});
		},
		rejectOffer: function(offer){

			let vm = this;
            let _baseURL = Vue.rest.restBaseUrl;
            
            let _payload = {
            	offer_id: offer._id
            }
			Vue.axios.post(_baseURL + 'api/student/offers/reject', _payload)
            .then(function(res){
            	console.log(res);
            	if(_.isEqual(res.data, "success")){
	                store.dispatch('showMessage', 'Offer Rejected')
	                // console.log(vm.offers);
	                Vue.set(offer, 'accepted', false);
	                return;
            	}
                store.dispatch('showMessage', 'Failed to Reject Offer.')

                
            })
            .catch(function(err){console.log(err)});	
		}
	},
	mounted: function(){
		this.getoffers();
	}
}
</script>