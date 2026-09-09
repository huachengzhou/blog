<template>
  <div class="user-list-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary" size="small" @click="openAddDialog">新增用户</el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value=""/>
            <el-option label="启用" value="1"/>
            <el-option label="禁用" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 用户表格 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="name" label="真实姓名"/>
        <el-table-column prop="phone" label="手机号"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filteredTotal"
        style="margin-top: 20px; text-align: right;"
      />
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      @close="closeDialog"
    >
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入真实姓名"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// ---------- 辅助函数 ----------
// 随机整数 [min, max]
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 随机中文姓名（2~3字）
function randomChineseName () {
  const familyNames = ['张', '王', '李', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗']
  const givenNames = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞', '平', '刚', '桂英', '涛', '慧', '建', '文', '华', '飞', '玉兰', '斌']
  const family = familyNames[Math.floor(Math.random() * familyNames.length)]
  const given = givenNames[Math.floor(Math.random() * givenNames.length)] + (Math.random() > 0.5 ? givenNames[Math.floor(Math.random() * givenNames.length)] : '')
  return family + given
}

// 随机手机号
function randomPhone () {
  const prefix = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']
  const p = prefix[Math.floor(Math.random() * prefix.length)]
  const suffix = String(randomInt(10000000, 99999999))
  return p + suffix
}

// 随机邮箱
function randomEmail (name) {
  const domains = ['gmail.com', '163.com', 'qq.com', 'outlook.com', 'foxmail.com', 'example.com']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `${name.toLowerCase()}${randomInt(1, 999)}@${domain}`
}

// 随机创建时间（最近90天内）
function randomCreateTime () {
  const now = new Date()
  const daysAgo = randomInt(0, 90)
  const hours = String(randomInt(0, 23)).padStart(2, '0')
  const minutes = String(randomInt(0, 59)).padStart(2, '0')
  const seconds = String(randomInt(0, 59)).padStart(2, '0')
  const target = new Date(now)
  target.setDate(target.getDate() - daysAgo)
  const year = target.getFullYear()
  const month = String(target.getMonth() + 1).padStart(2, '0')
  const day = String(target.getDate()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 生成单条随机用户
function generateRandomUser (id) {
  const name = randomChineseName()
  const username = name + randomInt(1, 999)
  return {
    id,
    username,
    name,
    phone: randomPhone(),
    email: randomEmail(name),
    createTime: randomCreateTime(),
    status: Math.random() > 0.2 ? 1 : 0 // 80% 启用
  }
}

// ---------- 数据 ----------
const allUserList = ref([]) // 全量数据
const userList = ref([]) // 当前页展示数据
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索表单
const searchForm = reactive({
  username: '',
  status: ''
})

// 当前过滤后的数据（用于分页计算）
const filteredList = ref([])

// 过滤后的总数
const filteredTotal = computed(() => filteredList.value.length)

// ---------- 弹窗相关 ----------
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const isEdit = ref(false)
const editId = ref(null)
const formRef = ref(null)

const formData = reactive({
  username: '',
  name: '',
  phone: '',
  email: '',
  status: 1
})

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// ---------- 核心方法 ----------
// 初始化数据
function initData () {
  const count = randomInt(20, 40)
  const list = []
  for (let i = 1; i <= count; i++) {
    list.push(generateRandomUser(i))
  }
  // 按创建时间从新到旧排序
  list.sort((a, b) => b.createTime.localeCompare(a.createTime))
  allUserList.value = list
  applyFilters()
}

// 应用搜索过滤
function applyFilters () {
  const { username, status } = searchForm
  let list = [...allUserList.value]
  if (username) {
    list = list.filter(item => item.username.includes(username) || item.name.includes(username))
  }
  if (status !== '') {
    list = list.filter(item => item.status === Number(status))
  }
  filteredList.value = list
  // 重置到第一页
  currentPage.value = 1
  updatePageData()
}

// 更新当前页数据
function updatePageData () {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  userList.value = filteredList.value.slice(start, end)
}

// 搜索
function handleSearch () {
  applyFilters()
  ElMessage.success('搜索完成')
}

// 重置搜索
function handleReset () {
  searchForm.username = ''
  searchForm.status = ''
  applyFilters()
  ElMessage.info('已重置搜索条件')
}

// ---------- 新增 / 编辑 ----------
function openAddDialog () {
  dialogTitle.value = '新增用户'
  isEdit.value = false
  editId.value = null
  resetForm()
  dialogVisible.value = true
}

function openEditDialog (row) {
  dialogTitle.value = '编辑用户'
  isEdit.value = true
  editId.value = row.id
  Object.assign(formData, {
    username: row.username,
    name: row.name,
    phone: row.phone,
    email: row.email,
    status: row.status
  })
  dialogVisible.value = true
}

function resetForm () {
  formData.username = ''
  formData.name = ''
  formData.phone = ''
  formData.email = ''
  formData.status = 1
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}

function closeDialog () {
  resetForm()
}

// 提交表单
function handleSubmit () {
  formRef.value.validate((valid) => {
    if (!valid) return

    const newData = {
      username: formData.username,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status
    }

    if (isEdit.value) {
      // 编辑
      const index = allUserList.value.findIndex(item => item.id === editId.value)
      if (index !== -1) {
        allUserList.value[index] = { ...allUserList.value[index], ...newData }
        ElMessage.success('修改成功')
      }
    } else {
      // 新增：生成新id（最大id+1）
      const maxId = allUserList.value.reduce((max, item) => Math.max(max, item.id), 0)
      const newUser = {
        id: maxId + 1,
        ...newData,
        createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
      }
      allUserList.value.unshift(newUser)
      ElMessage.success('新增成功')
    }

    dialogVisible.value = false
    applyFilters() // 刷新列表并保持搜索条件
  })
}

// ---------- 删除 ----------
function handleDelete (row) {
  ElMessageBox.confirm(`确定要删除用户“${row.username}”吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = allUserList.value.findIndex(item => item.id === row.id)
    if (index !== -1) {
      allUserList.value.splice(index, 1)
      applyFilters()
      ElMessage.success('删除成功')
    }
  }).catch(() => {
  })
}

// ---------- 分页 ----------
function handleSizeChange (val) {
  pageSize.value = val
  currentPage.value = 1
  updatePageData()
}

function handleCurrentChange (val) {
  currentPage.value = val
  updatePageData()
}

// ---------- 生命周期 ----------
onMounted(() => {
  initData()
})
</script>

<style scoped>
.user-list-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-form {
  margin-bottom: 20px;
}
</style>
