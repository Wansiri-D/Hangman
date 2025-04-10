import { words } from './svkword.js';
import { displayHighScores } from './highscore.js'; // นำเข้า displayHighScores จาก highscore.js

const wordContainer = document.querySelector('#word-container');
const wrongGuessesContainer = document.querySelector('#wrong-guesses');
const gameStatus = document.querySelector('#game-status');
const scoreContainer = document.querySelector('#score');
const startButton = document.querySelector('#start-button');
const difficultySelect = document.querySelector('#difficulty');
const playerNameInput = document.querySelector('#player-name');
const introContainer = document.querySelector('#intro-container');
const gameContainer = document.querySelector('#game-container');
const nameError = document.querySelector('#name-error');
const hangmanImage = document.querySelector('#hangman-img');
const keyboardContainer = document.querySelector('#keyboard-container');
const playAgainButton = document.querySelector('#play-again-button');
const resetButton = document.querySelector('#reset-button');
const showHighScoresButton = document.querySelector('#show-high-scores');

const hangmanImages = [
  'images/0.png',
  'images/1.png',
  'images/2.png',
  'images/3.png',
  'images/4.png',
  'images/5.png',
  'images/6.png',
];

let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;
let gameOver = false;
let score = 0;
let playerName = '';
let currentDifficulty = 'easy';

function startGame() {
  playerName = playerNameInput.value.trim();
  currentDifficulty = difficultySelect.value;

  if (!playerName) {
    nameError.style.display = 'block';
    return;
  }

  nameError.style.display = 'none';
  introContainer.style.display = 'none';
  gameContainer.style.display = 'block';

  selectWord();
  updateGameUI();
  createKeyboard();
  updateScore();
}

function selectWord() {
  let minLength, maxLength;

  if (currentDifficulty === 'easy') {
    minLength = 2;
    maxLength = 6;
  } else if (currentDifficulty === 'medium') {
    minLength = 6;
    maxLength = 12;
  } else if (currentDifficulty === 'hard') {
    minLength = 12;
    maxLength = 17;
  }

  const filteredWords = words.filter(word => {
    const normalizedWord = word.toLowerCase();
    const isValidWord = /^[a-ö]+$/.test(normalizedWord);
    return (
      isValidWord &&
      normalizedWord.length >= minLength &&
      normalizedWord.length <= maxLength
    );
  });

  if (filteredWords.length === 0) {
    gameStatus.textContent = "No words available for this difficulty!";
    return;
  }

  selectedWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  hangmanImage.src = hangmanImages[0];
}

function displayWord() {
  const display = selectedWord
    .split('')
    .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
  wordContainer.textContent = display;

  if (!display.includes('_')) {
    gameWon();
  }
}

function displayWrongGuesses() {
  const wrongLetters = guessedLetters.filter(letter => !selectedWord.includes(letter));
  wrongGuessesContainer.textContent = `Wrong Guesses (${wrongGuesses}/${maxWrongGuesses}): ${wrongLetters.join(', ').toUpperCase()}`;
}

function updateGameUI() {
  displayWord();
  displayWrongGuesses();
  hangmanImage.src = hangmanImages[wrongGuesses];
}

function handleKeyPress(letter, button = null) {
  if (gameOver || guessedLetters.includes(letter)) return;

  letter = letter.toLowerCase();
  guessedLetters.push(letter);

  if (button) button.disabled = true;

  if (selectedWord.includes(letter)) {
    if (button) button.style.backgroundColor = "lightgreen";
  } else {
    if (button) button.style.backgroundColor = "#f08080";
    wrongGuesses++;
  }

  updateGameUI();

  if (wrongGuesses >= maxWrongGuesses) {
    gameOver = true;
    gameLost();
  }
}

function createKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzåäö'.split('');
  keyboardContainer.innerHTML = '';

  alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter.toUpperCase();
    button.addEventListener('click', () => handleKeyPress(letter, button));
    keyboardContainer.appendChild(button);
  });
}

function updateScore() {
  scoreContainer.textContent = score; // แก้จาก textContent = `Score: ${score}` เพราะ HTML มี "Score: " อยู่แล้ว
}

function gameWon() {
  gameOver = true;
  gameStatus.innerHTML = `You won!<br>Press the reset-button to change difficulty.`;
  score = (maxWrongGuesses - wrongGuesses) * 10 + selectedWord.length * 5; // ปรับคะแนนให้สัมพันธ์กับความยาวคำ
  saveHighScore();
  playAgainButton.style.display = 'inline-block';
  resetButton.style.display = 'inline-block';
}

function gameLost() {
  gameOver = true;
  gameStatus.innerHTML = `Game Over! The word was: ${selectedWord}<br>Press the reset-button to change difficulty.`;
  score = 0;
  saveHighScore();
  playAgainButton.style.display = 'inline-block';
  resetButton.style.display = 'inline-block';
}

function saveHighScore() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const date = new Date().toLocaleString();

  highScores.push({
    name: playerName,
    score: score,
    difficulty: currentDifficulty,
    date: date,
  });

  highScores.sort((a, b) => b.score - a.score);
  if (highScores.length > 10) highScores.pop();

  localStorage.setItem('highScores', JSON.stringify(highScores));
}

function playAgain() {
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  score = 0;
  updateScore();

  selectWord();
  updateGameUI();
  createKeyboard();
  gameStatus.textContent = '';
  playAgainButton.style.display = 'none';
  resetButton.style.display = 'inline-block';
}

function resetGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  score = 0;
  playerName = '';
  selectedWord = '';

  scoreContainer.textContent = '0'; // แก้ให้สอดคล้องกับ HTML
  hangmanImage.src = hangmanImages[0];

  wordContainer.textContent = '';
  wrongGuessesContainer.textContent = '';
  gameStatus.textContent = '';

  introContainer.style.display = 'block';
  gameContainer.style.display = 'none';

  playAgainButton.style.display = 'none';
  resetButton.style.display = 'none';

  keyboardContainer.innerHTML = '';
  playerNameInput.value = '';
}

startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
resetButton.addEventListener('click', resetGame);
showHighScoresButton.addEventListener('click', () => displayHighScores('score')); // เรียกจาก highscore.js
