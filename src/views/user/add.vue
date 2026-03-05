<template>
  <div class="user-add-container">
    <el-card shadow="hover">
      <template #header>
        <span>新增用户</span>
      </template>

      <el-form :model="userForm" :rules="userRules" ref="userFormRef" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="userForm.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="userForm.confirmPassword" type="password" placeholder="请确认密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="角色">
          <el-select v-model="userForm.roleIds" multiple placeholder="请选择角色">
            <el-option label="管理员" value="1" />
            <el-option label="普通用户" value="2" />
            <el-option label="游客" value="3" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="userForm.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="userForm.remark" type="textarea" :rows="4" placeholder="请输入备注信息"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="goBack">返回</el-button>
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
const userFormRef = ref(null)

// 用户表单
const userForm = ref({
  username: '',
  name: '',
  password: '',
  confirmPassword: '',
  phone: '',
  email: '',
  roleIds: [],
  status: '1',
  remark: ''
})

// 表单校验规则
const userRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== userForm.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
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
  ]
})

// 提交表单
const submitForm = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('新增用户成功')
      router.push('/user/list')
    } else {
      ElMessage.error('表单验证失败，请检查输入')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  userFormRef.value.resetFields()
}

// 返回列表
const goBack = () => {
  router.push('/user/list')
}
</script>

<style scoped>
.user-add-container {
  padding: 20px;
}
</style>
