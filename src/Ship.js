class Ship {
  constructor(length) {
    if (typeof length !== 'number' || length <= 0) {
      throw new Error('Length must be a positive number');
    }
    this.length = length;
    this.hits = 0;
    this.position = null;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.hits >= this.length;
  }
  setPosition(x, y) {
    this.position = [x, y];
  }
}

module.exports = Ship;
