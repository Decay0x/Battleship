const Gameboard = require('./Gameboard');

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
}

module.exports = Player;
