self.addEventListener('activate', () => {
  console.log('[SW] Activated')
  setInterval(() => console.log('I do some work'), 1000)
})
