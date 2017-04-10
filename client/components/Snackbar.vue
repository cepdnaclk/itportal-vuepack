<template>
<transition name="slideup">
  
  <div v-show="state.snackbarVisible" class="message-wrapper" @click="hideSnackbar">
    <span>{{state.snackbarMessage}}</span>
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
</style>
