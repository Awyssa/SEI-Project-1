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
    console.log('gridStats', gridStats)
    console.log('gridStats.cells', gridStats.cells)
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
    minesAdjacent(event.target)
    if (event.target.classList.contains('mine') && !event.target.classList.contains('flagged')) {
      event.target.classList.add('covid')
      endGame()
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.replace('unclicked', 'clicked')
      // updateScore()
      showValues(event)
      event.target.removeEventListener('click', playerClick)
      // if (event.target.dataset.value == 0) {
      //   runShowValuesOnNextCells(event.target)
      // }
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
      outOfLives(lives)
    }
    updateMinesFlagged()
    showAnti()
    gameWon(gridStats.mines)
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - UPDATES SCORE / LIVES / MINES
  function updateMinesFlagged() {
    document.getElementById('bonus').innerHTML = `COVID Viruses left: ${gridStats.mines}`
  }
  updateMinesFlagged()

  function showAnti() {
    document.getElementById('anti').innerHTML = `Free Antibacterial Spray: ${lives}`
  }
  showAnti()
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - START GAME

  createGrid()
  addMines(gridStats.cells)

  // document.querySelector('#grid').addEventListener('click', startGame)

  // function startGame() {
  //   document.querySelector('#grid').removeEventListener('click', startGame)
  //   document.querySelector('.grid').innerHTML = ''
  //   createGrid(grid)
  //   addMines(gridStats.cells)
  //   gridCells.forEach(element => {
  //     element.addEventListener('click', playerClick)
  //   })
  //   assignMineValueToGrid(gridStats.cells)
  // }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - RESET GAME

  document.querySelector('#reset').addEventListener('click', resetGame)

  function resetGame() {
    clearClasses(gridStats.cells)
    lives = 3
    gridStats.mines = 12
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
    addMines(gridStats.cells)
    showAnti()
    grid.classList.remove('millhouse')
    updateMinesFlagged()
    assignMineValueToGrid(gridStats.cells)
  }

  function clearClasses(grid) {
    grid.forEach((element) => {
      element.className = ''
      element.innerHTML = ''
      element.classList.add('unclicked')
    })
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME TIMER
  // const timer = document.getElementById('timer')

  // function startTimer() {
  //   time = setInterval(() => {
  //     time++
  //     timer.innerHTML = `Time: ${time}`
  //   }, 1000)
  //   console.log('timer ran')
  // }

  // function stopTimer() {
  //   clearInterval(gameTime)
  //   gameTime = null
  // }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME WON

  function gameWon() {
    if (gridStats.mines === 0) {
      window.alert('WELL DONE!!! The R rate is at 0 and you have ended the COVID pandemic!!!')
      grid.classList.add('millhouse')
      playMillhouse()
      gridCells.forEach(element => {
        element.removeEventListener('click', playerClick)
      })
    }
  }



  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GAME OVER
  function endGame() {
    playEndgame()
    showAllMines(gridStats.cells)
    gridCells.forEach(element => {
      element.removeEventListener('click', playerClick)
    })
    window.alert('YOU HIT A COVID VIRUS!!!')
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
      window.alert('You are out of spare Antibacterial Spray!!!')
      showAllMines(gridStats.cells)
      gridCells.forEach(element => {
        element.removeEventListener('click', playerClick)
      })
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CHECK FOR BORDER CELLS

  function getIndexOfCell(cell) {
    let index = gridStats.cells.indexOf(cell)
    return index
  }

  function onTopRow(cell) {
    return (getIndexOfCell(cell) < gridStats.rows ? true : false)
  }

  function onBottomRow(cell) {
    return (getIndexOfCell(cell) > cellCount - gridStats.rows ? true : false)
  }

  function onLeftColumn(cell) {
    return (getIndexOfCell(cell) % gridStats.columns == 0 ? true : false)
  }

  function onRightColumn(cell) {
    return (getIndexOfCell(cell) % gridStats.columns == gridStats.columns - 1 ? true : false)
  }



  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - GATHERS THE MINESADJACENT VALUE
  function minesAdjacent(cell) {

    let minesAdjacent = 0

    let currentCellIndex = getIndexOfCell(cell)

    console.log('on left col?', onRightColumn(cell))

    // console.log('the cell is', cell)
    // console.log('the currentcellindex is', currentCellIndex)

    // const topRight = gridStats.cells[currentCellIndex - gridStats.columns + 1]
    // const right = Number(currentCellNum) + 1
    // const bottomRight = Number(currentCellNum) + width + 1
    // const topLeft = Number(currentCellNum) - width - 1
    // const left = Number(currentCellNum) - 1
    // const bottomLeft = Number(currentCellNum) + width - 1
    // const top = Number(currentCellNum) - width
    // const bottom = Number(currentCellNum) + width

    // console.log('topright', topRight)

    // console.log('right', right)
    // console.log('BR', bottomRight)

    // console.log('topleft',topLeft)
    // console.log('left',left)
    // console.log('BL', bottomLeft)
    
    // console.log('top',top)
    // console.log('B', bottom)
    
    // if (topRight >= 0 && currentCellNum % width !== width - 1 && cells[topRight].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (right < cellCount && currentCellNum % width !== width - 1 && cells[right].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (bottomRight < cellCount && currentCellNum % width !== width - 1  && cells[bottomRight].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (topLeft >= 0 && currentCellNum % width !== 0 && cells[topLeft].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (left >= 0 && currentCellNum % width !== 0 && cells[left].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (bottomLeft < cellCount &&  currentCellNum % width !== 0 && cells[bottomLeft].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (top >= 0 && cells[top].classList.contains('mine')) {
    //   minesAdjacent ++
    // } if (bottom < cellCount && cells[bottom].classList.contains('mine')) {
    //   minesAdjacent ++
    // }
    return minesAdjacent
  }



  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SHOWS VALUE ON CLICK
  function showValues(cell) {
    if (cell.target.dataset.value == 0) {
      cell.target.innerHTML = ''
    } if (cell.target.dataset.value > 0) {
      cell.target.innerHTML = cell.target.dataset.value
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ASSIGNS CELLS CLASSLIST VALUE USING MINES AJACENT()
  
  // function assignMineValueToGrid(array) {
  //   array.forEach(element => {
  //     let valueToAssign = minesAdjacent(element)
  //     element.dataset.value = valueToAssign
  //   })
  //   console.log('assigMines ran')
  // }


  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - PULLS VALUE OF ADJACENT MINES
  // function runShowValuesOnNextCells(cell) {
  //   const currentCellNum = cell.id
  //   const topRight = Number(currentCellNum) - width + 1
  //   const right = Number(currentCellNum) + 1
  //   const bottomRight = Number(currentCellNum) + width + 1
  //   const topLeft = Number(currentCellNum) - width - 1
  //   const left = Number(currentCellNum) - 1
  //   const bottomLeft = Number(currentCellNum) + width - 1
  //   const top = Number(currentCellNum) - width
  //   const bottom = Number(currentCellNum) + width

  //   if (right < cellCount && currentCellNum % width !== width - 1 && cells[right].classList.contains('unclicked')) {
  //     let rightValue = minesAdjacent(cells[right])
  //     if (rightValue === 0) {
  //       cells[right].classList.replace('unclicked', 'clicked')
  //       cells[right].innerHTML = ''
  //       runShowValuesOnNextCells(cells[right])
  //     }
  //   }
  //   if (left >= 0 && currentCellNum % width !== 0 && cells[left].classList.contains('unclicked')) {
  //     let leftValue = minesAdjacent(cells[left])
  //     if (leftValue === 0) {
  //       cells[left].classList.replace('unclicked', 'clicked')
  //       cells[left].innerHTML = ''
  //       runShowValuesOnNextCells(cells[left])
  //     }
  //   }
  //   if (top >= 0 && cells[top].classList.contains('unclicked')) {
  //     let topValue = minesAdjacent(cells[top])
  //     if (topValue === 0) {
  //       cells[top].classList.replace('unclicked', 'clicked')
  //       cells[top].innerHTML = ''
  //       runShowValuesOnNextCells(cells[top])
  //     }
  //   }

  //   if (bottom < cellCount && cells[bottom].classList.contains('unclicked')) {
  //     let bottomValue = minesAdjacent(cells[bottom])
  //     if (bottomValue === 0) {
  //       cells[bottom].classList.replace('unclicked', 'clicked')
  //       cells[bottom].innerHTML = ''
  //       runShowValuesOnNextCells(cells[bottom])
  //     }
  //   }
  // }

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