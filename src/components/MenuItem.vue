<!-- src/layout/components/MenuItem.vue -->
<template>
  <!-- 如果有 children，并且 children 有内容（过滤掉没有 meta.title 的项） -->
  <template v-if="menu.children && menu.children.length">
    <el-sub-menu :index="menu.path">
      <template #title>
        <el-icon v-if="menu.meta?.icon">
          <component :is="getIconComponent(menu.meta.icon)" />
        </el-icon>
        <span>{{ menu.meta?.title || menu.path }}</span>
      </template>
      <MenuItem
        v-for="child in menu.children"
        :key="child.path"
        :menu="child"
      />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menu.path">
      <el-icon v-if="menu.meta?.icon">
        <component :is="getIconComponent(menu.meta.icon)" />
      </el-icon>
      <template #title>{{ menu.meta?.title || menu.path }}</template>
    </el-menu-item>
  </template>
</template>

<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

// 根据图标名称返回组件
function getIconComponent (iconName) {
  return ElementPlusIconsVue[iconName] || null
}
</script>
