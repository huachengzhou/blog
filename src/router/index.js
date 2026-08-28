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
      // 用户管理模块
      {
        path: 'user/list',
        name: 'UserList',
        component: () => import('@/views/user/list.vue'),
        meta: { title: '用户列表', icon: 'User' }
      },
      {
        path: 'user/add',
        name: 'AddUser',
        component: () => import('@/views/user/add.vue'),
        meta: { title: '新增用户', icon: 'User' }
      },
      {
        path: 'user/profile',
        name: 'UserProfile',
        component: () => import('@/views/user/profile.vue'),
        meta: { title: '个人中心', icon: 'User' }
      },
      // 系统设置模块
      {
        path: 'system/menu',
        name: 'MenuManage',
        component: () => import('@/views/system/menu.vue'),
        meta: { title: '菜单管理', icon: 'Setting' }
      },
      {
        path: 'system/role',
        name: 'RoleManage',
        component: () => import('@/views/system/role.vue'),
        meta: { title: '角色管理', icon: 'Setting' }
      },
      {
        path: 'system/config',
        name: 'SystemConfig',
        component: () => import('@/views/system/config.vue'),
        meta: { title: '系统配置', icon: 'Setting' }
      },
      // 数据统计
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: { title: '数据统计', icon: 'DataBoard' }
      },
      // 旧文档
      {
        path: 'docOldPage',
        name: 'DocOldPage',
        component: () => import('@/views/docOldPage/index.vue'),
        meta: { title: '旧文档', icon: 'Help' }
      },
      // 帮助中心
      {
        path: 'help',
        name: 'HelpCenter',
        component: () => import('@/views/help/index.vue'),
        meta: { title: '帮助中心', icon: 'Help' }
      }
    ]
  },
  // 兜底路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
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
