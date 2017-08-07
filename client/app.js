import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import LiveEdit from 'vue-live-edit'
import PhotoUpload from 'vue-photo-upload'
import router from './router'
import store from './store'

import Multiselect from 'vue-multiselect'

import auth from 'auth';
import rest from 'restclient';
import socket from 'socket'

// import VeeValidate from 'vee-validate';


// Vue.use(VeeValidate);
Vue.use(LiveEdit);
Vue.use(PhotoUpload);

Vue.component(Multiselect)

Vue.auth = auth;
Vue.rest = rest;
Vue.socket = socket;
socket.init();

var _loggedIn = Vue.auth.loggedIn()
if(_loggedIn) store.commit('LOGIN');
else store.commit('LOGOUT');

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
