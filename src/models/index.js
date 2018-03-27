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

  static deserialize (obj) {
    Object.setPrototypeOf(obj, new Task())
    return obj
  }
}

export class Timer {
  constructor () {
    this.id = uuidv4()
    this.startTime = moment()
    this.timer = 0
    this.completedPercent = 0
    this.active = true
    this.completed = false
    this.intervalId = null
    this.type = 'Timer'
  }

  displayTimer () {
    return this.startTime.clone().add(this.timer, 'seconds')
  }

  endTime () {
    return this.startTime.clone().add(25, 'minutes')
  }

  serialize () {
    const newObj = {...this}
    Object.setPrototypeOf(newObj, this)
    newObj.startTime = newObj.startTime.toISOString()
    return newObj
  }

  static deserialize (obj) {
    obj.startTime = moment(obj.startTime)
    Object.setPrototypeOf(obj, obj.type === 'Tomato' ? new Tomato() : new Break())
    return obj
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
  constructor (breakType) {
    super()
    this.breakType = breakType
    this.endTime = this.breakType === 'short' ? this.startTime.add(5, 'minutes') : this.startTime.add(30, 'minutes')
    this.type = 'Break'
  }
}
