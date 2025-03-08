import './styles.css';
import { player1, player2 } from './game';
import { displayBoard, welcome_setup } from './ui';

// Get the game container element
const player1BoardContainer = document.getElementById('player1-board');
const player2BoardContainer = document.getElementById('player2-board');

const currentPlayer = player1.getTurn() ? player1 : player2;
const opponent = player1.getTurn() ? player2 : player1;
const boardContainer = player1.getTurn()
  ? player1BoardContainer
  : player2BoardContainer;

displayBoard(
  currentPlayer.gameboard.getBoardState(),
  boardContainer,
  currentPlayer.getTurn(),
  opponent
);

welcome_setup(currentPlayer);
