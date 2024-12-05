// script.js

// Game variables
let wordToGuess;
let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;
let playerName = '';
let difficultyLevel = 'easy';
let words = {
  easy: ['cat', 'dog', 'bird', 'fish', 'apple'],
  medium: ['elephant', 'giraffe', 'umbrella', 'banana', 'soccer'],
  hard: ['algorithm', 'pneumonia', 'mysterious', 'exquisite', 'paradigm']
};

// Initialize the game
export function startGame() {
  playerName = document.getElementById('player-name').value;
  difficultyLevel = document.getElementById('difficulty').value;

  if (!playerName) {
    document.getElementById('name-error').style.display = 'block';
    return;
  }

  document.getElementById('name-error').style.display = 'none';
  document.getElementById('intro-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';

  // Choose a word from the selected difficulty
  wordToGuess = getRandomWord();
  guessedLetters = [];
  incorrectGuesses = 0;
  updateWordDisplay();
  updateIncorrectGuesses();
  generateKeyboard();
}

// Get a random word based on difficulty
function getRandomWord() {
  const wordList = words[difficultyLevel];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Update word display based on guesses
function updateWordDisplay() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = wordToGuess.split('').map(letter => {
    return guessedLetters.includes(letter) ? letter : '_';
  }).join(' ');
}

// Update incorrect guesses
function updateIncorrectGuesses() {
  const wrongGuessesDisplay = document.querySelector('.wrong-guesses b');
  wrongGuessesDisplay.textContent = `${incorrectGuesses} / ${maxIncorrectGuesses}`;
  
  if (incorrectGuesses >= maxIncorrectGuesses) {
    endGame(false);
  }
}

// Handle keyboard clicks
function generateKeyboard() {
  const keyboardContainer = document.getElementById('keyboard-container');
  keyboardContainer.innerHTML = '';

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('letter');
    button.onclick = () => handleLetterClick(letter);
    keyboardContainer.appendChild(button);
  });
}

// Handle a letter guess
function handleLetterClick(letter) {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  if (!wordToGuess.includes(letter)) {
    incorrectGuesses++;
    document.getElementById('hangman-img').src = `images/${incorrectGuesses}.png`;
  }

  updateWordDisplay();
  updateIncorrectGuesses();

  // Disable the button after it's clicked
  document.querySelectorAll('.letter').forEach(button => {
    if (button.textContent === letter) {
      button.disabled = true;
    }
  });
}

// End the game (win or lose)
function endGame(isWin) {
  const gameStatus = document.getElementById('game-status');
  gameStatus.textContent = isWin ? 'You won!' : 'You lost!';

  document.getElementById('play-again-button').style.display = 'block';
  document.getElementById('reset-button').style.display = 'block';
}

document.getElementById('start-button').addEventListener('click', startGame);
