<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="220px" class="aside">
        <div class="logo">ST-GCN可视化</div>

        <el-menu
          router
          :default-active="$route.path"
          background-color="#1f2d3d"
          text-color="#cfd8dc"
          active-text-color="#409eff"
        >
          <el-menu-item index="/dashboard">
            <i class="el-icon-data-analysis"></i>
            <span slot="title">实验概览</span>
          </el-menu-item>

          <el-menu-item index="/table">
            <i class="el-icon-document"></i>
            <span slot="title">结果表格</span>
          </el-menu-item>

          <el-menu-item index="/charts">
            <i class="el-icon-s-data"></i>
            <span slot="title">图表分析</span>
          </el-menu-item>

          <el-menu-item index="/conclusion">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">实验结论</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <span>ST-GCN轻量化实验结果可视化平台</span>
        </el-header>

        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  background: #f4f7fb;
}

.app-wrapper {
  min-height: 100vh;
}

.aside {
  min-height: 100vh;
  background: #1f2d3d;
}

.logo {
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.main {
  padding: 24px;
}

.section-card {
  margin-bottom: 22px;
  border-radius: 14px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

.chart {
  width: 100%;
  height: 380px;
}

.wide-chart {
  width: 100%;
  height: 430px;
}
</style>