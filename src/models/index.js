import uuidv4 from 'uuid/v4'
import moment from 'moment'

import store from '@/store'

class BaseTask {
  constructor (title, desc) {
    this.id = uuidv4()
    this.title = title
    this.desc = desc
  }

  remove () {
    return store.dispatch('removeTask', this.id)
  }
}

class Timer {
  constructor () {
    this.id = uuidv4()
    this.startTime = moment()
    this.endTime = this.startTime.add(25, 'minutes')
    this.timer = this.startTime
    this.completedPercent = 0
    this.active = true
    this.completed = false
  }
}

export class Tomato extends Timer {
  constructor (taskId) {
    super()
    this.taskId = taskId
    this.lost = false
  }
}

export class Break extends Timer {
  constructor (breakType) {
    this.breakType = breakType
  }
}

export class UnplannedTask extends BaseTask {
  moveToPlanned () {
    return store.dispatch('createFromUnplanned', this.id)
  }
}

export class PlannedTask extends BaseTask {
  tomatoes () {
    return store.dispatch('getTomatoes', this.id)
  }

  isActive () {
    const tomatoes = this.tomatoes()
    return tomatoes.length !== 0 && tomatoes.filter((tomato) => tomato.active).length !== 0
  }

  createTomato () {
    return store.dispatch('createTomato', this.id)
  }

  refreshTomato () {
    store.dispatch('loseActiveTomato')
    return store.dispatch('createTomato', this.id)
  }

  completeTask () {
    return store.dispatch('completeTask', this.id)
  }
}
