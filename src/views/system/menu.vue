<template>
  <div class="menu-manage-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>菜单管理（共 {{ flatMenuList.length }} 个菜单）</span>
          <el-button type="primary" size="small" @click="openAddDialog">新增菜单</el-button>
        </div>
      </template>

      <!-- 菜单树 -->
      <el-tree
        ref="menuTreeRef"
        :data="treeMenuList"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        show-checkbox
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>
              <el-icon v-if="data.icon" style="margin-right: 6px;">
                <component :is="data.icon" />
              </el-icon>
              <span>{{ node.label }}</span>
              <el-tag v-if="data.path" size="small" type="info" style="margin-left: 10px;">
                {{ data.path }}
              </el-tag>
            </span>
            <span>
              <el-button type="text" size="small" @click.stop="openEditDialog(data)">编辑</el-button>
              <el-button type="text" size="small" @click.stop="handleDelete(data)">删除</el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>

    <!-- 新增/编辑菜单弹窗 -->
    <el-dialog
      v-model="formDialogVisible"
      :title="formDialogTitle"
      width="550px"
      @close="closeFormDialog"
    >
      <el-form :model="menuForm" :rules="menuFormRules" ref="menuFormRef" label-width="100px">
        <el-form-item label="上级菜单" prop="parentId">
          <el-select
            v-model="menuForm.parentId"
            placeholder="请选择上级菜单（空为顶级）"
            clearable
            filterable
          >
            <el-option label="顶级菜单" :value="null" />
            <el-option
              v-for="item in parentOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
              :disabled="item.id === menuForm.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="label">
          <el-input v-model="menuForm.label" placeholder="请输入菜单名称" />
        </el-form-item>

        <el-form-item label="路由路径" prop="path">
          <el-input v-model="menuForm.path" placeholder="请输入路由路径，如 /user/list" />
        </el-form-item>

        <el-form-item label="图标" prop="icon">
          <el-select v-model="menuForm.icon" placeholder="请选择图标" filterable clearable>
            <el-option
              v-for="icon in iconOptions"
              :key="icon"
              :label="icon"
              :value="icon"
            >
              <span style="display: flex; align-items: center;">
                <el-icon style="margin-right: 8px;"><component :is="icon" /></el-icon>
                {{ icon }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="menuForm.sort" :min="0" :max="999" controls-position="right" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="formDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitMenuForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ---------- 图标列表 ----------
// 从 Element Plus 图标中提取常用图标
const allIcons = Object.keys(ElementPlusIconsVue)
const iconOptions = ref([
  'House', 'User', 'Setting', 'Menu', 'Document', 'Edit', 'Delete', 'Plus', 'Search',
  'Bell', 'Message', 'Star', 'Heart', 'Clock', 'Calendar', 'Location', 'Phone', 'Mail',
  'Lock', 'Key', 'Home', 'Files', 'Folder', 'FolderOpened', 'Upload', 'Download',
  'Refresh', 'Loading', 'Link', 'Share', 'View', 'Hide', 'FullScreen', 'Switch',
  'List', 'Grid', 'TrendCharts', 'PieChart', 'DataBoard', 'Monitor', 'Printer',
  'UserFilled', 'Avatar', 'CircleCheck', 'CircleClose', 'Warning', 'InfoFilled',
  'SuccessFilled', 'ErrorFilled', 'QuestionFilled'
])

// ---------- 存储 Key ----------
const STORAGE_KEY = 'mock_menus'

// ---------- 数据读写 ----------
function getMenusFromStorage () {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

function saveMenusToStorage (menus) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menus))
}

