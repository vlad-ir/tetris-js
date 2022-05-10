import { SIZE_BLOCK, COLUMNS, ROWS } from "./index.js";

export class View {
  constructor(container) {
    this.container = container
    
    this.preview()
  }

  // отрисовка
  colors = {
    J: 'FireBrick',
    I: 'CadetBlue',
    O: 'Gold',
    L: 'SlateBlue',
    2: 'RoyalBlue',
    T: 'Indigo',
    S: 'MediumSeaGreen'
}

  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d");

  preview() {
    this.container.textContent = ''
    const preview = document.createElement('h3')
    preview.innerHTML = 'Press <span>Enter</span> to start game'
    this.container.append(preview)
    preview.style.cssText = `
    border: 3px solid black;
    text-align: center;
    padding: 30px;
    grid-column: 1/3;
    `
  }
  
  init() {
    this.container.textContent = ''
    this.canvas.style.gridArea = 'game'
    this.canvas.classList.add("game-area");
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }



  
  createBlockScore() {
    const scoreBlock = document.createElement('div')
    scoreBlock.style.cssText = `
    border: 2px solid black;
    font-size: 18px;
    padding: 20px;
    grid-area: score;
    `
    const linesElem = document.createElement('p')
    const scoreElem = document.createElement('p')
    const levelElem = document.createElement('p')
    const recordElem = document.createElement('p')

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem)
    this.container.append(scoreBlock)

    return (lines, score, level, record) => {
      linesElem.textContent = `Lines: ${lines}`
      scoreElem.textContent = `Score: ${score}`
      levelElem.textContent = `Level: ${level}`
      recordElem.textContent = `Record: ${record}`
    }
  }
  



  createBlockNextTetromino() {
    const tetrominoBlock = document.createElement('div')
    tetrominoBlock.style.cssText = `
    width: ${SIZE_BLOCK*4}px;
    height: ${SIZE_BLOCK*4}px;
    border: 2px solid black;
    padding: 10px;
    grid-area: next;
    display: flex;
    align-items: center;
    justify-content: center;
    `
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d");

    tetrominoBlock.append(canvas)
    this.container.append(tetrominoBlock)

    return (tetromino) => {
      canvas.width = SIZE_BLOCK * tetromino.length
      canvas.height = SIZE_BLOCK * tetromino.length
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < tetromino.length; y++) {
        const line = tetromino[y];
        for (let x = 0; x < line.length; x++) {
          const block = line[x];
    
          if (block !== "o") {
            context.fillStyle = this.colors[block];
            context.strokeStyle = "white";
            context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          }
        }
      }
    }
}


showArea = (area) => {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for (let y = 0; y < area.length; y++) {
    const line = area[y];
    for (let x = 0; x < line.length; x++) {
      const block = line[x];

      if (block !== "o") {
        this.context.fillStyle = this.colors[block];
        this.context.strokeStyle = "white";
        this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
      }
    }
  }
};
}