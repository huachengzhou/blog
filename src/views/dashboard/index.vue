<template>
  <div class="dashboard-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>数据概览</span>
          <el-button class="button" type="primary" size="small">刷新数据</el-button>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">总用户数</p>
            <p class="stat-value">12,890</p>
            <p class="stat-change" style="color: #67c23a">+12.5%</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">今日访问</p>
            <p class="stat-value">2,568</p>
            <p class="stat-change" style="color: #67c23a">+8.2%</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">订单总数</p>
            <p class="stat-value">892</p>
            <p class="stat-change" style="color: #f56c6c">-3.1%</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <p class="stat-title">销售额</p>
            <p class="stat-value">¥128,900</p>
            <p class="stat-change" style="color: #67c23a">+18.9%</p>
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
            <span>最近操作</span>
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
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟操作列表数据
const operationList = ref([
  { time: '2026-03-05 09:20', operation: '新增用户', status: '成功' },
  { time: '2026-03-05 08:45', operation: '修改系统配置', status: '成功' },
  { time: '2026-03-04 18:12', operation: '删除角色', status: '失败' },
  { time: '2026-03-04 15:30', operation: '导出用户数据', status: '成功' }
])
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
