import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

import Tab from '@/views/layout/Tab.vue'
import Home from '@/views/layout/Home.vue'
import Classification from '@/views/layout/Classification.vue'
import Cart from '@/views/layout/Cart.vue'
import User from '@/views/layout/User.vue'

const Pay = () => import('@/views/pay')
const GoodsDetail = () => import('@/views/goodsdetail')
const Comment = () => import('@/views/goodsdetail/Comment.vue')
const GoodsList = () => import('@/views/search/GoodsList.vue')
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const MyOrder = () => import('@/views/myorder')
// import { Toast } from 'vant'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Tab,
      redirect: '/home',
      children: [
        { path: 'home', component: Home },
        { path: 'user', component: User },
        { path: 'cart', component: Cart, meta: { requiresAuth: true } },
        { path: 'classification', component: Classification }
      ]
    },
    {
      path: '/pay',
      component: Pay,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail/:id',
      component: GoodsDetail
    },
    {
      path: '/comment/:id',
      component: Comment
    },
    {
      path: '/goodslist',
      component: GoodsList
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/myorder',
      component: MyOrder
    }
  ]
})

// 添加以下代码块来捕获这个特定的重定向错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.requiresAuth)) { // 判断是否需要权限登录，需要则检查token
    const token = store.state.user.userInfo.token
    if (token) { // 有token，放行
      return next()
    } else { // 无token，重定向
    // 即使重定向，上面的代码也会捕获错误，控制台不会再报错
      // Toast('登录过期,请重新登录') // 加一个延时定时器，防止提示一闪而过
      return next('/login')
    }
  } else { // 无需权限，直接放行
    return next()
  }
})

export default router
