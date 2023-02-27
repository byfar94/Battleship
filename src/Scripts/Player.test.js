import { Player } from "./Player";
import { Ship } from "./Ship";

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
    const playerCarrier = new Ship(5);
    playerOne.shipArray.push(playerCarrier);
    console.log(playerCarrier);
    const playerBattleship = new Ship(4);
    playerOne.shipArray.push(playerBattleship);
    const playerCruiser = new Ship(3);
    playerOne.shipArray.push(playerCruiser);
    const playerSubmarine = new Ship(3);
    playerOne.shipArray.push(playerSubmarine);
    const playerDestroyer = new Ship(2);
    playerOne.shipArray.push(playerDestroyer);
    playerOne.shipArray.forEach((Element) => {
      Element.sunk = true;
    });
    playerOne.checkIfAllSunk();
    console.log(playerOne.sinkCount);
    console.log(playerOne.lost);
    expect(playerOne.lost).toBeTruthy();
  });
  test("if player.sinkCount is < 5 then player.lost == false", () => {
    let playerOne = new Player("player-one");
    const playerCarrier = new Ship(5);
    playerOne.shipArray.push(playerCarrier);
    console.log(playerCarrier);
    const playerBattleship = new Ship(4);
    playerOne.shipArray.push(playerBattleship);
    const playerCruiser = new Ship(3);
    playerOne.shipArray.push(playerCruiser);
    const playerSubmarine = new Ship(3);
    playerOne.shipArray.push(playerSubmarine);
    const playerDestroyer = new Ship(2);
    playerOne.shipArray.push(playerDestroyer);
    playerCarrier.sunk = true;
    playerOne.checkIfAllSunk();
    expect(playerOne.lost).toBeFalsy();
  });
});
