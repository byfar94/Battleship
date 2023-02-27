import { GameBoard } from "./Gameboard";

describe("board class testing", () => {
  test("creating a new board class will create an array with 100 objects", () => {
    let newBoard = new GameBoard();
    expect(newBoard.boardArray.length).toBe(100);
  });
  test("Each boardArray object will be a new Space (class object) with a row, column, hasShip, shipName, and wasHit attributes", () => {
    let newBoard = new GameBoard();
    expect(newBoard.boardArray[0]).toEqual({
      row: 0,
      column: 0,
      hasShip: false,
      shipName: null,
      wasHit: false,
    });
  });
});
