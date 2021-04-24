import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import user_list from '../components/user/user_list.vue'
import rights_list from '../components/rights/rights_list.vue'
import roles_list from '../components/rights/roles_list.vue'
import goods_cat from '../components/goods/goods_cat.vue'
import goods_params from '../components/goods/goods_params.vue'
import goods_list from '../components/goods/goods_list.vue'
import addGoods from '../components/goods/addGoods.vue'
import order_list from '../components/order/order_list.vue'
import report from '../components/report/report.vue'
Vue.use(Router)

const router = new Router({
  routes:[
    {path:'/' , redirect:'/login'},
    {path:'/login' , component:login},
    {path:'/home', component:home,
     redirect:'/welcome', children:[{
     path:'/welcome',component:welcome},
     {path:'/users',component:user_list},
     {path:'/rights',component:rights_list},
     {path:'/roles', component:roles_list},
     {path:'/categories', component:goods_cat},
     {path:'/params', component:goods_params},
     {path:'/goods', component:goods_list},
     {path:'/goods', component:goods_list},
     {path:'/goods/add', component:addGoods} ,
     {path:'/orders', component:order_list},
     {path:'/reports', component:report}      
    ]}
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login') next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router

 