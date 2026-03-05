<template>
  <div class="user-list-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button type="primary" size="small" @click="goToAdd">新增用户</el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 用户表格 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="真实姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px; text-align: right;"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 搜索表单
const searchForm = ref({
  username: '',
  status: ''
})

// 表格数据
const userList = ref([
  {
    id: 1,
    username: 'admin',
    name: '系统管理员',
    phone: '13800138000',
    email: 'admin@example.com',
    createTime: '2026-01-01 00:00:00',
    status: 1
  },
  {
    id: 2,
    username: 'test',
    name: '测试用户',
    phone: '13800138001',
    email: 'test@example.com',
    createTime: '2026-01-02 00:00:00',
    status: 1
  },
  {
    id: 3,
    username: 'guest',
    name: '游客',
    phone: '13800138002',
    email: 'guest@example.com',
    createTime: '2026-01-03 00:00:00',
    status: 0
  }
])

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(3)

// 跳转到新增用户
const goToAdd = () => {
  router.push('/user/add')
}

// 搜索
const search = () => {
  ElMessage.info('执行搜索操作')
}

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    username: '',
    status: ''
  }
}

// 编辑用户
const editUser = (row) => {
  ElMessage.info(`编辑用户：${row.username}`)
}

// 删除用户
const deleteUser = (row) => {
  ElMessage.info(`删除用户：${row.username}`)
}

// 分页大小改变
const handleSizeChange = (val) => {
  pageSize.value = val
}

// 当前页改变
const handleCurrentChange = (val) => {
  currentPage.value = val
}
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
