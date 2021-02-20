function init() {



  // * Variables
  const grid = document.querySelector('.grid')
  const gridCells = document.querySelectorAll('.grid')

  console.log('gridcells', gridCells)

  console.log('grid', grid)
  
  const width = 10
  const cellCount = width * width
  const cells = []

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.id = i
      // make an array for the mines? 
    }
  }  
  createGrid()

  // Addmine function.
  // The width is going to equal the amount of mines in the game 
  // the function will take the width, and add that amount of mines 
  // Using a for loop, add width amount of mines randomly among the cells 
  // as the i ===  width, loop that many times adding mines to the grid.
  // !!! NOT FOR NOW!!! Just leave it empty! LATER = for every other cell add a beer
  //

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
    }
  }

  gridCells.forEach(element => {
    element.addEventListener('click', playerClick)
  })

  function endGame() {
    window.alert('YOU HIT A COVID VIRUS!!!')
    showAllMines(gridCells)
  }

  function showAllMines() {
    gridCells.forEach((cell) => {
      console.log('show mines', gridCells.classList('mineHere'))
    })
  }

  // function showAllMines() {
  //   gridCells.forEach((cell) => {
  //     cell.classList == 'mineHere'
  //     cell.classList.add('mine')
  //   })
  // }

}


// for each grid item, add 10 random mines. Once complete ELSE add beer
// add a class of mine. and when the player clicks on the square with the mine class. ADD mine image and endGame()

window.addEventListener('DOMContentLoaded', init)





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