import markdownRouter from './business/markdownRouter'

const baseRouters = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'House'
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/index.vue'),
    meta: {
      title: '数据统计',
      icon: 'DataBoard'
    }
  },
  {
    path: '/docOldPage',
    name: 'DocOldPage',
    component: () => import('@/views/docOldPage/index.vue'),
    meta: {
      title: '旧文档',
      icon: 'Star'
    }
  },
  {
    path: '/help',
    name: 'HelpCenter',
    component: () => import('@/views/help/index.vue'),
    meta: {
      title: '帮助中心',
      icon: 'Help'
    }
  }
]

const userRouter = {
  path: '/user',
  meta: {
    title: 'User',
    icon: 'Setting'
  },
  children: [{
    path: '/user/list',
    name: 'UserList',
    component: () => import('@/views/user/list.vue'),
    meta: {
      title: '用户列表',
      icon: 'User'
    }
  },
  {
    path: '/user/add',
    name: 'AddUser',
    component: () => import('@/views/user/add.vue'),
    meta: {
      title: '新增用户',
      icon: 'User'
    }
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/profile.vue'),
    meta: {
      title: '个人中心',
      icon: 'User'
    }
  }
  ]
}

const systemRouter = {
  path: '/system',
  meta: {
    title: 'System',
    icon: 'Setting'
  },
  children: [
    {
      path: '/system/menu',
      name: 'MenuManage',
      component: () => import('@/views/system/menu.vue'),
      meta: {
        title: '菜单管理',
        icon: 'Setting'
      }
    },
    {
      path: '/system/role',
      name: 'RoleManage',
      component: () => import('@/views/system/role.vue'),
      meta: {
        title: '角色管理',
        icon: 'Setting'
      }
    },
    {
      path: '/system/config',
      name: 'SystemConfig',
      component: () => import('@/views/system/config.vue'),
      meta: {
        title: '系统配置',
        icon: 'Setting'
      }
    }
  ]
}

// 生成树形菜单
const menuTree = baseRouters.concat([])
menuTree.push(Object.create(
  Object.getPrototypeOf(userRouter),
  Object.getOwnPropertyDescriptors(userRouter)
))
menuTree.push(Object.create(
  Object.getPrototypeOf(systemRouter),
  Object.getOwnPropertyDescriptors(systemRouter)
))
menuTree.push(Object.create(
  Object.getPrototypeOf(markdownRouter),
  Object.getOwnPropertyDescriptors(markdownRouter)
))

const routers = baseRouters.concat(userRouter.children, systemRouter.children, markdownRouter.children)

// 导出：扁平路由用于路由注册，树形菜单用于菜单渲染
export default {
  commonRules: routers,
  menuTree: menuTree
}
