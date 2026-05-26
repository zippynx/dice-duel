'use strict';

const _ = false;
const X = true;
const DICE_FACES = {
  1: [_, _, _,
      _, X, _,
      _, _, _],

  2: [_, _, X,
      _, _, _,
      X, _, _],

  3: [_, _, X,
      _, X, _,
      X, _, _],

  4: [X, _, X,
      _, _, _,
      X, _, X],

  5: [X, _, X,
      _, X, _,
      X, _, X],

  6: [X, _, X,
      X, _, X,
      X, _, X],
};

function renderFace(faceEl, number) {
  faceEl.innerHTML = '';

  DICE_FACES[number].forEach(hasPip => {
    const cell = document.createElement('div');
    cell.className = 'cell';

    if (hasPip) {
      const pip = document.createElement('div');
      pip.className = 'pip';
      cell.appendChild(pip);
    }

    faceEl.appendChild(cell);
  });
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  const btn    = document.getElementById('rollBtn');
  const dice1  = document.getElementById('dice1');
  const dice2  = document.getElementById('dice2');
  const face1  = document.getElementById('face1');
  const face2  = document.getElementById('face2');
  const result = document.getElementById('result');
  const card1  = document.getElementById('card1');
  const card2  = document.getElementById('card2');
  const score1 = document.getElementById('score1');
  const score2 = document.getElementById('score2');

  btn.disabled = true;

  card1.classList.remove('winner', 'loser');
  card2.classList.remove('winner', 'loser');
  result.classList.remove('pop');
  result.textContent = '…';
  score1.textContent = '—';
  score2.textContent = '—';

  dice1.classList.add('rolling');
  dice2.classList.add('rolling');

  const n1 = rollD6();
  const n2 = rollD6();

  setTimeout(() => {
    dice1.classList.remove('rolling');
    dice2.classList.remove('rolling');

    renderFace(face1, n1);
    renderFace(face2, n2);

    score1.textContent = n1;
    score2.textContent = n2;

    void result.offsetWidth;
    result.classList.add('pop');

    if (n1 > n2) {
      result.textContent = 'Player One Wins';
      card1.classList.add('winner');
      card2.classList.add('loser');
    } else if (n2 > n1) {
      result.textContent = 'Player Two Wins';
      card2.classList.add('winner');
      card1.classList.add('loser');
    } else {
      result.textContent = "It's a Draw";
    }

    btn.disabled = false;
  }, 580);
}

document.addEventListener('DOMContentLoaded', () => {
  renderFace(document.getElementById('face1'), 6);
  renderFace(document.getElementById('face2'), 6);

  document.getElementById('rollBtn').addEventListener('click', rollDice);
});