let playerName = ''
let playerScore = 0
let currentWord = ''
let correctLetters = []
let wrongLetters = []
let wrongGuessCount = 0
const maxGuesses = 6

const codingQuiz = [
    { word: 'variable', hint: 'A placeholder for a value.' },
    { word: 'function', hint: 'A block of code that performs a specific task.' },
    { word: 'loop', hint: 'Repeats a sequence of instructions.' },
];

// Event listener for starting the game
document.getElementById('start-game').addEventListener('click', () => {
    const nameInput = document.getElementById('player-name').value.trim()
    if (!nameInput) {
        alert('Please enter your name!')
        return;
    }

    playerName = nameInput;
    toggleVisibility('.player-info', '.container')
    resetGame()
});

// Reset the game
const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * codingQuiz.length)
    const { word, hint } = codingQuiz[randomIndex]

    currentWord = word.toUpperCase()
    correctLetters = []
    wrongLetters = []
    wrongGuessCount = 0

    updateUI(hint);
};

// Update the UI for a new game
const updateUI = (hint) => {
    document.querySelector('.word-display').innerHTML = currentWord
        .split('')
        .map(() => '<li class="letter">_</li>')
        .join('');
    document.querySelector('.guesses-text b').innerText = `${wrongGuessCount} / ${maxGuesses}`
    document.getElementById('wrong-letters').innerText = ''
    document.querySelector('.hint-text b').innerText = hint
    document.querySelector('.hangman-box img').src = 'images/0.png'
    renderKeyboard()
};

// Render the keyboard
const renderKeyboard = () => {
    const keyboardDiv = document.querySelector('.keyboard')
    keyboardDiv.innerHTML = ''
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter) => {
        const button = document.createElement('button')
        button.innerText = letter
        button.addEventListener('click', () => handleGuess(button, letter))
        keyboardDiv.appendChild(button);
    });
};

// Handle a guess
const handleGuess = (button, letter) => {
    button.disabled = true;

    if (currentWord.includes(letter)) {
        [...currentWord].forEach((char, index) => {
            if (char === letter) {
                correctLetters.push(char);
                document.querySelectorAll('.word-display .letter')[index].innerText = char;
            }
        });

        if (correctLetters.length === currentWord.length) endGame(true);
    } else {
        wrongLetters.push(letter);
        wrongGuessCount++;
        document.getElementById('wrong-letters').innerText = wrongLetters.join(', ');
        document.querySelector('.hangman-box img').src = `images/${wrongGuessCount}.png`;
        document.querySelector('.guesses-text b').innerText = `${wrongGuessCount} / ${maxGuesses}`;
        if (wrongGuessCount === maxGuesses) endGame(false);
    }
};

// End the game
const endGame = (isWin) => {
    playerScore = isWin ? playerScore + 10 : Math.max(0, playerScore - 5);

    const resultMessage = isWin
        ? `Congratulations! You guessed the word: ${currentWord}`
        : `Game Over! The correct word was: ${currentWord}`;

    document.getElementById('game-result-message').innerText = resultMessage;
    toggleVisibility('.container', '#game-over');
};

// Toggle visibility of elements
const toggleVisibility = (...selectors) => {
    selectors.forEach((selector) => {
        document.querySelector(selector).classList.toggle('hidden');
    });
};

// Event listener for play again
document.getElementById('play-again').addEventListener('click', () => {
    toggleVisibility('#game-over', '.container');
    resetGame();
});

// Event listener for viewing the scoreboard
document.getElementById('view-scoreboard').addEventListener('click', () => {
    window.location.href = 'scoreboard.html';
});
