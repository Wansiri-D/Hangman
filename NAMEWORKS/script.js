//this is for the First page
// Name submission and validation
document.querySelector('#submitButton').addEventListener('click', function() {
    const nameInput = document.querySelector('#nameInput').value;
    const message = document.querySelector('#message');
    const gameSection = document.querySelector('#gameSection');
    const submitButton = document.querySelector('#submitButton');

    // Validate that the name input contains only letters (including Arabic characters)
    if (nameInput.trim() === "") {
        message.textContent = 'Please enter a name.';
        message.style.color = 'red';
    } else if (/^[a-zA-Z\u0600-\u06FF\s]+$/.test(nameInput)) {
        message.textContent = `Hello ${nameInput}! Let's start!`;
        message.style.color = 'green';

        // Show the game section after name is validated
        gameSection.style.display = 'block';

        // Hide the submit button after valid name submission
        submitButton.style.display = 'none';
    } else {
        message.textContent = 'Your name can only contain letters (Latin and Arabic) and spaces. Please try again.';
        message.style.color = 'red';
    }
});

// Handle difficulty selection
let selectedDifficulty = ""; // Variable to store the selected difficulty

const difficultyButtons = document.querySelectorAll('.difficultyOption');
difficultyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        selectedDifficulty = e.target.getAttribute('data-difficulty');
        const message = document.querySelector('#message');
        
        // Update message to reflect selected difficulty
        message.textContent = `You selected ${selectedDifficulty} difficulty.`;
        message.style.color = 'green';
        
        // Optionally, highlight the selected button
        difficultyButtons.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
    });
});

// Example functionality for "Play Game" button
document.querySelector('#playGameButton').addEventListener('click', function() {
    const message = document.querySelector('#message');
    
    if (!selectedDifficulty) {
        message.textContent = "Please select a difficulty before starting the game.";
        message.style.color = 'red';
    } else {
        // Start the game with the selected difficulty
        message.textContent = `Starting the game with ${selectedDifficulty} difficulty...`;
        message.style.color = 'blue';

        // Call actual game start function based on difficulty
        startGame(selectedDifficulty);
    }
});

// Placeholder for starting the game based on difficulty
function startGame(difficulty) {
    // Example placeholder logic for starting the game
    switch (difficulty) {
        case 'easy':
            console.log("Starting game with easy difficulty.");
            break;
        case 'medium':
            console.log("Starting game with medium difficulty.");
            break;
        case 'hard':
            console.log("Starting game with hard difficulty.");
            break;
        default:
            console.log("No difficulty selected.");
    }
}
////
// Example functionality for "Play Game" button
document.querySelector('#playGameButton').addEventListener('click', function() {
    alert('The game is starting!');
    // You can replace this with actual game logic later
});
