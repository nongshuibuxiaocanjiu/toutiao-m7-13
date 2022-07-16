import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 1请求拦截器
// 每一次请求都会执行的函数
// 2响应拦截器
// 每一个请求响应回来时, 都会执行的函数

request.interceptors.request.use(
  // 想在发送请求前做什么
  // config本次请求的配置
  // 必须要返回出去。

  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config)
    return config
  },
  // 请求错误的时候,处理的方法
  (error) => {
    return Promise.reject(error)
  }
)

export default request
