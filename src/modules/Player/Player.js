class Player {
  constructor(name) {
    this.name = name;
  }
  checkIfMoveIsValid(gameBoard, coordinates) {
    const [x, y] = coordinates;
    if (gameBoard.board[x][y] === "hit" || gameBoard.board[x][y] === "miss") {
      return false;
    }
    return true;
  }
  makeMove(gameBoard, coordinates) {
    if (!this.checkIfMoveIsValid(gameBoard, coordinates)) {
      return false;
    }
    gameBoard.receiveAttack(coordinates);
    return true;
  }
}

export default Player;
