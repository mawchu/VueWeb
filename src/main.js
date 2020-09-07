// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//第三方套件放上方
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';//引用b4功能才能正常運作 b4引用模組就可使用 不需變數去承接
import jquery from 'jquery';


//自己撰寫的放下方
import App from './App'
import router from './router'

//移除Vue的提示信息
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

window.$ = jquery;//全域引用 '$'

//後端的session cookie會存取起來 AXIOS 會自動處理這段
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // data:{
  //   showLoading:'d-none',
  //   globalData:'globalData'
  // }
})
//啟用導航守衛 全局註冊
router.beforeEach((to, from, next) => {
  console.log('to',to)
  console.log( 'from',from)
  console.log( 'next', next)
  if(to.meta.requiresAuth){
    // console.log('這裡需要驗證')
    const checkAPI = `${process.env.API_PATH}/api/user/check`;
    const vm = this;
    console.log(Vue)
    Vue.axios
      .post(checkAPI)
      .then((res)=>{
        vm.showLoading = '';
        setTimeout(function(){
          vm.showLoading='d-none';
          if(res.data.success){
            console.log('登入成功');
            next();
          }else{
            vm.showLoading = '';
            setTimeout(function(){
              vm.showLoading='d-none';
              swal("Oops", "請先登入", "error");
              setTimeout(function(){  
                next({
                  path:'/login'//若客戶登出狀態跳轉到登入頁面
                });
              },500)
            },1000)
          }
        },1000)
        
      })
  }else{
    next();
  }
  
})