<template>
  <div class="profile-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>个人中心</span>
          <el-button type="info" size="small" @click="switchUser">切换用户</el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <!-- 左侧信息 -->
        <el-col :span="6">
          <div class="profile-avatar">
            <el-avatar :size="150" :src="currentUser.avatar">
              {{ currentUser.name }}
            </el-avatar>
            <el-button type="text" style="margin-top: 10px;" @click="changeAvatar">更换头像</el-button>
          </div>
          <div class="profile-info">
            <p><strong>用户名：</strong>{{ currentUser.username }}</p>
            <p><strong>角色：</strong>{{ currentUser.role }}</p>
            <p><strong>加入时间：</strong>{{ currentUser.joinTime }}</p>
            <p><strong>最后登录：</strong>{{ currentUser.lastLogin }}</p>
          </div>
        </el-col>

        <!-- 右侧表单 -->
        <el-col :span="18">
          <el-form :model="profileForm" :rules="profileRules" ref="profileFormRef" label-width="100px">
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="profileForm.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input v-model="profileForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="profileForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="profileForm.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="profileForm.newPassword" type="password" placeholder="请输入新密码（6位以上）"></el-input>
            </el-form-item>

            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input v-model="profileForm.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="profileForm.remark" type="textarea" :rows="4" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveProfile">保存修改</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const profileFormRef = ref(null)

// ---------- 头像池 ----------
const avatarPool = [
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
]

// ---------- 用户池 ----------
const userPool = [
  {
    id: 1,
    username: 'admin',
    name: '系统管理员',
    role: '系统管理员',
    phone: '13800138000',
    email: 'admin@example.com',
    joinTime: '2026-01-01 00:00:00',
    lastLogin: '2026-03-09 08:30:00',
    remark: '系统超级管理员，拥有所有权限',
    avatar: avatarPool[0],
    password: '123456'
  },
  {
    id: 2,
    username: 'zhangwei',
    name: '张伟',
    role: '运营主管',
    phone: '13912345678',
    email: 'zhangwei@example.com',
    joinTime: '2026-01-15 10:20:00',
    lastLogin: '2026-03-08 17:45:00',
    remark: '负责日常运营管理',
    avatar: avatarPool[1],
    password: '123456'
  },
  {
    id: 3,
    username: 'lina',
    name: '李娜',
    role: '产品经理',
    phone: '15298765432',
    email: 'lina@example.com',
    joinTime: '2026-02-01 09:00:00',
    lastLogin: '2026-03-09 09:15:00',
    remark: '负责产品规划和需求分析',
    avatar: avatarPool[2],
    password: '123456'
  },
  {
    id: 4,
    username: 'wangfei',
    name: '王飞',
    role: '开发工程师',
    phone: '18612345678',
    email: 'wangfei@example.com',
    joinTime: '2026-02-15 14:30:00',
    lastLogin: '2026-03-07 22:00:00',
    remark: '全栈开发，负责核心模块',
    avatar: avatarPool[3],
    password: '123456'
  },
  {
    id: 5,
    username: 'chenjing',
    name: '陈静',
    role: '人事专员',
    phone: '15876543210',
    email: 'chenjing@example.com',
    joinTime: '2026-03-01 11:00:00',
    lastLogin: '2026-03-08 12:30:00',
    remark: '负责招聘和员工关系',
    avatar: avatarPool[4],
    password: '123456'
  },
  {
    id: 6,
    username: 'guest',
    name: '游客用户',
    role: '游客',
    phone: '13700001111',
    email: 'guest@example.com',
    joinTime: '2026-03-05 16:20:00',
    lastLogin: '2026-03-09 07:50:00',
    remark: '仅具有只读权限',
    avatar: avatarPool[5],
    password: '123456'
  }
]

// ---------- 当前用户 ----------
const currentUser = ref({})
const profileForm = reactive({
  name: '',
  phone: '',
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  remark: ''
})

// ---------- 表单校验规则 ----------
const profileRules = {
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
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        if (profileForm.newPassword && value !== profileForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// ---------- 辅助函数 ----------
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 从池中随机选一个用户（排除当前用户）
function getRandomUser (excludeId) {
  const available = userPool.filter(u => u.id !== excludeId)
  return available[Math.floor(Math.random() * available.length)]
}

// 随机获取一个头像（排除当前头像）
function getRandomAvatar (excludeUrl) {
  const available = avatarPool.filter(a => a !== excludeUrl)
  return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : avatarPool[0]
}

// ---------- 加载用户数据 ----------
function loadUser (user) {
  currentUser.value = { ...user }
  profileForm.name = user.name
  profileForm.phone = user.phone
  profileForm.email = user.email
  profileForm.oldPassword = ''
  profileForm.newPassword = ''
  profileForm.confirmPassword = ''
  profileForm.remark = user.remark || ''
  // 清除校验状态
  if (profileFormRef.value) {
    profileFormRef.value.clearValidate()
  }
}

// ---------- 切换用户 ----------
function switchUser () {
  const newUser = getRandomUser(currentUser.value.id)
  if (newUser) {
    loadUser(newUser)
    ElMessage.success(`已切换到用户：${newUser.username}`)
  } else {
    ElMessage.warning('没有更多用户可切换')
  }
}

// ---------- 更换头像 ----------
function changeAvatar () {
  const newAvatar = getRandomAvatar(currentUser.value.avatar)
  if (newAvatar) {
    currentUser.value.avatar = newAvatar
    ElMessage.success('头像更换成功')
  }
}

// ---------- 保存修改 ----------
function saveProfile () {
  profileFormRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.error('表单验证失败，请检查输入')
      return
    }

    // 更新当前用户数据
    currentUser.value.name = profileForm.name
    currentUser.value.phone = profileForm.phone
    currentUser.value.email = profileForm.email
    if (profileForm.remark !== undefined) {
      currentUser.value.remark = profileForm.remark
    }
    // 如果修改了密码
    if (profileForm.newPassword) {
      currentUser.value.password = profileForm.newPassword
      ElMessage.success('个人信息及密码修改成功')
    } else {
      ElMessage.success('个人信息修改成功')
    }

    // 清空密码字段
    profileForm.oldPassword = ''
    profileForm.newPassword = ''
    profileForm.confirmPassword = ''
  })
}

// ---------- 重置表单 ----------
function resetForm () {
  if (profileFormRef.value) {
    profileFormRef.value.resetFields()
  }
  // 重置为当前用户的数据
  profileForm.name = currentUser.value.name
  profileForm.phone = currentUser.value.phone
  profileForm.email = currentUser.value.email
  profileForm.oldPassword = ''
  profileForm.newPassword = ''
  profileForm.confirmPassword = ''
  profileForm.remark = currentUser.value.remark || ''
  ElMessage.info('已重置')
}

// ---------- 生命周期 ----------
onMounted(() => {
  // 随机选一个用户作为初始
  const initialUser = userPool[randomInt(0, userPool.length - 1)]
  loadUser(initialUser)
})
</script>

<style scoped>
.profile-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
