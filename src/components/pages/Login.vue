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
//匯入進來才能使用sweetalert
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
                    vm.$router.push('/admin/products').catch(err=>err); //跳轉至首頁 catch(err=>err) 修正promise跳錯
                  },200)
                }
              });
            }else{
              vm.showLoading='d-none';
              swal("Oops", "登入失敗", "error");
            }
          },300)
          
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

</style>
