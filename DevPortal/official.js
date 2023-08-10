chrome.storage.sync.get(['tabs'], result => {
    if (result.tabs) {
      const tabs = JSON.parse(result.tabs)
      document.getElementById('save').addEventListener('click', function() {
        const url = document.getElementById('url').value
        tabs.push(url)
        chrome.storage.sync.set({ tabs: JSON.stringify(tabs) }, () => {
            document.getElementById('todo-popup').style.display = 'none'
        })
      })
      console.log(tabs)
    } else {
        const tabs = []
        document.getElementById('save').addEventListener('click', function() {
            const url = document.getElementById('url').value
            tabs.push(url)
            chrome.storage.sync.set({ tabs: JSON.stringify(tabs) }, () => {
                document.getElementById('todo-popup').style.display = 'none'
            })
          })
          console.log('no tabs')
    }
})

document.getElementById('devportal').addEventListener('click', function() {
    document.getElementById('todo-popup').style.display = 'block'
})

document.getElementById('close').addEventListener('click', function() {
    document.getElementById('todo-popup').style.display = 'none'
})

document.getElementById('remove').addEventListener('click', function() {
  chrome.storage.sync.set({ tabs: false }, () => {
    document.getElementById('todo-popup').style.display = 'none'
})
})

chrome.storage.sync.get(['pin'], result => {
  if (result.pin) {
    document.getElementById('pin').innerText = 'Edit Integration'
    document.getElementById('pt').checked = true
  
  //   document.getElementById('pin').addEventListener('click', function() {
  //     chrome.storage.sync.set({ pin: false }, () => {
  //         window.location = 'official.html'
  //     })
  // })
  }
})

document.getElementById('pin').addEventListener('click', function() {
  document.getElementById('lock-popup').style.display = 'block'
})

document.getElementById('lockclose').addEventListener('click', function() {
  document.getElementById('lock-popup').style.display = 'none'
})

document.getElementById('disable').addEventListener('click', function() {
chrome.storage.sync.set({ pin: false }, () => {
  document.getElementById('lock-popup').style.display = 'none'
  window.location = 'official.html'
})
})

document.getElementById('pinLock').addEventListener('submit', function() {
  chrome.storage.sync.set({ pin: window.btoa(document.getElementById('pass').value) }, () => {
    window.location = 'official.html'
})
})

// chrome.storage.sync.remove('tabs')