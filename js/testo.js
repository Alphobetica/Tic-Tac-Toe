const boardState = {
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

let turn = 0;
let active = true;

//if combination in arrayWinner exists for x or o, declare them the winner
const objWinner=[
    ['topLeft', 'topMid', 'topRight'],
    ['midLeft', 'mid', 'midRight'],
    ['botLeft', 'bot', 'botRight'],
    ['topLeft', 'midLeft', 'botLeft'],
    ['topMid', 'mid', 'bot'],
    ['topRight', 'midRight', 'botRight'],
    ['topLeft', 'mid', 'botRight'],
    ['topRight', 'mid', 'botLeft'],
] 

function objCheckWin(){
    for(const condition of objWinner) {
        const cellA = boardState[condition[0]];
        const cellB = boardState[condition[1]];
        const cellC = boardState[condition[2]];
        if (cellA === '' || cellB === '' || cellC === '') {
          continue;
        }

        if(cellA === cellB && cellB === cellC) {
            active = false;
            if (turn % 2 === 0) {
            document.getElementById('xWin').classList.toggle('hidden');
            break;
            } else {
            document.getElementById('oWin').classList.toggle('hidden');
            break;
            }
        }
    }
}

class Position {
  constructor(id) {
      this.id = id;
      document.getElementById(id).addEventListener('click', this.placeToken);
    }
    placeToken() {
      if(!active) {
        return -1;
      }
        if(document.getElementById(`${this.id}`).innerText == '') {
            if (turn % 2 === 0) {
                document.getElementById(this.id).innerText = 'X';
                boardState[this.id] = 'X';
            } else {
                document.getElementById(this.id).innerText = 'O';
                boardState[this.id] = 'O';
            }
            objCheckWin();
            ++turn;
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

document.querySelector('button').addEventListener('click', reset);

function reset() {
  document.querySelectorAll('h2').forEach(element => element.innerText = '');
  document.getElementById('oWin').classList.add('hidden');
  document.getElementById('xWin').classList.add('hidden');
  turn = 0;
  active = true;
  for (const key in boardState) {
    boardState[key] = '';
  }
}

// document.getElementById('xWin').classList.toggle('hidden')
// document.getElementById('oWin').classList.toggle('hidden')