import { gridCells } from "../data";

const createHorizontalCoordinateRow = () => {
  const horizontalCordinates = " ABCDEFGHIJ".split("");
  const horizontalCordinateRow = document.createElement("div");
  horizontalCordinateRow.className = "flex ";
  horizontalCordinates.forEach((cordinate) => {
    const cell = document.createElement("div");
    cell.className = "cell";
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
    cell.className = "cell";
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
  shipContainer.dataset.playerName = playerName;
  if (shipType.direction === "vertical") {
    shipContainer.className = "flex";
  } else {
    shipContainer.className = "flex flex-col";
  }
  if (playerName !== "AI") {
    shipContainer.draggable = true;
    shipContainer.classList.add("group");
  } else {
    // Display AI ships during development
    // shipContainer.classList.add("bg-slate-400");
  }
  for (let i = 0; i < shipType.length; ++i) {
    const shipCell = document.createElement("div");
    shipCell.id = `${playerName}-cell`;
    shipCell.className = "ship-cell";
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

  return shipTypes;
};

const createGridAreas = (gameBoard) => {
  const freeCells = [];

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

  return [gridTemplateAreas, freeCells];
};

const createGameBoardCells = (playerName, playerGameBoard) => {
  const board = document.createElement("div");
  board.className = "grid grid-cols-10 grid-rows-10 background-theme";

  const [gridTemplateAreas, freeCells] = createGridAreas(playerGameBoard);

  board.style.gridTemplateAreas = gridTemplateAreas;

  const freeBoardCells = playerGameBoard.getCoordinatesOfFreeCells();

  freeCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.id = `${playerName}-cell`;
    cellElement.style.gridArea = cell;
    cellElement.className = "cell";
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
  gameBoardContainer.className = "flex flex-col items-center";

  const playerTitle = document.createElement("h2");
  playerTitle.className = "p-2 text-center text-2xl font-bold";
  playerTitle.textContent = playerName;

  if (playerName === "AI") {
    gameBoardContainer.classList.add("animate-fade-in-from-left");
  }

  const board = document.createElement("div");
  board.id = `${playerName}-game-board`;
  board.className = "board-theme";

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

  return gameBoardContainer;
};

const addGameBoard = (parentElement, playerName, playerGameBoard) => {
  parentElement.appendChild(createGameBoard(playerName, playerGameBoard));
};

export default addGameBoard;
