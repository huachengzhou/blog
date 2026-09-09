// 原始扁平路由数组（保持不变）
const routers = [
  // 仪表盘
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '仪表盘', icon: 'House' }
  },
  // 用户管理模块（注意：这里的路径都是绝对路径，以 '/' 开头）
  {
    path: '/user/list',
    name: 'UserList',
    component: () => import('@/views/user/list.vue'),
    meta: { title: '用户列表', icon: 'User' }
  },
  {
    path: '/user/add',
    name: 'AddUser',
    component: () => import('@/views/user/add.vue'),
    meta: { title: '新增用户', icon: 'User' }
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/profile.vue'),
    meta: { title: '个人中心', icon: 'User' }
  },
  // 系统设置模块
  {
    path: '/system/menu',
    name: 'MenuManage',
    component: () => import('@/views/system/menu.vue'),
    meta: { title: '菜单管理', icon: 'Setting' }
  },
  {
    path: '/system/role',
    name: 'RoleManage',
    component: () => import('@/views/system/role.vue'),
    meta: { title: '角色管理', icon: 'Setting' }
  },
  {
    path: '/system/config',
    name: 'SystemConfig',
    component: () => import('@/views/system/config.vue'),
    meta: { title: '系统配置', icon: 'Setting' }
  },
  // 数据统计
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/index.vue'),
    meta: { title: '数据统计', icon: 'DataBoard' }
  },
  // 旧文档
  {
    path: '/docOldPage',
    name: 'DocOldPage',
    component: () => import('@/views/docOldPage/index.vue'),
    meta: { title: '旧文档', icon: 'Star' }
  },
  // 帮助中心
  {
    path: '/help',
    name: 'HelpCenter',
    component: () => import('@/views/help/index.vue'),
    meta: { title: '帮助中心', icon: 'Help' }
  },
  // markdown 模块
  {
    path: '/markdown/mysql/index',
    name: 'markdown_mysql_index',
    component: () => import('@/views/markdown/mysql/index.vue'),
    meta: { title: 'MySQL 查询', icon: 'User' }
  }
]

/**
 * 根据扁平路由生成树形菜单数据
 * 规则：路径第一段作为分组（如 '/user'、'/system'），分组节点作为父菜单，
 * 子菜单为该分组下的所有叶子路由（去除了路径第一段）
 * 单独的一级路径（如 '/dashboard'、'/help'）作为顶级菜单
 */
function generateMenuTree (flatRoutes) {
  const groups = {} // 存放分组 { groupKey: { meta, children } }
  const topLevel = [] // 存放顶级菜单（无分组）

  flatRoutes.forEach(route => {
    const pathSegments = route.path.split('/').filter(Boolean) // 去除空字符串
    if (pathSegments.length === 0) return

    if (pathSegments.length === 1) {
      // 只有一级路径，如 '/dashboard'，作为顶级菜单
      topLevel.push({ ...route })
    } else {
      // 多级路径，第一段作为分组
      const groupKey = pathSegments[0] // 如 'user', 'system'
      if (!groups[groupKey]) {
        // 创建分组节点，meta 可根据需要自定义
        groups[groupKey] = {
          path: '/' + groupKey,
          meta: {
            title: groupKey.charAt(0).toUpperCase() + groupKey.slice(1), // 首字母大写
            icon: 'Setting' // 默认图标，也可以根据业务配置
          },
          children: []
        }
      }
      // 添加子路由（保留原路由对象，但建议只保留必要的字段，避免循环引用）
      groups[groupKey].children.push({ ...route })
    }
  })

  // 将分组对象转为数组，并合并到顶级菜单后（可调整顺序）
  const groupedMenus = Object.values(groups)
  // 可以按字母排序或自定义顺序，此处保持原顺序
  return [...topLevel, ...groupedMenus]
}

// 生成树形菜单
const menuTree = generateMenuTree(routers)

// 导出：扁平路由用于路由注册，树形菜单用于菜单渲染
export default {
  commonRules: routers,
  menuTree: menuTree
}
