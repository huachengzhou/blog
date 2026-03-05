<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <template #header>
        <div class="login-title">管理系统登录</div>
      </template>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <div class="code-img">
                验证码图片
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loginFormRef = ref(null)

// 登录表单
const loginForm = ref({
  username: 'admin',
  password: '123456',
  code: '8888'
})

// 表单校验规则
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
})

// 登录处理
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 模拟登录成功
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      ElMessage.error('请完善登录信息')
      return false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
}

.login-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.code-img {
  height: 40px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  cursor: pointer;
}
</style>
