<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'App',
  created(){
    const api = `${process.env.API_PATH}/api/${process.env.API_ACCOUNT}/products`;
    //伺服器路徑
    //申請的API Path
    Vue.axios.get(api).then((response) => {
      console.log(response.data);
    })
    console.log(process.env)
  }
}
</script>

<style lang="scss">
@import "/assets/all";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
