import Vue from 'vue'
import Router from 'vue-router'
import { TaskList, TaskLog } from '@/components/tasks'

Vue.use(Router)

let routes
// In development mode service worker serves from "static" folder
// Its scope will be /static/ and we need to use it as the root path
if (process && process.env.NODE_ENV === 'production') {
  routes = [
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
} else {
  routes = [
    {
      path: '/',
      redirect: '/static/tasks'
    },
    {
      path: '/static/tasks',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/static/log',
      name: 'TaskLog',
      component: TaskLog
    }
  ]
}

export default new Router({
  mode: 'history',
  relative: true,
  routes
})
