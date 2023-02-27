import { Ship } from "./Ship";

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
