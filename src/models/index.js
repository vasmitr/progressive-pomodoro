import uuidv4 from 'uuid/v4'
import moment from 'moment'

export class Task {
  constructor (title, desc, isPlanned) {
    this.id = uuidv4()
    this.title = title
    this.desc = desc
    this.completed = false
    this.planned = isPlanned
  }
}

export class Timer {
  constructor () {
    this.id = uuidv4()
    this.startTime = moment().toISOString()
    this.timer = 0
    this.period = 25 * 60
    this.completedPercent = 0
    this.active = true
    this.completed = false
    this.intervalId = null
    this.type = 'Timer'
  }
  static displayTimer (timer) {
    let time = timer.period - timer.timer
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    return moment().hours(0).minutes(minutes).seconds(seconds)
  }
}

export class Tomato extends Timer {
  constructor (taskId) {
    super()
    this.taskId = taskId
    this.lost = false
    this.type = 'Tomato'
  }
}

export class Break extends Timer {
  constructor (period) {
    super()
    this.period = period * 60
    this.type = 'Break'
  }
}
