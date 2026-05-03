<template>
    <div>
      <div class="page-title">
        <h1>实验概览</h1>
        <p>展示模型轻量化实验的核心指标和主要对比结果。</p>
      </div>
  
      <summary-cards :model-data="modelData" />
  
      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <bar-chart
            title="Top1准确率对比"
            y-name="Top1(%)"
            :model-data="modelData"
            field="top1"
            unit="%"
            :min="70"
            :max="82"
          />
        </el-col>
  
        <el-col :xs="24" :md="12">
          <bar-chart
            title="模型参数量对比"
            y-name="参数量"
            :model-data="modelData"
            field="params"
          />
        </el-col>
      </el-row>
  
      <tradeoff-chart :model-data="modelData" />
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import SummaryCards from '@/components/SummaryCards.vue'
  import BarChart from '@/components/BarChart.vue'
  import TradeoffChart from '@/components/TradeoffChart.vue'
  
  export default {
    name: 'DashboardView',
    components: {
      SummaryCards,
      BarChart,
      TradeoffChart
    },
    computed: {
      ...mapState(['modelData'])
    }
  }
  </script>
  
  <style scoped>
  .page-title {
    margin-bottom: 20px;
  }
  
  .page-title h1 {
    margin: 0 0 8px;
    font-size: 26px;
  }
  
  .page-title p {
    margin: 0;
    color: #666;
  }
  </style>