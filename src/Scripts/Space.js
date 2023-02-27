export { Space };

class Space {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.hasShip = false;
    this.shipName = null;
    this.wasHit = false;
  }
}