// ---------- 预设菜单池 ----------
const menuPool = [
  // 一级菜单
  { label: '仪表盘', path: '/dashboard', icon: 'House', children: [] },
  {
    label: '用户管理',
    path: '/user',
    icon: 'User',
    children: [
      { label: '用户列表', path: '/user/list', icon: 'User' },
      { label: '新增用户', path: '/user/add', icon: 'Plus' },
      { label: '用户角色', path: '/user/role', icon: 'Avatar' }
    ]
  },
  {
    label: '角色管理',
    path: '/role',
    icon: 'Avatar',
    children: [
      { label: '角色列表', path: '/role/list', icon: 'List' },
      { label: '分配权限', path: '/role/perm', icon: 'Key' }
    ]
  },
  {
    label: '菜单管理',
    path: '/menu',
    icon: 'Menu',
    children: [
      { label: '菜单列表', path: '/menu/list', icon: 'Menu' }
    ]
  },
  {
    label: '系统配置',
    path: '/config',
    icon: 'Setting',
    children: [
      { label: '系统设置', path: '/config/system', icon: 'Setting' },
      { label: '安全配置', path: '/config/security', icon: 'Lock' }
    ]
  },
  {
    label: '日志管理',
    path: '/log',
    icon: 'Document',
    children: [
      { label: '操作日志', path: '/log/operation', icon: 'Edit' },
      { label: '登录日志', path: '/log/login', icon: 'Key' }
    ]
  },
  {
    label: '文件管理',
    path: '/file',
    icon: 'Folder',
    children: [
      { label: '文件列表', path: '/file/list', icon: 'Files' },
      { label: '上传中心', path: '/file/upload', icon: 'Upload' }
    ]
  },
  {
    label: '个人中心',
    path: '/profile',
    icon: 'UserFilled',
    children: [
      { label: '个人信息', path: '/profile/info', icon: 'UserFilled' },
      { label: '修改密码', path: '/profile/password', icon: 'Lock' }
    ]
  }
]

// ---------- 辅助函数 ----------
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandomItems (arr, min, max) {
  const count = randomInt(min, max)
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function generateId () {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

// 生成扁平菜单数据
function generateFlatMenus () {
  // 随机选 3~5 个一级菜单
  const selectedModules = pickRandomItems(menuPool, 3, 5)
  const flat = []
  let sort = 0

  selectedModules.forEach((module, idx) => {
    const parentId = generateId()
    flat.push({
      id: parentId,
      label: module.label,
      path: module.path,
      icon: module.icon,
      parentId: null,
      sort: sort++
    })

    // 子菜单：每个一级菜单下随机 0~3 个子菜单
    const children = module.children || []
    const childCount = randomInt(0, Math.min(3, children.length))
    const selectedChildren = children.sort(() => Math.random() - 0.5).slice(0, childCount)
    selectedChildren.forEach((child, ci) => {
      flat.push({
        id: generateId(),
        label: child.label,
        path: child.path,
        icon: child.icon || 'Document',
        parentId: parentId,
        sort: ci
      })
    })
  })

  return flat
}

// 构建树形结构
function buildTree (flatMenus) {
  const map = {}
  flatMenus.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })
  const tree = []
  flatMenus.forEach(item => {
    if (item.parentId === null || item.parentId === undefined) {
      tree.push(map[item.id])
    } else if (map[item.parentId]) {
      map[item.parentId].children.push(map[item.id])
    }
  })
  // 每层按 sort 排序
  const sortChildren = (nodes) => {
    nodes.sort((a, b) => (a.sort || 0) - (b.sort || 0))
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        sortChildren(node.children)
      }
    })
  }
  sortChildren(tree)
  return tree
}

// 获取所有父级选项（用于选择上级菜单）
function getParentOptions (flatMenus, excludeId = null) {
  return flatMenus
    .filter(item => item.id !== excludeId)
    .map(item => ({ id: item.id, label: item.label, parentId: item.parentId }))
}

// ---------- 数据状态 ----------
const flatMenuList = ref([]) // 扁平数据
const treeMenuList = ref([]) // 树形数据
const menuTreeRef = ref(null)

const defaultProps = {
  children: 'children',
  label: 'label'
}

// 刷新树
function refreshTree () {
  flatMenuList.value = getMenusFromStorage()
  treeMenuList.value = buildTree(flatMenuList.value)
}

// ---------- 初始化 ----------
function initMenus () {
  const existing = getMenusFromStorage()
  if (existing.length > 0) {
    flatMenuList.value = existing
  } else {
    const generated = generateFlatMenus()
    saveMenusToStorage(generated)
    flatMenuList.value = generated
  }
  treeMenuList.value = buildTree(flatMenuList.value)
}

// ---------- 新增/编辑弹窗 ----------
const formDialogVisible = ref(false)
const formDialogTitle = ref('新增菜单')
const isEditMode = ref(false)
const menuFormRef = ref(null)

const menuForm = reactive({
  id: null,
  label: '',
  path: '',
  icon: '',
  parentId: null,
  sort: 0
})

// 父级选项（计算属性，排除自身）
const parentOptions = computed(() => {
  const flat = getMenusFromStorage()
  return getParentOptions(flat, menuForm.id)
})

const menuFormRules = {
  label: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }]
}

