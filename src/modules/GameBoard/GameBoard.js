import Ship from "../Ship/Ship";

class GameBoard {
  constructor(width = 10) {
    this.ships = [];
    this.shipTypes = [
      { name: "Carrier", length: 5 },
      { name: "Battleship", length: 4 },
      { name: "Cruiser", length: 3 },
      { name: "Submarine", length: 3 },
      { name: "Destroyer", length: 2 },
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
  printBoard() {
    for (let i = 0; i < this.board.length; ++i) {
      console.log(this.board[i]);
    }
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
    if (this.shipTypes.map((ship) => ship.name).includes(this.board[x][y])) {
      this.hitShip(coordinates);
      this.board[x][y] = "hit";
    } else {
      this.board[x][y] = "miss";
    }
  }
  checkIfAllShipsAreSunk() {
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board.length; ++j) {
        if (
          this.shipTypes.map((ship) => ship.name).includes(this.board[i][j])
        ) {
          return false;
        }
      }
    }
    return true;
  }
  checkIfShipIsWithinOneCellFromAnotherShip(coordinates) {
    let isNextTo = false;

    this.board.map((row, x) => {
      row.map((cell, y) => {
        if (cell) {
          if (
            coordinates.some(
              (coordinate) => coordinate[0] === x - 1 && coordinate[1] === y
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x + 1 && coordinate[1] === y
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x && coordinate[1] === y - 1
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x && coordinate[1] === y + 1
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x - 1 && coordinate[1] === y - 1
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x + 1 && coordinate[1] === y + 1
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x - 1 && coordinate[1] === y + 1
            ) ||
            coordinates.some(
              (coordinate) => coordinate[0] === x + 1 && coordinate[1] === y - 1
            )
          ) {
            // console.log("isNextTo", x, y, cell);
            isNextTo = true;
          }
        }
      });
    });

    return isNextTo;
  }
  checkIfShipCellTaken(coordinates) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      if (this.board[x][y]) {
        return false;
      }
    }
    return true;
  }
  placeShip(name, coordinates, direction) {
    if (!this.checkIfShipCellTaken(coordinates)) {
      return false;
    }

    if (this.checkIfShipIsWithinOneCellFromAnotherShip(coordinates)) {
      return false;
    }

    const newShip = new Ship(name, coordinates.length, direction, coordinates);
    this.mark(coordinates, name);
    this.ships.push(newShip);
    return true;
  }
  getCoordinatesOfFreeCells() {
    const freeCells = [];

    this.board.map((row, x) => {
      row.map((cell, y) => {
        if (!cell) {
          freeCells.push([x, y]);
        }
      });
    });
    return freeCells;
  }
  getCoordinatesOfAllShips() {
    const allTheShipCoordinates = [];

    this.board.map((row, x) => {
      row.map((cell, y) => {
        if (cell) {
          allTheShipCoordinates.push([x, y]);
        }
      });
    });

    return allTheShipCoordinates;
  }
}

export default GameBoard;
