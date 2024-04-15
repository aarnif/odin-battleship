import AI from "../AI/AI.js";
import Player from "../Player/Player.js";
import GameBoard from "../GameBoard/GameBoard.js";

class GameController {
  constructor() {
    this.player = new Player("Player");
    this.AI = new AI("AI");
    this.playerGameBoard = new GameBoard();
    this.aiGameBoard = new GameBoard();
    this.gameOver = false;
    this.winner = null;

    this.placeShips(this.playerGameBoard);
    this.placeShips(this.aiGameBoard);
    this.sinkAlmostAllShips(this.playerGameBoard);
    this.sinkAlmostAllShips(this.aiGameBoard);
  }
  placeShips(gameBoard) {
    gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    gameBoard.placeShip("Submarine", [
      [3, 1],
      [3, 2],
      [3, 3],
    ]);
    gameBoard.placeShip("Cruiser", [
      [5, 1],
      [5, 2],
      [5, 3],
    ]);
    gameBoard.placeShip("Battleship", [
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
    ]);
    gameBoard.placeShip("Carrier", [
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
    ]);
  }
  sinkAlmostAllShips(gameBoard) {
    gameBoard.receiveAttack([1, 1]);
    gameBoard.receiveAttack([1, 2]);
    gameBoard.receiveAttack([3, 1]);
    gameBoard.receiveAttack([3, 2]);
    gameBoard.receiveAttack([3, 3]);
    gameBoard.receiveAttack([5, 1]);
    gameBoard.receiveAttack([5, 2]);
    gameBoard.receiveAttack([5, 3]);
    gameBoard.receiveAttack([7, 1]);
    gameBoard.receiveAttack([7, 2]);
    gameBoard.receiveAttack([7, 3]);
    gameBoard.receiveAttack([7, 4]);
    gameBoard.receiveAttack([9, 1]);
    gameBoard.receiveAttack([9, 2]);
    gameBoard.receiveAttack([9, 3]);
    gameBoard.receiveAttack([9, 4]);
  }
  playRound(coordinates) {
    const playerMove = this.player.makeMove(this.aiGameBoard, coordinates);
    if (!playerMove) {
      return false;
    }

    if (this.aiGameBoard.checkIfAllShipsAreSunk()) {
      this.gameOver = true;
      this.winner = "Player";
      return this.winner;
    }

    const aiMove = this.AI.makeMove(this.playerGameBoard);
    if (this.playerGameBoard.checkIfAllShipsAreSunk()) {
      this.gameOver = true;
      this.winner = "AI";
      return this.winner;
    }

    return true;
  }
}

export default GameController;
