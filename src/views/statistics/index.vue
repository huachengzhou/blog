<template>
  <div class="statistics-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>数据统计</span>
          <el-select v-model="dateType" style="width: 150px;">
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
            <div style="height: 250px; display: flex; align-items: center; justify-content: center; color: #999;">
              折线图展示区域
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-panel">
            <h3>访问量统计</h3>
            <div style="height: 250px; display: flex; align-items: center; justify-content: center; color: #999;">
              柱状图展示区域
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="stat-panel">
            <h3>功能使用占比</h3>
            <div style="height: 250px; display: flex; align-items: center; justify-content: center; color: #999;">
              饼图展示区域
            </div>
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
              <el-table-column prop="successRate" label="成功率" width="100">
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
import { ref } from 'vue'

// 日期类型
const dateType = ref('month')

// 日志统计列表
const logList = ref([
  { date: '2026-03-01', module: '用户管理', operation: '新增', count: 28, successRate: 95 },
  { date: '2026-03-01', module: '用户管理', operation: '编辑', count: 45, successRate: 98 },
  { date: '2026-03-01', module: '系统设置', operation: '修改', count: 12, successRate: 100 },
  { date: '2026-03-02', module: '用户管理', operation: '删除', count: 8, successRate: 80 },
  { date: '2026-03-02', module: '角色管理', operation: '分配权限', count: 15, successRate: 90 }
])
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
