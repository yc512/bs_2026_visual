<template>
  <el-card shadow="never" class="section-card">
    <div slot="header" class="section-header">
      <span>{{ title }}</span>
      <span class="chart-tip">点击图例可单独查看某个模型</span>
    </div>

    <div ref="chart" class="wide-chart"></div>
  </el-card>
</template>
  
<script>
import * as echarts from 'echarts'

// 固定不同模型的颜色和标记，保证彩色显示和黑白打印都能区分
const MODEL_STYLE_MAP = {
  'Original ST-GCN': {
    color: '#1f77b4',
    symbol: 'circle'
  },
  'DSConv-only': {
    color: '#ff7f0e',
    symbol: 'rect'
  },
  'SE-only': {
    color: '#2ca02c',
    symbol: 'triangle'
  },
  'Light ST-GCN': {
    color: '#d62728',
    symbol: 'diamond'
  },
  'Pruned Light ST-GCN': {
    color: '#9467bd',
    // 自定义 X 形标记，便于黑白打印区分
    symbol: 'path://M-5,-6 L0,-1 L5,-6 L6,-5 L1,0 L6,5 L5,6 L0,1 L-5,6 L-6,5 L-1,0 L-6,-5 Z'
  }
}

const DEFAULT_SYMBOL_LIST = ['circle', 'rect', 'triangle', 'diamond', 'pin', 'arrow']

export default {
  name: 'ValLossCompareChart',
  props: {
    title: {
      type: String,
      default: '验证过程Mean Loss对比'
    },
    valLossData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
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
  watch: {
    valLossData: {
      deep: true,
      handler() {
        this.drawChart()
      }
    }
  },
  methods: {
    // 过滤掉 Light ST-GCN 的 30 轮验证损失数据
    // 这样不需要改父组件传入的数据，也能保证图中不再显示该点
    getFilteredValLossData() {
      const filteredData = {}

      Object.keys(this.valLossData).forEach(modelName => {
        filteredData[modelName] = this.valLossData[modelName]
          .map(item => ({
            ...item,
            epoch: Number(item.epoch),
            loss: Number(item.loss)
          }))
          .filter(item => {
            return !(modelName === 'Light ST-GCN' && item.epoch === 30)
          })
      })

      return filteredData
    },

    getAllEpochs(lossData) {
      const epochSet = new Set()

      Object.values(lossData).forEach(modelLossList => {
        modelLossList.forEach(item => {
          epochSet.add(item.epoch)
        })
      })

      return Array.from(epochSet).sort((a, b) => a - b)
    },

    getAllLossValues(lossData) {
      const values = []

      Object.values(lossData).forEach(modelLossList => {
        modelLossList.forEach(item => {
          if (!Number.isNaN(item.loss)) {
            values.push(item.loss)
          }
        })
      })

      return values
    },

    getYAxisRange(lossData) {
      const values = this.getAllLossValues(lossData)

      if (!values.length) {
        return {
          min: 0,
          max: 1
        }
      }

      const minVal = Math.min(...values)
      const maxVal = Math.max(...values)

      // 给上下留一点边距，让曲线分得更开
      const padding = 0.08

      return {
        min: Number((minVal - padding).toFixed(2)),
        max: Number((maxVal + padding).toFixed(2))
      }
    },

    getModelSeries(modelName, allEpochs, lossData) {
      const modelLossList = lossData[modelName] || []

      return allEpochs.map(epoch => {
        const target = modelLossList.find(item => item.epoch === epoch)
        return target ? target.loss : null
      })
    },

    getModelStyle(modelName, index) {
      return MODEL_STYLE_MAP[modelName] || {
        color: undefined,
        symbol: DEFAULT_SYMBOL_LIST[index % DEFAULT_SYMBOL_LIST.length]
      }
    },

    drawChart() {
      if (!this.$refs.chart) return

      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart)
      }

      const filteredValLossData = this.getFilteredValLossData()
      const allEpochs = this.getAllEpochs(filteredValLossData)
      const modelNames = Object.keys(filteredValLossData)
      const yRange = this.getYAxisRange(filteredValLossData)

      const series = modelNames.map((modelName, index) => {
        const modelStyle = this.getModelStyle(modelName, index)

        return {
          name: modelName,
          type: 'line',
          smooth: false,
          symbol: modelStyle.symbol,
          symbolSize: 11,
          showSymbol: true,
          connectNulls: false,
          data: this.getModelSeries(modelName, allEpochs, filteredValLossData),
          lineStyle: {
            width: 3,
            color: modelStyle.color
          },
          itemStyle: {
            color: modelStyle.color
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 4
            }
          },
          label: {
            show: true,
            formatter: ({ value }) => {
              return value == null ? '' : value.toFixed(4)
            },
            fontSize: 11,
            backgroundColor: 'rgba(255,255,255,0.85)',
            padding: [2, 4],
            borderRadius: 3
          },
          labelLayout: {
            hideOverlap: true
          }
        }
      })

      this.chart.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: params => {
              if (params.value == null) return ''
              return `${params.seriesName}<br/>Epoch ${params.name}<br/>Validation Mean Loss：${params.value.toFixed(4)}`
            }
          },
          legend: {
            top: 0,
            type: 'scroll',
            data: modelNames
          },
          grid: {
            top: 70,
            left: 70,
            right: 40,
            bottom: 60
          },
          xAxis: {
            type: 'category',
            name: 'Epoch',
            data: allEpochs
          },
          yAxis: {
            type: 'value',
            name: 'Validation Mean Loss',
            min: yRange.min,
            max: yRange.max,
            scale: true
          },
          series
        },
        true
      )
    },

    resizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>
  
<style scoped>
.chart-tip {
  font-size: 13px;
  font-weight: normal;
  color: #909399;
}
</style>