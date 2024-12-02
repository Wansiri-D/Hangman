import { words } from "./svenska-ord.js";


// DOM Elements
const wordDisplay = document.getElementById("word-display");
const incorrectGuessesDisplay = document.getElementById("incorrect-guesses");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-btn");
const spelaIgenBtn = document.getElementById("spela-igen-btn");
const visaPoangBtn = document.getElementById("visa-poang-btn");
const hangmanFigure = document.querySelector(".hangman-figure");

// Hangman parts

const hangmanParts = [
  document.getElementById("head"),
  document.getElementById("body"),
  document.getElementById("arms"),
  document.getElementById("legs"),
  document.getElementById("scaffold"),
  document.getElementById("ground")
];

// Variables
let wordToGuess = ''; 
let guessedLetters = [];
let incorrectGuesses = []; 
const maxIncorrectGuesses = hangmanParts.length;

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

// Get Random Word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Handle Guess
function handleGuess() {
  const letter = guessInput.value.toUpperCase();
  guessInput.value = "";

  if (!letter || !/^[A-ZÅÄÖ]$/.test(letter)) {
    showCustomDialog("Vänligen skriv in en giltig bokstav.");
    return;
  }

  if (guessedLetters.includes(letter) || incorrectGuesses.includes(letter)) {
    showCustomDialog("Du har redan gissat denna bokstav!");
    return;
  }

  if (wordToGuess.includes(letter)) {
    guessedLetters.push(letter);
	console.log('gissade rätt');
	
  } else {
    incorrectGuesses.push(letter);
    revealHangmanPart();
	console.log('gissade fel', wordToGuess, letter);
	
  }

  updateWordDisplay();
  updateIncorrectGuesses();

  if (checkWin()) {
    /*showCustomDialog("Grattis! Du gissade ordet!");
    initGame();*/
	hideViews()
	showEndScreen(true, wordToGuess)
  } else if (incorrectGuesses.length >= maxIncorrectGuesses) {
    /*showCustomDialog(`Du förlorade! Ordet var: ${wordToGuess}`);
    initGame();*/
	hideViews()
	showEndScreen(false, wordToGuess)
  }
}

//boolean funcion win/lose
function showEndScreen(isWinner) {
	const win = document.querySelector('#win');
	const lose = document.querySelector('#lose');
	if (isWinner) {
		document.querySelector('#win').classList.remove('hidden');
    	document.querySelector('#lose').classList.add('hidden');
	} else  {
		document.querySelector('#lose').classList.remove('hidden');
    	document.querySelector('#win').classList.add('hidden');
		
	} 
	
}
function hideWiews() {
	const bodyStart = document.querySelector('#body-start'); 
	const bodyGame = document.querySelector('#body-game'); 
	const bodyScore = document.querySelector('#body-score');
	//const win = document.querySelector('#win');
	//const lose = document.querySelector('#lose');
	document.querySelector('#body-game').classList.add('hide');
	document.querySelector('#body-score').classList.add('hide');
	document.querySelector('#body-start').classList.add('hide');
	//win.classList.add('hidden');
	//lose.classList.add('hidden');
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

// Reveal Hangman Part
function revealHangmanPart() {
  const part = hangmanParts[incorrectGuesses.length - 1];
  if (part) part.style.visibility = "visible";
}

// Reset Hangman
function resetHangman() {
  hangmanParts.forEach((part) => {
    part.style.visibility = "hidden";
  });
}

// Check Win Condition
function checkWin() {
  return wordToGuess.split("").every((letter) => guessedLetters.includes(letter));
}

// Show Custom Dialog
function showCustomDialog(message) {
  const dialog = document.createElement("div");
  dialog.classList.add("custom-dialog");
  dialog.innerHTML = `
    <p>${message}</p>
    <button id="close-dialog">OK</button>
  `;
  document.body.appendChild(dialog);

  const closeButton = document.getElementById("close-dialog");
  closeButton.addEventListener("click", () => {
    document.body.removeChild(dialog);
  });
}

  // Save Game Result

  //Mickan lagt till för att spara ner allt till score.
function saveGameResult(didWin) {
	// Hämta spelarens namn från start-sidan
  const playerName = localStorage.getItem("playerName") || "Spelare"; // Fallback if no name
  // Skapa resultatobjektet
  const result = {
    name: playerName,//hämtar namn från start
    incorrectGuesses: incorrectGuesses.length,
    wordLength: wordToGuess.length,
    time: new Date().toISOString(),
    guessedCorrectly: didWin,
  };
 // Hämta tidigare resultat från localStorage
  const gameResults = JSON.parse(localStorage.getItem("gameResults")) || [];
  gameResults.push(result);
  localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

  // input and button
 //document.getElementById('guess-input').disabled = false;
 //document.getElementById('guess-btn').disabled = false;
 //document.getElementById('guess-input').value = '';  // Clear the input field
 


// Event Listeners
guessButton.addEventListener("click", handleGuess);
spelaIgenBtn.addEventListener("click", initGame); // Reset game on 'spela igen'
visaPoangBtn.addEventListener("click", () => {
  const results = JSON.parse(localStorage.getItem("gameResults")) || [];
  const resultsMessage = results
    .map(
      (result) =>
        `${result.name}: ${result.wordLength} bokstäver, ${
          result.incorrectGuesses
        } fel (${result.guessedCorrectly ? "Vann" : "Förlorade"})`
    )
    .join("\n");

  showCustomDialog(resultsMessage || "Inga resultat att visa ännu.");
});

// Start Game
initGame();
let selectedParts = {
    head: ''
}

// When click on the image.
const clickableImages = document.querySelectorAll('.clickable-image')

clickableImages.forEach(img => {
    img.addEventListener('click', function() {
        const part = this.getAttribute('data-part')  // Get selected value from data-part.

        // Update the values ​​of the selected part.
        const partType = this.closest('.option').id  // Find the ID of the selected part (ex. head).
        selectedParts[partType] = part

        // Remove selection from other images & add selection to the clicked image.
        document.querySelectorAll(`#${partType} .clickable-image`).forEach(image => {
            image.classList.remove('selected')  // Cancel Selection
        })
        this.classList.add('selected')  // Select image

        // Show selected Hangman.
        displayHangmanCharacter()
    })
})

// Function to display selected Hangman.
function displayHangmanCharacter() {
    if (selectedParts.head) {
        const hangmanCharacter = `<img src="img/${selectedParts.head}.png" alt="${selectedParts.head}">`
        document.getElementById('hangman-character').innerHTML = hangmanCharacter
    }
}

// Game start function when pressing the "Start Game" button.
document.getElementById('start-game').addEventListener('click', function() {
    // Get player name
    const playerName = document.getElementById('player-name').value.trim()

    // Check if the player has entered their name.
    if (!playerName) {
        alert("Ange ditt namn!")
        return
    }

    // Check if the player has selected Hangman.
    if (!selectedParts.head) {
        alert("Välj Hangman!")
        return
    }

    // If the player enters their name & selects Hangman
    console.log(`Välkomna, ${playerName}! Startar spel...`)
    console.log(`Din Hangman: ${selectedParts.head}`)
})
