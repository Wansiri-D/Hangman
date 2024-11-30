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

//the short way of the top one
/* const elements = document.querySelectorAll(
    '#word-container, #wrong-guesses, #game-status, #score, #start-button, #difficulty, #player-name, #intro-container, #game-container, #name-error, #hangman-img, #keyboard-container, #high-scores-list, #play-again-button, #reset-button, #show-high-scores-button'
  ); */
  

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


const words = {
  easy: ['data', 'variable', 'dom', '', 'java'],
  medium: ['javascript', 'hangman', 'coding', 'browser', 'python'],
  hard: ['developer', 'programming', 'algorithm', 'framework', 'expression']
};


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
  const wordsArray = words[currentDifficulty];
  selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  gameOver = false;
  hangmanImage.src = hangmanImages[0]; 
}


function displayWord() {
  const display = selectedWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
  wordContainer.textContent = display;

  if (!display.includes('_')) {
    gameWon();
  }
}


function displayWrongGuesses() {
  wrongGuessesContainer.textContent = `Wrong Guesses: ${wrongGuesses}`;
}


function handleKeyPress(event) {
  if (gameOver || !event.target.matches('button')) return;

  const letter = event.target.textContent.toLowerCase();

  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    displayWord();
  } else {
    wrongGuesses++;
    hangmanImage.src = hangmanImages[wrongGuesses];
    displayWrongGuesses();
  }

  if (wrongGuesses >= maxWrongGuesses) {
    gameOver = true;
    gameLost();
  }
}


function createKeyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  keyboardContainer.innerHTML = ''; 

  alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter.toUpperCase();
    button.addEventListener('click', handleKeyPress);
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
  gameStatus.textContent = 'Game Over!';
  score = 0;
  saveHighScore();
  playAgainButton.style.display = 'inline-block';
}


function saveHighScore() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const date = new Date().toLocaleString();
  highScores.push({ name: playerName, score: score, date: date });
  highScores.sort((a, b) => b.score - a.score);

  if (highScores.length > 5) highScores.pop();

  localStorage.setItem('highScores', JSON.stringify(highScores));
  displayHighScores();
}

// Display the high scores list
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScoresList.innerHTML = '';

  highScores.forEach(scoreData => {
    const li = document.createElement('li');
    li.textContent = `${scoreData.name} - Score: ${scoreData.score} - Date: ${scoreData.date}`;
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

// Event listeners
startButton.addEventListener('click', startGame);
keyboardContainer.addEventListener('click', handleKeyPress);
playAgainButton.addEventListener('click', playAgain);

// Reset the game without reloading the page
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

// Event listener for Reset button
resetButton.addEventListener('click', resetGame);
