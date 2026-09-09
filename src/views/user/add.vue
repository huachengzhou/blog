<template>
  <div class="user-add-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑用户' : '新增用户' }}</span>
          <el-button type="info" size="small" @click="randomFill">随机填充</el-button>
        </div>
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
            <el-option
              v-for="role in roleOptions"
              :key="role.value"
              :label="role.label"
              :value="role.value"
            />
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userFormRef = ref(null)

// ---------- 角色配置 ----------
const roleOptions = [
  { label: '管理员', value: '1' },
  { label: '普通用户', value: '2' },
  { label: '游客', value: '3' }
]

// ---------- 数据存储 key ----------
const STORAGE_KEY = 'mock_user_list'

// 从 localStorage 读取用户列表
function getUsersFromStorage () {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

// 写入 localStorage
function saveUsersToStorage (users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

// ---------- 判断是否编辑模式 ----------
const isEdit = computed(() => !!route.query.id)
const editId = ref(null)

// ---------- 表单数据 ----------
const userForm = reactive({
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

// ---------- 表单校验规则 ----------
const userRules = {
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
        if (value !== userForm.password) {
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
}

// ---------- 辅助函数：随机生成数据 ----------
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomChineseName () {
  const familyNames = ['张', '王', '李', '刘', '陈', '杨', '赵', '黄', '周', '吴']
  const givenNames = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '洋', '勇', '艳', '杰', '娟', '涛']
  const family = familyNames[Math.floor(Math.random() * familyNames.length)]
  const given = givenNames[Math.floor(Math.random() * givenNames.length)] +
    (Math.random() > 0.5 ? givenNames[Math.floor(Math.random() * givenNames.length)] : '')
  return family + given
}

function randomPhone () {
  const prefix = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']
  return prefix[Math.floor(Math.random() * prefix.length)] + String(randomInt(10000000, 99999999))
}

function randomEmail (name) {
  const domains = ['gmail.com', '163.com', 'qq.com', 'outlook.com', 'foxmail.com']
  return `${name.toLowerCase()}${randomInt(1, 999)}@${domains[Math.floor(Math.random() * domains.length)]}`
}

// 随机填充表单（符合校验规则）
function randomFill () {
  const name = randomChineseName()
  const username = name + randomInt(10, 999)
  const password = '123456' // 固定方便测试，也可以随机
  userForm.username = username
  userForm.name = name
  userForm.password = password
  userForm.confirmPassword = password
  userForm.phone = randomPhone()
  userForm.email = randomEmail(name)
  // 随机选 1~2 个角色
  const count = randomInt(1, 2)
  const shuffled = [...roleOptions].sort(() => Math.random() - 0.5)
  userForm.roleIds = shuffled.slice(0, count).map(r => r.value)
  userForm.status = Math.random() > 0.2 ? '1' : '0'
  userForm.remark = ['测试数据', '演示账号', '临时用户', 'VIP客户'][Math.floor(Math.random() * 4)]
  ElMessage.success('已随机填充表单')
}

// ---------- 加载编辑数据 ----------
function loadEditData () {
  const id = Number(route.query.id)
  if (!id) return
  editId.value = id
  const users = getUsersFromStorage()
  const user = users.find(u => u.id === id)
  if (!user) {
    ElMessage.error('用户不存在')
    router.push('/user/list')
    return
  }
  // 回显数据（密码不回显，置空让用户重新输入或保持原样）
  userForm.username = user.username
  userForm.name = user.name
  userForm.password = ''
  userForm.confirmPassword = ''
  userForm.phone = user.phone || ''
  userForm.email = user.email || ''
  userForm.roleIds = user.roleIds || []
  userForm.status = String(user.status)
  userForm.remark = user.remark || ''
}

// ---------- 提交表单 ----------
function submitForm () {
  userFormRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.error('表单验证失败，请检查输入')
      return
    }

    const users = getUsersFromStorage()
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)

    if (isEdit.value) {
      // ---------- 编辑模式 ----------
      const index = users.findIndex(u => u.id === editId.value)
      if (index === -1) {
        ElMessage.error('用户不存在')
        return
      }
      users[index] = {
        ...users[index],
        username: userForm.username,
        name: userForm.name,
        phone: userForm.phone,
        email: userForm.email,
        roleIds: userForm.roleIds,
        status: Number(userForm.status),
        remark: userForm.remark,
        // 如果密码有填则更新，否则保留原密码
        ...(userForm.password ? { password: userForm.password } : {})
      }
      saveUsersToStorage(users)
      ElMessage.success('修改用户成功')
    } else {
      // ---------- 新增模式 ----------
      // 计算最大 id
      const maxId = users.reduce((max, u) => Math.max(max, u.id), 0)
      const newUser = {
        id: maxId + 1,
        username: userForm.username,
        name: userForm.name,
        password: userForm.password,
        phone: userForm.phone,
        email: userForm.email,
        roleIds: userForm.roleIds,
        status: Number(userForm.status),
        remark: userForm.remark,
        createTime: now
      }
      users.push(newUser)
      saveUsersToStorage(users)
      ElMessage.success('新增用户成功')
    }

    // 跳转回列表页
    router.push('/user/list')
  })
}

// ---------- 重置表单 ----------
function resetForm () {
  userFormRef.value.resetFields()
  // 重置后补充默认值（radio 需要手动重置）
  userForm.status = '1'
  userForm.roleIds = []
  userForm.remark = ''
}

// ---------- 返回列表 ----------
function goBack () {
  router.push('/user/list')
}

// ---------- 生命周期 ----------
onMounted(() => {
  if (isEdit.value) {
    loadEditData()
  }
})
</script>

<style scoped>
.user-add-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
