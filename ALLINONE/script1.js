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


  selectedWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  //   console.log('Selected word:', selectedWord);

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
  const wrongLetters = guessedLetters.filter((letter) => !selectedWord.includes(letter))

  wrongGuessesContainer.textContent = `Wrong Guesses (${wrongGuesses}/${maxWrongGuesses}): ${wrongLetters.join(', ').toUpperCase()}`

  /*wrongGuessesContainer.textContent = `Wrong Guesses: ${wrongGuesses}`;*/
}

function handleKeyPress(letter, button = null) {
  if (gameOver || guessedLetters.includes(letter)) return;

  letter = letter.toLowerCase();
  guessedLetters.push(letter);

  if (button) button.disabled = true;

  if (selectedWord.includes(letter)) {
    displayWord(); // Update the word display
    if (button) button.style.backgroundColor = "lightgreen"; // Style the button if the guess is correct
  } else {
    if (button) button.style.backgroundColor = "#f08080"; // Style the button if the guess is incorrect
    wrongGuesses++;
    displayWrongGuesses(); // Update the wrong guesses display
    hangmanImage.src = hangmanImages[wrongGuesses]; // Update hangman image
  }

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
  scoreContainer.textContent = `Score: ${score}`;
}

function gameWon() {
  gameOver = true;
  gameStatus.textContent = 'You won!';
  score = (maxWrongGuesses - wrongGuesses) * 10;
  saveHighScore();
  playAgainButton.style.display = 'inline-block';
}

function gameLost() {
  gameOver = true;
  gameStatus.textContent = `Game Over! The word was: ${selectedWord}`;
  score = 0;
  saveHighScore();
  playAgainButton.style.display = 'inline-block';
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
  console.log(JSON.parse(localStorage.getItem('highScores')));
}

function displayHighScores(sortBy = 'score') {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const highScoresList = document.querySelector('#high-scores-list');
  highScoresList.innerHTML = '';

  if (sortBy === 'score') {
    highScores.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'date') {
    highScores.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

  highScores.forEach(scoreData => {
    const li = document.createElement('li');
    li.innerHTML = `
		<strong>${scoreData.name}</strong>: ${scoreData.score} points 
		<br><small>Difficulty: ${scoreData.difficulty} | Played on: ${scoreData.date}</small>
	  `;
    highScoresList.appendChild(li);
  });
}

function playAgain() {
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  score = 0;
  updateScore();

  selectWord();
  displayWord();
  displayWrongGuesses();
  gameStatus.textContent = '';
  playAgainButton.style.display = 'none';
  resetButton.style.display = 'inline-block';
}

startButton.addEventListener('click', startGame);
keyboardContainer.addEventListener('click', handleKeyPress);
playAgainButton.addEventListener('click', playAgain);

function resetGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  score = 0;
  playerName = '';
  selectedWord = '';

  scoreContainer.textContent = 'Score: 0';
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

  displayHighScores();
}

resetButton.addEventListener('click', resetGame);
