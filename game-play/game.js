// svgword.js (unchanged)


// script1.js (main game script)
import { words } from "../svenska-ord.js";

document.addEventListener('DOMContentLoaded', function () {
   // Game state variables
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
   const scoreLose = document.querySelector('.lose');
   const keyboardContainer = document.querySelector('#keyboard');

   // Hangman parts (SVG elements)
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

   // Start new game
   startButton.addEventListener('click', startGame);

   // Handle letter key click
   keyboardContainer.addEventListener('click', function (e) {
       if (e.target && e.target.classList.contains('key')) {
           let letter = e.target.innerText.toLowerCase();
           e.target.disabled = true; // Disable the button after it's clicked
           handleGuess(letter);
       }
   });

   // Start the game
   function startGame() {
       guessedLetters = [];
       wrongLetters = [];
       remainingGuesses = 6;
       finalMsgContainer.style.display = 'none';

       // Filter the words array to only include words with at least 10 letters
       const filteredWords = words.filter(word => word.length >= 10);
       selectedWord = filteredWords[Math.floor(Math.random() * filteredWords.length)]; // Randomly select a word
       console.log('Selected Word:', selectedWord);  // Debugging line to check word selection

       updateWordDisplay();
       updateWrongLettersDisplay();
       createKeyboard();
       resetHangman();
       document.querySelector('.figure-container').style.display = 'none'; // Hide the hangman initially
   }

   // Create the virtual keyboard dynamically
   function createKeyboard() {
       const alphabet = 'abcdefghijklmnopqrstuvwxyzöäå';
       keyboardContainer.innerHTML = ''; // Clear the keyboard container
       for (let i = 0; i < alphabet.length; i++) {
           const button = document.createElement('button');
           button.classList.add('key');
           button.innerText = alphabet[i];
           keyboardContainer.appendChild(button);
       }
   }

   // Reset hangman figure
   function resetHangman() {
       hangmanParts.forEach(part => part.style.strokeDasharray = '0');
   }

   // Update the word display with underscores and guessed letters
   function updateWordDisplay() {
       let displayWord = selectedWord.split('')
           .map(letter => guessedLetters.includes(letter) ? letter : '_')
           .join(' ');  // Adding space between letters
       wordDisplay.innerHTML = displayWord;
   }

   // Update the wrong letters display
   function updateWrongLettersDisplay() {
       wrongLettersDisplay.innerHTML = `Wrong letters: ${wrongLetters.join(', ')}`;
   }

   // Handle letter guesses
   function handleGuess(guess) {
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

   // Update the hangman figure based on incorrect guesses
   function updateHangman() {
       // Show the hangman figure when the first incorrect guess is made
       if (remainingGuesses === 5) {  // Display hangman on the first incorrect guess
           document.querySelector('.figure-container').style.display = 'block';
       }

       // Show parts progressively based on the number of wrong guesses
       hangmanParts[6 - remainingGuesses].style.strokeDasharray = '5'; // Adjust for 6 remaining guesses
   }

   // Check game status to see if player wins or loses
   function checkGameStatus() {
       if (!wordDisplay.innerHTML.includes('_')) {
           wins++;
           scoreWin.innerText = wins;
           showFinalMessage("You Win!");
       } else if (remainingGuesses <= 0) {
           losses++;
           scoreLose.innerText = losses;
           showFinalMessage("You Lose! The word was: " + selectedWord);
       }
   }

   // Show final message after win or loss
   function showFinalMessage(message) {
       finalMsgContainer.style.display = 'block';
       finalMessage.innerHTML = message;
       playButton.addEventListener('click', startGame);
   }

   // Initialize game on page load
   startGame();
});
