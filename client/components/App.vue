<template>
  <div id="app" class="blue-grey lighten-5 full-height d-flex flex-column min-full-height justify-content-between">
  <snackbar></snackbar>

    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './Navigation/AppHeader.vue';
  import AppHeaderLinks from './Navigation/AppHeaderLinks.vue';
  import AppFooter from './Navigation/AppFooter.vue';
  import Snackbar from 'components/Snackbar'

  export default{

    components: {
      AppHeader, AppFooter, AppHeaderLinks, Snackbar
    }
  }
</script>
