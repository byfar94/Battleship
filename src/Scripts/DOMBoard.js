export { DOMBoard, createDomEl };

class DOMBoard {
  constructor(board, containerName) {
    this.board = board;
    this.array = board.boardArray;
    this.container = createDomEl("section", containerName);
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
  displayShips() {
    for (let i = 0; i < this.spacesDOMArray.length; i++) {
      if (this.array[i].hasShip == true) {
        this.spacesDOMArray[i].style.backgroundColor = "lightblue";
      } else if (this.array[i].hasShip == false) {
        this.spacesDOMArray[i].style.backgroundColor = null;
      }
    }
  }
  playerAttack(game) {
    const movesUsedPlayer = [];
    //add if statement of if gameCount = even you can execute this event listener
    for (let i = 0; i < this.spacesDOMArray.length; i++) {
      this.spacesDOMArray[i].addEventListener("click", () => {
        if (isEven(game.turnCounter) === true) {
          if (movesUsedPlayer.includes(i) == false) {
            movesUsedPlayer.push(i);
            let row = this.array[i].row;
            let column = this.array[i].column;
            this.board.receiveAttack(row, column);
            this.displayHits();
            game.turnCounter++;
          }
        }
      });
    }
  }
  computerAttack(game, obj) {
    let movesUsedComputer = [];
    let array = this.array;
    let board = this.board;
    obj.addEventListener("click", () => {
      if (isEven(game.turnCounter) === false) {
        (function executeAttack() {
          let randNum = Math.floor(Math.random() * 100);
          console.log(randNum);
          console.log(movesUsedComputer);
          if (movesUsedComputer.includes(randNum) == false) {
            movesUsedComputer.push(randNum);
            let rowOb = array[randNum].row;
            let columnOb = array[randNum].column;
            board.receiveAttack(rowOb, columnOb);
            game.turnCounter++;
            console.log(array);
          } else if (movesUsedComputer.length >= 100) {
            console.log("youre done !");
            return;
          } else if (movesUsedComputer.includes(randNum) == true) {
            console.log("Already attacked here");
            executeAttack();
          }
        })();
      }
      this.displayHits();
    });
  }
}

//supporting functions
//check if a number is even
const isEven = (num) => num % 2 === 0;

//function to create a DOM element with a class name
function createDomEl(el, cls) {
  let newEl = document.createElement(el);
  let clsStr = cls.toString();
  let clsTrim = clsStr.replace(/^\s+|\s+$/gm, "");
  newEl.classList.add(clsTrim);
  return newEl;
}
