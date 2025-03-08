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
