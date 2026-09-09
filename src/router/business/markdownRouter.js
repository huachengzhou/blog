
const markdownRouter = {
  path: '/markdown',
  meta: {
    title: 'Markdown',
    icon: 'Setting'
  },
  bisEnable: false,
  children: [{
    path: '/markdown/mysql/index',
    name: 'markdown_mysql_index',
    component: () => import('@/views/markdown/mysql/index.vue'),
    meta: {
      title: 'MySQL',
      icon: 'User'
    }
  }]
}

export default markdownRouter
