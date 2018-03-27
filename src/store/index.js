import Vue from 'vue'
import Vuex from 'vuex'

import {Task, Tomato, Break} from '@/models'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasks: [],
    timers: []
  },
  getters: {
    getPlannedTasks (state) {
      return state.tasks.filter((task) => !task.completed && task.planned)
    },
    getTaskTomatoes: (state) => (taskId) => {
      return state.timers.filter((timer) => timer.taskId === taskId && !timer.lost)
    },
    getActiveTimer: (state) => {
      return state.timers.length !== 0 && state.timers.filter((timer) => timer.active)[0]
    },
    getTimerById: (state) => (timerId) => {
      return (state.timers.length !== 0 && state.timers.filter((timer) => timer.id === timerId)[0]) || null
    }
  },
  mutations: {
    _createTask (state, payload) {
      const newTask = new Task(payload.title, payload.description, payload.isPlanned)
      state.tasks = [
        newTask,
        ...state.tasks
      ]
    },
    _removeTask (state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id)
    },
    _completeTask (state, payload) {
      const task = {...payload, completed: true}
      Object.setPrototypeOf(task, payload)
      state.tasks = [...state.tasks.filter((task) => task.id !== payload.id), task]
    },
    _createTomato (state, taskId) {
      state.timers = [new Tomato(taskId), ...state.timers]
    },
    _createBreak (state, breakType) {
      state.timers = [new Break(breakType), ...state.timers]
    },
    _loseTomato (state, payload) {
      const tomato = {...payload, lost: true, active: false}
      Object.setPrototypeOf(tomato, payload)
      state.timers = [...state.timers.filter((timer) => timer.id !== payload.id), tomato]
      window.sendMessageToSw(JSON.stringify({action: 'STOP_TIMER', payload: payload.intervalId}))
    },
    _completeTimer (state, payload) {
      const timer = {...payload, completed: true, active: false}
      Object.setPrototypeOf(timer, payload)
      state.timers = [...state.timers.filter((item) => item.id !== payload.id), timer]
      window.sendMessageToSw(JSON.stringify({action: 'STOP_TIMER', payload: payload.intervalId}))
    },
    _refreshTimer (state, payload) {
      const timer = {...payload.timer, timer: payload.timer.timer, intervalId: payload.intervalId}
      Object.setPrototypeOf(timer, payload.timer)
      state.timers = [...state.timers.filter((item) => item.id !== payload.timer.id), timer]
    }
  },
  actions: {
    createPlanned ({commit}, payload) {
      commit('_createTask', {...payload, isPlanned: true})
    },
    createUnplanned ({commit}, payload) {
      commit('_createTask', {...payload, isPlanned: false})
    },
    removeTask ({commit}, id) {
      commit('_removeTask', id)
    },
    completeTask ({commit}, payload) {
      commit('_completeTask', payload)
    },
    createTomato ({commit, getters}, taskId) {
      const activeTimer = getters.getActiveTimer
      if (activeTimer && (activeTimer instanceof Tomato)) {
        commit('_loseTomato', activeTimer)
      }
      commit('_createTomato', taskId)
      window.sendMessageToSw(JSON.stringify({action: 'START_TIMER', payload: getters.getActiveTimer}))
    },
    completeTimer ({commit}, payload) {
      commit('_completeTimer', payload)
    },
    refreshTimer ({commit, getters}, {tmr, intervalId}) {
      const timer = getters.getTimerById(tmr.id)
      if (timer) {
        timer.timer = tmr.timer
        if (timer.displayTimer().clone().isBefore(timer.endTime())) {
          commit('_refreshTimer', {timer, intervalId})
        } else {
          commit('_completeTimer', {timer, intervalId})
        }
      }
    }
  }
})

export default store
