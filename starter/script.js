'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition
let playing = true;
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');
const scores = [0, 0];
let cuurentScore = 0;
let activePlayer = 0;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  cuurentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //if dice is 1: switch to next player
    if (dice !== 1) {
      cuurentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        cuurentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current value to activePlayer
    scores[activePlayer] += cuurentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if score >=100
    if (scores[activePlayer] >= 10) {
      //finish
      playing = false;
      diceEL.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
