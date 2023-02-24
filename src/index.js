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
console.log(playerCarrier);
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

console.log(computer.shipArray);

// <----------------------------------------------------> //
//function to create a DOM element with a class name
function createDomEl(el, cls) {
  let newEl = document.createElement(el);
  newEl.classList.add(cls);
  return newEl;
}

//check if a number is even
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

//DOM board containers
const boardContainer = createDomEl("section", "board-container");
const playerBoardContain = createDomEl("section", "player-board-contain");
const computerBoardContain = createDomEl("section", "computer-board-contain");

//DOM boards
let playerDOMBoard = new DOMBoard(playerBoard.boardArray, playerBoardContain);
let computerDOMBoard = new DOMBoard(
  computerBoard.boardArray,
  computerBoardContain
);

function renderBoards() {
  //containers
  document.body.append(boardContainer);
  boardContainer.append(playerBoardContain);
  boardContainer.append(computerBoardContain);

  //player Board
  playerDOMBoard.createDOMBoard("div", "player-board-DOM");
  playerDOMBoard.displayHits();

  //computer board
  computerDOMBoard.createDOMBoard("div", "computer-board-DOM");
  computerDOMBoard.displayHits();
}
renderBoards();

function allowAttack() {
  playerAttack(computerDOMBoard, computerBoard);
  computerAttack(playerDOMBoard, playerBoard);
}
allowAttack();

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
      (function executeAttack() {
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
          5;
        } else if (movesUsedComputer.length >= 100) {
          console.log("youre done !");
          return;
        } else if (movesUsedComputer.includes(randNum) == true) {
          console.log("Already attacked here");
          executeAttack();
        }
      })();
    }
  });
}

//checks if values from one array inlcudes values from another

function checkArrays(array1, array2) {
  return array1.some((value) => array2.includes(value));
}

//recursive function that will randomly place ships on the board by calling placeShip function. The function run and generate a random number then loop the number as many time as the ship.length is equal too (this will represent the space of the board the ship will be added to). Each loop will add 1 and push it to a random number array. The function will then check if any of the numbers in the array match any numbers from the usedShipSpaces array. If it does match checkArrays function will = true and the function will call itself without adding an iteration (this will prevent ship from being placed on the same space and allow all 5 ships to be place as the function will stop after 5 iterations, player.shipArray.length = 5). If checkArrays function is false the function placeShip will be called with parameters inlcuding the player.shipArray[i] and the randNum generated. The function will be called.
let usedShipSpaces = [];

function randomlyPlaceShips(gameBoard, player, iteration) {
  if (iteration < player.shipArray.length) {
    let ranArray = [];
    let randNum = Math.floor(Math.random() * 100);
    console.log(randNum);
    let secondDigit = randNum % 10;
    console.log(secondDigit);
    for (let i = 0; i < player.shipArray[iteration].length; i++) {
      ranArray.push(randNum);
    }
    if (
      checkArrays(usedShipSpaces, ranArray) == false &&
      10 - secondDigit >= player.shipArray[iteration].length
    ) {
      gameBoard.placeShip(player.shipArray[iteration], randNum);
      for (let i = 0; i < player.shipArray[iteration].length; i++) {
        usedShipSpaces.push(randNum);
        randNum++;
      }
      randomlyPlaceShips(gameBoard, player, iteration + 1);
    } else if (
      checkArrays(usedShipSpaces, ranArray) == true ||
      10 - secondDigit < player.shipArray[iteration].length
    ) {
      randomlyPlaceShips(gameBoard, player, iteration);
    }
  }
  console.log(gameBoard.boardArray);
}

randomlyPlaceShips(playerBoard, playerOne, 0);
randomlyPlaceShips(computerBoard, computer, 0);
