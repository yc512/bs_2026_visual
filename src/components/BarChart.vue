<template>
    <el-card shadow="never" class="section-card">
      <div slot="header" class="section-header">
        <span>{{ title }}</span>
      </div>
      <div ref="chart" class="chart"></div>
    </el-card>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  
  export default {
    name: 'BarChart',
    props: {
      title: String,
      yName: String,
      modelData: Array,
      field: String,
      unit: {
        type: String,
        default: ''
      },
      min: Number,
      max: Number
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
          tooltip: { trigger: 'axis' },
          grid: {
            top: 45,
            left: 60,
            right: 30,
            bottom: 80
          },
          xAxis: {
            type: 'category',
            data: this.modelData.map(item => item.name),
            axisLabel: {
              interval: 0,
              rotate: 25
            }
          },
          yAxis: {
            type: 'value',
            name: this.yName,
            min: this.min,
            max: this.max
          },
          series: [
            {
              name: this.title,
              type: 'bar',
              data: this.modelData.map(item => item[this.field]),
              label: {
                show: true,
                position: 'top',
                formatter: params => {
                  if (this.field === 'params') {
                    return params.value.toLocaleString()
                  }
                  return `${params.value}${this.unit}`
                }
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