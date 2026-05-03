<template>
    <el-card shadow="never" class="section-card">
      <div slot="header" class="section-header">
        <span>训练过程Mean Loss变化</span>
  
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
  import { mapState, mapMutations } from 'vuex'
  
  export default {
    name: 'LossChart',
    data() {
      return {
        chart: null
      }
    },
    computed: {
      ...mapState(['lossData', 'currentLossModel']),
  
      modelNames() {
        return Object.keys(this.lossData)
      },
  
      selectedModel: {
        get() {
          return this.currentLossModel
        },
        set(value) {
          this.setCurrentLossModel(value)
        }
      }
    },
    watch: {
      currentLossModel() {
        this.drawChart()
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
      ...mapMutations(['setCurrentLossModel']),
  
      drawChart() {
        if (!this.chart) {
          this.chart = echarts.init(this.$refs.chart)
        }
  
        const losses = this.lossData[this.currentLossModel]
        const epochs = losses.map((_, index) => index + 1)
  
        this.chart.setOption({
          tooltip: { trigger: 'axis' },
          grid: {
            top: 45,
            left: 60,
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
            name: 'Mean Loss'
          },
          series: [
            {
              name: this.currentLossModel,
              type: 'line',
              smooth: true,
              data: losses,
              symbol: 'circle',
              symbolSize: 6,
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