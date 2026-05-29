<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :md="8" :lg="4" v-for="card in cards" :key="card.title">
      <el-card shadow="hover" class="summary-card">
        <div class="summary-title">{{ card.title }}</div>
        <div class="summary-value">{{ card.value }}</div>
        <div class="summary-desc">{{ card.desc }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>
  
<script>
export default {
  name: 'SummaryCards',
  props: {
    modelData: {
      type: Array,
      required: true
    }
  },
  computed: {
    cards() {
      const original = this.modelData.find(item => item.name === 'Original ST-GCN')
      const light = this.modelData.find(item => item.name === 'Light-ST-GCN')
      const pruned = this.modelData.find(item => item.name === 'Pruned Light-ST-GCN')

      return [
        {
          title: '原始模型参数量',
          value: this.formatNumber(original.params),
          desc: 'Original ST-GCN'
        },
        {
          title: 'Light-ST-GCN参数量',
          value: this.formatNumber(light.params),
          desc: `参数减少率 ${light.reduction.toFixed(2)}%`
        },
        {
          title: '剪枝后参数量',
          value: this.formatNumber(pruned.params),
          desc: `参数减少率 ${pruned.reduction.toFixed(2)}%`
        },
        {
          title: 'Light-ST-GCN FLOPs',
          value: `${light.flops.toFixed(3)}G`,
          desc: `FLOPs减少率 ${light.flopsReduction.toFixed(2)}%`
        },
        {
          title: '剪枝后推理时间',
          value: `${pruned.inferenceTime.toFixed(2)}ms`,
          desc: `推理时间减少率 ${pruned.inferenceReduction.toFixed(2)}%`
        }
      ]
    }
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString()
    }
  }
}
</script>
  
<style scoped>
.summary-card {
  margin-bottom: 20px;
  border-radius: 14px;
}

.summary-title {
  font-size: 14px;
  color: #6b7280;
}

.summary-value {
  margin-top: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #1f4e79;
}

.summary-desc {
  margin-top: 8px;
  font-size: 13px;
  color: #909399;
}
</style>