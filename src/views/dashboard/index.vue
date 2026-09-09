<template>
  <div class="dashboard-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>数据概览</span>
          <el-button class="button" type="primary" size="small" @click="handleRefresh">
            刷新数据
          </el-button>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in statCards" :key="index">
          <div class="stat-card">
            <p class="stat-title">{{ item.title }}</p>
            <p class="stat-value">{{ item.value }}</p>
            <p class="stat-change" :style="{ color: item.changeColor }">
              {{ item.change }}
            </p>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <span>访问趋势（近7天）</span>
          </template>
          <div ref="chartRef" style="height: 300px; width: 100%;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>最近操作</span>
              <el-button type="primary" size="small" @click="addRandomOperation">
                模拟新增操作
              </el-button>
            </div>
          </template>
          <el-table :data="operationList" border size="small" max-height="250">
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column prop="operation" label="操作" width="130" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="scope">
                <el-tag :type="scope.row.status === '成功' ? 'success' : 'danger'">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="70">
              <template #default="scope">
                <el-button type="danger" size="small" @click="deleteOperation(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// ---------- 统计卡片数据 ----------
const statCards = ref([])

// 生成随机整数
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// 格式化数字（千分位）
const formatNumber = (num) => num.toLocaleString()

// 生成随机统计卡片
const generateStatCards = () => {
  const totalUsers = randomInt(10000, 20000)
  const todayVisits = randomInt(1000, 5000)
  const totalOrders = randomInt(500, 1500)
  const sales = randomInt(50000, 200000)

  const changes = [
    { value: (Math.random() * 20 - 5).toFixed(1), color: (v) => v >= 0 ? '#67c23a' : '#f56c6c' }
  ]
  const getChange = () => {
    const val = (Math.random() * 20 - 5).toFixed(1)
    return { text: (val >= 0 ? '+' : '') + val + '%', color: val >= 0 ? '#67c23a' : '#f56c6c' }
  }

  return [
    { title: '总用户数', value: formatNumber(totalUsers), ...getChange() },
    { title: '今日访问', value: formatNumber(todayVisits), ...getChange() },
    { title: '订单总数', value: formatNumber(totalOrders), ...getChange() },
    { title: '销售额', value: '¥' + formatNumber(sales), ...getChange() }
  ]
}

// 初始化统计卡片
statCards.value = generateStatCards()

// ---------- 操作列表 ----------
const operationList = ref([])

const operations = ['新增用户', '修改系统配置', '删除角色', '导出用户数据', '登录系统', '退出系统', '更新资料', '创建项目', '提交审批']
const statuses = ['成功', '失败']

// 生成随机时间（最近3天内）
const randomTime = () => {
  const now = new Date()
  const offset = randomInt(0, 3 * 24 * 60 * 60 * 1000) // 0~3天
  const date = new Date(now.getTime() - offset)
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// 生成一条随机操作记录
const generateRandomOperation = () => ({
  time: randomTime(),
  operation: operations[randomInt(0, operations.length - 1)],
  status: statuses[randomInt(0, 1)]
})

// 生成随机操作列表（5~8条）
const generateOperationList = () => {
  const count = randomInt(5, 8)
  return Array.from({ length: count }, generateRandomOperation)
}

operationList.value = generateOperationList()

// 新增操作
const addRandomOperation = () => {
  operationList.value.unshift(generateRandomOperation())
}

// 删除操作
const deleteOperation = (index) => {
  operationList.value.splice(index, 1)
}

// ---------- ECharts ----------
const chartRef = ref(null)
let chartInstance = null

// 生成随机日期（近7天）
const generateDays = (days = 7) => {
  const now = new Date()
  const dates = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`)
  }
  return dates
}

// 更新图表
const updateChart = () => {
  if (!chartInstance) return
  const days = generateDays(7)
  const data = days.map(() => randomInt(100, 800))
  chartInstance.setOption({
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data, smooth: true, lineStyle: { color: '#409eff' }, areaStyle: { color: 'rgba(64,158,255,0.2)' } }],
    tooltip: { trigger: 'axis' },
    grid: { left: '5%', right: '5%', top: '10%', bottom: '20%' }
  })
}

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    updateChart()
  }
}

// ---------- 刷新函数 ----------
const handleRefresh = () => {
  // 重新生成统计卡片
  statCards.value = generateStatCards()
  // 重新生成操作列表
  operationList.value = generateOperationList()
  // 更新图表
  updateChart()
}

// ---------- 生命周期 ----------
onMounted(() => {
  nextTick(() => {
    initChart()
    // 监听窗口大小变化
    window.addEventListener('resize', () => chartInstance?.resize())
  })
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
