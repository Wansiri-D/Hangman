//this is for the First page
document.querySelector('#submitButton').addEventListener('click', function() {
    const nameInput = document.querySelector('#nameInput').value;
    const message = document.querySelector('#message');
    const gameSection = document.querySelector('#gameSection');
    const playGameButton = document.querySelector('#playGameButton');

    // Validate that the name input contains only letters (including Arabic characters)
    if (/^[a-zA-Z\u0600-\u06FF\s]+$/.test(nameInput)) { 
        message.textContent = `Hello ${nameInput}! Let's start!`;
        message.style.color = 'green';

        // Show the game section after name is validated
        gameSection.style.display = 'block';
    } else {
        message.textContent = 'Your name can only contain letters. Please try again.';
        message.style.color = 'red';
    }
});

// Example functionality for "Play Game" button
document.querySelector('#playGameButton').addEventListener('click', function() {
    alert('The game is starting!');
    // You can replace this with actual game logic later
});
