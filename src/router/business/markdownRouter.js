
let routes = []

routes = routes.concat([
  {
    path: '/markdown/mysql/index',
    name: 'markdown_mysql_index',
    component: () => import('@/views/markdown/databases/mysql/index.vue'),
    meta: {
      title: 'MySQL',
      icon: 'Notebook'
    }
  },
  {
    path: '/markdown/oracle/index',
    name: 'markdown_oracle_index',
    component: () => import('@/views/markdown/databases/oracle/index.vue'),
    meta: {
      title: 'oracle',
      icon: 'Tickets'
    }
  },
  {
    path: '/markdown/postgresql/index',
    name: 'markdown_postgresql_index',
    component: () => import('@/views/markdown/databases/postgresql/index.vue'),
    meta: {
      title: 'postgresql',
      icon: 'Memo'
    }
  }
])

routes = routes.concat([
  {
    path: '/markdown/self-improvement/index',
    name: 'markdown_self-improvement_index',
    component: () => import('@/views/markdown/self-improvement/index.vue'),
    meta: {
      title: '自我提升',
      icon: 'Sunny'
    }
  }
])

routes = routes.concat([
  {
    path: '/markdown/communication-skill/index',
    name: 'markdown_communication-skill_index',
    component: () => import('@/views/markdown/communication-skill/index.vue'),
    meta: {
      title: '沟通技巧',
      icon: 'Sunrise'
    }
  }
])

const markdownRouter = {
  path: '/markdown',
  meta: {
    title: 'Markdown',
    icon: 'Folder'
  },
  bisEnable: false,
  children: routes
}

export default markdownRouter
