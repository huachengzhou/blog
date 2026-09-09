<template>
  <el-container style="height: 100vh;">
    <!-- 侧边栏 -->
    <el-aside
      :width="isCollapse ? '64px' : '200px'"
      style="background-color: #2e3b4e; transition: width 0.3s; overflow: hidden;">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#2e3b4e"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        collapse-transition>
        <!-- 动态渲染菜单（使用递归组件） -->
        <MenuItem v-for="item in menuList" :key="item.path" :menu="item"/>
      </el-menu>
    </el-aside>

    <!-- 主容器 -->
    <el-container>
      <!-- 顶部导航 -->
      <el-header
        style="
          text-align: right;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          border-bottom: 1px solid #e6e6e6;
          padding: 0 20px; ">
        <!-- 左侧折叠按钮 -->
        <div>
          <el-button :icon="isCollapse ? Expand : Fold" @click="toggleCollapse" text/>
        </div>

        <!-- 右侧用户信息 -->
        <div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px; font-size: 20px; cursor: pointer;"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown>
            <span style="margin-right: 10px; cursor: pointer;">管理员</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'
import routerPages from '@/router/routerPages'
import MenuItem from '@/components/MenuItem.vue'

const route = useRoute()
const router = useRouter()

// 折叠状态
const isCollapse = ref(false)

// 菜单数据：从 routerPages 中导入树形菜单
const menuList = routerPages.menuTree

// 当前激活菜单（根据当前路由路径匹配）
const activeMenu = computed(() => route.path)

// 切换折叠
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 跳转个人中心
const goToProfile = () => {
  router.push('/user/profile')
}

// 退出登录
const logout = () => {
  // 清除 token 等操作...
  router.push('/login')
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
