<template>
    <el-row :gutter="20">
      <el-col :xs="24" :md="12">
        <el-card shadow="never" class="section-card conclusion-card">
          <div slot="header" class="section-header">
            <span>实验结论</span>
          </div>
  
          <el-timeline>
            <el-timeline-item timestamp="轻量化核心" placement="top">
              DSConv-only模型参数量减少67.27%，说明深度可分离卷积是主要轻量化来源。
            </el-timeline-item>
            <el-timeline-item timestamp="注意力模块作用" placement="top">
              SE-only模型参数量略有增加，说明SE模块主要用于增强通道特征表达。
            </el-timeline-item>
            <el-timeline-item timestamp="综合模型表现" placement="top">
              Light-ST-GCN在参数量减少66.21%的情况下，Top1达到79.18%，与原始模型接近。
            </el-timeline-item>
            <el-timeline-item timestamp="剪枝补充实验" placement="top">
              Pruned Light-ST-GCN参数量减少76.18%，体现了压缩率与准确率之间的折中。
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
  
      <el-col :xs="24" :md="12">
        <el-card shadow="never" class="section-card conclusion-card">
          <div slot="header" class="section-header">
            <span>模型结构说明</span>
          </div>
  
          <el-descriptions :column="1" border>
            <el-descriptions-item label="Original ST-GCN">
              原始时空图卷积网络，作为对照模型。
            </el-descriptions-item>
            <el-descriptions-item label="ST-GCN + DSConv">
              仅替换为深度可分离卷积，用于验证轻量化贡献。
            </el-descriptions-item>
            <el-descriptions-item label="ST-GCN + SE">
              仅加入SE通道注意力，用于验证注意力模块影响。
            </el-descriptions-item>
            <el-descriptions-item label="Light-ST-GCN">
              同时使用DSConv和SE注意力，是本文主要改进模型。
            </el-descriptions-item>
            <el-descriptions-item label="Pruned Light-ST-GCN">
              在Light-ST-GCN基础上进行通道剪枝，进一步降低参数量。
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </template>
  
  <script>
  export default {
    name: 'ExperimentConclusion'
  }
  </script>
  
  <style scoped>
  .conclusion-card {
    min-height: 430px;
  }
  </style>