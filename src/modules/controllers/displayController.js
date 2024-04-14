import GameController from "./gameController.js";
import addGameBoard from "../domElements/gameBoard.js";

const content = document.getElementById("content");

class DisplayController {
  constructor() {
    this.game = new GameController();
    this.player = this.game.player;
    this.ai = this.game.AI;
    this.playerGameBoard = this.game.playerGameBoard;
    this.aiGameBoard = this.game.aiGameBoard;
  }

  handlePlayRound(e) {
    console.log("Handling the play round");
    const coordinates = [e.target.dataset.x, e.target.dataset.y];
    this.game.playRound(coordinates);
    this.updateDisplay(this.player.name, this.playerGameBoard);
    this.updateDisplay(this.ai.name, this.aiGameBoard);
  }

  updateDisplay(player, gameBoard) {
    console.log(`Updating the game board for ${player}`);
    const gameBoardCells = document.querySelectorAll(`#${player}-cell`);
    const board = gameBoard.board;
    const shipNames = gameBoard.shipNames;
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
  }
}

export default DisplayController;
