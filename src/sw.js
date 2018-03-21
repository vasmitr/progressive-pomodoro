self.addEventListener('activate', () => {
  setInterval(() => console.log('I do some work'), 1000)
})
