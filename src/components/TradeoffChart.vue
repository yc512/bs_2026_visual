<template>
    <el-card shadow="never" class="section-card">
      <div slot="header" class="section-header">
        <span>准确率-参数量折中分析</span>
      </div>
      <div ref="chart" class="wide-chart"></div>
    </el-card>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  
  export default {
    name: 'TradeoffChart',
    props: {
      modelData: {
        type: Array,
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
      drawChart() {
        this.chart = echarts.init(this.$refs.chart)
  
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: params => {
              const item = params.data.raw
              return `${item.name}<br/>Top1：${item.top1}%<br/>参数量：${item.params.toLocaleString()}<br/>参数变化：${item.reduction}%`
            }
          },
          grid: {
            top: 45,
            left: 80,
            right: 40,
            bottom: 60
          },
          xAxis: {
            type: 'value',
            name: '参数量',
            axisLabel: {
              formatter: value => `${(value / 1000000).toFixed(1)}M`
            }
          },
          yAxis: {
            type: 'value',
            name: 'Top1(%)',
            min: 74,
            max: 81
          },
          series: [
            {
              name: '准确率-参数量折中',
              type: 'scatter',
              symbolSize: 18,
              data: this.modelData.map(item => ({
                value: [item.params, item.top1],
                raw: item
              })),
              label: {
                show: true,
                formatter: params => params.data.raw.name,
                position: 'right'
              }
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