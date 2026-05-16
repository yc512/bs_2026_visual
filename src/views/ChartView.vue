<template>
  <div>
    <div class="page-title">
      <h1>图表分析</h1>
      <p>通过准确率、参数量、训练损失和验证损失展示不同模型的性能差异。</p>
    </div>

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
          title="Top5准确率对比"
          y-name="Top5(%)"
          :model-data="modelData"
          field="top5"
          unit="%"
          :min="92"
          :max="98"
        />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :md="12">
        <bar-chart
          title="模型参数量对比"
          y-name="参数量"
          :model-data="modelData"
          field="params"
        />
      </el-col>

      <el-col :xs="24" :md="12">
        <bar-chart
          title="参数减少率对比"
          y-name="参数减少率(%)"
          :model-data="modelData"
          field="reduction"
          unit="%"
        />
      </el-col>
    </el-row>

    <val-loss-compare-chart
      title="验证过程Mean Loss对比"
      :val-loss-data="valLossData"
    />

    <loss-chart
      title="训练过程Mean Loss变化"
      loss-type="train"
      y-name="Training Mean Loss"
      :loss-data="trainLossData"
      :current-model="currentTrainLossModel"
      @change-model="setCurrentTrainLossModel"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BarChart from '@/components/BarChart.vue'
import LossChart from '@/components/LossChart.vue'
import ValLossCompareChart from '@/components/ValLossCompareChart.vue'

export default {
  name: 'ChartView',
  components: {
    BarChart,
    LossChart,
    ValLossCompareChart
  },
  computed: {
    ...mapState([
      'modelData',
      'trainLossData',
      'valLossData',
      'currentTrainLossModel'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentTrainLossModel'
    ])
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