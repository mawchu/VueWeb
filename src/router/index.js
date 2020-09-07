import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'


Vue.use(Router)

export default new Router({
  routes: [
    {
      //客人輸入的其他無效網址都會導回login
      path:'*',
      redirect:'/login'
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   //導航守衛驗證的基準 跳轉到登出介面需要先登入
    //   meta: { 
    //     requiresAuth: true,
    //     feelHappy: true//可以自己設定

    //   }
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      //導航守衛驗證的基準 跳轉到登出介面需要先登入
      children:[
        {
          path: 'products',//子路徑不需添加跟目錄'/'
          name: 'Products',
          component: Products,
          meta: { 
            requiresAuth: true,
            // feelHappy: true//可以自己設定
          },
        },
      ]
    },
  ]
})
