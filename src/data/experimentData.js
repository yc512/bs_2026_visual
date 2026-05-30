export const modelData = [
  {
    name: 'Original ST-GCN',
    dsconv: '否',
    se: '否',
    pruning: '否',
    epoch: 20,
    top1: 79.69,
    top5: 96.79,
    params: 3098832,
    reduction: 0,
    flops: 16.321,
    flopsReduction: 0,
    inferenceTime: 16.9230,
    inferenceReduction: 0,
    note: '原始对照模型，准确率最高但参数量、FLOPs和推理时间均较高'
  },
  {
    name: 'ST-GCN + DSConv',
    dsconv: '是',
    se: '否',
    pruning: '否',
    epoch: 20,
    top1: 78.73,
    top5: 96.58,
    params: 1014352,
    reduction: 67.27,
    flops: 5.594,
    flopsReduction: 65.73,
    inferenceTime: null,
    inferenceReduction: null,
    note: '参数量和FLOPs显著降低，准确率接近原始模型'
  },
  {
    name: 'ST-GCN + SE',
    dsconv: '否',
    se: '是',
    pruning: '否',
    epoch: 20,
    top1: 77.24,
    top5: 95.97,
    params: 3131600,
    reduction: -1.06,
    flops: 16.331,
    flopsReduction: -0.06,
    inferenceTime: null,
    inferenceReduction: null,
    note: '参数量和FLOPs略增，主要用于验证通道注意力影响'
  },
  {
    name: 'Light-ST-GCN',
    dsconv: '是',
    se: '是',
    pruning: '否',
    epoch: 20,
    top1: 79.18,
    top5: 96.47,
    params: 1047120,
    reduction: 66.21,
    flops: 5.604,
    flopsReduction: 65.66,
    inferenceTime: 16.7295,
    inferenceReduction: 1.14,
    note: '本文主要改进模型，参数量和FLOPs大幅降低，准确率基本保持'
  },
  {
    name: 'Pruned Light-ST-GCN',
    dsconv: '是',
    se: '是',
    pruning: '是',
    epoch: 20,
    top1: 76.19,
    top5: 95.62,
    params: 738256,
    reduction: 76.18,
    flops: 4.406,
    flopsReduction: 73.00,
    inferenceTime: 14.7027,
    inferenceReduction: 13.12,
    note: '进一步剪枝后参数量和FLOPs最低，推理时间下降更明显，但准确率下降较多'
  }
]
  
  export const trainLossData = {
    'Original ST-GCN': [
      3.2689, 2.1746, 1.6775, 1.4630, 1.3203,
      1.1990, 1.1018, 1.0191, 0.9493, 0.8904,
      0.8496, 0.8054, 0.7643, 0.7399, 0.7194,
      0.5340, 0.5028, 0.4827, 0.4600, 0.4544
    ],
  
    'ST-GCN + DSConv': [
      3.2065, 2.2538, 1.7625, 1.4979, 1.3332,
      1.1941, 1.1004, 1.0220, 0.9630, 0.9137,
      0.8689, 0.8306, 0.8031, 0.7682, 0.7490,
      0.5617, 0.5323, 0.5155, 0.4871, 0.4838
    ],
  
    'ST-GCN + SE': [
      3.1683, 2.0435, 1.6471, 1.4508, 1.3050,
      1.1996, 1.1091, 1.0420, 0.9909, 0.9381,
      0.9022, 0.8707, 0.8401, 0.8119, 0.7888,
      0.5991, 0.5693, 0.5509, 0.5252, 0.5207
    ],
  
    'Light-ST-GCN': [
      3.3675, 2.3050, 1.7950, 1.5434, 1.3634,
      1.2379, 1.1424, 1.0671, 1.0032, 0.9513,
      0.9087, 0.8727, 0.8433, 0.8163, 0.7915,
      0.7724, 0.7451, 0.7283, 0.7094, 0.6916
    ],
  
    'Pruned Light-ST-GCN': [
      3.2944, 2.1837, 1.7437, 1.4995, 1.3437,
      1.2330, 1.1462, 1.0868, 1.0275, 0.9915,
      0.9505, 0.9179, 0.8867, 0.8565, 0.8337,
      0.6501, 0.6147, 0.5984, 0.5701, 0.5658
    ]
  }
  
  export const valLossData = {
    'Original ST-GCN': [
      { epoch: 10, loss: 1.0305 },
      { epoch: 20, loss: 0.6765 }
    ],
  
    'ST-GCN + DSConv': [
      { epoch: 10, loss: 0.9766 },
      { epoch: 20, loss: 0.7009 }
    ],
  
    'ST-GCN + SE': [
      { epoch: 10, loss: 1.0348 },
      { epoch: 20, loss: 0.7634 }
    ],
  
    'Light-ST-GCN': [
      { epoch: 10, loss: 1.1008 },
      { epoch: 20, loss: 0.8236 }
    ],
  
    'Pruned Light-ST-GCN': [
      { epoch: 10, loss: 1.0321 },
      { epoch: 20, loss: 0.7938 }
    ]
  }