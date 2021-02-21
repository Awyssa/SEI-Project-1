function init() {

  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  let score = 100

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.id = i
    }
  }  
  createGrid()
 
  // ISSUEE!!! mines are being assined to the same cell, make an if statement so that if classList === mine, dont add mine!
  function addMines(grid) {
    for (i = 0; i < width; i++) {
      let cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
      console.log(cellToAddMine)
      cellToAddMine.classList.add('mineHere')
    }
  }
  addMines(cells)

  function playerClick(event) {
    console.log('click on this cell', event.target)
    if (event.target.classList == 'mineHere') {
      event.target.classList.add('mine')
      console.log('mine is here')
      endGame()
    } if (event.target.classList == 'grid') {
    } else {
      event.target.classList.add('beer')
    }
  }

  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
  })

  function endGame() {
    window.alert('YOU HIT A COVID VIRUS!!!')
    showAllMines(cells)
    gridCells.forEach(element => {
      element.removeEventListener('click', playerClick)
    })
  }

  function showAllMines(array) {
    array.filter(value => {
      if (value.classList.contains('mineHere') ) {
        value.classList.add('mine')
      }
    })
  }

  function clearMines(grid) {
    grid.forEach((element) => {
      element.classList.remove('mine')
      element.classList.remove('mineHere')
      element.classList.remove('beer')
    })
  }

  // resetGame = clear current mines, add new mines, clear score, clear bonus, add new bonus
  function resetGame(event) {
    clearMines(cells)
    addMines(cells)
    console.log(cells)
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
  }

  document.querySelector('#reset').addEventListener('click', resetGame)

  function addScore(score) {
    document.getElementById('score').innerHTML = `score: ${score}`
  }

}

window.addEventListener('DOMContentLoaded', init)

// function showAllMines() {             --- Using the grid as opposed to the cells.
//   console.log('show all mine ran')
//   gridCells.forEach((element) => {
//     let mines = element.classList.contains('mineHere')
//     element.classList.add('mine')
//     console.log(cells)
//   })
// }

// for each grid item, add 10 random mines. Once complete ELSE add beer
// add a class of mine. and when the player clicks on the square with the mine class. ADD mine image and endGame()

// redundant code 

// const addRandomImage = (event) => {
//   console.log(event.target)
//   event.target.classList.toggle(randomImage(images))
// }

// const randomImage = (array) => {
//   image = array[Math.floor(Math.random() * array.length)]
//   return image
// }

// grid.addEventListener('click', addRandomImage)

// function showAllMines() {
//   gridCells.forEach((cell) => {
//     cell.classList == 'mineHere'
//     cell.classList.add('mine')
//   })

// function showAllMines(array) {
//   for (let i = 0; i <= cells.length; i++) {
//     if (cells.classList == 'mineHere') {
//       cells.classList.add('mine')
//       console.log()
//     }
//   }
// }