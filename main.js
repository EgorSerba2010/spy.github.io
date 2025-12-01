const $sec3 = document.querySelector('#sec3')
const $newGameBtn = document.querySelector('#newGameBtn')
const $startBtn = document.querySelector('#startBtn')
const $backBtn = document.querySelector('#backBtn')
const $closeBtn = document.querySelector('#closeBtn')
const $returnBtn = document.querySelector('#returnBtn')
const $toMainBtn = document.querySelector('#toMainBtn')
const $endBtn = document.querySelector('#end')
const $closeGameBtn = document.querySelector('#closeGameBtn')
const $addBtn = document.querySelector('#addBtn')
const $roundBtn = document.querySelector('#roundBtn')
const $addPlayerBtn = document.querySelector('#addPlayerBtn')
const $playersBtn = document.querySelector('#playersBtn')
const $playerName = document.querySelector('#playerName')
const $container = document.querySelector('#container')
const $time = document.querySelector('#time')
const $spyBtns = document.querySelectorAll('.spyBtn')
const $trueSpyBtns = document.querySelectorAll('.true-spyBtn')
const $sections = document.querySelectorAll('section')
const $cardsList = document.querySelector('#cardsList')
const $currentName = document.querySelector('#currentName')
const $hint = document.querySelector('#hint')
const $first = document.querySelector('#first')
const progress = document.querySelector('.progress-ring__progress')
const timeEl = document.querySelector('#timeRemain')

const locations = ['Аэропорт', 'Больница', 'Школа', 'Университет', 'Ресторан', 'Кафе', 'Бар', 'Театр', 'Кинотеатр', 'Музей', 'Библиотека', 'Стадион', 'Спортзал', 'Бассейн', 'Пляж', 'Парк', 'Зоопарк', 'Цирк', 'Церковь', 'Монастырь', 'Тюрьма', 'Полицейский участок', 'Военная база', 'Космическая станция', 'Метро', 'Автобусная остановка', 'Железнодорожный вокзал', 'Супермаркет', 'Рынок', 'Офис']
const $players = []

const radius = progress.r.baseVal.value
const circumference = 2 * Math.PI * radius

let $gameLocation = []
let spyCount = 0
let secs = 0
let totalTime = 0
let participants = []

$newGameBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 1) sec.classList.add('active')
    else if (sec.classList.contains('active')) sec.classList.remove('active')
    else return
  })
})

$startBtn.addEventListener('click', () => {
  const players = $container.querySelectorAll('.player input').forEach(player => {
    if (player.checked && participants.indexOf(player.parentElement.querySelector('span').textContent) < 0) {
      participants.push(player.parentElement.querySelector('span').textContent)
    }
  })

  if (spyCount >= 1 && participants.length >= 3 && spyCount < participants.length-1) {
    $sections.forEach((sec, i) => {
      if (i === 4) sec.classList.add('active')
      else if (sec.classList.contains('active')) {
        setTimeout(() => {
          sec.classList.remove('active')
        }, 200);
      }
      else return
    })

    const roles = getRandomLocation(participants.length, spyCount)
    
    for (let i = 0; i < participants.length; i++) {
      $currentName.textContent = participants[i]

      const $card = document.createElement('li')
      $card.onclick = function() {
        if (!this.classList.contains('flip')) {
          this.classList.add('flip')
          $hint.textContent = 'Нажми и передай игроку выше'
        } else {
          if (i === 0) {
              $sections.forEach((sec, i) => {
              if (i === 5) sec.classList.add('active')
              else if (sec.classList.contains('active')) sec.classList.remove('active')
              else return
            })

            $first.textContent = participants[Math.round(Math.random()*(participants.length-1))]
          }

          this.classList.add('exit')
          setTimeout(() => {
            this.remove()
          }, 500);

          $hint.textContent = 'Нажми, чтобы посмотреть карту'

          let j = i-1
          $currentName.textContent = participants[j]
          j--
        }
      }

      const cardInner = document.createElement('div')
      cardInner.classList.add('card-inner')

      const cardFront = document.createElement('div')
      cardFront.classList.add('card-front')

      const cardBack = document.createElement('div')
      cardBack.classList.add('card-back')
      cardBack.textContent = roles[i]

      cardInner.appendChild(cardFront)
      cardInner.appendChild(cardBack)
      $card.appendChild(cardInner)
      $cardsList.appendChild($card)
    }
  }
})

$backBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 0) sec.classList.add('active')
    else if (sec.classList.contains('active')) sec.classList.remove('active')
    else return
  })
})
$toMainBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 0) sec.classList.add('active')
    else if (sec.classList.contains('active')) sec.classList.remove('active')
    else return
  })

  $cardsList.innerHTML = ''
  $gameLocation = []
})
$closeGameBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 0) sec.classList.add('active')
    else if (sec.classList.contains('active')) sec.classList.remove('active')
    else return
  })

  $cardsList.innerHTML = ''
  $gameLocation = []
})
$endBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 0) sec.classList.add('active')
    else if (sec.classList.contains('active')) sec.classList.remove('active')
    else return
  })

  $cardsList.innerHTML = ''
  $gameLocation = []
  timeEl.textContent = '00:00'
  secs = 0
  totalTime = 0
})

$closeBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 2) sec.classList.remove('active')
    else return
  })
})

$returnBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 3) sec.classList.remove('active')
    else return
  })
})

$trueSpyBtns.forEach(btn => {
  btn.addEventListener('change', (e) => {
    spyCount = +e.target.id.split('')[5]
  })
})

$playersBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 3) sec.classList.add('active')
    else return
  })
})

$addPlayerBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 2) sec.classList.add('active')
    else return
  })
})

$roundBtn.addEventListener('click', () => {
  $sections.forEach((sec, i) => {
    if (i === 6) sec.classList.add('active')
    else return
  })

  if (secs === -1 && totalTime === 0 && $time.value != '') setSecs()
  tick()
})

function setId(id) {
  localStorage.setItem('id', +id+1)
}
function getId() {
  return (localStorage.getItem('id') || 0)
}

function addPlayer() {
  if ($playerName.value !== '') {
    setId(getId())
    const $newPlayer = document.createElement('label')
    $newPlayer.classList.add('player')

    const $newSpan = document.createElement('span')
    $newSpan.textContent = $playerName.value
  
    const $newInput = document.createElement('input')
    $newInput.type = 'checkbox'
    $newInput.checked = 'true'
    $newInput.className = 'pl'
    $newInput.id = 'pl'+getId()
  
    const svgNS = "http://www.w3.org/2000/svg"
    const $newSvg1 = document.createElementNS(svgNS, "svg")
    const $newSvg2 = document.createElementNS(svgNS, "svg")
    $newSvg1.setAttribute("viewBox", "-40 0 200 120")
    $newSvg1.setAttribute("width", "40px")
    $newSvg1.setAttribute("height", "20px")
    $newSvg1.classList.add('remove')
    $newSvg1.onclick = () => {
      $newPlayer.remove()
      renumber()
    }
    $newSvg2.setAttribute("viewBox", "0 0 140 120")
    $newSvg2.setAttribute("width", "140")
    $newSvg2.setAttribute("height", "120")
    $newSvg2.classList.add('checked')
    document.querySelectorAll('.checked').forEach(e => e.onclick = (e) => e.stopPropagation())
  
    const path1 = document.createElementNS(svgNS, "path")
    const path2 = document.createElementNS(svgNS, "path")
    path1.setAttribute("d", "M20 20L100 100M100 20L20 100")
    path1.setAttribute("stroke", "#ccc")
    path1.setAttribute("stroke-width", "15px")
    path1.setAttribute("stroke-linecap", "round")
    path1.setAttribute("fill", "none")
    path2.setAttribute("d", "M20 60L60 100L120 20")
    path2.setAttribute("stroke", "#fff")
    path2.setAttribute("stroke-width", "15px")
    path2.setAttribute("stroke-linecap", "round")
    path2.setAttribute("fill", "none")
    
    $newSvg1.appendChild(path1)
    $newSvg2.appendChild(path2)
    $newPlayer.appendChild($newSvg1)
    $newPlayer.appendChild($newSpan)
    $newPlayer.appendChild($newInput)
    $newPlayer.appendChild($newSvg2)
    toRipple($newPlayer)

    $container.appendChild($newPlayer)
    savePlayers()

    $playerName.value = ''
  }
}

$addBtn.addEventListener('click', () => {
  addPlayer()
})

function renumber() {
  const items = $container.querySelectorAll('.player .pl')
  items.forEach((el, i) => {
    el.id = 'pl'+(i+1)
  })
  setId(items.length-1)
  savePlayers()
}

function savePlayers() {
  localStorage.setItem('players', $container.innerHTML)
}

function restoreElements() {
  const data = localStorage.getItem('players')
  if (data !== '') {
    $container.innerHTML = data
    $container.querySelectorAll('.player svg').forEach(btn => {
      btn.onclick = () => {
        btn.parentElement.remove()
        savePlayers()
        renumber()
      }
    })
  }
}
window.addEventListener('load', () => {
  restoreElements()
  document.querySelectorAll('.checked').forEach(e => e.onclick = (e) => e.stopPropagation())
  document.querySelectorAll('.player').forEach(e => toRipple(e))
})


function setSecs() {
  const timeArr = $time.value.split(':')
  if (timeArr.length === 3) {
    secs = +timeArr[0]*3600 + +timeArr[1]*60 + +timeArr[2]
    totalTime = secs
  } else if (timeArr.length === 2) {
    secs = +timeArr[0]*60 + +timeArr[1]
    totalTime = secs
  }
}
$time.addEventListener('change', () => setSecs())


function getRandomLocation(plCount, spyCount) {
  const location = locations[Math.round(Math.random()*(locations.length-1))]
  for (let i = 0; i < (+plCount- +spyCount); i++) {
    $gameLocation.push(location)
  }
  for (let i = 0; i < +spyCount; i++) {
    $gameLocation.push('Ты шпион!')
  }

  $gameLocation = $gameLocation.sort(() => Math.random() - 0.5)
  return $gameLocation
}



progress.style.strokeDasharray = `${circumference} ${circumference}`
progress.style.strokeDashoffset = circumference

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference
  progress.style.strokeDashoffset = offset
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

function tick() {
  const percent = (secs / totalTime) * 100
  setProgress(percent)

  timeEl.textContent = formatTime(secs)

  secs--
  if (secs >= 0) {
    setTimeout(tick, 1000)
  }
}




function toRipple(btn) {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span')
    circle.classList.add('ripple')

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    circle.style.width = circle.style.height = size + 'px'

    const x = e.clientX - rect.left - size/2
    const y = e.clientY - rect.top - size/2
    circle.style.left = x + 'px'
    circle.style.top = y + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 700)
  })
}