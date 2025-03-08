function displayBoard(boardState, container, turn, opponent) {
  const cells = container.children;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = cells[i * 10 + j];
      const shipName = boardState[i][j];
      if (turn) {
        if (shipName) {
          switch (shipName) {
            case 'Carrier':
              cell.classList.add('!bg-black');
              break;
            case 'Battleship':
              cell.classList.add('!bg-red-600');
              break;
            case 'Destroyer':
              cell.classList.add('!bg-orange-500');
              break;
            case 'Submarine':
              cell.classList.add('!bg-green-500');
              break;
            case 'Patrol Boat':
              cell.classList.add('!bg-violet-500');
              break;
          }
        } else {
          cell.classList.add('!bg-gray-200');
        }
      } else {
        cell.classList.add('!bg-gray-200');
      }
    }
  }
}
function welcome_setup(player) {
  const game_container = document.getElementById('game-container');
  const game_setup_container = document.getElementById('game-setup');
  const startBtn = document.getElementById('startBtn');
  const player1container = document.getElementById('player1-board');
  const player2container = document.getElementById('player2-board');

  startBtn.addEventListener('click', () => {
    alert(`${player.name} is your turn Are you ready ?`);
    game_setup_container.classList.add('hidden');
    player1container.classList.remove('hidden');
    player2container.classList.remove('hidden');
  });
}

module.exports = {
  displayBoard,
  welcome_setup,
};
