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
    super()
    this.breakType = breakType
    this.endTime = this.breakType === 'short' ? this.startTime.add(5, 'minutes') : this.startTime.add(30, 'minutes')
  }
}

export class UnplannedTask extends BaseTask {
  moveToPlanned () {
    return store.dispatch('planTask', this.id)
  }
}

export class PlannedTask extends BaseTask {
  createTomato () {
    return store.dispatch('createTomato', this.id)
  }

  refreshTomato () {
    store.dispatch('loseTomato')
    return store.dispatch('createTomato', this.id)
  }

  completeTask () {
    return store.dispatch('completeTask', this.id)
  }
}
