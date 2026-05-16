<template>
  <el-card shadow="never" class="section-card">
    <div slot="header" class="section-header">
      <span>{{ title }}</span>

      <el-radio-group v-model="selectedModel" size="mini">
        <el-radio-button
          v-for="name in modelNames"
          :key="name"
          :label="name"
        />
      </el-radio-group>
    </div>

    <div ref="chart" class="wide-chart"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LossChart',
  props: {
    title: {
      type: String,
      default: 'Mean Loss变化'
    },
    yName: {
      type: String,
      default: 'Mean Loss'
    },
    lossType: {
      type: String,
      default: 'train'
    },
    lossData: {
      type: Object,
      required: true
    },
    currentModel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    modelNames() {
      return Object.keys(this.lossData)
    },

    selectedModel: {
      get() {
        return this.currentModel
      },
      set(value) {
        this.$emit('change-model', value)
      }
    }
  },
  watch: {
    currentModel() {
      this.drawChart()
    },

    lossData: {
      deep: true,
      handler() {
        this.drawChart()
      }
    }
  },
  mounted() {
    this.drawChart()
    window.addEventListener('resize', this.resizeChart)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    normalizeLossData(rawData) {
      if (!rawData || rawData.length === 0) {
        return {
          epochs: [],
          losses: []
        }
      }

      if (typeof rawData[0] === 'number') {
        return {
          epochs: rawData.map((_, index) => index + 1),
          losses: rawData
        }
      }

      return {
        epochs: rawData.map(item => item.epoch),
        losses: rawData.map(item => item.loss)
      }
    },

    drawChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart)
      }

      const rawData = this.lossData[this.currentModel] || []
      const { epochs, losses } = this.normalizeLossData(rawData)

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            const item = params[0]
            return `Epoch ${item.axisValue}<br/>${this.currentModel}<br/>${this.yName}：${item.data}`
          }
        },
        grid: {
          top: 45,
          left: 70,
          right: 30,
          bottom: 50
        },
        xAxis: {
          type: 'category',
          name: 'Epoch',
          data: epochs
        },
        yAxis: {
          type: 'value',
          name: this.yName
        },
        series: [
          {
            name: this.currentModel,
            type: 'line',
            smooth: true,
            data: losses,
            symbol: 'circle',
            symbolSize: 7,
            areaStyle: {}
          }
        ]
      })
    },

    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>