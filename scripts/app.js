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
  // let mines = 12
  let lives = 3
  const bonusActions = [playTheDude, playMurray, playDuffman, playRum]
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CREATE GRID
  // FUNCTION TO CREATE THE GRID
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
  function addMines(array) {
    for (let i = 0; i < gridStats.mines; i) {
      const cellToAddMine =  gridStats.cells[Math.floor(Math.random() * gridStats.cells.length)]
      console.log(cellToAddMine)
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
    console.log('clicked on this cell', event.target)
    console.log('mines ajacant', minesAdjacent(event.target))
    if (event.target.classList.contains('mine') && !event.target.classList.contains('flagged')) {
      event.target.classList.add('covid')
      window.alert('YOU HIT A COVID VIRUS!!!')
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
      const bonusToPlay =  bonusActions[Math.floor(Math.random() * bonusActions.length)]
      event.target.classList.add('flagged')
      bonusToPlay(event)
      gridStats.mines --
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.replace('unclicked', 'cross')
      playWrong()
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
    updateMinesFlagged()
    assignMineValueToGrid(gridStats.cells)
    handleStartTimer()
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
      console.log('the timer was alreading running')
      clearInterval(timerId)
      timerId = null
    } else {
      console.log('the timer wasnt running, so a new one has been started')
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
      window.alert('WELL DONE!!! The R rate is at 0 and you have ended the COVID pandemic!!!')
      grid.classList.add('millhouse')
      playMillhouse()
      gridCells.forEach(element => {
        element.removeEventListener('click', playerClick)
        element.removeEventListener('contextmenu', flagMine)
      })
      handleResetTimer()
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME OVER
  function endGame() {
    playEndgame()
    showAllMines(gridStats.cells)
    handleResetTimer()
    gridCells.forEach(element => {
      element.removeEventListener('click', playerClick)
      element.removeEventListener('contextmenu', flagMine)
    })
    
  }
  function showAllMines(array) {
    array.filter(value => {
      if (value.classList.contains('mine')) {
        value.classList.add('covid')
      }
    })
  }
  function outOfLives(lives) {
    if (lives === 0) {
      window.alert('You have no more Antibacterial Spray to clear the COVID CELLS!!!')
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
    console.log('assigMines ran')
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
  function playTheDude(event) {
    const theDudeAudio = new Audio('../assets/theDude.mp3')
    event.target.classList.add('theDude')
    theDudeAudio.volume = 0.2
    theDudeAudio.play()
  }
  function playMurray(event) {
    const murrayAudio = new Audio('../assets/murray.mp3')
    event.target.classList.add('murray')
    murrayAudio.volume = 0.2
    murrayAudio.play()
  }
  function playDuffman(event) {
    const duffmanAudio = new Audio('../assets/duffman.mp3')
    event.target.classList.add('duffman')
    duffmanAudio.volume = 0.2
    duffmanAudio.play()
  }
  function playRum(event) {
    const rumAudio = new Audio('../assets/rum.mp3')
    event.target.classList.add('rum')
    rumAudio.volume = 0.2
    rumAudio.play()
  }
  function playWrong() {
    const wrongAudio = new Audio('../assets/wrong.mp3')
    wrongAudio.volume = 0.2
    wrongAudio.play()
  }
  function playEndgame() {
    const endgameAudio = new Audio('../assets/endgame.mp3')
    endgameAudio.volume = 0.4
    endgameAudio.play()
  }
  function playMillhouse() {
    const millhouseAudio = new Audio('../assets/millhouse.mov')
    millhouseAudio.volume = 0.4
    millhouseAudio.play()
  } 
}
window.addEventListener('DOMContentLoaded', init)