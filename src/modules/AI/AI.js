import Player from "../Player/Player";

class AI extends Player {
  constructor(name = "AI") {
    super(name);
    this.latestMove = null;
    this.huntMode = false;
    this.huntModeCoordinates = null;
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
  createHitCoordinates = (gameBoard, coordinates) => {
    if (coordinates) {
      return coordinates;
    }

    if (this.checkIfLatestMoveIsHit(gameBoard)) {
      this.huntMode = true;
      this.huntModeCoordinates = [
        [this.latestMove[0], this.latestMove[1] - 1],
        [this.latestMove[0], this.latestMove[1] + 1],
        [this.latestMove[0] - 1, this.latestMove[1]],
        [this.latestMove[0] + 1, this.latestMove[1]],
      ];
    }

    if (this.huntMode) {
      if (this.huntModeCoordinates.length) {
        for (const huntModeCoordinate of this.huntModeCoordinates) {
          if (this.checkIfMoveIsValid(gameBoard, huntModeCoordinate)) {
            this.huntModeCoordinates = this.huntModeCoordinates.filter(
              (coordinate) => coordinate !== huntModeCoordinate
            );
            return huntModeCoordinate;
          }
        }
      }
      this.huntMode = false;
      this.huntModeCoordinates = null;
    }

    const randomCoordinates = this.createRandomCoordinates();

    if (this.checkIfMoveIsValid(gameBoard, randomCoordinates)) {
      return randomCoordinates;
    }
    return null;
  };
  // Coordinates parameter is for development purposes
  makeMove(gameBoard, coordinates = null) {
    let aiCoordinates;
    while (true) {
      aiCoordinates = this.createHitCoordinates(gameBoard, coordinates);

      if (aiCoordinates) {
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
