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
    this.latestHit = null;
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
    this.latestHit = coordinates;
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
  checkIfShipCoordinatesAreInBounds(coordinates) {
    for (let i = 0; i < coordinates.length; ++i) {
      const [x, y] = coordinates[i];
      if (x < 0 || x >= this.board.length || y < 0 || y >= this.board.length) {
        return false;
      }
    }
    return true;
  }
  checkIfRandomShipCoordinatesAreValid(coordinates) {
    if (!this.checkIfShipCoordinatesAreInBounds(coordinates)) {
      return false;
    }
    if (!this.checkIfShipCellTaken(coordinates)) {
      return false;
    }

    if (this.checkIfShipIsWithinOneCellFromAnotherShip(coordinates)) {
      return false;
    }
    return true;
  }
  createRandomShipCoordinates(startingCoordinates, shipLength, shipDirection) {
    console.log("Creating random ship coordinates");
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
    if (!this.checkIfRandomShipCoordinatesAreValid(coordinates)) {
      return false;
    }
    return coordinates;
  }
  checkIfShipCoordinatesAreValid(coordinates) {
    console.log(coordinates);
    if (!this.checkIfShipCoordinatesAreInBounds(coordinates)) {
      console.log("Coordinates out of bounds");
      return false;
    }
    if (!this.checkIfShipCellTaken(coordinates)) {
      console.log("Cell taken");
      return false;
    }
    return true;
  }
  createShipCoordinates(startingCoordinates, shipLength, shipDirection) {
    console.log("Creating ship coordinates");
    const coordinates = [];
    const x = startingCoordinates[0];
    const y = startingCoordinates[1];

    console.log("Ship direction", shipDirection);

    if (shipDirection === "vertical") {
      for (let j = 0; j < shipLength; ++j) {
        coordinates.push([x, y + j]);
      }
    } else {
      for (let j = 0; j < shipLength; ++j) {
        coordinates.push([x + j, y]);
      }
    }
    console.log("New coordinates", coordinates);
    if (!this.checkIfShipCoordinatesAreValid(coordinates)) {
      console.log("Ship coordinates are not valid");
      return false;
    }
    return coordinates;
  }
  placeShip(name, coordinates, direction) {
    console.log(`Placing ship ${name}`);
    let newShip = new Ship(name, coordinates.length, direction, coordinates);

    const shipCoordinates = this.createRandomShipCoordinates(
      coordinates[0],
      newShip.length,
      newShip.direction
    );

    if (!shipCoordinates) {
      return false;
    }

    this.mark(shipCoordinates, name);
    newShip = new Ship(name, coordinates.length, direction, shipCoordinates);
    console.log("New ship", newShip);
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
    const ship = this.ships.find((ship) => ship.name === name);

    const newCoordinates = this.createShipCoordinates(
      coordinates,
      ship.length,
      direction
    );

    if (!newCoordinates) {
      return false;
    }

    ship.coordinates = newCoordinates;
    console.log(
      "New ship coordinates",
      ship.coordinates[0],
      ship.coordinates[1]
    );
    this.updateShipPositions();
    return true;
  }
  removeShipFromBoard(name) {
    console.log("Removing ship");
    const ship = this.ships.find((ship) => ship.name === name);
    ship.coordinates.map((coordinate) => {
      const [x, y] = coordinate;
      this.board[x][y] = null;
    });
    this.ships = this.ships.filter((ship) => ship.name !== name);
  }
  addShipToBoard(name, coordinates, direction) {
    console.log("Adding ship");
    const newShip = new Ship(name, coordinates.length, direction, coordinates);
    this.ships.push(newShip);
    this.mark(coordinates, name);
  }
  changeShipDirection(name) {
    console.log("Changing ship direction");
    const ship = this.ships.find((ship) => ship.name === name);

    this.removeShipFromBoard(ship.name);
    let newDirection =
      ship.direction === "vertical" ? "horizontal" : "vertical";

    const shipCoordinates = this.createShipCoordinates(
      ship.coordinates[0],
      ship.length,
      newDirection
    );

    if (!shipCoordinates) {
      this.addShipToBoard(ship.name, ship.coordinates, ship.direction);
      return false;
    } else {
      ship.direction = newDirection;
      ship.coordinates = shipCoordinates;
    }

    this.addShipToBoard(ship.name, ship.coordinates, newDirection);

    this.updateShipPositions();
  }
}

export default GameBoard;
