// request/index.js
import axios from 'axios'
import { Toast } from 'vant'

import store from '@/store'
// import router from '@/router'

// const request = axios.create({
//   baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
//   timeout: 5000
// })

// 新增工程化配置文件
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 从环境变量中读取 baseURL
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  config.headers.platform = 'H5'
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  Toast.clear()
  const res = response.data

  if (res.status !== 200) {
    if (res.status === 401 || res.message.includes('token')) {
      Toast('登录状态已失效，请重新登录')
      store.commit('user/clearToken')
      // **删除这行代码： router.push('/login')**
      return new Promise(() => {})
    }
    Toast(res.message)
    return Promise.reject(res.message)
  }
  return res
}, function (error) {
  Toast.clear()
  if (error.response && error.response.status === 401) {
    Toast('登录状态已失效，请重新登录')
    store.commit('user/clearToken')
    // **删除这行代码： router.push('/login')**
    return new Promise(() => {})
  }
  Toast('网络异常，请稍后重试')
  return Promise.reject(error)
})

export default request
