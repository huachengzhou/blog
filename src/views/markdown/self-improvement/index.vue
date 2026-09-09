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

  { title: '什么叫魅力', input: '/markdown/自我提升/iqcs36rgjy/fdhcmhstpw.md' },
  { title: '我无所畏惧，因为', input: '/markdown/自我提升/iqcs36rgjy/j74dbsrtzw.md' },
  { title: '从此你不再受伤害', input: '/markdown/自我提升/iqcs36rgjy/tbwyjex4gc.md' },
  { title: '关于爱情令人不解的一切', input: '/markdown/自我提升/iqcs36rgjy/x8benctsak.md' },

  { title: '发声 具体训练方法', input: '/markdown/自我提升/my_self/2Bm8TrpQZx.md' },
  { title: '使自己成熟稳重', input: '/markdown/自我提升/my_self/6NGDcHa8bK.md' },
  { title: '如何变得更加成熟', input: '/markdown/自我提升/my_self/8M3fmHf6t3.md' },
  { title: '生活中常用的客套话', input: '/markdown/自我提升/my_self/awB8GGWZN2.md' },
  { title: '我自己理解的聊天技巧', input: '/markdown/自我提升/my_self/b3akcg3n8k.md' },
  { title: '任务分类法', input: '/markdown/自我提升/my_self/Ca7cQMh4j8.md' },
  { title: '如何提升自信', input: '/markdown/自我提升/my_self/confident.md' },
  { title: '你到底想表达什么', input: '/markdown/自我提升/my_self/dmMSjbaBmP.md' },
  { title: '如何保持积极乐观的心态', input: '/markdown/自我提升/my_self/eM24PpeNbm.md' },
  { title: 'PDCA循环工作法', input: '/markdown/自我提升/my_self/EsXJJeCMN5.md' },
  { title: '下班后学习', input: '/markdown/自我提升/my_self/gA2S3GmF.md' },
  { title: '如何说话好听', input: '/markdown/自我提升/my_self/good_voice.md' },
  { title: '表达能力提高', input: '/markdown/自我提升/my_self/H847ijsJzR.md' },
  { title: '100篇锻炼口才表达能力的绕口令（精选版）', input: '/markdown/自我提升/my_self/hw2jindWCD.md' },
  { title: '高情商的聊天技巧', input: '/markdown/自我提升/my_self/hweaPrcifa.md' },
  { title: '如何系统地训练口才', input: '/markdown/自我提升/my_self/idX4eTcwwY.md' },
  { title: '社恐、性格闷、胆子小', input: '/markdown/自我提升/my_self/mM8cnxMZyz.md' },
  { title: '逻辑推导', input: '/markdown/自我提升/my_self/nnEfbYYxGR.md' },
  { title: '每天保持心情的5句话', input: '/markdown/自我提升/my_self/pQpYs8SPEb.md' },
  { title: '复盘', input: '/markdown/自我提升/my_self/swtJ6FGd6S.md' },
  { title: '我自己理解的口才练习技巧', input: '/markdown/自我提升/my_self/wE4ycwFXb7.md' },
  { title: '自信相关理论', input: '/markdown/自我提升/my_self/WwnRFNFjmb.md' },
  { title: '所有命运的馈赠，早已暗中标好了价格', input: '/markdown/自我提升/my_self/X5xdewMH5E.md' },

  { title: '时间管理、精力管理、情绪管理', input: '/markdown/自我提升/my_self/34d7f23123421a281cfc0aab.md' },
  { title: '看书看到大脑疲劳以后，应如何快速恢复大脑状态', input: '/markdown/自我提升/my_self/gsmGAJPhS7.md' },
  { title: '适合分享的段子和笑话', input: '/markdown/自我提升/my_self/paragraph.md' },
  { title: '国内咨询平台', input: '/markdown/自我提升/my_self/R2XcF5nXJQ.md' },
  { title: '男生 穿着 和 仪态', input: '/markdown/自我提升/my_self/X5ws5Dsp8a.md' },
  { title: '冥想', input: '/markdown/自我提升/my_self/冥想.md' },
  { title: '记忆', input: '/markdown/自我提升/my_self/记忆.md' }

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
