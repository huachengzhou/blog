
let routes = []

routes = routes.concat([
  {
    path: '/markdown/mysql/index',
    name: 'markdown_mysql_index',
    component: () => import('@/views/markdown/mysql/index.vue'),
    meta: {
      title: 'MySQL',
      icon: 'Notebook'
    }
  },
  {
    path: '/markdown/oracle/index',
    name: 'markdown_oracle_index',
    component: () => import('@/views/markdown/oracle/index.vue'),
    meta: {
      title: 'oracle',
      icon: 'Notebook'
    }
  },
  {
    path: '/markdown/postgresql/index',
    name: 'markdown_postgresql_index',
    component: () => import('@/views/markdown/postgresql/index.vue'),
    meta: {
      title: 'postgresql',
      icon: 'Notebook'
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
