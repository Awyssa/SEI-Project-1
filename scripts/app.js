function init() {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - VARIABLES 
  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')
  const gridStats = {
    rows: 10,
    columns: 10,
    mines: 12,
    cells: []
  }
  const cellCount = gridStats.rows * gridStats.columns
  let lives = 3
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CREATE GRID
  function createGrid() {
    for (let i = 0; i < gridStats.rows; i++) {
      for (let j = 0; j < gridStats.columns; j ++) {
        const cell = document.createElement('div')
        grid.appendChild(cell)
        gridStats.cells.push(cell)
        cell.classList.add('unclicked')
      }
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ADD MINES
  function addMines() {
    for (let i = 0; i < gridStats.mines; i) {
      const cellToAddMine =  gridStats.cells[Math.floor(Math.random() * gridStats.cells.length)]
      if (cellToAddMine.classList.contains('unclicked')) {
        cellToAddMine.classList.replace('unclicked', 'mine')
        i++
      }
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - EVENT LISTENERS
  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
    element.addEventListener('contextmenu', flagMine)
  })
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - PLAYER LEFT CLICK
  function playerClick(event) {
    if (event.target.classList.contains('mine') && !event.target.classList.contains('flagged')) {
      event.target.classList.add('covid')
      showBlock('YOU HIT A COVID VIRUS!!!')
      modalwindow.classList.add('modallose')
      endGame()
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.replace('unclicked', 'clicked')
      showValues(event)
      event.target.removeEventListener('click', playerClick)
      event.target.removeEventListener('contextmenu', flagMine)
      runShowValuesOnNextCells(event.target)
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - PLAYER RIGHT CLICK
  function flagMine(event) {
    if (event.target.classList.contains('mine') && !event.target.classList.contains('flagged')) {
      event.target.classList.add('flagged')
      gridStats.mines --
      playRandomBonus()
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.replace('unclicked', 'cross')
      wrong.audio.play()
      lives --
    }
    updateMinesFlagged()
    showAnti()
    gameWon(gridStats.mines)
    outOfLives(lives)
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - UPDATES SCORE / LIVES / MINES
  function updateMinesFlagged() {
    document.getElementById('bonus').innerHTML = `COVID Viruses left: ${gridStats.mines}`
  }
  updateMinesFlagged()
  function showAnti() {
    document.getElementById('anti').innerHTML = `Extra Antibacterial Spray: ${lives}`
  }
  showAnti()
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - START GAME
  document.querySelector('#grid').addEventListener('click', startGame)

  function startGame() {
    document.querySelector('#grid').removeEventListener('click', startGame)
    document.querySelector('.grid').innerHTML = ''
    createGrid()
    addMines(gridStats.cells)
    assignMineValueToGrid(gridStats.cells)
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
    handleStartTimer()
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - RESET GAME
  document.querySelector('#reset').addEventListener('click', resetGame)

  function resetGame() {
    handleResetTimer()
    lives = 3
    gridStats.mines = 12
    clearClasses(gridStats.cells)
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
      element.addEventListener('contextmenu', flagMine)
    })
    addMines(gridStats.cells)
    showAnti()
    grid.classList.remove('millhouse')
    grid.classList.remove('michael')
    updateMinesFlagged()
    assignMineValueToGrid(gridStats.cells)
    handleStartTimer()
    bonusIndex = 0
    bonusSound = 0
    bonusAudio = 1
    modalwindow.classList.remove('modalwin')
    modalwindow.classList.remove('modallose')
    modalwindow.classList.remove('modallost')
  }

  function clearClasses(grid) {
    grid.forEach((element) => {
      element.className = ''
      element.innerHTML = ''
      element.classList.add('unclicked')
    })
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME TIMER
  const timer = document.getElementById('timer')

  let timerId = null
  let seconds = 0

  function handleStartTimer() {
    seconds = 0
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      timerId = setInterval(() => { 
        seconds ++
        timer.innerHTML = `Seconds: ${seconds}`
      }, 1000)
    }
  }
  function handleResetTimer() {
    clearInterval(timerId) 
    timerId = null 
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME WON
  function gameWon() {
    if (gridStats.mines === 0) {
      showBlock('WELL DONE!!! The R rate is at 0 and you have ended the COVID pandemic!!!')
      modalwindow.classList.add('modalwin')
      grid.classList.add('millhouse')
      millhouse.audio.play()
      gridCells.forEach(element => {
        element.removeEventListener('click', playerClick)
        element.removeEventListener('contextmenu', flagMine)
      })
      handleResetTimer()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME OVER
  function endGame() {
    showAllMines(gridStats.cells)
    handleResetTimer()
    gridCells.forEach(element => {
      element.removeEventListener('click', playerClick)
      element.removeEventListener('contextmenu', flagMine)
    })
    grid.classList.add('michael')
    endgame.audio.play()
  }
  function showAllMines(array) {
    array.filter(value => {
      if (value.classList.contains('mine') && !value.classList.contains('flagged')) {
        value.classList.add('covid')
      }
    })
  }
  function outOfLives(lives) {
    if (lives === 0) {
      showBlock('You have no more Antibacterial Spray to clear the COVID CELLS!!!')
      modalwindow.classList.add('modallost')
      showAllMines(gridStats.cells)
      endGame()
      gridCells.forEach(element => {
        element.removeEventListener('click', playerClick)
        element.removeEventListener('contextmenu', flagMine)
      })
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CHECK FOR BORDER CELLS
  function getIndexOfCell(cell) {
    const index = gridStats.cells.indexOf(cell)
    return index
  }
  function onTopRow(cell) {
    return (getIndexOfCell(cell) < gridStats.rows ? true : false)
  }
  function onBottomRow(cell) {
    return (getIndexOfCell(cell) >= cellCount - gridStats.rows ? true : false)
  }
  function onLeftColumn(cell) {
    return (getIndexOfCell(cell) % gridStats.columns == 0 ? true : false)
  }
  function onRightColumn(cell) {
    return (getIndexOfCell(cell) % gridStats.columns == gridStats.columns - 1 ? true : false)
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GATHERS THE MINESADJACENT VALUE
  function minesAdjacent(cell) {
    let mineValue = 0
    let currentCellIndex = getIndexOfCell(cell)
    const topLeft = gridStats.cells[currentCellIndex - gridStats.rows - 1]
    const top = gridStats.cells[currentCellIndex - gridStats.rows]
    const topRight = gridStats.cells[currentCellIndex - gridStats.rows + 1]
    const left = gridStats.cells[currentCellIndex - 1]
    const right = gridStats.cells[currentCellIndex + 1]
    const bottomLeft = gridStats.cells[currentCellIndex + gridStats.rows - 1]
    const bottom = gridStats.cells[currentCellIndex + gridStats.rows]
    const bottomRight = gridStats.cells[currentCellIndex + gridStats.rows + 1]
    if (!onTopRow(cell) && !onLeftColumn(cell) && topLeft.classList.contains('mine')) {
      mineValue ++
    } if (!onTopRow(cell) && top.classList.contains('mine')) {
      mineValue ++
    } if (!onTopRow(cell) && !onRightColumn(cell) && topRight.classList.contains('mine')) {
      mineValue ++
    } if (!onLeftColumn(cell) && left.classList.contains('mine')) {
      mineValue ++
    } if (!onRightColumn(cell) && right.classList.contains('mine')) {
      mineValue ++
    } if (!onBottomRow(cell) && !onLeftColumn(cell) && bottomLeft.classList.contains('mine')) {
      mineValue ++
    } if (!onBottomRow(cell) && bottom.classList.contains('mine')) {
      mineValue ++
    } if (!onBottomRow(cell) && !onRightColumn(cell) && bottomRight.classList.contains('mine')) {
      mineValue ++
    }
    return mineValue
  }
  function showValues(cell) {
    if (cell.target.dataset.value == 0) {
      cell.target.innerHTML = ''
    } if (cell.target.dataset.value > 0) {
      cell.target.innerHTML = cell.target.dataset.value
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ASSIGNS CELLS CLASSLIST VALUE USING MINES AJACENT()
  function assignMineValueToGrid(array) {
    array.forEach(element => {
      let valueToAssign = minesAdjacent(element)
      element.dataset.value = valueToAssign
    })
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - PULLS VALUE OF ADJACENT MINES
  function runShowValuesOnNextCells(cell) {
    let currentCellIndex = getIndexOfCell(cell)
    const topLeft = gridStats.cells[currentCellIndex - gridStats.rows - 1]
    const top = gridStats.cells[currentCellIndex - gridStats.rows]
    const topRight = gridStats.cells[currentCellIndex - gridStats.rows + 1]
    const left = gridStats.cells[currentCellIndex - 1]
    const right = gridStats.cells[currentCellIndex + 1]
    const bottomLeft = gridStats.cells[currentCellIndex + gridStats.rows - 1]
    const bottom = gridStats.cells[currentCellIndex + gridStats.rows]
    const bottomRight = gridStats.cells[currentCellIndex + gridStats.rows + 1]
    if (cell.dataset.value == 0){
      if (!onRightColumn(cell) && right.classList.contains('unclicked')) {
        right.classList.replace('unclicked', 'clicked')
        if (right.dataset.value == 0) {
          right.innerHTML = ''
          runShowValuesOnNextCells(right)
        } else {
          right.innerHTML = right.dataset.value
        }
      }
      if (!onLeftColumn(cell) && left.classList.contains('unclicked')) {
        left.classList.replace('unclicked', 'clicked')
        if (left.dataset.value == 0) {
          left.innerHTML = ''
          runShowValuesOnNextCells(left)
        } else {
          left.innerHTML = left.dataset.value
        }
      }
      if (!onTopRow(cell) && top.classList.contains('unclicked')) {
        top.classList.replace('unclicked', 'clicked')
        if (top.dataset.value == 0) {
          top.innerHTML = ''
          runShowValuesOnNextCells(top)
        } else {
          top.innerHTML = top.dataset.value
        }
      }
      if (!onBottomRow(cell) && bottom.classList.contains('unclicked')) {
        bottom.classList.replace('unclicked', 'clicked')
        if (bottom.dataset.value == 0) {
          bottom.innerHTML = ''
          runShowValuesOnNextCells(bottom)
        } else {
          bottom.innerHTML = bottom.dataset.value
        }
      }
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - BONUES / AUDIO / IMAGES
  let endgame = {
    audio: new Audio('./assets/noo.mov'),
    image: 'michael'
  }
  let millhouse = {
    audio: new Audio('./assets/dance.mp3'),
    image: 'millhouse'
  }
  let wrong = {
    audio: new Audio('./assets/wrong.mp3'),
    image: 'cross'
  }
  let theDude = {
    audio: new Audio('./assets/theDude.mp3'),
    image: 'theDude'
  }
  let murray = {
    audio: new Audio('./assets/murray.mov'),
    image: 'murray'
  }
  let duffman = {
    audio: new Audio('./assets/duffman.mov'),
    image: 'duffman'
  }
  let rum = {
    audio: new Audio('./assets/rum.mov'),
    image: 'rum'
  }
  let dayman = {
    audio: new Audio('./assets/dayman.mov'),
    image: 'charlie'
  } 
  let mclovin = {
    audio: new Audio('./assets/mclovin.mov'),
    image: 'mclovin'
  }
  let merry = {
    audio: new Audio('./assets/merry.mov'),
    image: 'merry'
  }
  let peep = {
    audio: new Audio('./assets/peep.mov'),
    image: 'mark'
  }
  let ronBurg = {
    audio: new Audio('./assets/ron.b.mov'),
    image: 'ronBurg'
  }
  let ronSwanson = {
    audio: new Audio('./assets/ronSwanson.mov'),
    image: 'ronSwanson'
  }
  let rumham = {
    audio: new Audio('./assets/rumham.mov'),
    image: 'rumham'
  }
  let wolf = {
    audio: new Audio('./assets/wolf.mov'),
    image: 'wolf' 
  }

  function playAudio(image, audio) {
    event.target.classList.add(image)
    audio.volume = 0.5
    audio.play()
  }

  let bonusArray = [
    [wolf.image, wolf.audio],
    [murray.image, murray.audio],
    [theDude.image, theDude.audio],
    [ronBurg.image, ronBurg.audio],
    [rumham.image, rumham.audio],
    [dayman.image, dayman.audio],
    [mclovin.image, mclovin.audio],
    [merry.image, merry.audio],
    [peep.image, peep.audio],
    [ronSwanson.image, ronSwanson.audio],
    [rum.image, rum.audio],
    [duffman.image, duffman.audio]
  ]

  let bonusIndex = 0
  let bonusSound = 0
  let bonusAudio = 1

  function playRandomBonus() {
    playAudio(bonusArray[bonusIndex][bonusSound],bonusArray[bonusIndex][bonusAudio])
    bonusIndex ++
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - MODALS
  let modal = document.getElementById('myModal')
  let modalmsg = document.getElementById('modalmsg')
  let btn = document.getElementById('myBtn')
  let span = document.getElementsByClassName('close')[0]
  let modalwindow = document.querySelector('.modal-content')

  function showBlock(string) {
    modal.style.display = 'block'
    modalmsg.innerHTML = `${string}`
  }
  span.onclick = function(event) {
    if (event.target == span) {
      modal.style.display = 'none'
    }
  }

}

window.addEventListener('DOMContentLoaded', init)
