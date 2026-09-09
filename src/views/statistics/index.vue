<template>
  <div class="statistics-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>数据统计</span>
          <el-select v-model="dateType" style="width: 150px;" @change="handleDateTypeChange">
            <el-option label="今日" value="today" />
            <el-option label="本周" value="week" />
            <el-option label="本月" value="month" />
            <el-option label="本年" value="year" />
          </el-select>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="stat-panel">
            <h3>用户增长统计</h3>
            <div ref="lineChartRef" style="height: 250px; width: 100%;"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-panel">
            <h3>访问量统计</h3>
            <div ref="barChartRef" style="height: 250px; width: 100%;"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-panel">
            <h3>功能使用占比</h3>
            <div ref="pieChartRef" style="height: 250px; width: 100%;"></div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="24">
          <div class="stat-panel">
            <h3>操作日志统计</h3>
            <el-table :data="logList" border stripe>
              <el-table-column prop="date" label="日期" width="120" />
              <el-table-column prop="module" label="模块" width="120" />
              <el-table-column prop="operation" label="操作类型" width="120" />
              <el-table-column prop="count" label="操作次数" width="100" />
              <el-table-column prop="successRate" label="成功率" width="150">
                <template #default="scope">
                  <el-progress :percentage="scope.row.successRate" :width="80" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

// ---------- 日期类型 ----------
const dateType = ref('month')

// ---------- 图表引用 ----------
const lineChartRef = ref(null)
const barChartRef = ref(null)
const pieChartRef = ref(null)
let lineChart = null
let barChart = null
let pieChart = null

// ---------- 工具函数 ----------
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomFloat = (min, max) => Math.round((Math.random() * (max - min) + min) * 10) / 10

// 生成日期范围标签（根据 dateType）
const generateDateLabels = (type) => {
  const now = new Date()
  const labels = []
  const pad = (n) => String(n).padStart(2, '0')
  switch (type) {
    case 'today': {
      for (let i = 0; i < 24; i++) {
        labels.push(`${pad(i)}:00`)
      }
      break
    }
    case 'week': {
      const day = now.getDay() || 7 // 周日=0转7
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now)
        d.setDate(d.getDate() - i)
        labels.push(`${d.getMonth() + 1}/${d.getDate()}`)
      }
      break
    }
    case 'month': {
      const year = now.getFullYear()
      const month = now.getMonth()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(`${month + 1}/${pad(i)}`)
      }
      break
    }
    case 'year': {
      for (let i = 1; i <= 12; i++) {
        labels.push(`${i}月`)
      }
      break
    }
  }
  return labels
}

// ---------- 生成图表数据 ----------
const generateChartData = (type, count) => {
  return Array.from({ length: count }, () => randomInt(50, 500))
}

// ---------- 生成饼图数据 ----------
const pieCategories = ['用户管理', '订单处理', '内容发布', '系统设置', '数据分析']
const generatePieData = () => {
  const total = 100
  const parts = []
  let remaining = total
  for (let i = 0; i < pieCategories.length - 1; i++) {
    const val = randomInt(5, Math.floor(remaining * 0.6))
    parts.push(val)
    remaining -= val
  }
  parts.push(remaining)
  return pieCategories.map((name, idx) => ({ name, value: parts[idx] }))
}

// ---------- 生成日志列表 ----------
const modules = ['用户管理', '系统设置', '角色管理', '日志审计', '内容管理']
const operations = ['新增', '编辑', '删除', '查询', '分配权限', '导出', '导入']

const generateLogList = (type) => {
  const labels = generateDateLabels(type)
  // 选取部分日期（最多取前10个）
  const selectedDates = labels.filter((_, idx) => idx % Math.max(1, Math.floor(labels.length / 8)) === 0)
  const count = Math.min(selectedDates.length, 10)
  const logs = []
  for (let i = 0; i < count; i++) {
    logs.push({
      date: selectedDates[i],
      module: modules[randomInt(0, modules.length - 1)],
      operation: operations[randomInt(0, operations.length - 1)],
      count: randomInt(5, 60),
      successRate: randomInt(70, 100)
    })
  }
  // 按日期排序（保持顺序）
  return logs
}

// ---------- 更新所有图表 ----------
const updateCharts = (type) => {
  // 折线图
  const lineLabels = generateDateLabels(type)
  const lineData = generateChartData(type, lineLabels.length)
  if (lineChart) {
    lineChart.setOption({
      xAxis: { type: 'category', data: lineLabels, axisLabel: { rotate: 30 } },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        data: lineData,
        smooth: true,
        lineStyle: { color: '#409eff' },
        areaStyle: { color: 'rgba(64,158,255,0.2)' }
      }],
      tooltip: { trigger: 'axis' },
      grid: { left: '8%', right: '5%', top: '10%', bottom: '20%' }
    })
  }

  // 柱状图
  const barLabels = generateDateLabels(type)
  const barData = generateChartData(type, barLabels.length)
  if (barChart) {
    barChart.setOption({
      xAxis: { type: 'category', data: barLabels, axisLabel: { rotate: 30 } },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: barData, itemStyle: { color: '#67c23a' } }],
      tooltip: { trigger: 'axis' },
      grid: { left: '8%', right: '5%', top: '10%', bottom: '20%' }
    })
  }

  // 饼图
  const pieData = generatePieData()
  if (pieChart) {
    pieChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: pieData,
        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' } }
      }]
    })
  }
}

// ---------- 更新表格 ----------
const logList = ref([])

const updateLogList = (type) => {
  logList.value = generateLogList(type)
}

// ---------- 整体刷新数据 ----------
const refreshAll = (type) => {
  updateCharts(type)
  updateLogList(type)
}

// ---------- 下拉变化处理 ----------
const handleDateTypeChange = (val) => {
  refreshAll(val)
}

// ---------- 初始化图表实例 ----------
const initCharts = () => {
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
  }
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value)
  }
  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value)
  }
  refreshAll(dateType.value)
}

// ---------- 生命周期 ----------
onMounted(() => {
  nextTick(() => {
    initCharts()
    window.addEventListener('resize', () => {
      lineChart?.resize()
      barChart?.resize()
      pieChart?.resize()
    })
  })
})

// 监听日期类型变化（也可用 watch，但已经通过 @change 处理，这里不需要重复）
</script>

<style scoped>
.statistics-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-panel {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  height: 100%;
}

.stat-panel h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
}
</style>
