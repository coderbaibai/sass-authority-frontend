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
      component: () => import('../views/frame/Dashboard.vue'),
      children:[
        {
          path: '/tenant',
          name: 'tenant',
          cname: '租户管理',
          component: () => import('../views/tenant/TenantPage.vue'),
        },
        {
          path: '/func',
          name: 'func',
          cname: '功能管理',
          component: () => import('../views/func/FuncPage.vue'),
        },
        {
          path: '/error',
          name: 'error',
          cname: '错误页面',
          component: () => import('../views/default/ErrorPage.vue'),
        }
      ]
    }
  ]
})

export default router
