<template>
    <div>
      <div class="page-title">
        <h1>实验结论</h1>
        <p>总结DSConv、SE注意力和通道剪枝对模型参数量与识别性能的影响。</p>
      </div>
  
      <experiment-conclusion />
    </div>
  </template>
  
  <script>
  import ExperimentConclusion from '@/components/ExperimentConclusion.vue'
  
  export default {
    name: 'ConclusionView',
    components: {
      ExperimentConclusion
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