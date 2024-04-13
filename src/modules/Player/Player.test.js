import Player from "./Player";
import GameBoard from "../GameBoard/GameBoard";

describe("Test Player-class", () => {
  let gameBoard;
  beforeEach(() => {
    gameBoard = new GameBoard(10);
    gameBoard.placeShip("Destroyer", [
      [1, 1],
      [1, 2],
    ]);
  });
  test("Player has a name", () => {
    const player = new Player("John");
    expect(player.name).toBe("John");
  });
  test("Player makes a move", () => {
    const player = new Player("John");
    const move = player.makeMove(gameBoard, [1, 1]);
    expect(move).toBe(true);
  });
  test("Player makes a move, hit", () => {
    const player = new Player("John");
    player.makeMove(gameBoard, [1, 1]);
    expect(gameBoard.board[1][1]).toBe("hit");
  });
  test("Player makes a move, miss", () => {
    const player = new Player("John");
    player.makeMove(gameBoard, [2, 2]);
    expect(gameBoard.board[2][2]).toBe("miss");
  });
  test("Player tries to make a move on the same spot twice", () => {
    const player = new Player("John");
    const moveOne = player.makeMove(gameBoard, [1, 1]);
    const moveTwo = player.makeMove(gameBoard, [1, 1]);
    expect(moveOne).toBe(true);
    expect(moveTwo).toBe(false);
  });
});
