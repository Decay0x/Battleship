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
    const shipAffected = this.ships.find(
      (ship) => ship.position[0] === x && ship.position[1] === y
    );
    if (shipAffected) {
      shipAffected.hit();
      return true;
    }
    this.missedShots.push({ x, y });
  }
  shipsSunk() {
    return this.ships.every((ship) => {
      if (ship.position[2] === 'horizontal') {
        return ship.hits >= ship.length;
      } else {
        return ship.hits >= ship.length;
      }
    });
  }
  getBoardState() {
    const boardState = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const ship = this.board[i][j];
        if (ship) {
          row.push(ship.name);
        } else {
          row.push(null);
        }
      }
      boardState.push(row);
    }
    return boardState;
  }
}

module.exports = Gameboard;
