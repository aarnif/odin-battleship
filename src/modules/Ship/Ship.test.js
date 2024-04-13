import Ship from "./Ship.js";

describe("Test Ship-class", () => {
  test("Ship is hit once, not sunk", () => {
    const ship = new Ship("Carrier", 5);
    ship.hit();

    expect(ship.getHits()).toBe(1);
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship is hit 5 times, sunk", () => {
    const ship = new Ship("Carrier", 5);
    for (let i = 0; i < 5; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
