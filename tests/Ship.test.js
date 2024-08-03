const Ship = require('../src/Ship');

describe('Ship', () => {
  test('class exists', () => {
    const ship = new Ship(3);

    expect(ship).toBeInstanceOf(Ship);
  });
  test('valid length has been passed down', () => {
    expect(() => new Ship('test')).toThrowError(
      'Length must be a positive number'
    );
  });
  test('negative number been passed down', () => {
    expect(() => new Ship(-2)).toThrowError('Length must be a positive number');
  });

  test('has a hit method', () => {
    const ship = new Ship(3);

    expect(typeof ship.hit).toBe('function');
  });

  test('has isSunk method,', () => {
    const ship = new Ship(3);

    expect(typeof ship.isSunk).toBe('function');
  });

  test('check hit method works when gets hit ones', () => {
    const ship = new Ship(3);

    ship.hit();
    expect(ship.hits).toBe(1);
  });
  test('check hit method works when gets hit twice', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('the sunk method works when not sunk', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test('the sunk method works when sunk', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
