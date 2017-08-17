import Vue from 'vue';
import router from 'router';
import store from 'store';
import config from 'config/rest'

var sockets = {

	init: function(){
		
		let vm = this;
		let _restBaseUrl = config.url;

		document.addEventListener("DOMContentLoaded", function(event) {
			var socket = io(_restBaseUrl);
			console.log("[Socket] initialized on ", _restBaseUrl);

			socket.on('user_connected', function(res){
				store.dispatch('setLiveUsers', res.user_count);
			});

			socket.on('user_disconnected', function(res){
				store.dispatch('setLiveUsers', res.user_count);
			});

			socket.on('error', function(res){
				console.error('[Socket] ERROR');
				console.error(res);

				// timeout and close the socket connection to avoid unwanted traffic,
				// until the proxy forwarding is fixed
				setTimeout(function(){
					socket.close();
				}, 10000)
			});

		});
	}
}

export default sockets;