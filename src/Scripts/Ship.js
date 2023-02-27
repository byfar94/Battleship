export { Ship };

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
