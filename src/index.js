import _ from "lodash";
import "./style.css";
import { Ship, Space, GameBoard, Player, Game } from "./app";

//create boards
const playerBoard = new GameBoard();
const computerBoard = new GameBoard();

//create Game with players
const gameOne = new Game();
const playerOne = new Player("playerOne");
const computer = new Player("computer");

//create ships and pushes them to player ship array

const playerCarrier = new Ship(5);
playerOne.shipArray.push(playerCarrier);
const playerBattleship = new Ship(4);
playerOne.shipArray.push(playerBattleship);
const playerCruiser = new Ship(3);
playerOne.shipArray.push(playerCruiser);
const playerSubmarine = new Ship(3);
playerOne.shipArray.push(playerSubmarine);
const playerDestroyer = new Ship(2);
playerOne.shipArray.push(playerDestroyer);

const computerCarrier = new Ship(5);
computer.shipArray.push(computerCarrier);
const computerBattleship = new Ship(4);
computer.shipArray.push(computerBattleship);
const computerCruiser = new Ship(3);
computer.shipArray.push(computerCruiser);
const computerSubmarine = new Ship(3);
computer.shipArray.push(computerSubmarine);
const computerDestroyer = new Ship(2);
computer.shipArray.push(computerDestroyer);

computerBoard.placeShip(playerBattleship, 0);
/*
playerBoard.receiveAttack(0, 0);
playerBoard.receiveAttack(0, 1);
playerBoard.receiveAttack(0, 2);
playerBoard.receiveAttack(0, 3);
playerBoard.receiveAttack(0, 6);
*/
playerOne.sinkCount = 4;
playerOne.checkIfAllSunk();

console.log(playerBattleship.length);
console.log(playerBattleship.hits);

console.log(typeof playerBattleship.length);
console.log(typeof playerBattleship.hits);

console.log(playerBoard.boardArray);
console.log(playerBoard.boardArray.length);
console.log(playerBoard.boardArray[0]);
console.log(playerBattleship);

console.log(playerOne);
console.log(computer);

// <----------------------------------------------------> //

function createDomEl(el, cls) {
  let newEl = document.createElement(el);
  newEl.classList.add(cls);
  return newEl;
}

const isEven = (num) => num % 2 === 0;

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
    for (let i = 0; i < this.spacesDOMArray.length; i++) {
      if (this.array[i].wasHit == true && this.array[i].hasShip == true) {
        this.spacesDOMArray[i].style.backgroundColor = "red";
      } else if (this.array[i].wasHit == true && !this.array[i].hasShip) {
        this.spacesDOMArray[i].style.backgroundColor = "blue";
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
  playerDOMBoard.displayHits();

  //computer board
  let computerDOMBoard = new DOMBoard(
    computerBoard.boardArray,
    computerBoardContain
  );
  computerDOMBoard.createDOMBoard("div", "computer-board-DOM");
  console.log(computerDOMBoard);
  playerAttack(computerDOMBoard, computerBoard);
  computerAttack(playerDOMBoard, playerBoard);
}
renderBoards();

//function that contains click event listerner for player to execute playerAttack() function on specific game square that was clicked
function playerAttack(boardDOM, board) {
  const movesUsedPlayer = [];
  //add if statement of if gameCount = even you can execute this event listener
  for (let i = 0; i < boardDOM.spacesDOMArray.length; i++) {
    boardDOM.spacesDOMArray[i].addEventListener("click", () => {
      if (isEven(gameOne.turnCounter) === true) {
        if (movesUsedPlayer.includes(i) == false) {
          movesUsedPlayer.push(i);
          let row = boardDOM.array[i].row;
          let column = boardDOM.array[i].column;
          board.receiveAttack(row, column);
          boardDOM.displayHits();
          gameOne.turnCounter++;
          console.log(gameOne.turnCounter);
        }
      }
    });
  }
}

function computerAttack(boardDOM, board) {
  let movesUsedComputer = [];
  let compBoardContain = document.querySelector(".computer-board-contain");
  compBoardContain.addEventListener("click", () => {
    if (isEven(gameOne.turnCounter) === false) {
      function executeAttack() {
        let randNum = Math.floor(Math.random() * 100);
        console.log(randNum);
        console.log(movesUsedComputer);
        if (movesUsedComputer.includes(randNum) == false) {
          movesUsedComputer.push(randNum);
          let row = boardDOM.array[randNum].row;
          let column = boardDOM.array[randNum].column;
          board.receiveAttack(row, column);
          boardDOM.displayHits();
          gameOne.turnCounter++;
          console.log(gameOne.turnCounter);
        } else if (movesUsedComputer.length >= 100) {
          console.log("youre done !");
          return;
        } else if (movesUsedComputer.includes(randNum) == true) {
          console.log("Already attacked here");
          executeAttack();
        }
      }
      executeAttack();
    }
  });
}
