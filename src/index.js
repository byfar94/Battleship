import { Ship, Space, GameBoard } from "./app";

//create boards
const playerBoard = new GameBoard();
const computerBoard = new GameBoard();

//create player ships
const playerCarrier = new Ship(5);
const playerBattleship = new Ship(4);
const playerCruiser = new Ship(3);
const playerSubmarine = new Ship(3);
const playerDestroyer = new Ship(2);

//create computer ships
const computerCarrier = new Ship(5);
const computerBattleship = new Ship(4);
const computerCruiser = new Ship(3);
const computerSubmarine = new Ship(3);
const computerDestroyer = new Ship(2);

playerBoard.placeShip(playerBattleship, 0);
playerBoard.receiveAttack(0, 0);
playerBoard.receiveAttack(0, 1);
playerBoard.receiveAttack(0, 2);

console.log(playerBattleship.length);
console.log(playerBattleship.hits);

console.log(typeof playerBattleship.length);
console.log(typeof playerBattleship.hits);

console.log(playerBoard.boardArray);
console.log(playerBoard.boardArray.length);
console.log(playerBoard.boardArray[0]);
console.log(playerBattleship);

// <----------------------------------------------------> //

function createDomEl(el, cls) {
  let newEl = document.createElement(el);
  newEl.classList.add(cls);
  return newEl;
}

//create class for DOM board

class DOMBoard {
  constructor(array, container) {
    this.array = array;
    this.container = container;
    this.spacesDOMArray = [];
  }
  createDOMBoard(el, cls) {
    this.array.forEach((item) => {
      let space = createDomEl(el, cls);
      let row = item.row;
      let column = item.column;
      space.innerText = `${row}, ${column}`;
      this.container.append(space);
      this.spacesDOMArray.push(space);
    });
  }
  displayHits() {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].wasHit == true) {
        this.spacesDOMArray[i].style.backgroundColor = "red";
      }
    }
  }
}

function renderBoards() {
  //containers
  const boardContainer = createDomEl("section", "board-container");
  const playerBoardContain = createDomEl("section", "player-board-contain");
  const computerBoardContain = createDomEl("section", "computer-board-contain");
  document.body.append(boardContainer);
  boardContainer.append(playerBoardContain);
  boardContainer.append(computerBoardContain);

  //player Board
  let playerDOMBoard = new DOMBoard(playerBoard.boardArray, playerBoardContain);
  playerDOMBoard.createDOMBoard("div", "player-board-DOM");
  console.log(playerDOMBoard);
  playerDOMBoard.displayHits();

  //computer board
  let computerDOMBoard = new DOMBoard(
    playerBoard.boardArray,
    computerBoardContain
  );
  computerDOMBoard.createDOMBoard("div", "computer-board-DOM");
}
renderBoards();
