<template>
  <div class="help-center-container">
    <el-card shadow="hover">
      <template #header>
        <span>帮助中心</span>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="使用指南" name="guide">
          <div class="help-content">
            <h3>系统使用指南</h3>
            <el-divider />
            <el-collapse>
              <el-collapse-item title="1. 仪表盘功能">
                <div>
                  <p>仪表盘展示系统核心数据概览，包括用户数、访问量、订单数、销售额等关键指标。</p>
                  <p>点击"刷新数据"按钮可实时更新数据统计信息。</p>
                </div>
              </el-collapse-item>
              <el-collapse-item title="2. 用户管理功能">
                <div>
                  <p>用户管理模块提供用户列表查看、新增、编辑、删除等功能。</p>
                  <p>支持按用户名、状态等条件筛选用户，支持批量操作。</p>
                </div>
              </el-collapse-item>
              <el-collapse-item title="3. 系统设置功能">
                <div>
                  <p>菜单管理：可配置系统菜单的显示、隐藏、排序等。</p>
                  <p>角色管理：可创建角色并分配不同的权限。</p>
                  <p>系统配置：可设置系统名称、LOGO、验证码、会话超时等参数。</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>

        <el-tab-pane label="常见问题" name="faq">
          <div class="help-content">
            <h3>常见问题解答</h3>
            <el-divider />
            <el-collapse>
              <el-collapse-item title="如何重置用户密码？">
                <p>进入用户列表页面，点击对应用户的"编辑"按钮，在编辑页面可重置密码。</p>
              </el-collapse-item>
              <el-collapse-item title="忘记管理员密码怎么办？">
                <p>请联系系统超级管理员进行密码重置，或通过数据库直接修改密码字段。</p>
              </el-collapse-item>
              <el-collapse-item title="如何添加新的菜单？">
                <p>进入系统设置-菜单管理页面，点击"新增菜单"按钮，填写菜单名称、路径、图标等信息。</p>
              </el-collapse-item>
              <el-collapse-item title="上传文件失败怎么办？">
                <p>1. 检查文件大小是否超过限制（默认10MB）</p>
                <p>2. 检查文件格式是否符合要求</p>
                <p>3. 检查网络连接是否正常</p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>

        <el-tab-pane label="联系我们" name="contact">
          <div class="help-content">
            <h3>联系方式</h3>
            <el-divider />
            <el-descriptions :column="2" border>
              <el-descriptions-item label="技术支持">support@example.com</el-descriptions-item>
              <el-descriptions-item label="客服电话">400-123-4567</el-descriptions-item>
              <el-descriptions-item label="工作时间">周一至周五 9:00-18:00</el-descriptions-item>
              <el-descriptions-item label="地址">北京市朝阳区XX大厦XX层</el-descriptions-item>
            </el-descriptions>

            <el-form :model="feedbackForm" style="margin-top: 20px;" label-width="80px">
              <el-form-item label="问题反馈">
                <el-input v-model="feedbackForm.content" type="textarea" :rows="5" placeholder="请描述您遇到的问题..."></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="feedbackForm.contact" placeholder="请输入邮箱或手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 激活的标签
const activeTab = ref('guide')

// 反馈表单
const feedbackForm = ref({
  content: '',
  contact: ''
})

// 提交反馈
const submitFeedback = () => {
  if (!feedbackForm.value.content) {
    ElMessage.error('请输入反馈内容')
    return
  }
  ElMessage.success('反馈提交成功，我们会尽快处理')
  feedbackForm.value = {
    content: '',
    contact: ''
  }
}
</script>

<style scoped>
.help-center-container {
  padding: 20px;
}

.help-content {
  padding: 20px 0;
}

.help-content h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}
</style>
