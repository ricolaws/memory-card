'use strict';

const cards = document.querySelectorAll('.memory-card');
const catMsg = document.getElementById('cat-msg');

// global variables
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let totalCardsFlipped = 0;
let msgIndex = 0;
let text = 'pls, choose a card...';
let speed = 50;

shuffle();

// this function will be called on a card when clicked
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  // the flip class flips the card over
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

// compare the datasets of the chosen cards to determine if they are a match
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unFlipCards();
}

function randomNumber() {
  return Math.floor(Math.random() * 3 + 1);
}

// select a random message to display when the cards don't match
function failMsg() {
  let failPick = randomNumber();
  catMsg.innerHTML = '';
  msgIndex = 0;
  // msgIndex = 0;
  if (failPick === 1) {
    text = 'Hmmmm... nice try.';
    typingEffect();
  } else if (failPick === 2) {
    text = 'Those two look different.';
    typingEffect();
  } else {
    text = 'Uh oh. Not those.';
    typingEffect();
  }
}

// select a random message to display when the cards match
function matchMsg() {
  let matchPick = randomNumber();
  catMsg.innerHTML = '';
  msgIndex = 0;
  if (matchPick === 1) {
    text = `It's a match!`;
    typingEffect();
  } else if (matchPick === 2) {
    text = 'You are get it.';
    typingEffect();
  } else {
    text = 'Good job!';
    typingEffect();
  }
}

function typingEffect() {
  document.documentElement.style.setProperty('--steps', text.length);
  if (msgIndex < text.length) {
    catMsg.innerHTML += text.charAt(msgIndex);
    msgIndex++;
    setTimeout(typingEffect, speed);
  }
}

// remove event listeners from cards and mark them as outOfPlay
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('outOfPlay');
  secondCard.classList.add('outOfPlay');
  matchMsg();
  isGameOver();
  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 2000);
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

function isGameOver() {
  totalCardsFlipped = document.querySelectorAll('.outOfPlay').length;
  if (totalCardsFlipped === 12) {
    text = `You found them all! Amazing!`;
    typingEffect();
    setTimeout(() => {
      cards.forEach(card => card.classList.toggle('flip'));
      totalCardsFlipped = 0;
      resetBoard();
    }, 3000);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

typingEffect();
