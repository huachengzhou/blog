<template>
  <div class="dashboard-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>数据概览</span>
          <el-button class="button" type="primary" size="small" @click="handleRefresh">刷新数据</el-button>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">总用户数</p>
            <p class="stat-value">{{ stats.totalUsers }}</p>
            <p class="stat-change" :style="{ color: stats.userChange >= 0 ? '#67c23a' : '#f56c6c' }">
              {{ stats.userChange >= 0 ? '+' : '' }}{{ stats.userChange }}%
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">今日访问</p>
            <p class="stat-value">{{ stats.todayVisits }}</p>
            <p class="stat-change" :style="{ color: stats.visitChange >= 0 ? '#67c23a' : '#f56c6c' }">
              {{ stats.visitChange >= 0 ? '+' : '' }}{{ stats.visitChange }}%
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">订单总数</p>
            <p class="stat-value">{{ stats.totalOrders }}</p>
            <p class="stat-change" :style="{ color: stats.orderChange >= 0 ? '#67c23a' : '#f56c6c' }">
              {{ stats.orderChange >= 0 ? '+' : '' }}{{ stats.orderChange }}%
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">销售额</p>
            <p class="stat-value">{{ stats.sales }}</p>
            <p class="stat-change" :style="{ color: stats.salesChange >= 0 ? '#67c23a' : '#f56c6c' }">
              {{ stats.salesChange >= 0 ? '+' : '' }}{{ stats.salesChange }}%
            </p>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <span>访问趋势</span>
          </template>
          <div style="height: 300px; display: flex; align-items: center; justify-content: center; color: #999;">
            <span>可集成 ECharts 实现图表展示</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>最近操作</span>
              <el-button type="primary" size="small" @click="addOperation">新增操作</el-button>
            </div>
          </template>
          <el-table :data="operationList" border size="small">
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column prop="operation" label="操作" width="150" />
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="scope.row.status === '成功' ? 'success' : 'danger'">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" fixed="right">
              <template #default="scope">
                <el-button size="small" type="warning" @click="toggleStatus(scope.$index)">切换状态</el-button>
                <el-button size="small" type="danger" @click="deleteOperation(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// ---------- 辅助函数 ----------
// 生成随机整数 [min, max]
function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成随机浮点数，保留1位小数
function randomFloat (min, max, fixed = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(fixed))
}

// 数字千分位格式化
function formatNumber (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 生成随机时间字符串（最近7天内）
function randomRecentTime () {
  const now = new Date()
  const daysAgo = randomInt(0, 7)
  const hours = String(randomInt(0, 23)).padStart(2, '0')
  const minutes = String(randomInt(0, 59)).padStart(2, '0')
  const target = new Date(now)
  target.setDate(target.getDate() - daysAgo)
  const year = target.getFullYear()
  const month = String(target.getMonth() + 1).padStart(2, '0')
  const day = String(target.getDate()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 随机操作类型
const operationTypes = ['新增用户', '修改系统配置', '删除角色', '导出用户数据', '导入数据', '更新权限', '重置密码', '创建项目']
function randomOperation () {
  return operationTypes[Math.floor(Math.random() * operationTypes.length)]
}

// 随机状态
function randomStatus () {
  return Math.random() > 0.2 ? '成功' : '失败' // 80% 成功
}

// 生成一条随机操作记录
function generateRandomOperation () {
  return {
    time: randomRecentTime(),
    operation: randomOperation(),
    status: randomStatus()
  }
}

// ---------- 统计数据 ----------
const stats = ref({
  totalUsers: '',
  todayVisits: '',
  totalOrders: '',
  sales: '',
  userChange: 0,
  visitChange: 0,
  orderChange: 0,
  salesChange: 0
})

// 生成随机统计数据
function generateStats () {
  const users = randomInt(8000, 20000)
  const visits = randomInt(1000, 5000)
  const orders = randomInt(300, 1500)
  const salesVal = randomFloat(80000, 250000, 0)
  // 变化百分比
  const userChange = randomFloat(-5, 20, 1)
  const visitChange = randomFloat(-3, 15, 1)
  const orderChange = randomFloat(-8, 10, 1)
  const salesChange = randomFloat(-5, 25, 1)

  stats.value = {
    totalUsers: formatNumber(users),
    todayVisits: formatNumber(visits),
    totalOrders: formatNumber(orders),
    sales: `¥${formatNumber(Math.round(salesVal))}`,
    userChange,
    visitChange,
    orderChange,
    salesChange
  }
}

// ---------- 操作列表 ----------
const operationList = ref([])

// 初始化操作列表（随机生成 4~8 条）
function initOperationList () {
  const count = randomInt(4, 8)
  const list = []
  for (let i = 0; i < count; i++) {
    list.push(generateRandomOperation())
  }
  // 按时间从新到旧排序
  list.sort((a, b) => b.time.localeCompare(a.time))
  operationList.value = list
}

// 新增操作
function addOperation () {
  const newOp = generateRandomOperation()
  // 插入到最前面（因为时间是最新的）
  operationList.value.unshift(newOp)
}

// 删除操作
function deleteOperation (index) {
  operationList.value.splice(index, 1)
}

// 切换状态（模拟修改）
function toggleStatus (index) {
  const item = operationList.value[index]
  item.status = item.status === '成功' ? '失败' : '成功'
  // 也可以修改其他字段，这里只演示状态切换
}

// 刷新数据（统计 + 操作列表重置）
function handleRefresh () {
  generateStats()
  initOperationList()
}

// ---------- 生命周期 ----------
onMounted(() => {
  generateStats()
  initOperationList()
})
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-card {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  height: 100%;
}

.stat-title {
  color: #666;
  font-size: 14px;
  margin: 0 0 10px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px 0;
}

.stat-change {
  font-size: 12px;
}
</style>
