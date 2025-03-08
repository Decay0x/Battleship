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
