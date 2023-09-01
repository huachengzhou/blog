<template>
  <div class="about">
    <h1>This is an about page</h1>

    <el-container>
      <el-header>Header</el-header>
      <el-main>

        <div>
          <el-row class="mb-4 " justify="center">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
          </el-row>

          <el-row class="mb-4" justify="center">
            <el-button plain>Plain</el-button>
            <el-button type="primary" plain>Primary</el-button>
            <el-button type="success" plain>Success</el-button>
            <el-button type="info" plain>Info</el-button>
            <el-button type="warning" plain>Warning</el-button>
            <el-button type="danger" plain>Danger</el-button>
          </el-row>

          <el-row class="mb-4" justify="center">
            <el-button round>Round</el-button>
            <el-button type="primary" round>Primary</el-button>
            <el-button type="success" round>Success</el-button>
            <el-button type="info" round>Info</el-button>
            <el-button type="warning" round>Warning</el-button>
            <el-button type="danger" round>Danger</el-button>
          </el-row>

          <el-row justify="center">
            <el-button :icon="Search" circle />
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="success" :icon="Check" circle />
            <el-button type="info" :icon="Message" circle />
            <el-button type="warning" :icon="Star" circle />
            <el-button type="danger" :icon="Delete" circle />
          </el-row>
        </div>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>

  </div>
</template>

<script>

</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
