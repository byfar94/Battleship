export { Player };

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
    this.sinkCount = 0;
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
