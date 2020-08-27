// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//第三方套件放上方
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

//自己撰寫的放下方
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
