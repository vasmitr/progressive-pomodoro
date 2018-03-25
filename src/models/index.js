import uuidv4 from 'uuid/v4'
import moment from 'moment'
import store from '@/store'

export class Task {
  constructor (title, desc, isPlanned) {
    this.id = uuidv4()
    this.title = title
    this.desc = desc
    this.completed = false
    this.planned = isPlanned
  }

  remove () {
    return store.dispatch('removeTask', this.id)
  }
}

class Timer {
  constructor () {
    this.id = uuidv4()
    this.startTime = moment()
    this.timer = 0
    this.completedPercent = 0
    this.active = true
    this.completed = false
    this.intervalId = null
  }

  displayTimer () {
    return this.startTime.clone().add(this.timer, 'seconds')
  }

  endTime () {
    return this.startTime.clone().add(25, 'minutes')
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
