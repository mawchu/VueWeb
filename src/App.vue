<template>
  <div id="app">
      <div class="loding-pop" :class="showLoading">
        <img class="loading" src="./assets/loading.svg" alt="">
      </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'App',
  data(){
    return{
      showLoading:'d-none',
       globalData:'globalData'
    }
  },
  created(){

  }
}
</script>

<style lang="scss">
@import "/assets/all";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
