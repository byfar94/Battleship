import _ from "lodash";
import "./style.css";
export { Ship, Space, GameBoard };

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    this.hits++;
  }
  sink() {
    if (this.hits == this.length) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
  }
}

class Space {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.hasShip = null;
    this.shipName = {};
    this.wasHit = false;
  }
}

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
    for (let i = spaceIndex; i <= parseInt(ship.length - 1); i++) {
      this.boardArray[i].hasShip = true;
      this.boardArray[i].shipName = ship;
    }
  }
  receiveAttack(x, y) {
    this.boardArray.forEach((square) => {
      console.log(square);
      if (square.row == x && square.column == y && square.wasHit == false) {
        square.wasHit = true;
        square.shipName.hit();
        square.shipName.sink();
      }
    });
  }
}
