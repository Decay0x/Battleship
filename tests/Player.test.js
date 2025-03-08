const Player = require('../src/Player');

describe('Player', () => {
  const player = new Player();
  const real = new Player('name', 'real');
  const computer = new Player('SkyNet', 'computer');
  test('Player exists', () => {
    expect(player).toBeInstanceOf(Player);
  });

  test('Creates correct type of player', () => {
    expect(real.type).toBe('real');
    expect(computer.type).toBe('computer');
  });
  test('Each player has its own gameboard', () => {
    expect(real.gameboard).not.toBe(computer.gameboard);
  });
  test('When a player plays a round loses his turn', () => {
    expect(real.getTurn()).toBe(false);
    real.play();
    expect(real.getTurn()).toBe(true);
    real.play();
    expect(real.getTurn()).toBe(false);
  });
});
