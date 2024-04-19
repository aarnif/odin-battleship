import Player from "../Player/Player";

class AI extends Player {
  constructor(name = "AI") {
    super(name);
    this.latestMove = null;
  }
  createRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
  checkIfLatestMoveIsHit(gameBoard) {
    if (this.latestMove === null) {
      return false;
    }
    return gameBoard.board[this.latestMove[0]][this.latestMove[1]] === "hit";
  }
  createHitCoordinates = (gameBoard) => {
    let directions = {
      up: [this.latestMove[0], this.latestMove[1] - 1],
      down: [this.latestMove[0], this.latestMove[1] + 1],
      left: [this.latestMove[0] - 1, this.latestMove[1]],
      right: [this.latestMove[0] + 1, this.latestMove[1]],
    };

    for (const direction in directions) {
      if (this.checkIfMoveIsValid(gameBoard, directions[direction])) {
        return directions[direction];
      }
    }
    return this.createRandomCordinates(gameBoard);
  };
  // Coordinates parameter is for development purposes
  makeMove(gameBoard, coordinates = null) {
    let aiCoordinates;
    while (true) {
      if (this.checkIfLatestMoveIsHit(gameBoard)) {
        aiCoordinates = this.createHitCoordinates(gameBoard);
      } else {
        aiCoordinates = !coordinates
          ? this.createRandomCoordinates()
          : coordinates;
      }
      if (this.checkIfMoveIsValid(gameBoard, aiCoordinates)) {
        gameBoard.receiveAttack(aiCoordinates);
        this.latestMove = [Number(aiCoordinates[0]), Number(aiCoordinates[1])];
        break;
      }
    }
    console.log("Ai latest move", this.latestMove);
    console.log("Ai coordinates", aiCoordinates);
    return true;
  }
}

export default AI;
