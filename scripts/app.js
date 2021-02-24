function init() {
  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')
  const width = 10
  const cellCount = width * width
  let mines = 2
  const cells = []
  let minesFlagged = 0
  let lives = 3
  const bonusActions = [playTheDude, playMurray, playDuffman, playRum]

  // FUNCTION TO CREATE THE GRID
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.id = i
      cell.classList.add('unclicked')
    }
  }  
  createGrid()

  // UPDATES AND ANTI SPRAY INNER HTML
  function showAnti() {
    document.getElementById('anti').innerHTML = `Free Antibacterial Spray: ${lives}`
  }
  showAnti()

  // ADDING EVENT LISTENERS
  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
    element.addEventListener('contextmenu', flagMine)
  })

  // ADDS RANDOM MINES TO THE GRID THAT ARE EQUAL TO THE WIDTHS NUMBER
  function addMines(grid) {
    for (let i = 0; i < mines; i) {
      let cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
      console.log(cellToAddMine)
      if (cellToAddMine.classList.contains('unclicked')) {
        cellToAddMine.classList.replace('unclicked', 'mineHere')
        i++
      }
    }
  }
  addMines(cells)

  // HANDLES THE PLAYER CLICK
  function playerClick(event) {
    console.log('click on this cell', event.target)
    if (event.target.classList.contains('mineHere')) {
      event.target.classList.add('covid')
      endGame()
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.remove('unclicked')
      // updateScore()
      showValues(event)
      runShowValuesOnNextCells(event.target)
    }
  }
  // ------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------
  function runShowValuesOnNextCells(cell) {

    const currentCellNum = cell.id
    const topRight = Number(currentCellNum) - width + 1
    const right = Number(currentCellNum) + 1
    const bottomRight = Number(currentCellNum) + width + 1
    const topLeft = Number(currentCellNum) - width - 1
    const left = Number(currentCellNum) - 1
    const bottomLeft = Number(currentCellNum) + width - 1
    const top = Number(currentCellNum) - width
    const bottom = Number(currentCellNum) + width

    if (topRight >= 0 && currentCellNum % width !== width - 1 && cells[right].classList.contains('unclicked') && !cells[topRight].classList.contains('mineHere')) {
      let topRightValue = minesAdjacent(cells[topRight])
      if (topRightValue === 0) {
        cells[topRight].classList.replace('unclicked', 'valueAssinged')
        cells[topRight].innerHTML = topRightValue
        // runShowValuesOnNextCells(topRight)
        // console.log('run show values on TOP RIGHT ran', runShowValuesOnNextCells(topRight))
      }
    }
    if (right < cellCount && currentCellNum % width !== width - 1 && cells[right].classList.contains('unclicked') && !cells[right].classList.contains('mineHere')) {
      let rightValue = minesAdjacent(cells[right])
      if (rightValue === 0) {
        cells[right].classList.replace('unclicked', 'valueAssinged')
        cells[right].innerHTML = rightValue
        // runShowValuesOnNextCells(right)
        // console.log('run show values on RIGHT ran', runShowValuesOnNextCells(topRight))
      }
    }
    if (bottomRight < cellCount && currentCellNum % width !== width - 1 && cells[bottomRight].classList.contains('unclicked') && !cells[bottomRight].classList.contains('mineHere')) {
      let bottomRightValue = minesAdjacent(cells[bottomRight])
      if (bottomRightValue === 0) {
        cells[bottomRight].classList.replace('unclicked', 'valueAssinged')
        cells[bottomRight].innerHTML = bottomRightValue
        // runShowValuesOnNextCells(bottomRight)
        // console.log('run show values on BOTTOM RIGHT ran', runShowValuesOnNextCells(topRight))
      }
    }

    if (topLeft >= 0 && currentCellNum % width !== 0 && cells[topLeft].classList.contains('unclicked') && !cells[topLeft].classList.contains('mineHere')) {
      let topLeftValue = minesAdjacent(cells[topLeft])
      if (topLeftValue === 0) {
        cells[topLeft].classList.replace('unclicked', 'valueAssinged')
        cells[topLeft].innerHTML = topLeftValue
        // runShowValuesOnNextCells(topLeft)
      }
    }

    if (left >= 0 && currentCellNum % width !== 0 && cells[left].classList.contains('unclicked') && !cells[left].classList.contains('mineHere')) {
      let leftValue = minesAdjacent(cells[left])
      if (leftValue === 0) {
        cells[left].classList.replace('unclicked', 'valueAssinged')
        cells[left].innerHTML = leftValue
        // runShowValuesOnNextCells(left)
      }
    }
    if (bottomLeft < cellCount &&  currentCellNum % width !== 0 && cells[bottomLeft].classList.contains('unclicked') && !cells[bottomLeft].classList.contains('mineHere')) {
      let bottomLeftValue = minesAdjacent(cells[bottomLeft])
      if (bottomLeftValue === 0) {
        cells[bottomLeft].classList.replace('unclicked', 'valueAssinged')
        cells[bottomLeft].innerHTML = bottomLeftValue
        // runShowValuesOnNextCells(bottomLeft)
      }
    }
    if (top >= 0 && cells[top].classList.contains('unclicked') && !cells[top].classList.contains('mineHere')) {
      let topValue = minesAdjacent(cells[top])
      if (topValue === 0) {
        cells[top].classList.replace('unclicked', 'valueAssinged')
        cells[top].innerHTML = topValue
        // runShowValuesOnNextCells(top)
      }
    }
    if (bottom < cellCount && cells[bottom].classList.contains('unclicked') && !cells[bottom].classList.contains('mineHere')) {
      let bottomValue = minesAdjacent(cells[bottom])
      if (bottomValue === 0) {
        cells[bottom].classList.replace('unclicked', 'valueAssinged')
        cells[bottom].innerHTML = bottomValue
        // runShowValuesOnNextCells(bottom)
      }
    }
  }

  // HANDLES ASSIGNING THE CELLS THE MINE ADJACENT VALUE
  function assignMineValueToGrid(array) {
    array.forEach(element => {
      let valueToAssign = minesAdjacent(element)
      element.classList.add(valueToAssign)
    })
  }
  assignMineValueToGrid(cells)

  function showValues(cell) {
    cell.target.innerHTML = cell.target.classList
  }

  // HANDLES COLLECTING NUMBER OF MINES ADJACENT TO THE CURRENT CELL
  function minesAdjacent(currentCell) {
    let minesAdjacent = 0
    const currentCellNum = currentCell.id
    const topRight = Number(currentCellNum) - width + 1
    const right = Number(currentCellNum) + 1
    const bottomRight = Number(currentCellNum) + width + 1
    const topLeft = Number(currentCellNum) - width - 1
    const left = Number(currentCellNum) - 1
    const bottomLeft = Number(currentCellNum) + width - 1
    const top = Number(currentCellNum) - width
    const bottom = Number(currentCellNum) + width
    
    if (topRight >= 0 && currentCellNum % width !== width - 1 && cells[topRight].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (right < cellCount && currentCellNum % width !== width - 1 && cells[right].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottomRight < cellCount && currentCellNum % width !== width - 1  && cells[bottomRight].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (topLeft >= 0 && currentCellNum % width !== 0 && cells[topLeft].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (left >= 0 && currentCellNum % width !== 0 && cells[left].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottomLeft < cellCount &&  currentCellNum % width !== 0 && cells[bottomLeft].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (top >= 0 && cells[top].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottom < cellCount && cells[bottom].classList.contains('mineHere')) {
      minesAdjacent ++
    }
    return minesAdjacent
  }

  function outOfLives(lives) {
    if (lives === 0) {
      window.alert('You are out of spare Antibacterial Spray!!!')
      showAllMines(cells)
      gridCells.forEach(element => {
        element.removeEventListener('click', playerClick)
      })
    }
  }

  // HANDLES RIGHT CLICK TO FLAG MINES OR SHOW INCORRECT FLAGS
  function flagMine(event) {
    if (event.target.classList.contains('mineHere')) {
      const bonusToPlay =  bonusActions[Math.floor(Math.random() * bonusActions.length)]
      event.target.classList.replace('mineHere', 'flagged')
      bonusToPlay(event)
      minesFlagged ++
      mines --
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.replace('unclicked', 'cross')
      playWrong()
      lives --
      outOfLives(lives)
    }
    updateMinesFlagged()
    showAnti()
    gameWon(mines)
  }

  // HANDLES ENDGAME FUNCTION
  function endGame() {
    playEndgame()
    showAllMines(cells)
    gridCells.forEach(element => {
      element.removeEventListener('click', playerClick)
    })
    window.alert('YOU HIT A COVID VIRUS!!!')
  }

  // HANDLES SHOWING ALL MINES ON ENDGAME
  function showAllMines(array) {
    array.filter(value => {
      if (value.classList.contains('mineHere')) {
        value.classList.add('covid')
      }
    })
  }

  // HANDLES CLEARING CLASSES ON ENDGAME
  function clearClasses(grid) {
    grid.forEach((element) => {
      element.className = ''
      element.innerHTML = ''
      element.classList.add('unclicked')
    })
  }

  // HANDLES RESET BUTTON 
  function resetGame() {
    clearClasses(cells)
    addMines(cells)
    mines = 2
    minesFlagged = 0
    lives = 3
    showAnti()
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
    updateMinesFlagged()
    assignMineValueToGrid(cells)
  }

  // HANDLES RESET BUTTON EVENT CLICK
  document.querySelector('#reset').addEventListener('click', resetGame)

  // HANDLES UPDATING THE BONUS INNER HTML
  // make it so that ${mines} is static for updateMinesFlagged()
  function updateMinesFlagged() {
    document.getElementById('bonus').innerHTML = `Beveraginos collected: ${minesFlagged} / COVID Viruses left: ${mines}`
  }
  updateMinesFlagged()

  // HANDLES GAME WON
  function gameWon(mines) {
    if (mines === 0) {
      console.log('endgame ran')
      window.alert('WELL DONE!!! The R rate is at 0 and you have ended the COVID pandemic!!!')
      grid.classList.add('millhouse')
      playMillhouse()
    }
  }

  // BONUS FUNCTIONS
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
    const endgameAudio = new Audio('../assets/doh.mp3')
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