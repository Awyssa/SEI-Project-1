// ISSUE / BUG BACKLOG!!!

// THINGS TO ADD!
// function so that when a safe cell is clicked, it randomly starts revealing safe cells next to it.
// Timer for the game
// 3 difficulties - Easy: width = 5*5 && timer = 2 mins || Medium: width = 10*10, timer = 1:30mins || Hard: width 15*15, timer 1min || Custom: width = x*y, timer = t, mines = n
// add a win function
// if a player console.logs they can see where the mines ares

function init() {
  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  let bonus = 0
  let score = 0
  let antiLeft = width + 3
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
    document.getElementById('anti').innerHTML = `Antibacterial Spray: ${antiLeft}`
  }
  showAnti()

  // ADDING EVENT LISTENERS
  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
    element.addEventListener('contextmenu', flagMine)
  })

  // ADDS RANDOM MINES TO THE GRID THAT ARE EQUAL TO THE WIDTHS NUMBER
  // ISSUE! mine being added to the same cell
  function addMines(grid) {
    for (let i = 0; i < width; i++) {
      let cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
      console.log(cellToAddMine)
      cellToAddMine.classList.replace('unclicked', 'mineHere')
      cellToAddMine.classList.add('mine')
    }
  }
  addMines(cells)

  // HANDLES THE PLAYER CLICK
  function playerClick(event) {
    console.log('click on this cell', event.target)
    if (event.target.classList.contains('mineHere')) {
      event.target.classList.add('mine')
      endGame()
    } if (event.target.classList.contains('unclicked')) {
      event.target.classList.remove('unclicked')
      score += 100
      updateScore()
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
  // --------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------------
  function showCell(cell) {
    cell.classList.remove('unclicked')
    showValues(cell)
    runShowValuesOnNextCells(cell.target)
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

  // HANDLES RIGHT CLICK TO FLAG MINES OR SHOW INCORRECT FLAGS
  function flagMine(event) {
    if (antiLeft > 0) {
      if (event.target.classList.contains('mineHere')) {
        const bonusToPlay =  bonusActions[Math.floor(Math.random() * bonusActions.length)]
        event.target.classList.replace('mineHere', 'flagged')
        bonusToPlay(event)
        bonus += 200
        updateBonus()
        antiLeft --
      } if (event.target.classList.contains('unclicked')) {
        event.target.classList.replace('unclicked', 'wrong')
        playWrong(event)
        antiLeft --
      }
    } if (antiLeft === 0) {
      window.alert('You are out of Antibacterial Spray!!!')
    }
    showAnti()
    updateScore()
  }
  // HANDLES ENDGAME FUNCTION
  function endGame() {
    playEndgame(event)
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
        value.classList.add('mine')
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
    score = 0
    bonus = 0
    antiLeft = width + 3
    showAnti()
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
    updateScore()
    assignMineValueToGrid(cells)
  }

  // HANDLES RESET BUTTON EVENT CLICK
  document.querySelector('#reset').addEventListener('click', resetGame)

  // HANDLES UPDATING SCORE INNER HTML
  function updateScore() {
    let totalScore = score + bonus
    document.getElementById('score').innerHTML = `Score: ${totalScore}`
  }
  // HANDLES UPDATING THE BONUS INNER HTML
  function updateBonus() {
    document.getElementById('bonus').innerHTML = `BONUS: ${bonus}`
  }

  // ALL BELOW ------------------------------------------------------------------------
  // BONUS AND INCORRECT FLAG SOUND AND IMAGE ADDS
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

  function playWrong(event) {
    const wrongAudio = new Audio('../assets/wrong.mp3')
    event.target.classList.add('cross')
    wrongAudio.volume = 0.2
    wrongAudio.play()
  }
  function playEndgame(event) {
    const endgameAudio = new Audio('../assets/endgame.mp3')
    endgameAudio.volume = 0.2
    endgameAudio.play()
  } 
}

window.addEventListener('DOMContentLoaded', init)