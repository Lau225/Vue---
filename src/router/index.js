import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Toast} from "vant";

const originalPush=VueRouter.prototype.push;
VueRouter.prototype.push=function(location){
  return originalPush.call(this,location).catch(err=>{})
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      activeNum:0,
      Tabbar:true
    },
    children:[
      {
        path: 'searchPopup',
        name: 'SearchPopup',
        component: () => import(/* webpackChunkName: "about" */ '../views/SearchPopup')
      }
    ]
  },
  {
    path: '/topic',
    name: 'Topic',
    meta:{
      activeNum:1,
      Tabbar:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Topic'),

  },
  {
    path: '/category',
    name: 'Category',
    meta:{
      activeNum:2,
      Tabbar:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Category'),

  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      activeNum:3,
      Tabbar:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart'),

  },
  {
    path: '/user',
    name: 'User',
    meta:{
      activeNum:4,
      Tabbar:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/User'),

  },
  {
    path: '/productDetail',
    name: 'ProductDetail',

    component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetail'),

  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由拦截
router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem("token")
  if(to.path=='/cart'){
    //判断有没有登录,判断token是否存在
    if(token){
      next()
    }else{
      //表示没有登录
      Vue.prototype.$toast("请先登录")
      next("/user")  //跳转到user路由
    }

  }
  next();
})

export default router
