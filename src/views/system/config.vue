<template>
  <div class="system-config-container">
    <el-card shadow="hover">
      <template #header>
        <span>系统配置</span>
      </template>

      <el-form :model="configForm" :rules="configRules" ref="configFormRef" label-width="120px">
        <el-form-item label="系统名称" prop="systemName">
          <el-input v-model="configForm.systemName" placeholder="请输入系统名称"></el-input>
        </el-form-item>

        <el-form-item label="系统LOGO">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="configForm.logoUrl" :src="configForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="系统描述" prop="systemDesc">
          <el-input v-model="configForm.systemDesc" type="textarea" :rows="4" placeholder="请输入系统描述"></el-input>
        </el-form-item>

        <el-form-item label="是否开启验证码">
          <el-switch v-model="configForm.captchaEnabled" active-text="开启" inactive-text="关闭"></el-switch>
        </el-form-item>

        <el-form-item label="登录失败次数限制">
          <el-input-number v-model="configForm.loginFailLimit" :min="0" :max="10" label="次"></el-input-number>
        </el-form-item>

        <el-form-item label="会话超时时间">
          <el-input-number v-model="configForm.sessionTimeout" :min="10" :max="1440" label="分钟"></el-input-number>
        </el-form-item>

        <el-form-item label="文件上传大小限制">
          <el-input-number v-model="configForm.uploadSizeLimit" :min="1" :max="100" label="MB"></el-input-number>
        </el-form-item>

        <el-form-item label="是否开启日志记录">
          <el-switch v-model="configForm.logEnabled" active-text="开启" inactive-text="关闭"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveConfig">保存配置</el-button>
          <el-button @click="resetConfig">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const configFormRef = ref(null)

// 系统配置表单
const configForm = ref({
  systemName: 'Vue3 Element Plus 管理系统',
  logoUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  systemDesc: '基于Vue3和Element Plus构建的现代化管理系统',
  captchaEnabled: true,
  loginFailLimit: 5,
  sessionTimeout: 30,
  uploadSizeLimit: 10,
  logEnabled: true
})

// 表单校验规则
const configRules = ref({
  systemName: [
    { required: true, message: '请输入系统名称', trigger: 'blur' }
  ],
  systemDesc: [
    { required: true, message: '请输入系统描述', trigger: 'blur' }
  ]
})

// 保存配置
const saveConfig = () => {
  configFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('系统配置保存成功')
    } else {
      ElMessage.error('表单验证失败，请检查输入')
      return false
    }
  })
}

// 重置配置
const resetConfig = () => {
  configFormRef.value.resetFields()
}

// 上传LOGO成功
const handleAvatarSuccess = (response, file, fileList) => {
  configForm.value.logoUrl = URL.createObjectURL(file.raw)
}

// 上传前校验
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传LOGO图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传LOGO图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}
</script>

<style scoped>
.system-config-container {
  padding: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
