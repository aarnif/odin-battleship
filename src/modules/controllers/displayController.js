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

  newGame() {
    console.log("Starting a new game");
    this.game = new GameController();
    this.player = this.game.player;
    this.ai = this.game.AI;
    this.playerGameBoard = this.game.playerGameBoard;
    this.aiGameBoard = this.game.aiGameBoard;

    this.emptyDisplay(this.player.name);
    this.emptyDisplay(this.ai.name);
    this.updateDisplay(this.player.name, this.playerGameBoard);
    this.updateDisplay(this.ai.name, this.aiGameBoard);
  }

  loadPage() {
    console.log("Loading the page");
    addGameBoard(content, this.player.name);
    addGameBoard(content, this.ai.name);
    this.updateDisplay(this.player.name, this.playerGameBoard);
    this.updateDisplay(this.ai.name, this.aiGameBoard);

    const playerGameBoardCells = document.querySelectorAll(
      `#${this.ai.name}-cell`
    );

    playerGameBoardCells.forEach((cell) => {
      if (cell.dataset.x === undefined || cell.dataset.y === undefined) return;
      cell.addEventListener("click", (e) => this.handlePlayRound(e));
    });

    const closeModalButton = document.getElementById("close-modal");

    closeModalButton.addEventListener("click", () => {
      this.newGame();
      gameOverModal.close();
    });
  }
}

export default DisplayController;
