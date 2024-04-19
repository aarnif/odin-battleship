import GameController from "./gameController.js";
import addGameBoard from "../domElements/gameBoard.js";
import { gridCells } from "../data.js";

const content = document.getElementById("content");
const gameOverModal = document.getElementById("game-over-modal");

class DisplayController {
  constructor() {
    this.game = new GameController();
    this.player = this.game.player;
    this.ai = this.game.AI;
    this.playerGameBoard = this.game.playerGameBoard;
    this.aiGameBoard = this.game.aiGameBoard;
    this.shipNames = this.game.playerGameBoard.shipTypes.map(
      (ship) => ship.name
    );
  }

  gameStartInstructions() {
    console.log("Displaying game instructions");
    const gameMessage = document.getElementById("game-message");

    const gameInstructionsArray = [
      "Move ships by dragging them",
      "Click ship to change direction",
      "Click 'Start Game' to begin",
    ];

    gameInstructionsArray.forEach((sentence) => {
      const sentenceElement = document.createElement("p");
      sentenceElement.className = "mb-2";
      sentenceElement.textContent = sentence;
      gameMessage.appendChild(sentenceElement);
    });
  }

  gamePlayInstructions() {
    console.log("Displaying game play instructions");
    const gameMessage = document.getElementById("game-message");

    const gameInstructionsArray = [
      "Click on the AI game board to play",
      "If you hit a ship, the cell will turn green",
      "If you miss, the cell will turn red",
    ];

    gameInstructionsArray.forEach((sentence) => {
      const sentenceElement = document.createElement("p");
      sentenceElement.className = "mb-2";
      sentenceElement.textContent = sentence;
      gameMessage.appendChild(sentenceElement);
    });
  }

  gameRoundMessages(messageOne, messageTwo) {
    console.log("Displaying game message");
    const aiGameBoardContainer = document.getElementById(
      `${this.ai.name}-game-board-container`
    );
    const gameMessage = document.getElementById("game-message");
    gameMessage.textContent = messageOne;
    aiGameBoardContainer.classList.add("pointer-events-none");
    this.updateDisplay(this.ai.name, this.aiGameBoard);
    setTimeout(() => {
      gameMessage.textContent = messageTwo;
      this.updateDisplay(this.player.name, this.playerGameBoard);
    }, 1500);
    setTimeout(() => {
      this.emptyGameMessage();
      this.gamePlayInstructions();
      aiGameBoardContainer.classList.remove("pointer-events-none");
    }, 3000);
  }

  gameOverMessage(winner) {
    console.log("Displaying game over message");
    const gameOverMessage = document.getElementById("game-message");
    gameOverMessage.textContent = `${winner} wins!`;
  }

  emptyGameMessage() {
    console.log("Emptying game message");
    const gameMessage = document.getElementById("game-message");
    gameMessage.innerHTML = "";
    gameMessage.textContent = "";
  }

