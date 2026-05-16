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
    methods: {
      getAllEpochs() {
        const epochSet = new Set()
  
        Object.values(this.valLossData).forEach(modelLossList => {
          modelLossList.forEach(item => {
            epochSet.add(item.epoch)
          })
        })
  
        return Array.from(epochSet).sort((a, b) => a - b)
      },
  
      getAllLossValues() {
        const values = []
        Object.values(this.valLossData).forEach(modelLossList => {
          modelLossList.forEach(item => {
            values.push(item.loss)
          })
        })
        return values
      },
  
      getYAxisRange() {
        const values = this.getAllLossValues()
        const minVal = Math.min(...values)
        const maxVal = Math.max(...values)
  
        // 给上下留一点边距，让曲线分得更开
        const padding = 0.08
  
        return {
          min: Number((minVal - padding).toFixed(2)),
          max: Number((maxVal + padding).toFixed(2))
        }
      },
  
      getModelSeries(modelName, allEpochs) {
        const modelLossList = this.valLossData[modelName]
  
        return allEpochs.map(epoch => {
          const target = modelLossList.find(item => item.epoch === epoch)
          return target ? target.loss : null
        })
      },
  
      drawChart() {
        if (!this.chart) {
          this.chart = echarts.init(this.$refs.chart)
        }
  
        const allEpochs = this.getAllEpochs()
        const modelNames = Object.keys(this.valLossData)
        const yRange = this.getYAxisRange()
  
        const series = modelNames.map(modelName => {
          return {
            name: modelName,
            type: 'line',
            smooth: false, // 不平滑，点更清楚
            symbol: 'circle',
            symbolSize: 10, // 点放大
            showSymbol: true,
            connectNulls: false,
            lineStyle: {
              width: 3
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
                return value == null ? '' : value.toFixed(2)
              },
              fontSize: 11,
              backgroundColor: 'rgba(255,255,255,0.85)',
              padding: [2, 4],
              borderRadius: 3
            },
            labelLayout: {
              hideOverlap: true
            },
            data: this.getModelSeries(modelName, allEpochs)
          }
        })
  
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: params => {
              if (params.value == null) return ''
              return `${params.seriesName}<br/>Epoch ${params.name}<br/>Validation Mean Loss：${params.value.toFixed(4)}`
            }
          },
          legend: {
            top: 0,
            type: 'scroll'
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
  
  <style scoped>
  .chart-tip {
    font-size: 13px;
    font-weight: normal;
    color: #909399;
  }
  
  </style>