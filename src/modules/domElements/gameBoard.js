const createPlaceShipsButton = () => {
  const placeShipsButtonContainer = document.createElement("div");
  placeShipsButtonContainer.className = "flex justify-center";
  const placeShipsButton = document.createElement("button");
  placeShipsButton.id = `place-ships`;
  placeShipsButton.textContent = "Place Ships Randomly";
  placeShipsButtonContainer.appendChild(placeShipsButton);
  return placeShipsButtonContainer;
};

const createHorizontalCoordinateRow = () => {
  const horizontalCordinates = " ABCDEFGHIJ".split("");
  const horizontalCordinateRow = document.createElement("div");
  horizontalCordinateRow.className = "flex";
  horizontalCordinates.forEach((cordinate) => {
    const cell = document.createElement("div");
    cell.className =
      "w-10 h-10 flex justify-center items-center border border-black";
    cell.textContent = cordinate;
    horizontalCordinateRow.appendChild(cell);
  });
  return horizontalCordinateRow;
};

const createVerticalCoordinateRow = () => {
  const verticalCordinates = "1,2,3,4,5,6,7,8,9,10".split(",");
  const verticalCoordinateRow = document.createElement("div");
  verticalCoordinateRow.className = "flex flex-col";
  verticalCordinates.forEach((coordinate) => {
    const cell = document.createElement("div");
    cell.className =
      "w-10 h-10 flex justify-center items-center border border-black";
    cell.textContent = coordinate;
    verticalCoordinateRow.appendChild(cell);
  });

  return verticalCoordinateRow;
};

const createShipContainer = (playerName, shipType) => {
  const shipContainer = document.createElement("div");
  shipContainer.id = shipType.name;
  shipContainer.dataset.ship = "ship";
  shipContainer.dataset.direction = shipType.direction;
  if (shipType.direction === "vertical") {
    shipContainer.className = "flex";
  } else {
    shipContainer.className = "flex flex-col";
  }
  if (playerName !== "AI") {
    shipContainer.draggable = true;
  } else {
    // Display AI ships during development
    shipContainer.classList.add("bg-slate-400");
  }
  for (let i = 0; i < shipType.length; ++i) {
    const shipCell = document.createElement("div");
    shipCell.id = `${playerName}-cell`;
    shipCell.className = "flex-grow border border-black";
    shipCell.dataset.x = shipType.coordinates[i][0];
    shipCell.dataset.y = shipType.coordinates[i][1];
    shipContainer.appendChild(shipCell);
  }

  shipContainer.style.gridArea = shipType.name;
  return shipContainer;
};

const createShips = (playerName, playerGameBoard) => {
  const shipTypes = [];

  playerGameBoard.ships.forEach((ship) => {
    shipTypes.push({
      name: ship.name,
      length: ship.length,
      direction: ship.direction,
      coordinates: ship.coordinates,
      container: null,
    });
  });

  shipTypes.forEach((shipType) => {
    shipType.container = createShipContainer(playerName, shipType);
  });

  // console.log(shipTypes);

  return shipTypes;
};

const createGridAreas = (gameBoard) => {
  const gridCells = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10"],
    ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"],
    ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10"],
  ];

  // console.log(gameBoard.getCoordinatesOfFreeCells());
  // console.log(gameBoard.getCoordinatesOfAllShips());

  const freeCells = [];

  // console.log(gameBoard.board);
  // console.log(gameBoard.ships);
  let gridTemplateAreas = "";

  for (let i = 0; i < gridCells.length; ++i) {
    let gridTemplateArea = '"';
    for (let j = 0; j < gridCells[i].length; ++j) {
      if (gameBoard.board[i][j] !== null) {
        gridTemplateArea += `${gameBoard.board[i][j]} `;
      } else {
        gridTemplateArea += `${gridCells[i][j]} `;
        freeCells.push(gridCells[i][j]);
      }
    }
    gridTemplateArea = gridTemplateArea.trim();
    gridTemplateArea += '"\n';
    gridTemplateAreas += gridTemplateArea;
  }

  // console.log(gridTemplateAreas);
  // console.log(freeCells);
  return [gridTemplateAreas, freeCells];
};

const createGameBoardCells = (playerName, playerGameBoard) => {
  const board = document.createElement("div");
  board.className = "grid grid-cols-10 grid-rows-10";

  const [gridTemplateAreas, freeCells] = createGridAreas(playerGameBoard);

  board.style.gridTemplateAreas = gridTemplateAreas;

  const freeBoardCells = playerGameBoard.getCoordinatesOfFreeCells();

  freeCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.id = `${playerName}-cell`;
    cellElement.style.gridArea = cell;
    cellElement.className =
      "w-10 h-10 flex justify-center items-center border border-black";
    cellElement.dataset.x = freeBoardCells[index][0];
    cellElement.dataset.y = freeBoardCells[index][1];
    board.appendChild(cellElement);
  });

  const ships = createShips(playerName, playerGameBoard);

  ships.forEach((ship) => {
    board.appendChild(ship.container);
  });

  return board;
};

const createGameBoard = (playerName, playerGameBoard) => {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.id = `${playerName}-game-board-container`;

  const playerTitle = document.createElement("h2");
  playerTitle.className = "text-center";
  playerTitle.textContent = playerName;

  const board = document.createElement("div");
  board.id = `${playerName}-game-board`;

  board.appendChild(createHorizontalCoordinateRow());

  const boardColumnsContainer = document.createElement("div");
  boardColumnsContainer.className = "flex";

  boardColumnsContainer.appendChild(createVerticalCoordinateRow());
  boardColumnsContainer.appendChild(
    createGameBoardCells(playerName, playerGameBoard)
  );

  board.appendChild(boardColumnsContainer);
  gameBoardContainer.appendChild(playerTitle);
  gameBoardContainer.appendChild(board);

  if (playerName !== "AI") {
    gameBoardContainer.appendChild(createPlaceShipsButton());
  }

  return gameBoardContainer;
};

const addGameBoard = (parentElement, playerName, playerGameBoard) => {
  parentElement.appendChild(createGameBoard(playerName, playerGameBoard));
};

export default addGameBoard;
