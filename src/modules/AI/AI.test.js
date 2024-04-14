import AI from "./Ai";
import GameBoard from "../GameBoard/GameBoard";

describe("Test AI-class", () => {
  let gameBoard;
  let ai;
  const gameBoardWidth = 10;
  beforeEach(() => {
    gameBoard = new GameBoard(gameBoardWidth);
    gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
    ai = new AI();
  });
  test("Check if AI makes legal moves", () => {
    for (let i = 0; i < 1000; i++) {
      const coordinates = ai.getAICoordinates(gameBoard.board.length);
      coordinates.forEach((coordinate) => {
        expect(coordinate).toBeGreaterThanOrEqual(0);
        expect(coordinate).toBeLessThan(gameBoardWidth);
      });
    }
  });
  test("Check if AI finds only unused coordinate", () => {
    for (let i = 0; i < gameBoardWidth; i++) {
      for (let j = 0; j < gameBoardWidth; j++) {
        gameBoard.receiveAttack([i, j]);
      }
    }
    gameBoard.board[0][0] = null;
    ai.makeMove(gameBoard);
    expect(gameBoard.board[0][0]).toBe("miss");
  });
});
