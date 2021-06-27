'use strict';

const cards = document.querySelectorAll('.memory-card');
const catMsg = document.getElementById('cat-msg');

// global variables
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let totalCardsFlipped = 0;

shuffle();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    //first flip
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second flip
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unFlipCards();
}

function randomNumber() {
  return Math.floor(Math.random() * 3 + 1);
}

function failMsg() {
  let failPick = randomNumber();
  if (failPick === 1) {
    catMsg.textContent = 'Hmmmm... nice try.';
  } else if (failPick === 2) {
    catMsg.textContent = 'Those two look different';
  } else {
    catMsg.textContent = 'Uh oh.';
  }
}

function matchMsg() {
  let matchPick = randomNumber();
  if (matchPick === 1) {
    catMsg.textContent = `It's a match!`;
  } else if (matchPick === 2) {
    catMsg.textContent = 'Not bad.';
  } else {
    catMsg.textContent = 'Nice job!';
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('outOfPlay');
  secondCard.classList.add('outOfPlay');
  matchMsg();
  gameOver();
  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
  failMsg();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function gameOver() {
  totalCardsFlipped = document.querySelectorAll('.outOfPlay').length;
  if (totalCardsFlipped === 12) {
    catMsg.textContent = `You found them all! Amazing!`;
    setTimeout(() => {
      cards.forEach(card => card.classList.toggle('flip'));
      totalCardsFlipped = 0;
      resetBoard();
    }, 2000);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

console.log(randomNumber(), randomNumber());
