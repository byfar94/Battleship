import { experiments } from "webpack";
import { Ship, Space, GameBoard, Player } from "./app";

//ship class
describe("Ship class testing", () => {
  test("Ship class will create an object with a length equal to parameter, hits = 0, sunk = false", () => {
    expect(new Ship(3)).toEqual({
      length: 3,
      hits: 0,
      sunk: false,
    });
  });

  test("After excuting ship method hit() the ship object will have a hits count of 1", () => {
    let myShip = new Ship(3);
    myShip.hit();
    expect(myShip.hits).toBe(1);
  });

  test("Ship with eqaul hits to lenth will sunk a sunk valeu of true", () => {
    let myShip = new Ship(2);
    myShip.hit();
    myShip.hit();
    expect(myShip.sunk).toBe(false);
  });
});

//player
describe("Player class testing", () => {
  test("Create player class object,name = constuctor parameter, shiparray = [], sinkCount = 0, and lost = false", () => {
    let playerOne = new Player("player-one");
    expect(playerOne).toEqual({
      name: "player-one",
      shipArray: [],
      sinkCount: 0,
      lost: false,
    });
  });
  test("if player.sinkCount == 5 then player.lost == true", () => {
    let playerOne = new Player("player-one");
    playerOne.sinkCount = 5;
    playerOne.checkIfAllSunk();
    expect(playerOne.lost).toBeTruthy();
  });
  test("if player.sinkCount is < 5 then player.lost == false", () => {
    let playerOne = new Player("player-one");
    playerOne.sinkCount = 5;
    playerOne.checkIfAllSunk();
    expect(playerOne.lost).not.toBeFalsy();
  });
});

//board
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
