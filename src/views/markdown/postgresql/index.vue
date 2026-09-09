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

  { title: 'postgresql 权限', input: '/markdown/databases/postgresql/postgresql_create用户与权限.md' }

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
/* ===== 整体布局 ===== */
.markdown-layout {
  display: flex;
  gap: 0;
  height: 100vh;
  background: #f6f8fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;
}

/* ===== 左侧内容区 ===== */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 30px 40px 40px 40px;
  background: #ffffff;
  box-shadow: inset -2px 0 8px rgba(0, 0, 0, 0.02);
  position: relative;
}

/* 展开按钮（菜单折叠时显示，悬浮在内容区右上角） */
.expand-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #d0d7de;
  background: #ffffff;
  color: #24292f;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-btn:hover {
  background: #f0f7ff;
  border-color: #1f883d;
  color: #1a7f37;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.doc-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eaeef2;
}

.doc-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #24292f;
  letter-spacing: 0.3px;
}

.loading-tag {
  font-size: 13px;
  color: #6a737d;
  background: #f0f2f4;
  padding: 2px 12px;
  border-radius: 20px;
  animation: pulse 1.2s ease-in-out infinite;
}

.error-tag {
  font-size: 13px;
  color: #b02b2b;
  background: #ffe9e9;
  padding: 2px 14px;
  border-radius: 20px;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* 覆盖 github-markdown-css 的边距 */
.content-area :deep(.markdown-body) {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0;
  background: transparent;
}

/* ===== 右侧菜单区（可折叠） ===== */
.menu-area {
  flex-shrink: 0;
  background: #ffffff;
  border-left: 1px solid #e1e4e8;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.02);
  transition: width 0.25s ease;
  /* 宽度由 style 动态控制，初始为 270px */
}

.menu-header {
  padding: 20px 16px 16px 20px;
  border-bottom: 1px solid #eaeef2;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fafbfc;
  flex-shrink: 0;
  position: relative;
}

.menu-icon {
  font-size: 20px;
}

.menu-title {
  font-size: 16px;
  font-weight: 600;
  color: #24292f;
  letter-spacing: 0.5px;
  flex: 1;
}

/* 折叠按钮（菜单展开时显示在头部右侧） */
.collapse-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  color: #8b949e;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  line-height: 1;
}

.collapse-btn:hover {
  background: #f0f2f5;
  color: #24292f;
}

.menu-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px 12px 12px;
  margin: 0;
  list-style: none;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 2px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #24292f;
  transition: all 0.15s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: #f0f2f5;
  border-left-color: #d0d7de;
}

.menu-item.active {
  background: #f0f7ff;
  border-left-color: #1f883d;
  font-weight: 500;
  color: #1a7f37;
}

.menu-item.active .menu-item-icon {
  color: #1f883d;
}

.menu-item-icon {
  font-size: 15px;
  color: #8b949e;
  flex-shrink: 0;
  transition: color 0.15s;
}

.menu-item-text {
  flex: 1;
  word-break: break-word;
  line-height: 1.4;
}

.menu-footer {
  padding: 12px 20px;
  border-top: 1px solid #eaeef2;
  background: #fafbfc;
  font-size: 12px;
  color: #8b949e;
  text-align: center;
  flex-shrink: 0;
}

/* ===== 滚动条美化 ===== */
.content-area::-webkit-scrollbar,
.menu-list::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.content-area::-webkit-scrollbar-track,
.menu-list::-webkit-scrollbar-track {
  background: transparent;
}

.content-area::-webkit-scrollbar-thumb,
.menu-list::-webkit-scrollbar-thumb {
  background: #d0d7de;
  border-radius: 10px;
}

.content-area::-webkit-scrollbar-thumb:hover,
.menu-list::-webkit-scrollbar-thumb:hover {
  background: #b0b8c0;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .markdown-layout {
    flex-direction: column-reverse;
    height: auto;
    min-height: 100vh;
  }

  .menu-area {
    width: 100% !important; /* 移动端强制展开，折叠按钮隐藏 */
    height: auto;
    max-height: 260px;
    border-left: none;
    border-top: 1px solid #e1e4e8;
    position: relative;
    transition: none;
  }

  .content-area {
    padding: 20px 20px 30px 20px;
    box-shadow: none;
  }

  .menu-list {
    max-height: 160px;
  }

  .doc-header h2 {
    font-size: 18px;
  }

  /* 移动端隐藏折叠/展开按钮，因为菜单在下方，无需折叠 */
  .collapse-btn,
  .expand-btn {
    display: none !important;
  }
}
</style>
