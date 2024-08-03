const Gameboard = require('./Gameboard');

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

module.exports = Player;
