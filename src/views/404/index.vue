<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <p>页面走丢了 😕</p>
      <p>您访问的页面不存在或已被删除</p>
      <el-button type="primary" @click="goBack">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goBack = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.not-found-content {
  text-align: center;
}

.not-found-content h1 {
  font-size: 120px;
  color: #409eff;
  margin: 0;
}

.not-found-content p {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
}
</style>
