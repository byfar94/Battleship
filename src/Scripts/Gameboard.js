export { GameBoard };
import { Space } from "./Space";

class GameBoard {
  constructor() {
    this.boardArray = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let square = new Space(row, col);
        this.boardArray.push(square);
      }
    }
  }
  placeShip(ship, spaceIndex) {
    for (let i = 0; i <= parseInt(ship.length - 1); i++) {
      this.boardArray[spaceIndex].hasShip = true;
      this.boardArray[spaceIndex].shipName = ship;
      spaceIndex++;
    }
  }
  receiveAttack(x, y) {
    this.boardArray.forEach((square) => {
      if (square.row == x && square.column == y && square.wasHit == false) {
        square.wasHit = true;
        if (square.hasShip == true) {
          square.shipName.hit();
          square.shipName.sink();
        }
      }
    });
  }
}
