<template>
  <div class="menu-manage-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" size="small">新增菜单</el-button>
        </div>
      </template>

      <el-tree
        :data="menuList"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        show-checkbox
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="small" @click="() => editMenu(data)">编辑</el-button>
              <el-button type="text" size="small" @click="() => deleteMenu(data)">删除</el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 菜单数据
const menuList = ref([
  {
    id: 1,
    label: '仪表盘',
    path: '/dashboard',
    icon: 'House',
    children: []
  },
  {
    id: 2,
    label: '用户管理',
    path: '/user',
    icon: 'User',
    children: [
      {
        id: 3,
        label: '用户列表',
        path: '/user/list',
        icon: 'User',
        children: []
      },
      {
        id: 4,
        label: '新增用户',
        path: '/user/add',
        icon: 'User',
        children: []
      }
    ]
  },
  {
    id: 5,
    label: '系统设置',
    path: '/system',
    icon: 'Setting',
    children: [
      {
        id: 6,
        label: '菜单管理',
        path: '/system/menu',
        icon: 'Setting',
        children: []
      },
      {
        id: 7,
        label: '角色管理',
        path: '/system/role',
        icon: 'Setting',
        children: []
      }
    ]
  }
])

// 树配置
const defaultProps = ref({
  children: 'children',
  label: 'label'
})

// 编辑菜单
const editMenu = (data) => {
  ElMessage.info(`编辑菜单：${data.label}`)
}

// 删除菜单
const deleteMenu = (data) => {
  ElMessage.info(`删除菜单：${data.label}`)
}
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
</style>
