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

    this.placeShipsRandomly(this.playerGameBoard);
    this.placeShipsRandomly(this.aiGameBoard);
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
  placeShipsRandomly(gameBoard) {
    const directions = ["horizontal", "vertical"];
    const shipTypes = gameBoard.shipTypes;

    for (let i = 0; i < shipTypes.length; ++i) {
      while (true) {
        const shipName = shipTypes[i].name;
        const shipLength = shipTypes[i].length;
        const direction = directions[Math.floor(Math.random() * 2)];
        const coordinates = [];

        if (direction === "vertical") {
          const x = Math.floor(Math.random() * 10);
          const y =
            Math.floor(Math.random() * 10) > shipLength
              ? Math.floor(Math.random() * shipLength)
              : 10 - shipLength;
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

        console.log(shipName, coordinates);

        if (gameBoard.placeShip(shipName, coordinates)) {
          break;
        }
      }
    }
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
