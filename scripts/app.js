// ISSUE / BUG BACKLOG!!!
// when mines are added, they can be added to the same cell. math.random function isn't adding an if statement so that if classList = 'mineHere' { don't add another mine / move to next cell and add mine there}
// Cells on left column, are picking up mines on the right column and vice versa (if cell % width = 0) 

// THINGS TO ADD!
// function so that when a safe cell is clicked, it randomly starts revealing safe cells next to it.
// Timer for the game
// 3 difficulties - Easy: width = 5*5 && timer = 2 mins || Medium: width = 10*10, timer = 1:30mins || Hard: width 15*15, timer 1min || Custom: width = x*y, timer = t, mines = n


function init() {

  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  let bonus = 0
  let score = 0
  let antiLeft = width * 1.5
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
  // ISSUE! Points are being double clicked   {once: true} . dosn't work
  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
    element.addEventListener('contextmenu', flagMine)
  })

  // ADDS RANDOM MINES TO THE GRID THAT ARE EQUAL TO THE WIDTHS NUMBER
  // ISSUE!!! mines are being assined to the same cell, make an if statement so that if classList === mine, dont add mine!
  function addMines(grid) {
    for (let i = 0; i < width; i++) {
      const cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
      console.log(cellToAddMine)
      cellToAddMine.classList.add('mineHere')
    }
  }
  addMines(cells)

  // HANDLES THE PLAYER CLICK
  // ISSUE! Points are being double clicked   {once: true} . dosn't work
  function playerClick(event) {
    console.log('click on this cell', event.target)
    if (event.target.classList == 'unclicked mineHere') {
      event.target.classList.add('mine')
      endGame()
    } if (event.target.classList == 'unclicked') {
      event.target.classList.add('beer')
      score += 100
      minesAdjacent(event)
      updateScore()
      console.log(score)
      // this.removeEventListener('click', playerClick)   --- this removes all clicks
      // event.target.removeEventListener('click', playerClick)   --- dosn't work?
    }
    if (event.target.classList == 'grid' || event.target.classList == 'unclicked beer') {
      return null
    }
  }

  // HANDLES RIGHT CLICK TO FLAG MINES OR SHOW INCORRECT FLAGS
  // ISSUE: Can keep reclicking on cell
  function flagMine(event) {
    if (antiLeft > 0) {
      if (event.target.classList == 'unclicked mineHere') {
        const bonusToPlay =  bonusActions[Math.floor(Math.random() * bonusActions.length)]
        bonusToPlay(event)
        bonus += 200
        updateBonus()
        antiLeft --
      } if (event.target.className == 'unclicked') {
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
      if (value.classList.contains('mineHere') || value.classList.contains('mineWasHere')) {
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
    antiLeft = width
    showAnti()
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
    updateScore()
  }

  // HANDLES RESET BUTTON EVENT CLICK
  document.querySelector('#reset').addEventListener('click', resetGame)

  // HANDLES UPDATING SCORE INNER HTML
  function updateScore() {
    let totalScore = score + bonus
    document.getElementById('score').innerHTML = `Score: ${totalScore}`
  }

  // HANDLES SHOWING HOW MANY MINES ARE NEXT TO PLAYER CLICK
  // ISSUE! Cells on left colum, are picking up mines on the right column and vice versa
  function minesAdjacent(event) {
    let minesAdjacent = 0
    const currentCellNum = event.target.id

    const right = Number(currentCellNum) + 1
    const bottomLeft = Number(currentCellNum) + width - 1
    const bottom = Number(currentCellNum) + width
    const bottomRight = Number(currentCellNum) + width + 1

    const left = Number(currentCellNum) - 1
    const topLeft = Number(currentCellNum) - width - 1
    const top = Number(currentCellNum) - width
    const topRight = Number(currentCellNum) - width + 1

    if (right < cellCount && cells[right].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottomLeft < cellCount && cells[bottomLeft].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottom < cellCount && cells[bottom].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottomRight < cellCount &&  cells[bottomRight].classList.contains('mineHere')) {
      minesAdjacent ++

    } if (left >= 0 && left <= cellCount &&  cells[left].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (topLeft >= 0 && topLeft <= cellCount &&  cells[topLeft].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (top >= 0 && top <= cellCount &&  cells[top].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (topRight >= 0 && topRight <= cellCount &&  cells[topRight].classList.contains('mineHere')) {
      minesAdjacent ++
    }
    event.target.innerHTML = minesAdjacent
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