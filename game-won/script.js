const word = localStorage.getItem('word')
const guesses = localStorage.getItem('guesses')

// display
document.getElementById('word').innerText = word;
document.getElementById('guesses').innerText = guesses;

// Function for the button "Play Again"
document.getElementById('play-again').addEventListener('click', () => {
    window.location.href = ''
});

// Function for the button "View Heigh Scores"
document.getElementById('view-scores').addEventListener('click', () => {
    window.location.href = ''
});
