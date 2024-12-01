// List of words for different difficulty levels
const words = {
    easy: ['apple', 'banana', 'grape'],
    medium: ['orange', 'watermelon', 'pineapple'],
    hard: ['strawberry', 'blueberry', 'raspberry']
};


let selectedWord = '';
let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;
let gameActive = false;
let difficulty = 'easy';
let playerName = '';

// DOM elements
const wordDisplay = document.querySelector('#word-display');
const incorrectGuessesDisplay = document.querySelector('#incorrect-guesses');
const hangmanImage = document.querySelector('#hangmanImage');
const keyboard = document.querySelector('#keyboard');
const startGameBtn = document.querySelector('#startGameBtn');
const startGame = document.querySelector('#startGame');
const nameInput = document.querySelector('#nameInput');
const difficultySelect = document.getElementById('difficultySelect');

// Function to choose a random word based on difficulty
function chooseWord() {
    const wordList = words[difficulty];
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters = [];
    incorrectGuesses = 0;
    gameActive = true;
    updateWordDisplay();
    updateIncorrectGuesses();
    updateHangmanImage();
    enableKeyboard();
}


function updateWordDisplay() {
    wordDisplay.innerHTML = '';
    for (let i = 0; i < selectedWord.length; i++) {
        const letter = guessedLetters.includes(selectedWord[i]) ? selectedWord[i] : '_';
        const letterElement = document.createElement('li');
        letterElement.textContent = letter;
        wordDisplay.appendChild(letterElement);
    }
}


function updateIncorrectGuesses() {
    incorrectGuessesDisplay.textContent = `${incorrectGuesses} / ${maxIncorrectGuesses}`;
}

function updateHangmanImage() {
    hangmanImage.src = `images/${incorrectGuesses}.png`;
}


function disableKeyboard() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}


function enableKeyboard() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}


function handleGuess(letter) {
    if (!gameActive || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    
    if (selectedWord.includes(letter)) {
        updateWordDisplay();
        checkWin();
    } else {
        incorrectGuesses++;
        updateIncorrectGuesses();
        updateHangmanImage();
        checkLoss();
    }
}
function checkWin() {
    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        showNotification(`${playerName}, you won the game!`);
        gameActive = false;
        disableKeyboard();
    }
}

// Function to check if the player has lost the game
function checkLoss() {
    if (incorrectGuesses >= maxIncorrectGuesses) {
        showNotification(`${playerName}, you lost the game! The word was "${selectedWord}".`);
        gameActive = false;
        disableKeyboard();
    }
}


function resetGame() {
    guessedLetters = [];
    incorrectGuesses = 0;
    updateIncorrectGuesses();
    updateHangmanImage();
    enableKeyboard();
    updateWordDisplay();
    gameActive = true;
}

// Function to show notification messages
function showNotification(message) {
    const notification = document.getElementById('notification');
    const scoreValue = document.getElementById('score-value');
    scoreValue.textContent = message;
    notification.classList.remove('hide');
    setTimeout(() => {
        notification.classList.add('hide');
    }, 3000);
}

// Add event listener for the keyboard buttons
function createKeyboard() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter.toUpperCase();
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}


startGame.addEventListener('click', () => {
    playerName = nameInput.value.trim();
    difficulty = difficultySelect.value;
    if (playerName && difficulty) {
        chooseWord();
        showNotification(`${playerName}, starting a ${difficulty} game!`);
    } else {
        showNotification('Please enter a name and select a difficulty.');
    }
});


startGameBtn.addEventListener('click', () => {
    resetGame();
    chooseWord();
});


createKeyboard();


updateIncorrectGuesses();


updateHangmanImage();


const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('show'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.target);
        target.classList.add('show');
    });
});
