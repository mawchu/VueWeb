<template>
  <div class="text-center">
      <div class="loding-pop" :class="showLoading">
        <img class="loading" src="../../assets/loading.svg" alt="">
      </div>
      <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" v-model="user.password" placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
            <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="signIn">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
  </div>
</template>

<script>
import Vue from 'vue';
import swal from 'sweetalert';


export default {
  name: 'HelloWorld',
  data () {
    return {
      user:{
        username:'',
        password:'',
      },
      showLoading:'d-none'
    }
  },
  methods:{
    signIn(){
      const loginAPI = `${process.env.API_PATH}/admin/signin`;
      const vm = this;
      Vue.axios
        .post(loginAPI,vm.user)
        .then((res)=>{
          vm.showLoading = '';
          setTimeout(function(){
            vm.showLoading='d-none';
            if(res.data.success){
              console.log(res.data)
              swal({
                title: "Congrets!",
                text: "登入成功",
                icon: "success"
              })
              .then((OK) => {
                if (OK) {
                  setTimeout(function(){
                    vm.$router.push('/'); //跳轉至首頁
                  },300)
                }
              });
            }else{
              vm.showLoading='d-none';
              swal("Oops", "登入失敗", "error");
            }
          },1000)
          
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    html,
    body {
    height: 100%;
    }

    body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }

    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    }
    .form-signin .checkbox {
    font-weight: 400;
    }
    .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    }
    .form-signin .form-control:focus {
    z-index: 2;
    }
    .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }
    .loding-pop{
      position:absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100vh;
      background-color:rgba(0,0,0,.4);
      z-index:1;
    }
    .loading{
      position:absolute;
      top:calc(50vh - 30px);
      left:calc(50vw - 30px);
      width: 60px;
      height: 60px;
      
    }
</style>
