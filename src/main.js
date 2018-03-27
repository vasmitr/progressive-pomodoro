// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {set, get} from 'idb-keyval'

import App from './App'
import router from './router'
import store from './store'
import './messages/client'
import {Timer, Task} from '@/models'

Vue.config.productionTip = false
Vue.use(Vuetify)

get('vuexState').then((state) => state ? store.replaceState({
  tasks: state.tasks.map(function (task) {
    return Task.deserialize(task)
  }),
  timers: state.timers.map(function (timer) {
    return Timer.deserialize(timer)
  })
}) : null)

store.subscribe((mutation, state) => {
  set('vuexState', {
    tasks: state.tasks,
    timers: state.timers.map((timer) => timer.serialize())
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
