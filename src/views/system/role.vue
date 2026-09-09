<template>
  <div class="role-manage-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>角色管理（共 {{ roleList.length }} 个角色）</span>
          <el-button type="primary" size="small" @click="openAddDialog">新增角色</el-button>
        </div>
      </template>

      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色编码" />
        <el-table-column prop="desc" label="角色描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="权限数" width="80" align="center">
          <template #default="scope">
            <el-tag size="small" type="info">{{ scope.row.permIds ? scope.row.permIds.length : 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button type="primary" size="small" @click="openAssignDialog(scope.row)">分配权限</el-button>
            <el-button type="warning" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑角色弹窗 -->
    <el-dialog v-model="formDialogVisible" :title="formDialogTitle" width="500px" @close="closeFormDialog">
      <el-form :model="roleForm" :rules="roleFormRules" ref="roleFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="roleForm.code" placeholder="请输入角色编码（英文）" />
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="roleForm.desc" type="textarea" :rows="3" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRoleForm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 权限分配弹窗 -->
    <el-dialog v-model="permDialogVisible" title="分配权限" width="60%">
      <el-tree
        ref="permTreeRef"
        :data="permTreeData"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        default-expand-all
        @check="handleTreeCheck"
      />
      <template #footer>
        <el-button @click="permDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePerm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// ---------- 存储 Key ----------
const STORAGE_KEY_ROLES = 'mock_roles'
const STORAGE_KEY_PERMS = 'mock_permissions'

// ---------- 数据读写 ----------
function getRolesFromStorage () {
  const data = localStorage.getItem(STORAGE_KEY_ROLES)
  return data ? JSON.parse(data) : []
}

function saveRolesToStorage (roles) {
  localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(roles))
}

function getPermsFromStorage () {
  const data = localStorage.getItem(STORAGE_KEY_PERMS)
  return data ? JSON.parse(data) : []
}

function savePermsToStorage (perms) {
  localStorage.setItem(STORAGE_KEY_PERMS, JSON.stringify(perms))
}

// ---------- 预设角色池 ----------
const roleNamePool = [
  { name: '超级管理员', code: 'admin', desc: '拥有系统所有权限，可管理全部功能' },
  { name: '系统管理员', code: 'system', desc: '负责系统运维和基础配置' },
  { name: '运营主管', code: 'operation', desc: '负责日常运营管理及数据分析' },
  { name: '产品经理', code: 'product', desc: '负责产品规划和需求管理' },
  { name: '开发工程师', code: 'developer', desc: '负责系统开发和代码维护' },
  { name: '人事专员', code: 'hr', desc: '负责人员招聘和员工关系' },
  { name: '财务专员', code: 'finance', desc: '负责财务核算和报表管理' },
  { name: '普通用户', code: 'user', desc: '仅拥有基础查看权限' },
  { name: '访客', code: 'guest', desc: '仅限浏览公开信息' },
  { name: '审计员', code: 'auditor', desc: '负责日志审计和合规检查' }
]

// ---------- 预设权限模块 ----------
const modulePool = [
  {
    id: 'm1',
    label: '仪表盘',
    permissions: [
      { id: 'm1-v', label: '查看' },
      { id: 'm1-o', label: '操作' }
    ]
  },
  {
    id: 'm2',
    label: '用户管理',
    permissions: [
      { id: 'm2-v', label: '查看' },
      { id: 'm2-a', label: '新增' },
      { id: 'm2-e', label: '编辑' },
      { id: 'm2-d', label: '删除' }
    ]
  },
  {
    id: 'm3',
    label: '角色管理',
    permissions: [
      { id: 'm3-v', label: '查看' },
      { id: 'm3-a', label: '新增' },
      { id: 'm3-e', label: '编辑' },
      { id: 'm3-d', label: '删除' }
    ]
  },
  {
    id: 'm4',
    label: '系统配置',
    permissions: [
      { id: 'm4-v', label: '查看' },
      { id: 'm4-e', label: '编辑' }
    ]
  },
  {
    id: 'm5',
    label: '日志管理',
    permissions: [
      { id: 'm5-v', label: '查看' },
      { id: 'm5-e', label: '导出' },
      { id: 'm5-d', label: '删除' }
    ]
  },
  {
    id: 'm6',
    label: '文件管理',
    permissions: [
      { id: 'm6-v', label: '查看' },
      { id: 'm6-u', label: '上传' },
      { id: 'm6-d', label: '删除' }
    ]
  }
]

// ---------- 权限数据（扁平化存储） ----------
const allPerms = ref([]) // 扁平权限列表 [{id, label, parentId}]

// ---------- 角色列表 ----------
const roleList = ref([])

// ---------- 权限树数据 ----------
const permTreeData = ref([])
const defaultProps = { children: 'children', label: 'label' }

// ---------- 辅助函数 ----------
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandomItems (arr, min, max) {
  const count = randomInt(min, max)
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function formatTime (date) {
  const d = new Date(date)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function generateId () {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

// ---------- 初始化权限数据 ----------
function initPermissions () {
  const existing = getPermsFromStorage()
  if (existing.length > 0) {
    allPerms.value = existing
    buildPermTree()
    return
  }

  // 随机选 4~6 个模块
  const selectedModules = pickRandomItems(modulePool, 4, 6)
  const flatPerms = []
  selectedModules.forEach(mod => {
    flatPerms.push({ id: mod.id, label: mod.label, parentId: null })
    mod.permissions.forEach(p => {
      flatPerms.push({ id: p.id, label: p.label, parentId: mod.id })
    })
  })
  allPerms.value = flatPerms
  savePermsToStorage(flatPerms)
  buildPermTree()
}

// 构建权限树
function buildPermTree () {
  const map = {}
  allPerms.value.forEach(p => {
    map[p.id] = { ...p, children: [] }
  })
  const tree = []
  allPerms.value.forEach(p => {
    if (p.parentId === null) {
      tree.push(map[p.id])
    } else if (map[p.parentId]) {
      map[p.parentId].children.push(map[p.id])
    }
  })
  permTreeData.value = tree
}

// ---------- 初始化角色数据 ----------
function initRoles () {
  const existing = getRolesFromStorage()
  if (existing.length > 0) {
    roleList.value = existing
    return
  }

  // 从角色池中随机选 5~8 个
  const count = randomInt(5, 8)
  const selected = pickRandomItems(roleNamePool, count, count)

  // 每个角色随机分配 3~8 个权限
  const allPermIds = allPerms.value.map(p => p.id)

  const roles = selected.map((r, index) => {
    const permCount = randomInt(3, Math.min(8, allPermIds.length))
    const shuffled = [...allPermIds].sort(() => Math.random() - 0.5)
    const permIds = shuffled.slice(0, permCount)
    return {
      id: index + 1,
      name: r.name,
      code: r.code,
      desc: r.desc,
      createTime: formatTime(new Date(Date.now() - randomInt(1, 90) * 24 * 60 * 60 * 1000)),
      permIds: permIds
    }
  })

  roleList.value = roles
  saveRolesToStorage(roles)
}

// ---------- 刷新角色列表 ----------
function refreshRoleList () {
  roleList.value = getRolesFromStorage()
}

// ---------- 新增/编辑弹窗 ----------
const formDialogVisible = ref(false)
const formDialogTitle = ref('新增角色')
const isEditMode = ref(false)
const editRoleId = ref(null)
const roleFormRef = ref(null)

const roleForm = reactive({
  name: '',
  code: '',
  desc: ''
})

const roleFormRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
    { pattern: /^[a-z][a-z_]*$/, message: '编码仅限小写字母和下划线', trigger: 'blur' }
  ],
  desc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
}

function openAddDialog () {
  formDialogTitle.value = '新增角色'
  isEditMode.value = false
  editRoleId.value = null
  resetRoleForm()
  formDialogVisible.value = true
}

function openEditDialog (row) {
  formDialogTitle.value = '编辑角色'
  isEditMode.value = true
  editRoleId.value = row.id
  roleForm.name = row.name
  roleForm.code = row.code
  roleForm.desc = row.desc
  formDialogVisible.value = true
  nextTick(() => {
    if (roleFormRef.value) {
      roleFormRef.value.clearValidate()
    }
  })
}

function resetRoleForm () {
  roleForm.name = ''
  roleForm.code = ''
  roleForm.desc = ''
  if (roleFormRef.value) {
    roleFormRef.value.clearValidate()
  }
}

function closeFormDialog () {
  resetRoleForm()
}

function submitRoleForm () {
  roleFormRef.value.validate((valid) => {
    if (!valid) return

    const roles = getRolesFromStorage()
    if (isEditMode.value) {
      // 编辑
      const index = roles.findIndex(r => r.id === editRoleId.value)
      if (index === -1) {
        ElMessage.error('角色不存在')
        return
      }
      roles[index].name = roleForm.name
      roles[index].code = roleForm.code
      roles[index].desc = roleForm.desc
      saveRolesToStorage(roles)
      refreshRoleList()
      formDialogVisible.value = false
      ElMessage.success('角色修改成功')
    } else {
      // 新增
      const maxId = roles.reduce((max, r) => Math.max(max, r.id), 0)
      const newRole = {
        id: maxId + 1,
        name: roleForm.name,
        code: roleForm.code,
        desc: roleForm.desc,
        createTime: formatTime(new Date()),
        permIds: []
      }
      roles.push(newRole)
      saveRolesToStorage(roles)
      refreshRoleList()
      formDialogVisible.value = false
      ElMessage.success('角色新增成功')
    }
  })
}

// ---------- 删除角色 ----------
function handleDelete (row) {
  ElMessageBox.confirm(`确定要删除角色“${row.name}”吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const roles = getRolesFromStorage()
    const index = roles.findIndex(r => r.id === row.id)
    if (index !== -1) {
      roles.splice(index, 1)
      saveRolesToStorage(roles)
      refreshRoleList()
      ElMessage.success('删除成功')
    }
  }).catch(() => {})
}

// ---------- 权限分配 ----------
const permDialogVisible = ref(false)
const currentAssignRole = ref(null)
const permTreeRef = ref(null)

function openAssignDialog (row) {
  currentAssignRole.value = row
  permDialogVisible.value = true
  // 等待树渲染完成后勾选已有权限
  nextTick(() => {
    if (permTreeRef.value && row.permIds) {
      permTreeRef.value.setCheckedKeys(row.permIds)
    }
  })
}

// 树勾选事件（可保留用于实时统计）
function handleTreeCheck (data, { checkedKeys }) {
  // 不做特殊处理，保存时再获取
}

function savePerm () {
  if (!permTreeRef.value) return
  const checkedKeys = permTreeRef.value.getCheckedKeys()
  const halfCheckedKeys = permTreeRef.value.getHalfCheckedKeys()
  const allChecked = [...checkedKeys, ...halfCheckedKeys]

  const roles = getRolesFromStorage()
  const index = roles.findIndex(r => r.id === currentAssignRole.value.id)
  if (index !== -1) {
    roles[index].permIds = allChecked
    saveRolesToStorage(roles)
    refreshRoleList()
    permDialogVisible.value = false
    ElMessage.success(`权限分配成功，共 ${allChecked.length} 个权限`)
  }
}

// ---------- 生命周期 ----------
onMounted(() => {
  // 先初始化权限，再初始化角色（角色需要依赖权限数据）
  initPermissions()
  initRoles()
})
</script>

<style scoped>
.role-manage-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
