<template>
    <div>
      <div class="page-title">
        <h1>实验结果表格</h1>
        <p>集中展示各模型的结构改动、准确率、参数量和参数变化情况。</p>
      </div>
  
      <model-result-table :model-data="modelData" />
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import ModelResultTable from '@/components/ModelResultTable.vue'
  
  export default {
    name: 'TableView',
    components: {
      ModelResultTable
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