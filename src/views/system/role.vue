<template>
  <div class="role-manage-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" size="small">新增角色</el-button>
        </div>
      </template>

      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色编码" />
        <el-table-column prop="desc" label="角色描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="assignPerm(scope.row)">分配权限</el-button>
            <el-button type="warning" size="small" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 权限分配弹窗 -->
      <el-dialog v-model="permDialogVisible" title="分配权限" width="60%">
        <el-tree
          :data="permList"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          default-expand-all
        />
        <template #footer>
          <el-button @click="permDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="savePerm">确定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 角色列表
const roleList = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'admin',
    desc: '拥有系统所有权限',
    createTime: '2026-01-01 00:00:00'
  },
  {
    id: 2,
    name: '普通管理员',
    code: 'manager',
    desc: '拥有部分管理权限',
    createTime: '2026-01-02 00:00:00'
  },
  {
    id: 3,
    name: '普通用户',
    code: 'user',
    desc: '仅拥有查看权限',
    createTime: '2026-01-03 00:00:00'
  }
])

// 权限分配弹窗
const permDialogVisible = ref(false)

// 权限列表
const permList = ref([
  {
    id: 1,
    label: '仪表盘',
    children: [
      { id: 11, label: '查看' },
      { id: 12, label: '操作' }
    ]
  },
  {
    id: 2,
    label: '用户管理',
    children: [
      { id: 21, label: '查看' },
      { id: 22, label: '新增' },
      { id: 23, label: '编辑' },
      { id: 24, label: '删除' }
    ]
  },
  {
    id: 3,
    label: '系统设置',
    children: [
      { id: 31, label: '查看' },
      { id: 32, label: '编辑' }
    ]
  }
])

// 树配置
const defaultProps = ref({
  children: 'children',
  label: 'label'
})

// 分配权限
const assignPerm = (row) => {
  permDialogVisible.value = true
}

// 保存权限
const savePerm = () => {
  permDialogVisible.value = false
  ElMessage.success('权限分配成功')
}

// 编辑角色
const editRole = (row) => {
  ElMessage.info(`编辑角色：${row.name}`)
}

// 删除角色
const deleteRole = (row) => {
  ElMessage.info(`删除角色：${row.name}`)
}
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
