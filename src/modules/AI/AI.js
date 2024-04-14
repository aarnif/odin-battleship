import Player from "../Player/Player";

class AI extends Player {
  constructor(name = "AI") {
    super(name);
  }
  createRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
  getAICoordinates() {
    return this.createRandomCoordinates();
  }
  makeMove(gameBoard) {
    while (true) {
      const aiCoordinates = this.getAICoordinates(gameBoard.board.length);
      if (this.checkIfMoveIsValid(gameBoard, aiCoordinates)) {
        gameBoard.receiveAttack(aiCoordinates);
        break;
      }
    }
    return true;
  }
}

export default AI;
