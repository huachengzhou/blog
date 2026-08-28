<template>
  <div class="help-center-container">
    <div class="doc-container">
      <iframe :src="docUrl" frameborder="0" class="doc-iframe"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocView',
  computed: {
    docUrl () {
      // BASE_URL 在 Vue CLI 中自动注入，值为 publicPath
      return process.env.BASE_URL + 'docs/index.html'
    }
  }
}
</script>
<style scoped>
/* 1. 外层容器填满父级（假设父级是 flex 列，且高度为 100vh） */
.help-center-container {
  height: 100%; /* 若父级有高度，继承 */
  display: flex;
  flex-direction: column;
  padding: 20px; /* 保留整体边距 */
  box-sizing: border-box;
}

/* 2. 卡片 flex:1 撑满剩余高度 */
.full-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 3. 覆盖 Element Plus 默认内边距，让卡片 body 撑满 */
:deep(.el-card__body) {
  flex: 1;
  padding: 0 !important; /* 去掉内边距，iframe 紧贴边缘 */
  display: flex;
  flex-direction: column;
}

/* 4. 文档容器填满卡片 body */
.doc-container {
  flex: 1;
  width: 100%;
}

/* 5. iframe 完全填满容器 */
.doc-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
