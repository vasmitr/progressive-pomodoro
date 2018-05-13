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
      if (state.tasks.length === 0) {
        return []
      }
      return [...state.tasks.filter((task) => !task.completed && task.planned)]
    },
    getTaskTomatoes: (state) => (taskId) => {
      if (state.timers.length === 0) {
        return []
      }
      return [...state.timers.filter((timer) => timer.taskId === taskId && !timer.lost)]
    },
    getActiveTimer: (state) => {
      return state.timers.length !== 0 ? state.timers.filter((timer) => timer.active)[0] : null
    },
    getTimerById: (state) => (timerId) => {
      return state.timers.length !== 0 ? state.timers.filter((timer) => timer.id === timerId)[0] : null
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
      state.timers = [...state.timers.filter((timer) => timer.id !== payload.id), tomato]

      // Clear background interval without push notification
      window.sendMessageToSw(JSON.stringify({action: 'STOP_TIMER_QUIET', payload: payload.intervalId}))
    },
    _completeTimer (state, {timer, intervalId}) {
      let newTimer = {...timer, timer: timer.timer, completed: true, active: false}
      state.timers = [...state.timers.filter((item) => item.id !== timer.id), newTimer]

      // Clear background interval
      window.sendMessageToSw(JSON.stringify({action: 'STOP_TIMER', payload: intervalId}))
    },
    _refreshTimer (state, {timer, intervalId}) {
      let newTimer = {...timer, timer: timer.timer, intervalId: intervalId}
      state.timers = [...state.timers.filter((item) => item.id !== timer.id), newTimer]
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
      // If active pomodoro exists, we'll lose it
      let activeTimer = getters.getActiveTimer
      if (activeTimer && activeTimer.type === 'Tomato') {
        commit('_loseTomato', activeTimer)
      }

      // Create new Pomodoro
      commit('_createTomato', taskId)

      // Get new Pomodoro and start background timer
      let newActiveTimer = getters.getActiveTimer
      window.sendMessageToSw(JSON.stringify({
        action: 'START_TIMER',
        payload: { timer: newActiveTimer.timer, id: newActiveTimer.id }
      }))
    },
    completeTimer ({commit}, payload) {
      commit('_completeTimer', payload)
    },
    refreshTimer ({commit, getters}, {timerObj, intervalId}) {
      const currentTimer = getters.getTimerById(timerObj.id)
      if (currentTimer) {
        const newTimer = {...currentTimer, 'timer': timerObj.timer}
        console.log(newTimer.timer)
        if (newTimer.period >= newTimer.timer) {
          commit('_refreshTimer', {timer: newTimer, intervalId})
        } else {
          commit('_completeTimer', {timer: newTimer, intervalId})
        }
      // Check that store is initialized from keyval
      } else if (this.timers.length !== 0) {
        // Clear background interval if timer doesn't exist
        window.sendMessageToSw(JSON.stringify({action: 'STOP_TIMER_QUIET', payload: intervalId}))
      }
    }
  }
})

export default store
