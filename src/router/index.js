import { createRouter, createWebHashHistory } from 'vue-router'

// 导入布局组件
import Layout from '@/layout/index.vue'

// 定义路由规则
const routes = [
  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  // 404页面
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '页面不存在' }
  },
  // 首页布局路由
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      // 仪表盘
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'House' }
      },
      // ... 其余子路由保持不变
      // 兜底路由
      {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // ② 这里改了，不再传入任何参数
  routes
})

// 路由守卫：设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 管理系统`
  }
  next()
})

export default router
