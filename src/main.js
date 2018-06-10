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

Vue.config.productionTip = false
Vue.use(Vuetify)

Notification.requestPermission().then(function (result) {
  if (result === 'granted') {
    console.log('Permission granted')
  }
  if (result === 'denied') {
    console.log('Permission denied')
  }
})

get('vuexState').then((state) => state ? store.replaceState({...state}) : null)

store.subscribe((mutation, state) => {
  set('vuexState', {
    tasks: state.tasks,
    timers: state.timers,
    taskToEdit: state.taskToEdit,
    showBreakForm: state.showBreakForm
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
