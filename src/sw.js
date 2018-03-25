function sendMessageToClient (client, msg) {
  return new Promise(function (resolve, reject) {
    var channel = new MessageChannel()

    channel.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    client.postMessage(msg, [channel.port2])
  })
}

function sendMessageToAllClients (msg) {
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      sendMessageToClient(client, msg).then(m => console.log('SW Received Message: ' + m))
    })
  })
}

self.addEventListener('activate', () => {
  console.log('[SW] Activated')
})

self.addEventListener('message', (event) => {
  console.log('[SW] received message ' + event.data)
  const {action, payload} = JSON.parse(event.data)

  switch (action) {
    case 'START_TIMER':
      let timer = payload.timer
      const intervalId = setInterval(() => {
        timer += 1
        const timerObj = {timer: timer, id: payload.id}
        sendMessageToAllClients(JSON.stringify({timerObj, intervalId}))
      }, 1000)
      break
    case 'STOP_TIMER':
      clearInterval(payload)
      break
    default:
      console.log('a')
  }
})
