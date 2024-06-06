import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      cname: '登录界面',
      component: ()=> import('../views/login/LoginPage.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      cname: '主界面',
      component: () => import('../views/frame/Dashboard.vue')
    }
  ]
})

export default router
