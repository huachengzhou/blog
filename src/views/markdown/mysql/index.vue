<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown.css' // 引入样式

const htmlContent = ref('')

onMounted(async () => {
  const res = await fetch('/markdown/databases/mysql/mysql查询.md')
  const text = await res.text()
  htmlContent.value = marked(text)
})
</script>
<style scoped>
/* 可选：调整边距等 */
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
</style>
