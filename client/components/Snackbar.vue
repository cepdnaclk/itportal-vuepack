<template>
<transition name="slideup">
  
  <div v-show="state.snackbarVisible" class="message-wrapper" @click="hideSnackbar">

    <transition name="appear">
        <span v-show="state.snackbarLoaderVisible" class="loader-wrapper"><i class="material-icons responsive spinner">donut_small</i>  </span>
    </transition>

    <span class="message">{{state.snackbarMessage}}</span>
  </div>

</transition>
</template>

<script>
import Vue from 'vue' 

export default {
  data(){
    return {
      state: this.$store.state
    }
  },
  methods: {
    hideSnackbar: function(){
      this.$store.commit('HIDE_MESSAGE');
      this.$store.commit('HIDE_LOADER');
    }
  },
}
</script>

<style scoped>
.message-wrapper {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0px);
  z-index: 19999;
  display: block;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 0 0 6px 6px;
}

.slideup-enter-active, .slideup-leave-active {
  transition: all .2s ease;
  opacity: 1;
  transform: translate(-50%, 0px);
}
.slideup-enter, .slideup-leave-active {
  transition: all .3s ease;
  opacity: 0;
  transform: translate(-50%, -20px);
}
.appear-enter-active, .appear-leave-active {
  transition: all .2s ease;
  opacity: 1;
  transform: scale(1,1);
}
.appear-enter, .appear-leave-active {
  transition: all .3s ease;
  opacity: 0;
  transform: scale(0,0);
}
@keyframes loader-animation-1 {
  from {transform: scale(0.9,1);}
  to {transform: scale(1,0.9);}
}
@keyframes loader-animation-3 {
  from {transform: scale(0.9,1.3);}
  to {transform: scale(1.3,0.9);}
}
@keyframes loader-animation-2 {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}
@keyframes loader-rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}
.spinner{
  animation: loader-rotation 0.5s linear 0s infinite !important;
  transform-origin: 15.5px 16px;
  font-size: 32px !important;
}
.message-wrapper{
  display: inline-flex;
  align-content: center;
  font-size: 16px !important;
  height: 64px;
}
.message-wrapper .message{
  line-height: 16px;
  align-self: center;
}
.loader-wrapper i{
  margin-right: 0px !important;
}
.loader-wrapper{
  margin-right: 10px;
}
</style>
