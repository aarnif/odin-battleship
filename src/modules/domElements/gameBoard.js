const createPlaceShipsButton = () => {
  const placeShipsButtonContainer = document.createElement("div");
  placeShipsButtonContainer.className = "flex justify-center";
  const placeShipsButton = document.createElement("button");
  placeShipsButton.id = `place-ships`;
  placeShipsButton.textContent = "Place Ships Randomly";
  placeShipsButtonContainer.appendChild(placeShipsButton);
  return placeShipsButtonContainer;
};

const createGameBoard = (playerName) => {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.id = `${playerName}-game-board-container`;

  const playerTitle = document.createElement("h2");
  playerTitle.className = "text-center";
  playerTitle.textContent = playerName;

  const board = document.createElement("div");
  board.id = `${playerName}-game-board`;

  const horizontalCordinates = " ABCDEFGHIJ".split("");
  const verticalCordinates = "1,2,3,4,5,6,7,8,9,10".split(",");

  const horizontalCordinateRow = document.createElement("div");
  horizontalCordinateRow.className = "flex";
  horizontalCordinates.forEach((cordinate) => {
    const cell = document.createElement("div");
    cell.className =
      "w-10 h-10 flex justify-center items-center border border-black";
    cell.textContent = cordinate;
    horizontalCordinateRow.appendChild(cell);
  });

  board.appendChild(horizontalCordinateRow);

  for (let x = 0; x < 10; x++) {
    const row = document.createElement("div");
    row.className = "flex";

    for (let y = -1; y < 10; y++) {
      const cell = document.createElement("button");
      cell.id = `${playerName}-cell`;
      cell.className = "w-10 h-10 border border-black cursor-default";

      if (y === -1) {
        cell.textContent = verticalCordinates[x];
      } else {
        cell.dataset.x = x;
        cell.dataset.y = y;
      }
      if (playerName === "AI" && y !== -1) {
        cell.classList.add("hover:bg-gray-300");
        cell.classList.add("cursor-pointer");
      }
      row.appendChild(cell);
    }
    board.appendChild(row);
  }

  gameBoardContainer.appendChild(playerTitle);
  gameBoardContainer.appendChild(board);

  if (playerName !== "AI") {
    gameBoardContainer.appendChild(createPlaceShipsButton());
  }

  return gameBoardContainer;
};

const addGameBoard = (parentElement, playerName) => {
  parentElement.appendChild(createGameBoard(playerName));
};

export default addGameBoard;
