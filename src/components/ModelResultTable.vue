<template>
    <el-card shadow="never" class="section-card">
      <div slot="header" class="section-header">
        <span>实验结果总览</span>
      </div>
  
      <el-table :data="modelData" border stripe style="width: 100%">
        <el-table-column prop="name" label="模型名称" min-width="190" fixed="left" />
        <el-table-column prop="dsconv" label="DSConv" width="90" />
        <el-table-column prop="se" label="SE注意力" width="100" />
        <el-table-column prop="pruning" label="剪枝" width="80" />
        <el-table-column prop="epoch" label="Epoch" width="80" sortable />
        <el-table-column prop="top1" label="Top1(%)" width="100" sortable>
          <template slot-scope="scope">{{ scope.row.top1.toFixed(2) }}%</template>
        </el-table-column>
        <el-table-column prop="top5" label="Top5(%)" width="100" sortable>
          <template slot-scope="scope">{{ scope.row.top5.toFixed(2) }}%</template>
        </el-table-column>
        <el-table-column prop="params" label="参数量" width="130" sortable>
          <template slot-scope="scope">{{ scope.row.params.toLocaleString() }}</template>
        </el-table-column>
        <el-table-column prop="reduction" label="参数变化" width="120" sortable>
          <template slot-scope="scope">
            <span :class="scope.row.reduction >= 0 ? 'reduction-positive' : 'reduction-negative'">
              {{ scope.row.reduction >= 0 ? '↓' : '↑' }}{{ Math.abs(scope.row.reduction).toFixed(2) }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="说明" min-width="220" />
      </el-table>
    </el-card>
  </template>
  
  <script>
  export default {
    name: 'ModelResultTable',
    props: {
      modelData: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .reduction-positive {
    color: #67c23a;
    font-weight: 700;
  }
  
  .reduction-negative {
    color: #f56c6c;
    font-weight: 700;
  }
  </style>