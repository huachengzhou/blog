<template>
  <el-container style="height: 100vh;">
    <!-- 侧边栏：宽度动态绑定，增加过渡效果 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" style="background-color: #2e3b4e; transition: width 0.3s;">
      <el-menu
        default-active="/dashboard"
        class="el-menu-vertical-demo"
        background-color="#2e3b4e"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        collapse-transition>
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>

        <el-sub-menu index="user">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/add">新增用户</el-menu-item>
          <el-menu-item index="/user/profile">个人中心</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/system/menu">菜单管理</el-menu-item>
          <el-menu-item index="/system/role">角色管理</el-menu-item>
          <el-menu-item index="/system/config">系统配置</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/statistics">
          <el-icon><DataBoard /></el-icon>
          <template #title>数据统计</template>
        </el-menu-item>

        <el-menu-item index="/docOldPage">
          <el-icon><Star /></el-icon>
          <template #title>旧文档</template>
        </el-menu-item>

        <el-sub-menu index="markdown">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>markdown</span>
          </template>
          <el-menu-item index="markdown/mysql/index">mysql</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/help">
          <el-icon><Help /></el-icon>
          <template #title>帮助中心</template>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部导航：增加折叠切换按钮 -->
      <el-header style="text-align: right; font-size: 12px; display: flex; align-items: center; justify-content: space-between;">
        <!-- 左侧折叠按钮 -->
        <div>
          <el-button :icon="isCollapse ? Expand : Fold" @click="toggleCollapse" text />
        </div>
        <!-- 右侧用户信息 -->
        <div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <span style="margin-right: 10px">管理员</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主要内容区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  House,
  User,
  Setting,
  DataBoard,
  Star,
  Help,
  Fold, // 折叠图标
  Expand // 展开图标
} from '@element-plus/icons-vue'

const router = useRouter()
const isCollapse = ref(false) // 不默认折叠

// 切换折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 跳转到个人中心
const goToProfile = () => {
  router.push('/user/profile')
}

// 退出登录
const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
}

.el-aside {
  color: #333;
  /* 让宽度变化平滑 */
  transition: width 0.3s;
  overflow: hidden;
}

/* 折叠时菜单宽度自适应，无需额外设置 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
