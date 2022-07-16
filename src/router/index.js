import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
