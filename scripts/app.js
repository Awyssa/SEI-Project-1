function init() {

  const images = ['rum', 'murray', 'duffman', 'theDude', 'corbyn', 'boris']

  // * Variables
  const grid = document.querySelector('.grid')

  console.log(grid)
  
  const width = 10
  const cellCount = width * width
  const cells = []

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.id = i
    }
  }  
  createGrid()

  const addRandomImage = (event) => {
    console.log(event.target)
    event.target.classList.toggle(randomImage(images))
  }

  const randomImage = (array) => {
    image = array[Math.floor(Math.random() * array.length)]
    return image
  }

  grid.addEventListener('click', addRandomImage)



  
}




window.addEventListener('DOMContentLoaded', init)