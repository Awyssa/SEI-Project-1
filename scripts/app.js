function init() {

  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []
  let score = 0
  masksLeft = width

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

  // function addBonus(grid) {
  //   for (i = 0; i < width; i++) {
  //     if (grid.classList != 'mineHere') {
  //       let cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
  //       console.log(addBonus)
  //       cellToAddMine.classList.add('theDude')
  //     }
  //   }
  // }
  // addBonus(cells)

  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
    element.addEventListener('contextmenu', flagMine)
  })

  function playerClick(event) {
    console.log('click on this cell', event.target)
    if (event.target.classList == 'mineHere') {
      event.target.classList.add('mine')
      endGame()
    } if (event.target.classList == '') {
      event.target.classList.add('beer')
      score += 100
      updateScore(score)
      howManyMines(event)
    }
    if (event.target.classList == 'grid') {
    } 
  }

  function flagMine(event) {
    console.log('right mouse clicked')
    if (masksLeft > 0) {
      masksLeft --
      window.alert(`You have ${masksLeft} masks left!`)
      event.target.classList.add('mask')
      event.target.classList.add('mineWasHere')
      if (event.target.classList.contains('mineHere')) {
        event.target.classList.remove('mineHere')
      }
    } else {
      window.alert('You are out of masks!')
    }
  }

  function endGame() {
    window.alert('YOU HIT A COVID VIRUS!!!')
    showAllMines(cells)
    gridCells.forEach(element => {
      element.removeEventListener('click', playerClick)
    })
  }

  function showAllMines(array) {
    array.filter(value => {
      if (value.classList.contains('mineHere') || value.classList.contains('mineWasHere')) {
        value.classList.add('mine')
      }
    })
  }

  function clearClasses(grid) {
    grid.forEach((element) => {
      element.className = ''
      element.innerHTML = ''
    })
  }

  function resetGame() {
    clearClasses(cells)
    addMines(cells)
    score = 0
    gridCells.forEach(element => {
      element.addEventListener('click', playerClick)
    })
    updateScore(score)
  }

  document.querySelector('#reset').addEventListener('click', resetGame)

  function updateScore(points) {
    document.getElementById('score').innerHTML = `Score: ${score}`
  }

  function howManyMines(event) {
    let minesAdjacent = 0
    let currentCellNum = event.target.id

    let right = Number(currentCellNum) + 1
    let bottomLeft = Number(currentCellNum) + width - 1
    let bottom = Number(currentCellNum) + width
    let bottomRight = Number(currentCellNum) + width + 1
    let left = Number(currentCellNum) - 1
    let topLeft = Number(currentCellNum) - width - 1
    let top = Number(currentCellNum) - width
    let topRight = Number(currentCellNum) - width + 1

    if (right >= 0 && right < cellCount && cells[right].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottomLeft >= 0 && bottomLeft < cellCount && cells[bottomLeft].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottom >= 0 && bottom < cellCount && cells[bottom].classList.contains('mineHere')) {
      minesAdjacent ++
    } if (bottomRight >= 0 && bottomRight < cellCount &&  cells[bottomRight].classList.contains('mineHere')) {
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