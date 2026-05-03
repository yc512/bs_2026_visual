import Vue from 'vue'
import Vuex from 'vuex'
import { modelData, lossData } from '@/data/experimentData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modelData,
    lossData,
    currentLossModel: 'Pruned Light-ST-GCN'
  },

  getters: {
    originalModel(state) {
      return state.modelData.find(item => item.name === 'Original ST-GCN')
    },

    lightModel(state) {
      return state.modelData.find(item => item.name === 'Light-ST-GCN')
    },

    prunedModel(state) {
      return state.modelData.find(item => item.name === 'Pruned Light-ST-GCN')
    },

    modelNames(state) {
      return state.modelData.map(item => item.name)
    }
  },

  mutations: {
    setCurrentLossModel(state, modelName) {
      state.currentLossModel = modelName
    }
  }
})