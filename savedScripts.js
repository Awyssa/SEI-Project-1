/* eslint-disable */

// HANDLES SHOWING HOW MANY MINES ARE NEXT TO PLAYER CLICK
function minesAdjacent(event) {
  let minesAdjacent = 0
  const currentCellNum = event.target.id

  const topRight = Number(currentCellNum) - width + 1
  const right = Number(currentCellNum) + 1
  const bottomRight = Number(currentCellNum) + width + 1

  const topLeft = Number(currentCellNum) - width - 1
  const left = Number(currentCellNum) - 1
  const bottomLeft = Number(currentCellNum) + width - 1

  const top = Number(currentCellNum) - width
  const bottom = Number(currentCellNum) + width

  // console.log('topright',topRight)
  // console.log('right', right)
  // console.log('BR', bottomRight)

  // console.log('topleft',topLeft)
  // console.log('left',left)
  // console.log('BL', bottomLeft)
  
  // console.log('top',top)
  // console.log('B', bottom)

  if (topRight >= 0 && currentCellNum % width !== width - 1 && cells[topRight].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('topRight triggered')
  } if (right < cellCount && currentCellNum % width !== width - 1 && cells[right].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('right tiggered')
  } if (bottomRight < cellCount && currentCellNum % width !== width - 1  && cells[bottomRight].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('bottomright tiggered')

  } if (topLeft >= 0 && currentCellNum % width !== 0 && cells[topLeft].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('topLeft tiggered')
  } if (left >= 0 && currentCellNum % width !== 0 && cells[left].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('left tiggered')
  } if (bottomLeft < cellCount &&  currentCellNum % width !== 0 && cells[bottomLeft].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('bottomleft tiggered')

  } if (top >= 0 && cells[top].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('top tiggered')
  } if (bottom < cellCount && cells[bottom].classList.contains('mineHere')) {
    minesAdjacent ++
    console.log('bottom tiggered')
  }

  event.target.innerHTML = minesAdjacent
  console.log(currentCellNum % width)
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ADDS RANDOM MINES TO THE GRID THAT ARE EQUAL TO THE WIDTHS NUMBER
function addMines(grid) {
  for (let i = 0; i < width; i) {
    let cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
    console.log(cellToAddMine)
    if (cellToAddMine.classList.contains('unclicked')) {
      cellToAddMine.classList.replace('unclicked', 'mineHere')
      i++
    }
  }
}
addMines(cells)

function addMines(grid) {
  for (let i = 0; i < mines; i++) {
    let cellToAddMine =  grid[Math.floor(Math.random() * grid.length)]
    if (cellTo)
    console.log(cellToAddMine)
    cellToAddMine.classList.replace('unclicked', 'mineHere')
  }
}
addMines(cells)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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



    if (topRight >= 0 && currentCellNum % width !== width - 1 && cells[topRight].classList.contains('unclicked')) {
      let topRightValue = minesAdjacent(cells[topRight])
      if (topRightValue === 0) {
        cells[topRight].classList.replace('unclicked', 'clicked')
        cells[topRight].innerHTML = ''
        runShowValuesOnNextCells(cells[topRight])
      }
    }
    
    if (bottomRight < cellCount && currentCellNum % width !== width - 1 && cells[bottomRight].classList.contains('unclicked')) {
      let bottomRightValue = minesAdjacent(cells[bottomRight])
      if (bottomRightValue === 0) {
        cells[bottomRight].classList.replace('unclicked', 'clicked')
        cells[bottomRight].innerHTML = ''
        runShowValuesOnNextCells(cells[bottomRight])
      }
    }

    if (topLeft >= 0 && currentCellNum % width !== 0 && cells[topLeft].classList.contains('unclicked')) {
      let topLeftValue = minesAdjacent(cells[topLeft])
      if (topLeftValue === 0) {
        cells[topLeft].classList.replace('unclicked', 'clicked')
        cells[topLeft].innerHTML = ''
        runShowValuesOnNextCells(cells[topLeft])
      }
    }

    if (bottomLeft < cellCount &&  currentCellNum % width !== 0 && cells[bottomLeft].classList.contains('unclicked')) {
      let bottomLeftValue = minesAdjacent(cells[bottomLeft])
      if (bottomLeftValue === 0) {
        cells[bottomLeft].classList.replace('unclicked', 'clicked')
        cells[bottomLeft].innerHTML = ''
        runShowValuesOnNextCells(cells[bottomLeft])
      }
    }
