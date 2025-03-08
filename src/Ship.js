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
