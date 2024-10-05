import './styles.css';
import { player1, player2 } from './game';
import { displayBoard } from './ui';

// Get the game container element
const player1BoardContainer = document.getElementById('player1-board');
const player2BoardContainer = document.getElementById('player2-board');

displayBoard(
  player1.gameboard.getBoardState(),
  player1BoardContainer,
  player1.getTurn()
);
displayBoard(
  player2.gameboard.getBoardState(),
  player2BoardContainer,
  player2.getTurn()
);
