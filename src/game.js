import Player from './Player';
import Ship from './Ship';

// Initialize players
export const player1 = new Player('Player1', 'real');
export const player2 = new Player('Player2', 'real');

const isPlayer1Turn = Math.random() < 0.5;
player1.setTurn(isPlayer1Turn);
player2.setTurn(!isPlayer1Turn);

// Define ship types and sizes
const shipTypes = [
  { name: 'Carrier', size: 5 },
  { name: 'Battleship', size: 4 },
  { name: 'Destroyer', size: 3 },
  { name: 'Submarine', size: 3 },
  { name: 'Patrol Boat', size: 2 },
];

const ships = shipTypes.map((type) => new Ship(type.size, type.name));

// set ship positions
function setShipPositions(player, ships) {
  let placedShips = 0;
  const ship = ships[placedShips];
  while (placedShips < ships.length) {
    let x, y, orientation;
    x = Math.floor(Math.random() * (10 - ships[placedShips].length + 1));
    y = Math.floor(Math.random() * 10);
    orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    try {
      player.gameboard.placeShip(ships[placedShips], x, y, orientation);
      placedShips++;
    } catch (error) {
      console.warn(`Retrying to place the ${ship.name}`);
    }
  }
}

// Set positions for player 1
setShipPositions(player1, ships);

// Set positions for player 2
setShipPositions(player2, ships);
