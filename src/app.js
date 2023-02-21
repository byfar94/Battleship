export { Ship, Space, GameBoard, Player, Game };

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
    this.hasShip = false;
    this.shipName = null;
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

class Player {
  constructor(name) {
    this.name = name;
    this.shipArray = [];
    this.sinkCount = 0;
    this.lost = false;
  }
  randomMove(board) {
    let numRow = Math.floor(Math.random() * 10);
    let numCol = Math.floor(Math.random() * 10);
    return board.receiveAttack(numRow, numCol);
  }
  checkIfAllSunk() {
    this.shipArray.forEach((ship) => {
      if (ship.sunk == true) {
        this.sinkCount++;
      }
    });
    if (this.sinkCount >= 5) {
      this.lost = true;
    }
  }
}

class Game {
  constructor() {
    this.turnCounter = 0;
  }
}
