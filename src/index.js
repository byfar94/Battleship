import _ from "lodash";
import "./style.css";
import { Ship } from "./Scripts/Ship";
import { GameBoard } from "./Scripts/Gameboard";
import { Player } from "./Scripts/Player";
import { Game } from "./Scripts/Game";
import { DOMBoard } from "./Scripts/DOMBoard";
import { createDomEl } from "./Scripts/DOMBoard";

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

//DOM board containers
const boardContainer = createDomEl("section", "board-container");

//DOM boards
let playerDOMBoard = new DOMBoard(playerBoard, "player-board-contain");
let computerDOMBoard = new DOMBoard(computerBoard, "computer-board-contain");

function renderBoards() {
  //containers
  document.body.append(boardContainer);
  boardContainer.append(playerDOMBoard.container);
  boardContainer.append(computerDOMBoard.container);

  //player Board
  playerDOMBoard.createDOMBoard("div", "player-board-DOM");
  playerDOMBoard.displayHits();

  //computer board
  computerDOMBoard.createDOMBoard("div", "computer-board-DOM");
  computerDOMBoard.displayHits();
}
renderBoards();

function allowAttack() {
  computerDOMBoard.playerAttack(gameOne);
  playerDOMBoard.computerAttack(gameOne, computerDOMBoard.container);
}

allowAttack();

//checks if values from one array inlcudes values from another

function checkArrays(array1, array2) {
  return array1.some((value) => array2.includes(value));
}

//recursive function that will randomly place ships on the board by calling placeShip function. The function run and generate a random number then loop the number as many time as the ship.length is equal too (this will represent the space of the board the ship will be added to). Each loop will add 1 and push it to a random number array. The function will then check if any of the numbers in the array match any numbers from the usedShipSpaces array. If it does match checkArrays function will = true and the function will call itself without adding an iteration (this will prevent ship from being placed on the same space and allow all 5 ships to be place as the function will stop after 5 iterations, player.shipArray.length = 5). If checkArrays function is false the function placeShip will be called with parameters inlcuding the player.shipArray[i] and the randNum generated. The function will be called.
let usedShipSpacesPlayer = [];
let usedShipSpacesComputer = [];

function randomlyPlaceShips(gameBoard, player, iteration, used) {
  if (iteration < player.shipArray.length) {
    let ranArray = [];
    let randNum = Math.floor(Math.random() * 100);
    console.log(`random number: ${randNum}`);
    let secondDigit = randNum % 10;
    console.log(`Second digit: ${secondDigit}`);
    for (let i = 0; i < player.shipArray[iteration].length; i++) {
      ranArray.push(randNum);
    }
    if (
      checkArrays(used, ranArray) == false &&
      10 - secondDigit >= player.shipArray[iteration].length
    ) {
      gameBoard.placeShip(player.shipArray[iteration], randNum);
      for (let i = 0; i < player.shipArray[iteration].length; i++) {
        used.push(randNum);
        randNum++;
      }
      randomlyPlaceShips(gameBoard, player, iteration + 1, used);
      console.log("placed");
    } else if (
      checkArrays(used, ranArray) == true ||
      10 - secondDigit < player.shipArray[iteration].length
    ) {
      console.log("wrong number");
      randomlyPlaceShips(gameBoard, player, iteration, used);
    }
  }
  console.log(gameBoard.boardArray);
}

randomlyPlaceShips(playerBoard, playerOne, 0, usedShipSpacesPlayer);
randomlyPlaceShips(computerBoard, computer, 0, usedShipSpacesComputer);

//add game over key  value pair to game that can be true or false if someone wins make it true. Only allow checkwinner to run if this is false. ******** possibly put usedShipSpaces on a gameBoard class
function checkWinner() {
  let DOM = computerDOMBoard.container;
  DOM.addEventListener("click", () => {
    playerOne.checkIfAllSunk();
    computer.checkIfAllSunk();
    if (playerOne.lost == true) {
      alert("You Lost");
    }
    if (computer.lost == true) {
      alert("You Won");
    }
    console.log(computer.sinkCount);
  });
  console.log("check winner function ran");
}
checkWinner();
