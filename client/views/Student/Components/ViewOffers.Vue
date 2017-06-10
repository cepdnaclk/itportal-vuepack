<template>
	<div class="container mt-2">
        <div class="row">
            <div class="form col-md-12 dashboard-itportal">
                <h2>My Offers ({{offers.length}})</h2>
                <ol>
	                <li v-for="offer in offers">
	                	<h4>
		                	{{offer.company.name}}
		                	<span class="small">({{(new Date(offer.updatedAt)).toLocaleString()}})</span>
		                	<div class="btn btn-danger" :class="{'faded': (offer.accepted==true)}" @click="rejectOffer(offer)">{{!offer.accepted?'Rejected':'Reject'}}</div>
		                	<div class="btn btn-success" :class="{'faded': (offer.accepted==false)}" @click="acceptOffer(offer)">{{offer.accepted?'Accepted':'Accept'}}</div>
	                	</h4>
	                	
	                </li>
                	
                </ol>
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

                vm.offers = _interview_data;

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