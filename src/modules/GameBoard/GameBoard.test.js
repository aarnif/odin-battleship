import GameBoard from "./GameBoard.js";

describe("Test GameBoard-class", () => {
  test("Check if board is created", () => {
    const gameBoard = new GameBoard(10);
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
  });
  test("Place ship on the board", () => {
    const gameBoard = new GameBoard(10);
    const placeShip = gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    expect(placeShip).toBe(true);
  });
  test("Check if ship is on the board", () => {
    const gameBoard = new GameBoard(10);
    const placeShip = gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    expect(gameBoard.getCordinate([1, 1])).toBe("Destroyer");
    expect(gameBoard.getCordinate([1, 2])).toBe("Destroyer");
  });
  test("Try to place two ship at same cordinates", () => {
    const gameBoard = new GameBoard(10);
    const placeFirstShip = gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    const placeSecondShip = gameBoard.placeShip("Submarine", [
      [0, 1],
      [1, 1],
      [1, 2],
    ]);
    expect(placeFirstShip).toBe(true);
    expect(placeSecondShip).toBe(false);
  });
  test("Check if ship is hit", () => {
    const gameBoard = new GameBoard(10);
    const shipName = "Destroyer";
    gameBoard.placeShip(shipName, [
      [1, 1],
      [1, 2],
    ]);
    gameBoard.receiveAttack([1, 1]);
    expect(gameBoard.board[1][1]).toBe("hit");
  });
  test("Check if hit is a miss", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.receiveAttack([1, 1]);
    expect(gameBoard.board[1][1]).toBe("miss");
  });
  test("Check if 'Destroyer' is sunk, but 'Submarine' is still floating", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    gameBoard.placeShip("Submarine", [
      [2, 1],
      [2, 2],
      [2, 3],
    ]);
    gameBoard.receiveAttack([1, 1]);
    gameBoard.receiveAttack([1, 2]);
    gameBoard.ships.forEach((ship) => {
      if (ship.name === "Destroyer") {
        expect(ship.isSunk()).toBe(true);
      } else {
        expect(ship.isSunk()).toBe(false);
      }
    });
  });
  test("Check if all ships are sunk, when they are not", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    gameBoard.placeShip("Submarine", [
      [2, 1],
      [2, 2],
      [2, 3],
    ]);
    gameBoard.receiveAttack([1, 1]);
    gameBoard.receiveAttack([2, 1]);
    gameBoard.receiveAttack([2, 2]);
    expect(gameBoard.checkIfAllShipsAreSunk()).toBe(false);
  });
  test("Check if all ships are sunk, when they are", () => {
    const gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    gameBoard.placeShip("Submarine", [
      [2, 1],
      [2, 2],
      [2, 3],
    ]);
    gameBoard.receiveAttack([1, 1]);
    gameBoard.receiveAttack([1, 2]);
    gameBoard.receiveAttack([2, 1]);
    gameBoard.receiveAttack([2, 2]);
    gameBoard.receiveAttack([2, 3]);
    expect(gameBoard.checkIfAllShipsAreSunk()).toBe(true);
  });
});
