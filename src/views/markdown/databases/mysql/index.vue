<template>
  <div class="markdown-layout">
    <!-- 左侧：内容展示区 -->
    <div class="content-area">
      <!-- 展开按钮（仅在菜单折叠时显示） -->
      <button
        v-if="isMenuCollapsed"
        class="expand-btn"
        @click="toggleMenu"
        title="展开菜单"
      >
        ▶
      </button>

      <!-- 当前文档标题 -->
      <div class="doc-header">
        <h2>{{ currentTitle || '请选择文档' }}</h2>
        <span v-if="isLoading" class="loading-tag">加载中...</span>
        <span v-if="errorMsg" class="error-tag">⚠️ {{ errorMsg }}</span>
      </div>
      <!-- Markdown 渲染内容 -->
      <div class="markdown-body" v-html="htmlContent"></div>
    </div>

    <!-- 右侧：菜单区（可折叠） -->
    <div class="menu-area" :style="{ width: isMenuCollapsed ? '0' : '270px' }">
      <div class="menu-header">
        <span class="menu-icon">📚</span>
        <span class="menu-title" v-if="!isMenuCollapsed">文档目录</span>
        <!-- 折叠按钮（仅在菜单展开时显示） -->
        <button
          v-if="!isMenuCollapsed"
          class="collapse-btn"
          @click="toggleMenu"
          title="折叠菜单"
        >
          ◀
        </button>
      </div>

      <!-- 菜单列表（折叠时隐藏） -->
      <ul class="menu-list" v-show="!isMenuCollapsed">
        <li
          v-for="item in mysqlMarkdown"
          :key="item.title"
          :class="['menu-item', { active: currentFile === item.input }]"
          @click="selectFile(item)"
        >
          <span class="menu-item-icon">📄</span>
          <span class="menu-item-text">{{ item.title }}</span>
        </li>
      </ul>

      <div class="menu-footer" v-show="!isMenuCollapsed">
        <span class="menu-count">共 {{ mysqlMarkdown.length }} 篇</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown.css'

// 菜单数据：标题 + 文件路径
const mysqlMarkdown = [

  { title: 'MySQL 优化', input: '/markdown/databases/mysql/mysq_advanced_optimization.md' },
  { title: '基本命令', input: '/markdown/databases/mysql/mysql_basis.md' },
  { title: '数据准备', input: '/markdown/databases/mysql/mysql_data.md' },
  { title: 'MySQL分库分表原理', input: '/markdown/databases/mysql/mysql_distinguish.md' },
  { title: 'mysql安装', input: '/markdown/databases/mysql/mysql_install.md' },
  { title: 'centos7安装多个mysql', input: '/markdown/databases/mysql/mysql_install_centos.md' },
  { title: 'Win10一台电脑安装多个版本的Mysql', input: '/markdown/databases/mysql/mysql_install_more.md' },
  { title: 'windows下 Mysql安装的一些问题解决方法', input: '/markdown/databases/mysql/mysql_install_problem.md' },
  { title: 'mysql运维', input: '/markdown/databases/mysql/mysql_operation_maintenance.md' },
  { title: 'mysql存储过程', input: '/markdown/databases/mysql/mysql_procedure.md' },
  { title: 'mysql正则表达式', input: '/markdown/databases/mysql/mysql_regexp.md' },
  { title: 'mysql新查询', input: '/markdown/databases/mysql/mysql_select.md' },
  { title: 'mysql视图', input: '/markdown/databases/mysql/mysql_view.md' },
  { title: '数据库设计的规范', input: '/markdown/databases/mysql/mysql_开发规范.md' },
  { title: 'mysql_数据库设计三范式', input: '/markdown/databases/mysql/mysql_数据库设计三范式.md' },
  { title: 'mysql事务', input: '/markdown/databases/mysql/mysql事务.md' },
  { title: 'mysql函数', input: '/markdown/databases/mysql/mysql函数.md' },
  { title: 'mysql存储引擎', input: '/markdown/databases/mysql/mysql存储引擎.md' },
  { title: 'mysql整理', input: '/markdown/databases/mysql/mysql整理.md' },
  { title: 'MySQL查询', input: '/markdown/databases/mysql/mysql查询.md' },
  { title: 'mysql用户与权限', input: '/markdown/databases/mysql/mysql用户与权限.md' },
  { title: 'mysql索引', input: '/markdown/databases/mysql/mysql索引.md' },
  { title: 'mysql触发器', input: '/markdown/databases/mysql/triggers.md' }
]

// 状态
const htmlContent = ref('')
const currentFile = ref('')
const currentTitle = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const isMenuCollapsed = ref(false) // 菜单折叠状态

// 切换菜单折叠
const toggleMenu = () => {
  isMenuCollapsed.value = !isMenuCollapsed.value
}

// 加载并渲染 Markdown
const loadMarkdown = async (filePath, title) => {
  if (!filePath) return
  if (currentFile.value === filePath && htmlContent.value) return

  isLoading.value = true
  errorMsg.value = ''
  currentTitle.value = title

  try {
    const res = await fetch(filePath)
    if (!res.ok) {
      throw new Error(`加载失败 (${res.status})`)
    }
    const text = await res.text()
    htmlContent.value = marked(text)
    currentFile.value = filePath
  } catch (err) {
    errorMsg.value = err.message || '文档加载失败'
    htmlContent.value = `<p style="color:#d9534f;">⚠️ 无法加载文档：${err.message}</p>`
  } finally {
    isLoading.value = false
  }
}

// 选择菜单项
const selectFile = (item) => {
  if (currentFile.value === item.input) return
  loadMarkdown(item.input, item.title)
}

// 默认加载第一个文档
onMounted(() => {
  if (mysqlMarkdown.length > 0) {
    const first = mysqlMarkdown[0]
    loadMarkdown(first.input, first.title)
  }
})
</script>

<style scoped>
@import "~@/styles/markdownDoc.css";
</style>
