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
}

module.exports = Ship;
