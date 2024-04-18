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
  updateShipPositions() {
    this.board = this.createBoard(10);
    this.ships.map((ship) => {
      this.mark(ship.coordinates, ship.name);
    });
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
  checkIfShipCoordinatesAreValid(coordinates) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      if (x < 0 || x >= this.board.length || y < 0 || y >= this.board.length) {
        return false;
      }
    }
    return true;
  }
  createShipCoordinates(startingCoordinates, shipLength, shipDirection) {
    console.log("Creating ship coordinates");
    const coordinates = [];

    if (shipDirection === "vertical") {
      const x = startingCoordinates[0];
      const y = startingCoordinates[1];
      for (let j = 0; j < shipLength; ++j) {
        coordinates.push([x, y + j]);
      }
    } else {
      const x = shipLength;
      const y =
        Math.floor(Math.random() * 10) > shipLength
          ? Math.floor(Math.random() * shipLength)
          : 10 - shipLength;
      for (let j = 0; j < shipLength; ++j) {
        coordinates.push([x + j, y]);
      }
    }
    console.log(coordinates);
    if (!this.checkIfShipCoordinatesAreValid(coordinates)) {
      console.log("Invalid coordinates");
      return false;
    }
    if (!this.checkIfShipCellTaken(coordinates)) {
      console.log("Cell taken");
      return false;
    }

    if (this.checkIfShipIsWithinOneCellFromAnotherShip(coordinates)) {
      console.log("Next to another ship");
      return false;
    }
    console.log(coordinates);
    return coordinates;
  }
  placeShip(name, coordinates, direction) {
    let newShip = new Ship(name, coordinates.length, direction, coordinates);
    console.log(coordinates[0], newShip.length, newShip.direction);

    const shipCoordinates = this.createShipCoordinates(
      coordinates[0],
      newShip.length,
      newShip.direction
    );
    console.log(shipCoordinates);

    if (!shipCoordinates) {
      return false;
    }

    this.mark(shipCoordinates, name);
    newShip = new Ship(name, coordinates.length, direction, shipCoordinates);
    console.log("NEw ship", newShip);
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
  emptyGameBoard() {
    this.board = this.createBoard(10);
  }
  placeAllShips() {
    this.ships.map((ship) => {
      this.placeShip(ship.name, ship.coordinates, ship.direction);
    });
  }
  changeShipPlacement(name, coordinates, direction) {
    console.log("Changing ship placement");
    console.log("Old ship positions", this.ships);
    const ship = this.ships.find((ship) => ship.name === name);
    console.log(
      "Old ship coordinates",
      ship.coordinates[0],
      ship.coordinates[1]
    );
    console.log(ship);
    const newCoordinates = this.createShipCoordinates(
      coordinates,
      ship.length,
      direction
    );
    console.log(newCoordinates);
    console.log("Old game board");
    console.log(this.board);

    if (!newCoordinates) {
      return false;
    }

    // this.emptyGameBoard();
    // console.log("Empty game board");
    // console.log(this.board);
    ship.coordinates = newCoordinates;
    console.log(
      "New ship coordinates",
      ship.coordinates[0],
      ship.coordinates[1]
    );
    console.log(ship);
    console.log("New ship positions", this.ships);
    // this.placeAllShips();
    this.updateShipPositions();
    console.log("New game board");
    console.log(this.board);
    return true;
  }
}

export default GameBoard;
