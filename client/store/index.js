import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  loggedIn: false,
  snackbarMessage: 'Welcome to Industrial Training Portal!',
  snackbarVisible: false,
  snackbarLoaderVisible: false,
  user: JSON.parse(localStorage.getItem('user')),

  socket_user_count: 0,

}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  SET_SOCKET_USER_COUNT (state, userCount) {
    state.socket_user_count = userCount;
  },
  LOGIN (state) {
    state.loggedIn = true;
  },
  LOGOUT (state) {
    state.loggedIn = false;
  },
  CHANGE_MESSAGE (state, msg) {
    state.snackbarMessage = msg;
    state.snackbarVisible = true;
  },
  CHANGE_USER (state, _user) {
    state.user = _user;
  },
  HIDE_MESSAGE (state) {
    state.snackbarVisible = false;
  },
  SHOW_LOADER (state) {
    state.snackbarLoaderVisible = true;
  },
  HIDE_LOADER (state) {
    state.snackbarLoaderVisible = false;
  },
}

var __timeout = null;

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  },
  showMessage ({ commit }, msg) {
    commit('CHANGE_MESSAGE', msg)
    clearTimeout(__timeout);
    __timeout = setTimeout(() => {
      commit('HIDE_MESSAGE')
    }, 5000)
  },
  showLoader ({ commit }, msg) {
    console.log('[showLoader]', msg)
    commit('CHANGE_MESSAGE', msg)
    commit('SHOW_LOADER');
  },
  hideLoader ({ commit }) {
    commit('HIDE_LOADER');
    commit('HIDE_MESSAGE')
  },
  setLiveUsers ({ commit }, userCount) {
    commit('SET_SOCKET_USER_COUNT', userCount);
  },
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
