<template>
  <div class="system-config-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>系统配置 — {{ currentSchemeName }}</span>
          <el-button type="info" size="small" @click="switchScheme">切换方案</el-button>
        </div>
      </template>

      <el-form :model="configForm" :rules="configRules" ref="configFormRef" label-width="140px">
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
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const configFormRef = ref(null)

// ---------- LOGO 图片池 ----------
const logoPool = [
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
]

// ---------- 预设配置方案 ----------
const schemePool = [
  {
    id: 1,
    name: '生产环境配置',
    systemName: '企业管理系统 (生产)',
    logoUrl: logoPool[0],
    systemDesc: '生产环境正式运行版本，严格权限控制，开启所有安全策略',
    captchaEnabled: true,
    loginFailLimit: 5,
    sessionTimeout: 30,
    uploadSizeLimit: 20,
    logEnabled: true
  },
  {
    id: 2,
    name: '开发环境配置',
    systemName: '企业管理系统 (开发)',
    logoUrl: logoPool[1],
    systemDesc: '开发测试环境，允许调试模式，验证码关闭便于快速登录测试',
    captchaEnabled: false,
    loginFailLimit: 10,
    sessionTimeout: 120,
    uploadSizeLimit: 50,
    logEnabled: false
  },
  {
    id: 3,
    name: '演示环境配置',
    systemName: '企业管理系统 (演示)',
    logoUrl: logoPool[2],
    systemDesc: '对外演示环境，只读为主，展示系统核心功能',
    captchaEnabled: false,
    loginFailLimit: 0,
    sessionTimeout: 60,
    uploadSizeLimit: 10,
    logEnabled: true
  },
  {
    id: 4,
    name: '测试环境配置',
    systemName: '企业管理系统 (测试)',
    logoUrl: logoPool[3],
    systemDesc: '自动化测试环境，高频操作，放宽限制避免测试阻塞',
    captchaEnabled: true,
    loginFailLimit: 3,
    sessionTimeout: 15,
    uploadSizeLimit: 5,
    logEnabled: false
  }
]

// ---------- 当前选中的方案 ----------
const currentScheme = ref({})
const currentSchemeName = ref('')

// ---------- 表单数据 ----------
const configForm = reactive({
  systemName: '',
  logoUrl: '',
  systemDesc: '',
  captchaEnabled: true,
  loginFailLimit: 5,
  sessionTimeout: 30,
  uploadSizeLimit: 10,
  logEnabled: true
})

// ---------- 表单校验规则 ----------
const configRules = {
  systemName: [
    { required: true, message: '请输入系统名称', trigger: 'blur' }
  ],
  systemDesc: [
    { required: true, message: '请输入系统描述', trigger: 'blur' }
  ]
}

// ---------- 辅助函数 ----------
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 从池中随机选一个方案（排除当前）
function getRandomScheme (excludeId) {
  const available = schemePool.filter(s => s.id !== excludeId)
  return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : schemePool[0]
}

// 随机获取一个 LOGO（排除当前）
function getRandomLogo (excludeUrl) {
  const available = logoPool.filter(l => l !== excludeUrl)
  return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : logoPool[0]
}

// ---------- 加载配置方案 ----------
function loadScheme (scheme) {
  currentScheme.value = { ...scheme }
  currentSchemeName.value = scheme.name
  configForm.systemName = scheme.systemName
  configForm.logoUrl = scheme.logoUrl
  configForm.systemDesc = scheme.systemDesc
  configForm.captchaEnabled = scheme.captchaEnabled
  configForm.loginFailLimit = scheme.loginFailLimit
  configForm.sessionTimeout = scheme.sessionTimeout
  configForm.uploadSizeLimit = scheme.uploadSizeLimit
  configForm.logEnabled = scheme.logEnabled

  if (configFormRef.value) {
    configFormRef.value.clearValidate()
  }
}

// ---------- 切换配置方案 ----------
function switchScheme () {
  const newScheme = getRandomScheme(currentScheme.value.id)
  if (newScheme) {
    loadScheme(newScheme)
    ElMessage.success(`已切换到：${newScheme.name}`)
  } else {
    ElMessage.warning('没有更多方案可切换')
  }
}

// ---------- 保存配置 ----------
function saveConfig () {
  configFormRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.error('表单验证失败，请检查输入')
      return
    }

    // 更新当前方案数据
    currentScheme.value.systemName = configForm.systemName
    currentScheme.value.logoUrl = configForm.logoUrl
    currentScheme.value.systemDesc = configForm.systemDesc
    currentScheme.value.captchaEnabled = configForm.captchaEnabled
    currentScheme.value.loginFailLimit = configForm.loginFailLimit
    currentScheme.value.sessionTimeout = configForm.sessionTimeout
    currentScheme.value.uploadSizeLimit = configForm.uploadSizeLimit
    currentScheme.value.logEnabled = configForm.logEnabled

    // 同步更新方案池中的对应项
    const index = schemePool.findIndex(s => s.id === currentScheme.value.id)
    if (index !== -1) {
      schemePool[index] = { ...currentScheme.value }
    }

    ElMessage.success('系统配置保存成功')
  })
}

// ---------- 重置配置 ----------
function resetConfig () {
  // 重置为当前方案的数据
  configForm.systemName = currentScheme.value.systemName
  configForm.logoUrl = currentScheme.value.logoUrl
  configForm.systemDesc = currentScheme.value.systemDesc
  configForm.captchaEnabled = currentScheme.value.captchaEnabled
  configForm.loginFailLimit = currentScheme.value.loginFailLimit
  configForm.sessionTimeout = currentScheme.value.sessionTimeout
  configForm.uploadSizeLimit = currentScheme.value.uploadSizeLimit
  configForm.logEnabled = currentScheme.value.logEnabled

  if (configFormRef.value) {
    configFormRef.value.clearValidate()
  }
  ElMessage.info('已重置为当前方案配置')
}

// ---------- LOGO 上传 ----------
function handleAvatarSuccess (response, file, fileList) {
  const url = URL.createObjectURL(file.raw)
  configForm.logoUrl = url
  // 同时更新当前方案
  currentScheme.value.logoUrl = url
  const index = schemePool.findIndex(s => s.id === currentScheme.value.id)
  if (index !== -1) {
    schemePool[index].logoUrl = url
  }
  ElMessage.success('LOGO 上传成功')
}

function beforeAvatarUpload (file) {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('上传LOGO图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传LOGO图片大小不能超过 2MB!')
  }
  return isImage && isLt2M
}

// ---------- 生命周期 ----------
onMounted(() => {
  const initial = schemePool[randomInt(0, schemePool.length - 1)]
  loadScheme(initial)
})
</script>

<style scoped>
.system-config-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
