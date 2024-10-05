function displayBoard(boardState, container, turn) {
  const cells = container.children;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = cells[i * 10 + j];
      const shipName = boardState[i][j];
      if (turn) {
        if (shipName) {
          switch (shipName) {
            case 'Carrier':
              cell.classList.add('bg-black');
              break;
            case 'Battleship':
              cell.classList.add('bg-red-600');
              break;
            case 'Destroyer':
              cell.classList.add('bg-orange-500');
              break;
            case 'Submarine':
              cell.classList.add('bg-blue-500');
              break;
            default:
              cell.classList.add('bg-violet-500');
              break;
          }
        } else {
          cell.classList.add('bg-gray-200');
        }
      } else {
        cell.classList.add('bg-gray-200');
      }
    }
  }
}

module.exports = {
  displayBoard,
};
