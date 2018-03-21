if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('[Client] got: "' + event.data + '"')
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
