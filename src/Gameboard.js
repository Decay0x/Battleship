class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = [];
  }
  placeShip(ship, x, y) {
    ship.setPosition(x, y);
    this.ships.push(ship);
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
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = Gameboard;
