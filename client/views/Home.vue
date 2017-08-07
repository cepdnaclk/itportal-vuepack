<template src="views/templates/home.html"></template>
<style scoped>
	.hover-link{
		cursor: pointer;
	}
	.intro-stats{
		font-size: 0.8em;
		span.description{
			line-height: 1em;
			font-size: 1em;
		}
		
	}
	@media screen and (max-width: 540px){
		.mobile-left{
			text-align: left;
		}
		.mobile-top-margin{
			margin-top: 3em;
		}
		.mobile-block{
			display: block;
		}
		li{
			padding: 1em;
		}

		.intro-stats{
			font-size: 0.8em;
			span.description{
				line-height: 1em;
				font-size: 1em;
			}
			
		}
	}
	@media screen and (max-width: 540px){
		.intro-stats{
			li{
				padding: 0.2em;
				margin-bottom: 0.2em;
			}
		}
	}

	.decorfade-enter-active, .decorfade-leave-active {
	  transition: opacity .5s;
	}
	.decorfade-enter, .decorfade-leave-to {
	  opacity: 0;
	}

</style>
<script>
import Vue from 'vue';
import AppHeaderLinks from 'components/Navigation/AppHeaderLinks'
import HomeDecor from 'components/HomeDecor'
import store from 'store';

export default {
	components:{
		AppHeaderLinks,
		HomeDecor
	},
	data() {
		return {
			state: this.$store.state,
			counts: {
		        students: 0,
		        companies: 0,
		        students_selected: 0,
		    },
		    content: {}
		}
	},
	methods: {
		moment: function(date){
			return moment(date).format('LL');
		},
		getTrafficVolume: function(volume){
			let _volume = volume;
			if(_volume < 2) { return 1; }
			if(_volume < 5) { return 2; }
			if(_volume < 10) { return 3; }
			return 5;
		}
	},
	mounted: function(){
		let _baseUrl = Vue.rest.restBaseUrl;
		let vm = this;


        store.dispatch('showLoader', 'Waiting for data server...');
		Vue.axios.get(_baseUrl + 'api/home/getData')
		.then(function(res){
			let _data = res.data;
			vm.counts = _data.count;
			vm.content = _data.content;
			console.log(_data);
	        store.dispatch('hideLoader');
		})
		.catch(function(err){console.log(err)})
	}
}
</script>
