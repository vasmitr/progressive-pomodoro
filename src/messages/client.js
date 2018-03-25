import store from '@/store'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    const {timerObj, intervalId} = JSON.parse(event.data)
    store.dispatch('refreshTimer', {tmr: timerObj, intervalId})
  })
}

window.sendMessageToSw = (msg) => {
  return new Promise(function (resolve, reject) {
    // Create a Message Channel
    var channel = new MessageChannel()

    // Send message to service worker along with port for reply
    navigator.serviceWorker.controller.postMessage(msg, [channel.port2])
  })
}
