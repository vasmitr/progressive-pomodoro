import Vue from 'vue'
import Router from 'vue-router'
import Planned from '@/components/tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Planned',
      component: Planned
    }
  ]
})
