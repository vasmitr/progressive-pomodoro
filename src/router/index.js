import Vue from 'vue'
import Router from 'vue-router'
import { TaskList, TaskLog } from '@/components/tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/tasks',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/log',
      name: 'TaskLog',
      component: TaskLog
    }
  ]
})
