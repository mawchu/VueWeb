import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      //導航守衛驗證的基準 跳轉到登出介面需要先登入
      meta: { 
        requiresAuth: true,
        feelHappy: true//可以自己設定

      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
