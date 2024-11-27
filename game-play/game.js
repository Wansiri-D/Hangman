import { words } from "../svkword.js";

let selectedWord = '';
let guessedLetters = [];
let wrongLetters = [];
let remainingGuesses = 6;
let wins = 0;
let losses = 0;

const startButton = document.querySelector('#start-btn');
const wordDisplay = document.querySelector('#word');
const wrongLettersDisplay = document.querySelector('#wrong-letters');
const letterError = document.querySelector('#letter-error');
const finalMsgContainer = document.querySelector('#final-msg-container');
const finalMessage = document.querySelector('#final-message');
const playButton = document.querySelector('#play-button');
const scoreWin = document.querySelector('.win');
const scoreLose = document.querySelector('.lost');
const keyboardContainer = document.querySelector('#keyboard');

const hangmanParts = [
    document.getElementById('line-1'),
    document.getElementById('line-2'),
    document.getElementById('line-3'),
    document.getElementById('line-4'),
    document.getElementById('head'),
    document.getElementById('body'),
    document.getElementById('arm-left'),
    document.getElementById('arm-right'),
    document.getElementById('leg-left'),
    document.getElementById('leg-right')
];


startButton.addEventListener('click', startGame);

function startGame() {
    guessedLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    finalMsgContainer.style.display = 'none';

    const filteredWords = words.filter(word => word.length >= 10);
    selectedWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    console.log('Selected Word:', selectedWord);

    updateWordDisplay();
    updateWrongLettersDisplay();
    createKeyboard();
    resetHangman();
    document.querySelector('.figure-container').style.display = 'none';
}


function createKeyboard() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzöäå';
    keyboardContainer.innerHTML = '';

    for (let i = 0; i < alphabet.length; i++) {
        const button = document.createElement('button');
        button.classList.add('key');
        button.innerText = alphabet[i];
        button.addEventListener('click', function () {
            handleLetterGuess(alphabet[i]);
            button.disabled = true; 
        });
        keyboardContainer.appendChild(button);
    }
}

function handleLetterGuess(guess) {
    if (guessedLetters.includes(guess) || wrongLetters.includes(guess)) {
        letterError.style.display = 'block';
        setTimeout(() => letterError.style.display = 'none', 1000);
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        updateWordDisplay();
    } else {
        wrongLetters.push(guess);
        remainingGuesses--;
        updateWrongLettersDisplay();
        updateHangman();
    }

    checkGameStatus();
}

function updateWordDisplay() {
    let displayWord = selectedWord.split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
    wordDisplay.innerHTML = displayWord;
}


function updateWrongLettersDisplay() {
    wrongLettersDisplay.innerHTML = `Wrong letters: ${wrongLetters.join(', ')}`;
}

function resetHangman() {
    hangmanParts.forEach(part => part.style.strokeDasharray = '0');
}

function updateHangman() {

    if (remainingGuesses === 5) {
        document.querySelector('.figure-container').style.display = 'block';
    }

    const hangmanIndex = 6 - remainingGuesses; 
    if (hangmanIndex >= 0) {
        hangmanParts[hangmanIndex].style.strokeDasharray = '5'; 
    }
}


function checkGameStatus() {
    const displayWord = selectedWord.split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    if (!displayWord.includes('_')) {
        wins++;
        scoreWin.innerText = wins;
        showFinalMessage("You Win!");
    } else if (remainingGuesses <= 0) {
        losses++;
        scoreLose.innerText = losses;
        showFinalMessage("You Lose! The word was: " + selectedWord);
    }
}

function showFinalMessage(message) {
    finalMsgContainer.style.display = 'block';
    finalMessage.innerHTML = message;

    playButton.removeEventListener('click', startGame);
    playButton.addEventListener('click', startGame);
}

startGame();
