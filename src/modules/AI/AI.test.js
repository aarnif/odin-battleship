import AI from "./AI";
import GameBoard from "../GameBoard/GameBoard";

describe("Test AI-class", () => {
  let gameBoard;
  let ai;
  const gameBoardWidth = 10;
  beforeEach(() => {
    gameBoard = new GameBoard(gameBoardWidth);
    gameBoard.placeShip(
      "Destroyer",
      [
        [1, 1],
        [1, 2],
      ],
      "vertical"
    );
    ai = new AI();
  });
  test("Check if AI makes legal moves", () => {
    for (let i = 0; i < 1000; i++) {
      const coordinates = ai.createRandomCoordinates();
      coordinates.forEach((coordinate) => {
        expect(coordinate).toBeGreaterThanOrEqual(0);
        expect(coordinate).toBeLessThan(gameBoardWidth);
      });
    }
  });
  test("Check if AI finds only unused coordinates", () => {
    for (let i = 0; i < gameBoardWidth; i++) {
      for (let j = 0; j < gameBoardWidth; j++) {
        gameBoard.receiveAttack([i, j]);
      }
    }
    gameBoard.board[0][0] = null;
    ai.makeMove(gameBoard);
    expect(gameBoard.board[0][0]).toBe("miss");
  });
  test("Check if previous hit was recorded", () => {
    ai.makeMove(gameBoard, [1, 1]);
    expect(ai.latestMove).not.toBeNull();
  });
  test("Check if previous hit was a success", () => {
    ai.makeMove(gameBoard, [1, 1]);
    const isSuccess = ai.checkIfLatestMoveIsHit(gameBoard);
    expect(isSuccess).toBe(true);
  });
  test("Check if previous hit was not a success", () => {
    ai.makeMove(gameBoard, [0, 0]);
    const isSuccess = ai.checkIfLatestMoveIsHit(gameBoard);
    expect(isSuccess).toBe(false);
  });
  test("Hit nearest coordinates if previous hit was a success", () => {
    ai.makeMove(gameBoard, [1, 1]);
    ai.makeMove(gameBoard);
    const nearestCoordinates = [
      [1, 0],
      [1, 2],
      [0, 1],
      [2, 1],
    ];
    expect(nearestCoordinates).toContainEqual(ai.latestMove);
  });
});
