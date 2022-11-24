class Game {
  constructor() {
    document.querySelector('button').addEventListener('click', this.reset);
    this.turn = 0;
    this.active = true;
    this.boardState = {
      topLeft: '',
      topMid: '',
      topRight: '',
      midLeft: '',
      mid: '',
      midRight: '',
      botLeft: '',
      bot: '',
      botRight: ''
    };
    this.objWinner = [
      ['topLeft', 'topMid', 'topRight'],
      ['midLeft', 'mid', 'midRight'],
      ['botLeft', 'bot', 'botRight'],
      ['topLeft', 'midLeft', 'botLeft'],
      ['topMid', 'mid', 'bot'],
      ['topRight', 'midRight', 'botRight'],
      ['topLeft', 'mid', 'botRight'],
      ['topRight', 'mid', 'botLeft'],
    ];
  }
  
  //if combination in arrayWinner exists for x or o, declare them the winner
  objCheckWin() {
    for(const condition of this.objWinner) {
        const cellA = this.boardState[condition[0]];
        const cellB =  this.boardState[condition[1]];
        const cellC =  this.boardState[condition[2]];
        if (cellA === '' || cellB === '' || cellC === '') {
          continue;
        }

        if(cellA === cellB && cellB === cellC) {
            this.active = false;
            if (this.turn % 2 === 0) {
            document.getElementById('xWin').classList.toggle('hidden');
            break;
            } else {
            document.getElementById('oWin').classList.toggle('hidden');
            break;
            }
        }
    }
    if(this.active && Object.values(this.boardState).every(element => element)) {
      document.querySelector('.notifs').appendChild(document.createElement('span')).innerText = 'Draw!'
    }
  }
  reset() {
    document.querySelectorAll('h2').forEach(element => element.innerText = '');
    document.querySelectorAll('span').forEach(element => element.classList.add('hidden'));
    newGame = new Game();
  }
}

class Position {
  constructor(id) {
      this.id = id;
      document.getElementById(id).addEventListener('click', this.placeToken);
    }
    placeToken() {
      if(!newGame.active) {
        return -1;
      }
        if(document.getElementById(`${this.id}`).innerText == '') {
            if (newGame.turn % 2 === 0) {
                document.getElementById(this.id).innerText = 'X';
                newGame.boardState[this.id] = 'X';
            } else {
                document.getElementById(this.id).innerText = 'O';
                newGame.boardState[this.id] = 'O';
            }
            newGame.objCheckWin();
            ++newGame.turn;
        } else {
            document.querySelector('h3').classList.toggle('hidden');
            setTimeout(() => document.querySelector('h3').classList.toggle('hidden'), 3000);
        }
    }
}

const topLeft = new Position('topLeft');
const topMid = new Position('topMid');
const topRight = new Position('topRight');
const midLeft = new Position('midLeft');
const mid = new Position('mid');
const midRight = new Position('midRight');
const botLeft = new Position('botLeft');
const bot = new Position('bot');
const botRight = new Position('botRight');
let newGame = new Game();

