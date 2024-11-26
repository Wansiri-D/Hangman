const word = localStorage.getItem('correctWord')
const guesses = localStorage.getItem('guessCount')

// display
document.getElementById('correct-word').textContent = 'The right word: ${correctWord'
document.getElementById('guesses').textContent = 'Total guess: ${guessCount'

// Function for the button "Play Again"
document.getElementById('play-again').addEventListener('click', () => {
    window.location.href = 'game.html'
});

// Function for the button "View Heigh Scores"
document.getElementById('view-scores').addEventListener('click', () => {
    window.location.href = 'scores.html'
});