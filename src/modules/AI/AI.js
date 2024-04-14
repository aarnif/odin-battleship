import Player from "../Player/Player";

class AI extends Player {
  constructor(name = "AI") {
    super(name);
  }
  createRandomCoordinates(gameBoardWidth) {
    const x = Math.floor(Math.random() * gameBoardWidth);
    const y = Math.floor(Math.random() * gameBoardWidth);
    return [x, y];
  }
  getAICoordinates(gameBoardWidth) {
    return this.createRandomCoordinates(gameBoardWidth);
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
