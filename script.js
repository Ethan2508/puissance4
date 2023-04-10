const grid = document.querySelector('.grid');
const winMessage = document.getElementById('win-message');
const redScoreElem = document.getElementById('red-score');
const yellowScoreElem = document.getElementById('yellow-score');
const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let redScore = 0;
let yellowScore = 0;

function createGrid() {
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.id = i;
    grid.appendChild(cell);
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
}

function updateScores() {
  redScoreElem.textContent = `Joueur Rouge: ${redScore}`;
  yellowScoreElem.textContent = `Joueur Jaune: ${yellowScore}`;
  checkGameWinner();
}
  
  function checkGameWinner() {
    if (redScore === 3 || yellowScore === 3) {
      const gameWinner = redScore === 3 ? 'Rouge' : 'Jaune';
      setTimeout(() => {
        alert(`Le joueur ${gameWinner} remporte la partie !`);
        redScore = 0;
        yellowScore = 0;
        updateScores();
      }, 500);
    }
  }
  
  
  function resetGrid() {
    for (let i = 0; i < rows * cols; i++) {
      const cell = grid.children[i];
      cell.classList.remove('red');
      cell.classList.remove('yellow');
    }
  }

function isWinningMove(cell) {
  const id = parseInt(cell.dataset.id);
  const col = id % cols;
  const row = Math.floor(id / cols);

  const directions = [
    [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1],
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    for (let i = 1; i <= 3; i++) {
      const newRow = row + dy * i;
      const newCol = col + dx * i;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols
      ) {
        const newCell = grid.children[newRow * cols + newCol];
        if (newCell.classList.contains(currentPlayer)) {
          count++;
        } else {
          break;
        }
      }
    }
    if (count >= 4) {
      return true;
    }
  }
  return false;
}
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      for (let i = rows - 1; i >= 0; i--) {
        const id = i * cols + (e.target.dataset.id % cols);
        const cell = grid.children[id];
        if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
          cell.classList.add(currentPlayer);
          if (isWinningMove(cell)) {
            setTimeout(() => {
              winMessage.textContent = `${currentPlayer} a gagné !`;
              winMessage.classList.remove('hidden');
              if (currentPlayer === 'red') {
                redScore++;
              } else {
                yellowScore++;
              }
              updateScores();
              setTimeout(() => {
                resetGrid();
                winMessage.classList.add('hidden');
              }, 2000);
            }, 100);
          } else {
            changePlayer();
          }
          break;
        }
      }
    }
  });
  

createGrid();
