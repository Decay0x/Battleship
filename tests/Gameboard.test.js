const Gameboard = require('../src/Gameboard');
const Ship = require('../src/Ship');

describe('Gameboard', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  test('class exists', () => {
    expect(gameboard).toBeInstanceOf(Gameboard);
  });
  test('has an array to store ships', () => {
    expect(gameboard.ships).toBeInstanceOf(Array);
  });
  test('has a method to place ships at specific coordinates with orientation', () => {
    gameboard.placeShip(ship, 4, 3, 'horizontal');
    expect(ship.position).toEqual([4, 3]);
    expect(ship.orientation).toBe('horizontal');
  });
  test('throws an error if ship is placed on top of another ship', () => {
    expect(() => {
      gameboard.placeShip(ship, 4, 3, 'horizontal');
    }).toThrowError('Ship cannot be placed here, position is occupied');
  });
  test('has a receiveAttack', () => {
    expect(typeof gameboard.receiveAttack).toBe('function');
  });
  test('receiveAttack hit a ship', () => {
    expect(gameboard.receiveAttack(4, 3)).toEqual(true);
  });
  test('receiveAttack missed', () => {
    gameboard.receiveAttack(5, 3);
    expect(gameboard.missedShots).toEqual([{ x: 5, y: 3 }]);
  });
  test('report ships are sunk or not', () => {
    expect(typeof gameboard.shipsSunk).toBe('function');
  });
  test('there are still available ships on the board', () => {
    ship.hit();
    expect(gameboard.shipsSunk()).toBe(false);
  });
});