  handlePlayRound(e) {
    console.log("Handling the play round");
    const coordinates = [
      Number(e.target.dataset.x),
      Number(e.target.dataset.y),
    ];
    const winner = this.game.playRound(coordinates);
    const hitCell = document.querySelector(
      `#${this.ai.name}-cell[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
    );

    hitCell.classList.add("pointer-events-none");

    const playerCoordinatesInGrid = gridCells[coordinates[1]][coordinates[0]];
    const aiCoordinatesInGrid =
      gridCells[this.playerGameBoard.latestHit[1]][
        this.playerGameBoard.latestHit[0]
      ];

    this.updateDisplay(this.ai.name, this.aiGameBoard);

    if (winner === "Player") {
      this.gameOverMessage(winner);
      this.displayGameOverModal(winner);
    } else {
      this.gameRoundMessages(
        `Player hits game board at ${playerCoordinatesInGrid}`,
        `Ai hits game board at ${aiCoordinatesInGrid}`
      );
    }
  }

  updateDisplay(player, gameBoard) {
    console.log(`Updating the game board for ${player}`);
    const gameBoardCells = document.querySelectorAll(`#${player}-cell`);
    const board = gameBoard.board;
    const shipNames = this.shipNames;
    gameBoardCells.forEach((cell) => {
      const x = cell.dataset.x;
      const y = cell.dataset.y;

      if (x === undefined || y === undefined) return;

      if (shipNames.includes(board[x][y])) {
        cell.classList.add("bg-slate-400");
      } else if (board[x][y] === "hit") {
        cell.classList.remove("bg-slate-400");
        cell.classList.add("bg-green-400");
      } else if (board[x][y] === "miss") {
        cell.classList.add("bg-red-400");
      }
    });
  }

  emptyDisplay(player) {
    console.log(`Emptying the display for ${player}`);
    const gameBoardCells = document.querySelectorAll(`#${player}-cell`);
    gameBoardCells.forEach((cell) => {
      cell.classList.remove("bg-slate-400");
      cell.classList.remove("bg-green-400");
      cell.classList.remove("bg-red-400");
    });
  }

  displayGameOverModal(winner) {
    console.log("Displaying the game over screen");
    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.textContent = `${winner} wins!`;
    gameOverModal.showModal();
  }

  handleCellClick(cell, e) {
    if (cell.dataset.x === undefined || cell.dataset.y === undefined) return;
    this.handlePlayRound(e);
  }

  handleCellDrop(e) {
    e.preventDefault();
    const shipName = e.dataTransfer.getData("ship-name");
    const coordinates = [
      Number(e.target.dataset.x),
      Number(e.target.dataset.y),
    ];
    const direction = e.dataTransfer.getData("direction");
    console.log(
      `Dropping ship ${shipName} in ${direction} position at`,
      coordinates
    );
    this.playerGameBoard.changeShipPlacement(shipName, coordinates, direction);
    // console.log(this.playerGameBoard.board);
    // console.log(this.playerGameBoard.ships);
    this.addPlayerGameBoardToDom();
    this.updateDisplay(this.player.name, this.playerGameBoard);
  }

  handleChangeShipDirection(shipName) {
    console.log(`Changing ship ${shipName} direction`);
    this.playerGameBoard.changeShipDirection(shipName);
    this.addPlayerGameBoardToDom();
    this.updateDisplay(this.player.name, this.playerGameBoard);
  }

  handlePlaceShips() {
    console.log("Placing ships randomly");
    this.loadNewGame();
  }

  handleActiveDragShips() {
    const playerGameBoardCells = document.querySelectorAll(
      `#${this.player.name}-cell`
    );
    playerGameBoardCells.forEach((cell) => {
      cell.addEventListener("dragover", (e) => e.preventDefault());
      cell.addEventListener("drop", (e) => this.handleCellDrop(e));
    });

    const playerShipElements = document.querySelectorAll('[data-ship="ship"]');
    console.log(playerShipElements);
    playerShipElements.forEach((cell) => {
      cell.addEventListener("dragstart", (e) => {
        console.log(`Dragging ship ${e.target.id}`);
        e.dataTransfer.setData("ship-name", e.target.id);
        e.dataTransfer.setData("direction", e.target.dataset.direction);
      });
    });
  }

  handleActiveChangeShipDirection() {
    const playersShips = document.querySelectorAll('[data-ship="ship"]');
    playersShips.forEach((ship) => {
      ship.addEventListener("click", (e) => {
        const parentElement = e.target.parentElement;
        const shipName = parentElement.id;
        this.handleChangeShipDirection(shipName);
      });
    });
  }

  addPlayerGameBoardToDom() {
    console.log("Adding game boards to the DOM");
    content.innerHTML = "";
    addGameBoard(content, this.player.name, this.playerGameBoard);
    this.updateDisplay(this.player.name, this.playerGameBoard);
    this.handleActiveDragShips();
    this.handleActiveChangeShipDirection();
    // const placeShipsButton = document.getElementById("place-ships");
    // placeShipsButton.addEventListener("click", () => this.handlePlaceShips());
    // placeShipsButton.classList.remove("invisible");
  }

  addAIGameBoardToDom() {
    console.log("Adding AI game board to the DOM");
    const aiGameBoardContainer = document.getElementById(
      `${this.ai.name}-game-board-container`
    );
    if (aiGameBoardContainer) {
      aiGameBoardContainer.remove();
    }
    addGameBoard(content, this.ai.name, this.aiGameBoard);
    this.updateDisplay(this.ai.name, this.aiGameBoard);
  }

  startNewGame() {
    console.log("Starting a new game");

    this.emptyGameMessage();
    this.gamePlayInstructions();
    this.addAIGameBoardToDom();

    const startGameButton = document.getElementById("start-game");
    const placeShipsButton = document.getElementById("place-ships");
    const aiGameBoardCells = document.querySelectorAll(`#${this.ai.name}-cell`);
    const playerGameBoardCells = document.querySelectorAll(
      `#${this.player.name}-cell`
    );
    const playersShips = document.querySelectorAll('[data-ship="ship"]');

    startGameButton.classList.add("animate-fade-out");
    // startGameButton.classList.add("invisible");
    // placeShipsButton.classList.add("invisible");

    aiGameBoardCells.forEach((cell) => {
      cell.addEventListener("click", (e) => this.handleCellClick(cell, e));
      cell.classList.add("ai-cell");
    });

    playerGameBoardCells.forEach((cell) => {
      cell.replaceWith(cell.cloneNode(true));
    });

    playersShips.forEach((ship) => {
      if (ship.dataset.playerName === "AI") return;
      ship.replaceWith(ship.cloneNode(true));
      ship.draggable = false;
    });
  }

  loadNewGame() {
    console.log("Loading new game");

    this.game = new GameController();
    this.player = this.game.player;
    this.ai = this.game.AI;
    this.playerGameBoard = this.game.playerGameBoard;
    this.aiGameBoard = this.game.aiGameBoard;
    this.shipNames = this.game.playerGameBoard.shipTypes.map(
      (ship) => ship.name
    );

    content.innerHTML = "";
    this.addPlayerGameBoardToDom();
    this.gameStartInstructions();

    const startGameButton = document.getElementById("start-game");
    const closeModalButton = document.getElementById("close-modal");
    const playerGameBoardCells = document.querySelectorAll(
      `#${this.player.name}-cell`
    );

    startGameButton.addEventListener("click", () => {
      this.startNewGame();
    });

    startGameButton.classList.remove("animate-fade-out");
    startGameButton.style.opacity = 1;

    closeModalButton.addEventListener("click", () => {
      gameOverModal.close();
      this.loadNewGame();
    });

    playerGameBoardCells.forEach((cell) => {
      cell.addEventListener("drop", (e) => this.handleCellDrop(e));
    });
  }
}

export default DisplayController;
