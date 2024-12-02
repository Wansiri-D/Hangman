
import { words } from "./svenska-ord.js";


//toggle vy


//boolean funcion win/lose
function showEndScreen(isWinner, word) {
	const win = document.querySelector('#win');
	const lose = document.querySelector('#lose');
	if (isWinner) {
		document.querySelector('#win').classList.remove('hidden');
    	document.querySelector('#lose').classList.add('hidden');
	} else  {
		document.querySelector('#lose').classList.remove('hidden');
    	document.querySelector('#win').classList.add('hidden');
	} 
	// Visa det vinnande ordet om det finns
    if (!isWinner && word) {
        lose.textContent = `Tyvärr, ordet var: ${word}`;
    }
}
	
	//anropa function
	showEndScreen(true)
	showEndScreen(false)
    

window.addEventListener('load', () => {   
	 const bodyStart = document.querySelector('#body-start');    
	 const bodyGame = document.querySelector('#body-game');    
	 const bodyScore = document.querySelector('#body-score'); 
	 const win = document.querySelector('#win');
	 const lose = document.querySelector('#lose');  
	 hideViews()
	 bodyStart.classList.remove('hide');    
	

// Flikar toggla mellan spelvyer
document.querySelector('#start-flik').addEventListener('click', function() {
	hideViews()
	document.querySelector('#body-start').classList.remove('hide');
});
});
document.querySelector('#game-wiew-flik').addEventListener('click', function() {
	hideViews()
	document.querySelector('#body-game').classList.remove('hide');
});

document.querySelector('#score-flik').addEventListener('click', function() {
	hideViews()
	document.querySelector('#body-score').classList.remove('hide');
});

function hideViews() {
	const bodyStart = document.querySelector('#body-start'); 
	const bodyGame = document.querySelector('#body-game'); 
	const bodyScore = document.querySelector('#body-score');
	const win = document.querySelector('#win');
	const lose = document.querySelector('#lose');
	bodyStart.classList.add('hide')
	bodyGame.classList.add('hide')
	bodyScore.classList.add('hide')
	win.classList.add('hidden');
	lose.classList.add('hidden');
	
}

//spela igen och visa poäng buttons
document.querySelector('#spela-igen-btn').addEventListener('click', function() {
	hideViews()
	document.querySelector('#body-game').classList.remove('hide');
	initGame()
});
	
document.querySelector('#visa-poang-btn').addEventListener('click', function() {
	hideViews()
	document.querySelector('#body-score').classList.remove('hide');
	
});

// sriva ut ordet + antal gissningar i win/lose


//dela upp win/lose
const gameUpdateLose = document.querySelector('.game-update-lose');
const gameUpdateWin = document.querySelector('.game-update-win');
const theWordLose = document.createElement('p');
const theGuessLose = document.createElement('p');
const theWordWin = document.createElement('p');
const theGuessWin = document.createElement('p');
let wordToGuess = ''; 
const guessInput = document.getElementById("guess-input");
let incorrectGuesses = []; 
const incorrectGuessesDisplay = document.getElementById("incorrect-guesses");
const wordDisplay = document.getElementById("word-display");
let guessedLetters = [];

wordToGuess = getRandomWord();
theWordLose.innerText = `Ordet var: ${wordToGuess}`;
theGuessLose.innerText = `Antal gissningar: ${incorrectGuesses.length}`;

theWordWin.innerText = `Ordet var: ${wordToGuess}`;
theGuessWin.innerText = `Antal gissningar ${incorrectGuesses.length}`;

gameUpdateLose.appendChild(theWordLose);
gameUpdateLose.appendChild(theGuessLose);
gameUpdateWin.appendChild(theWordWin);
gameUpdateWin.appendChild(theGuessWin);



updateWordDisplay()
//updateIncorrectGuesses();
handleGuess()
console.log('Valt ord:', wordToGuess);



// Get Random Word
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }
  
  // Update Word Display
function updateWordDisplay() {
	wordDisplay.textContent = wordToGuess
	  .split("")
	  .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
	  .join(" ");
	  console.log('word display: ', guessedLetters);
	  
  }
 
  // Update Incorrect Guesses
function updateIncorrectGuesses() {
	incorrectGuessesDisplay.textContent = incorrectGuesses.join(", ");
  }
  
 
  // Handle Guess
  function handleGuess() {
	const letter = guessInput.value.toUpperCase();
	guessInput.value = "";
  
	/*if (!letter || !/^[A-ZÅÄÖ]$/.test(letter)) {
	  showCustomDialog("Vänligen skriv in en giltig bokstav.");
	  return;
	}
  
	if (guessedLetters.includes(letter) || incorrectGuesses.includes(letter)) {
	  showCustomDialog("Du har redan gissat denna bokstav!");
	  return;
	}*/
  
	if (wordToGuess.includes(letter)) {
	  guessedLetters.push(letter);
	  console.log('gissade rätt');
	  
	} else {
	  incorrectGuesses.push(letter);
	  revealHangmanPart();
	  console.log('gissade fel', wordToGuess, letter);
	  
	}
}
// Initialize Game
function initGame() {
	wordToGuess = getRandomWord();
	guessedLetters = [];
	incorrectGuesses = [];
	updateWordDisplay();
	updateIncorrectGuesses();
	resetHangman();
	guessInput.disabled = false;
	guessButton.disabled = false;
  }