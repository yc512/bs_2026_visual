import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import TableView from '@/views/TableView.vue'
import ChartView from '@/views/ChartView.vue'
import ConclusionView from '@/views/ConclusionView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/table',
    name: 'Table',
    component: TableView
  },
  {
    path: '/charts',
    name: 'Charts',
    component: ChartView
  },
  {
    path: '/conclusion',
    name: 'Conclusion',
    component: ConclusionView
  }
]

export default new VueRouter({
  mode: 'hash',
  routes
})