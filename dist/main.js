/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module) => {

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = [];
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  }
  placeShip(ship, x, y, orientation) {
    ship.setPosition(x, y, orientation);

    if (orientation === 'horizontal') {
      if (x + ship.length > 10) {
        throw new Error(
          'Ship cannot be placed here, position is out of bounds'
        );
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.board[y][x + i] !== null) {
          throw new Error('Ship cannot be placed here, position is occupied');
        }
      }
    } else {
      if (y + ship.length > 10) {
        throw new Error(
          'Ship cannot be placed here, position is out of bounds'
        );
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.board[y + i] && this.board[y + i][x] !== null) {
          throw new Error('Ship cannot be placed here, position is occupied');
        }
      }
    }

    this.ships.push(ship);

    if (orientation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.board[y][x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[y + i][x] = ship;
      }
    }
  }
  receiveAttack(x, y) {
    const shipAffected = this.ships.find((ship) => {
      const occupiedCells = ship.getOccupiedCells();
      return occupiedCells.some(([cellX, cellY]) => cellX === x && cellY === y);
    });
    if (shipAffected) {
      shipAffected.hit();
      return true;
    } else {
      this.missedShots.push({ x, y });
      return false;
    }
  }
  shipsSunk() {
    return this.ships.every((ship) => ship.hits >= ship.length);
  }
  getBoardState() {
    return this.board.map((row) =>
      row.map((ship) => (ship ? ship.name : null))
    );
  }
}

module.exports = Gameboard;


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gameboard = __webpack_require__(/*! ./Gameboard */ "./src/Gameboard.js");

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
    this._turn = false;
  }
  setTurn(turn) {
    this._turn = turn;
  }
  getTurn() {
    return this._turn;
  }
  play() {
    this.setTurn(!this.getTurn());
  }
  attack(opponent, x, y) {
    if (this.getTurn()) {
      const hit = opponent.gameboard.receiveAttack(x, y);
      this.play();
      opponent.play();
      return { status: 'success', message: hit };
    }
    return { status: 'error', message: false };
  }
}

module.exports = Player;


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((module) => {

class Ship {
  constructor(length, name) {
    if (typeof length !== 'number' || length <= 0) {
      throw new Error('Length must be a positive number');
    }
    this.length = length;
    this.hits = 0;
    this.position = null;
    this.orientation = null;
    this.name = name;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.hits >= this.length;
  }
  setPosition(x, y, orientation) {
    this.position = [x, y];
    this.orientation = orientation;
  }
  getOccupiedCells() {
    const cells = [];
    const [x, y] = this.position;

    for (let i = 0; i < this.length; i++) {
      if (this.orientation === 'horizontal') {
        cells.push([x + i, y]);
      } else {
        cells.push([x, y + i]);
      }
    }

    return cells;
  }
}

module.exports = Ship;


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   player1: () => (/* binding */ player1),
/* harmony export */   player2: () => (/* binding */ player2)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ "./src/Ship.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Ship__WEBPACK_IMPORTED_MODULE_1__);



// Initialize players
const player1 = new (_Player__WEBPACK_IMPORTED_MODULE_0___default())('Player1', 'real');
const player2 = new (_Player__WEBPACK_IMPORTED_MODULE_0___default())('Player2', 'real');

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

const ships = shipTypes.map((type) => new (_Ship__WEBPACK_IMPORTED_MODULE_1___default())(type.size, type.name));

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


/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((module) => {

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ "./src/ui.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ui__WEBPACK_IMPORTED_MODULE_2__);




// Get the game container element
const player1BoardContainer = document.getElementById('player1-board');
const player2BoardContainer = document.getElementById('player2-board');

const currentPlayer = _game__WEBPACK_IMPORTED_MODULE_1__.player1.getTurn() ? _game__WEBPACK_IMPORTED_MODULE_1__.player1 : _game__WEBPACK_IMPORTED_MODULE_1__.player2;
const opponent = _game__WEBPACK_IMPORTED_MODULE_1__.player1.getTurn() ? _game__WEBPACK_IMPORTED_MODULE_1__.player2 : _game__WEBPACK_IMPORTED_MODULE_1__.player1;
const boardContainer = _game__WEBPACK_IMPORTED_MODULE_1__.player1.getTurn()
  ? player1BoardContainer
  : player2BoardContainer;

(0,_ui__WEBPACK_IMPORTED_MODULE_2__.displayBoard)(
  currentPlayer.gameboard.getBoardState(),
  boardContainer,
  currentPlayer.getTurn(),
  opponent
);

(0,_ui__WEBPACK_IMPORTED_MODULE_2__.welcome_setup)(currentPlayer);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map