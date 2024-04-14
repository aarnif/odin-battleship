import Ship from "../Ship/Ship";

class GameBoard {
  constructor(width = 10) {
    this.ships = [];
    this.shipNames = [
      "Carrier",
      "Battleship",
      "Cruiser",
      "Submarine",
      "Destroyer",
    ];
    this.board = this.createBoard(width);
  }
  createBoard(width) {
    let board = [];

    for (let i = 0; i < width; ++i) {
      const row = [];
      for (let j = 0; j < width; ++j) {
        row.push(null);
      }
      board.push(row);
    }

    return board;
  }
  getCordinate(coordinates) {
    const [x, y] = coordinates;
    return this.board[x][y];
  }
  mark(coordinates, shipName) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      this.board[x][y] = shipName;
    }
  }
  hitShip(coordinates) {
    const [x, y] = coordinates;
    const shipName = this.board[x][y];
    const ship = this.ships.find((ship) => ship.name === shipName);
    ship.hit();
  }
  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    if (this.shipNames.includes(this.board[x][y])) {
      this.hitShip(coordinates);
      this.board[x][y] = "hit";
    } else {
      this.board[x][y] = "miss";
    }
  }
  checkIfAllShipsAreSunk() {
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board.length; ++j) {
        if (this.shipNames.includes(this.board[i][j])) {
          return false;
        }
      }
    }
    return true;
  }
  checkIfShipCanBePlaced(coordinates) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      if (this.board[x][y]) {
        return false;
      }
    }
    return true;
  }
  placeShip(name, coordinates) {
    if (!this.checkIfShipCanBePlaced(coordinates)) {
      return false;
    }

    const newShip = new Ship(name, coordinates.length);
    this.mark(coordinates, name);
    this.ships.push(newShip);
    return true;
  }
}

export default GameBoard;
