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
});
