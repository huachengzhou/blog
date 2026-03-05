<template>
  <div class="profile-container">
    <el-card shadow="hover">
      <template #header>
        <span>个人中心</span>
      </template>

      <el-row :gutter="20">
        <!-- 左侧信息 -->
        <el-col :span="6">
          <div class="profile-avatar">
            <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
              管理员
            </el-avatar>
            <el-button type="text" style="margin-top: 10px;">更换头像</el-button>
          </div>
          <div class="profile-info">
            <p><strong>用户名：</strong>admin</p>
            <p><strong>角色：</strong>系统管理员</p>
            <p><strong>加入时间：</strong>2026-01-01</p>
            <p><strong>最后登录：</strong>2026-03-05 09:00</p>
          </div>
        </el-col>

        <!-- 右侧表单 -->
        <el-col :span="18">
          <el-form :model="profileForm" :rules="profileRules" ref="profileFormRef" label-width="100px">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="profileForm.name"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input v-model="profileForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="profileForm.email"></el-input>
            </el-form-item>

            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="profileForm.oldPassword" type="password"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="profileForm.newPassword" type="password"></el-input>
            </el-form-item>

            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input v-model="profileForm.confirmPassword" type="password"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="profileForm.remark" type="textarea" :rows="4"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveProfile">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const profileFormRef = ref(null)

// 个人信息表单
const profileForm = ref({
  name: '系统管理员',
  phone: '13800138000',
  email: 'admin@example.com',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  remark: '系统超级管理员，拥有所有权限'
})

// 表单校验规则
const profileRules = ref({
  name: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  phone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      min: 6,
      message: '密码长度不少于 6 个字符',
      trigger: 'blur',
      required: false
    }
  ],
  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        if (profileForm.value.newPassword && value !== profileForm.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 保存修改
const saveProfile = () => {
  profileFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('个人信息修改成功')
    } else {
      ElMessage.error('表单验证失败，请检查输入')
      return false
    }
  })
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.profile-avatar {
  text-align: center;
  margin-bottom: 20px;
}

.profile-info {
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.profile-info p {
  margin: 10px 0;
  font-size: 14px;
}
</style>
