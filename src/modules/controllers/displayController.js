import GameController from "./gameController.js";
import addGameBoard from "../domElements/gameBoard.js";

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

  handlePlayRound(e) {
    console.log("Handling the play round");
    const coordinates = [e.target.dataset.x, e.target.dataset.y];

    const winner = this.game.playRound(coordinates);

    this.updateDisplay(this.ai.name, this.aiGameBoard);

    if (winner === "Player") {
      console.log("Player wins!");
      this.displayGameOver(winner);
    } else {
      this.updateDisplay(this.player.name, this.playerGameBoard);
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

  displayGameOver(winner) {
    console.log("Displaying the game over screen");
    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.textContent = `${winner} wins!`;
    gameOverModal.showModal();
  }

  startNewGame() {
    console.log("Starting a new game");
    this.updateDisplay(this.ai.name, this.aiGameBoard);

    const aiGameBoardCells = document.querySelectorAll(`#${this.ai.name}-cell`);

    aiGameBoardCells.forEach((cell) => {
      cell.addEventListener("click", (e) => this.handleCellClick(cell, e));
    });

    const placeShipsButton = document.getElementById("place-ships");
    placeShipsButton.replaceWith(placeShipsButton.cloneNode(true));
  }

  initNewGame() {
    console.log("Initializing a new game");
    // Reset the game boards
    const aiGameBoardCells = document.querySelectorAll(`#${this.ai.name}-cell`);
    aiGameBoardCells.forEach((cell) => {
      cell.replaceWith(cell.cloneNode(true));
    });

    const playerGameBoardCells = document.querySelectorAll(
      `#${this.player.name}-cell`
    );
    console.log(playerGameBoardCells);
    playerGameBoardCells.forEach((cell) => {
      cell.replaceWith(cell.cloneNode(true));
    });

    this.emptyDisplay(this.player.name);
    this.emptyDisplay(this.ai.name);
    this.game = new GameController();
    this.player = this.game.player;
    this.ai = this.game.AI;
    this.playerGameBoard = this.game.playerGameBoard;
    this.aiGameBoard = this.game.aiGameBoard;
    this.updateDisplay(this.player.name, this.playerGameBoard);
  }

  handleCellClick(cell, e) {
    if (cell.dataset.x === undefined || cell.dataset.y === undefined) return;
    this.handlePlayRound(e);
  }

  handlePlaceShips() {
    console.log("Placing ships randomly");
    this.initNewGame();
  }

  loadPage() {
    console.log("Loading the page");
    addGameBoard(content, this.player.name, this.playerGameBoard);
    addGameBoard(content, this.ai.name, this.aiGameBoard);
    this.updateDisplay(this.player.name, this.playerGameBoard);

    const placeShipsButton = document.getElementById("place-ships");
    placeShipsButton.addEventListener("click", () => this.handlePlaceShips());

    const startGameButton = document.getElementById("start-game");
    startGameButton.addEventListener("click", () => {
      this.startNewGame();
    });

    const closeModalButton = document.getElementById("close-modal");

    closeModalButton.addEventListener("click", () => {
      gameOverModal.close();
      this.initNewGame();
      const placeShipsButton = document.getElementById("place-ships");
      placeShipsButton.addEventListener("click", () => this.handlePlaceShips());
    });
  }
}

export default DisplayController;
