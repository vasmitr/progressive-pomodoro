function sendMessageToClient (client, msg) {
  return new Promise(function (resolve, reject) {
    var msg_chan = new MessageChannel()

    msg_chan.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    client.postMessage("SW Says: '" + msg + "'", [msg_chan.port2])
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
  switch (event.data) {
    case 'START_TIMER':
      setInterval(() => sendMessageToAllClients('I do some work'), 1000)
      break
    default:
      console.log('a')
  }
})
