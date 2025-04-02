import { words } from './svenska-ord.js';

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
const highScoresList = document.querySelector('#high-scores-list');
const playAgainButton = document.querySelector('#play-again-button');
const resetButton = document.querySelector('#reset-button');
const showHighScoresButton = document.querySelector('#show-high-scores-button');

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
  displayWord();
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

  //   console.log('Filtered words:', filteredWords);


  if (filteredWords.length === 0) {
    console.error('No valid words found for the current difficulty.');
    return;
  }