function openAddDialog () {
  formDialogTitle.value = '新增菜单'
  isEditMode.value = false
  resetMenuForm()
  // 默认排序：当前最大排序 + 1
  const flat = getMenusFromStorage()
  const maxSort = flat.reduce((max, item) => Math.max(max, item.sort || 0), 0)
  menuForm.sort = maxSort + 1
  formDialogVisible.value = true
  nextTick(() => {
    if (menuFormRef.value) {
      menuFormRef.value.clearValidate()
    }
  })
}

function openEditDialog (data) {
  formDialogTitle.value = '编辑菜单'
  isEditMode.value = true
  menuForm.id = data.id
  menuForm.label = data.label
  menuForm.path = data.path || ''
  menuForm.icon = data.icon || ''
  menuForm.parentId = data.parentId || null
  menuForm.sort = data.sort || 0
  formDialogVisible.value = true
  nextTick(() => {
    if (menuFormRef.value) {
      menuFormRef.value.clearValidate()
    }
  })
}

function resetMenuForm () {
  menuForm.id = null
  menuForm.label = ''
  menuForm.path = ''
  menuForm.icon = ''
  menuForm.parentId = null
  menuForm.sort = 0
  if (menuFormRef.value) {
    menuFormRef.value.clearValidate()
  }
}

function closeFormDialog () {
  resetMenuForm()
}

// 检查是否存在循环引用（编辑时防止将父级设为自身子级）
function checkCircular (parentId, childId, flatMenus) {
  if (parentId === null) return false
  // 检查 parentId 是否在 childId 的子树中
  const childrenIds = getChildrenIds(childId, flatMenus)
  return childrenIds.includes(parentId)
}

function getChildrenIds (nodeId, flatMenus, visited = new Set()) {
  if (visited.has(nodeId)) return []
  visited.add(nodeId)
  const result = []
  flatMenus.forEach(item => {
    if (item.parentId === nodeId) {
      result.push(item.id)
      result.push(...getChildrenIds(item.id, flatMenus, visited))
    }
  })
  return result
}

function submitMenuForm () {
  menuFormRef.value.validate((valid) => {
    if (!valid) return

    const flat = getMenusFromStorage()

    // 检查循环引用（编辑时）
    if (isEditMode.value && menuForm.parentId) {
      if (checkCircular(menuForm.parentId, menuForm.id, flat)) {
        ElMessage.error('不能将父级设置为自身的子级，请重新选择')
        return
      }
    }

    if (isEditMode.value) {
      // 编辑
      const index = flat.findIndex(item => item.id === menuForm.id)
      if (index === -1) {
        ElMessage.error('菜单不存在')
        return
      }
      flat[index] = {
        ...flat[index],
        label: menuForm.label,
        path: menuForm.path,
        icon: menuForm.icon || undefined,
        parentId: menuForm.parentId || null,
        sort: menuForm.sort
      }
      saveMenusToStorage(flat)
      refreshTree()
      formDialogVisible.value = false
      ElMessage.success('菜单修改成功')
    } else {
      // 新增
      const newMenu = {
        id: generateId(),
        label: menuForm.label,
        path: menuForm.path,
        icon: menuForm.icon || undefined,
        parentId: menuForm.parentId || null,
        sort: menuForm.sort
      }
      flat.push(newMenu)
      saveMenusToStorage(flat)
      refreshTree()
      formDialogVisible.value = false
      ElMessage.success('菜单新增成功')
    }
  })
}

// ---------- 删除菜单 ----------
function handleDelete (data) {
  // 检查是否有子级
  const flat = getMenusFromStorage()
  const children = flat.filter(item => item.parentId === data.id)

  const message = children.length > 0
    ? `确定要删除菜单“${data.label}”及其 ${children.length} 个子菜单吗？`
    : `确定要删除菜单“${data.label}”吗？`

  ElMessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 递归收集所有要删除的 ID
    const idsToDelete = new Set()
    const collectIds = (id) => {
      idsToDelete.add(id)
      flat.forEach(item => {
        if (item.parentId === id && !idsToDelete.has(item.id)) {
          collectIds(item.id)
        }
      })
    }
    collectIds(data.id)

    const newFlat = flat.filter(item => !idsToDelete.has(item.id))
    saveMenusToStorage(newFlat)
    refreshTree()
    ElMessage.success(`成功删除 ${idsToDelete.size} 个菜单`)
  }).catch(() => {})
}

// ---------- 生命周期 ----------
onMounted(() => {
  initMenus()
})
</script>

<style scoped>
.menu-manage-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.custom-tree-node .el-button--text {
  margin-left: 8px;
}

:deep(.el-tree-node__content) {
  padding: 6px 0;
}

:deep(.el-tree-node__content:hover) {
  background-color: #f5f7fa;
}
</style>
