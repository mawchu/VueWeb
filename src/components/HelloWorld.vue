<template>
  <div class="hello">
    <a href="#" @click.prevent="signOut">登出</a>
  </div>
</template>

<script>
import Vue from 'vue';
import swal from 'sweetalert';

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods:{
    signOut(){
      const logoutAPI = `${process.env.API_PATH}/logout`;
      const vm = this;
      Vue.axios
        .post(logoutAPI)
        .then((res)=>{
          vm.showLoading = '';
          setTimeout(function(){
            vm.showLoading='d-none';
            // console.log(vm.$options._parentVnode.context.showLoading)
            console.log(vm)

            swal({
                title: "Congrets!",
                text: "登出成功",
                icon: "success"
              })
              .then((OK) => {
                if (OK) {
                  setTimeout(function(){
                    vm.$router.push('/login'); //跳轉至首頁
                  },300)
                }
              });
          },500)
          
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
/* a {
  color: #42b983;
} */
</style>
