// Declare the selectedAvatar variable.
let selectedAvatar = { headStart: '', difficulty: '' };

// Add event listeners to all clickable avatar images.
document.querySelectorAll('.clickable-image').forEach(img => {
    img.addEventListener('click', function () {
        const avatar = this.getAttribute('data-part');
        selectedAvatar.head = avatar;

        // Remove 'selected' class from all images and add it to the clicked one.
        document.querySelectorAll('.clickable-image').forEach(image => image.classList.remove('selected'));
        this.classList.add('selected');

        displayAvatarCharacter();
        checkFinishButton();
    });
});

// Add event listeners to difficulty buttons.
['easy', 'medium', 'hard'].forEach(difficulty => {
    document.getElementById(difficulty).addEventListener('click', function () {
        selectedAvatar.difficulty = difficulty;

        // Remove 'selected' class from all difficulty buttons and add it to the clicked one.
        document.querySelectorAll('.difficulty-buttons button').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');

        checkFinishButton();
    });
});

// Function to display the selected Avatar.
function displayAvatarCharacter() {
    if (selectedAvatar.head) {
        const avatarHTML = `<img src="img/${selectedAvatar.head}.png" alt="${selectedAvatar.head}">`;
        document.getElementById('avatar-character').innerHTML = avatarHTML;
    }
}

// Function to toggle the display of the Finish button.
function checkFinishButton() {
    const playerName = document.getElementById('player-name').value.trim();
    const finishButton = document.getElementById('finish');
    finishButton.style.display = (playerName && selectedAvatar.head && selectedAvatar.difficulty) ? 'inline-block' : 'none';
}

// When the Finish button is clicked.
document.getElementById('finish').addEventListener('click', function () {
    const playerName = document.getElementById('player-name').value.trim();
    if (playerName && selectedAvatar.head && selectedAvatar.difficulty) {
        // Store the player's name in localStorage.
        localStorage.setItem('playerName', playerName);

        // Display the confirmation message.
        document.getElementById('game-message').innerHTML = `
            <p>Välkommen, ${playerName}! Ditt val är klart.</p>
            <p>Du har valt Avatar: ${selectedAvatar.head}</p>
            <p>Du har valt nivå: ${selectedAvatar.difficulty}</p>`;
    }
});

// Function to display a dialog notification.
function showDialog(message) {
    const dialog = document.getElementById('dialog');
    document.getElementById('dialog-message').textContent = message;
    dialog.showModal();
}

// Close the dialog when the close button is clicked.
document.getElementById('dialog-close').addEventListener('click', function () {
    document.getElementById('dialog').close();
});

// When the Start button is clicked.
document.getElementById('start-game').addEventListener('click', function () {
    const playerName = document.getElementById('player-name').value.trim();

    // Validate user input and show appropriate messages.
    if (!playerName) {
        showDialog("Skriv in ditt namn!");
        return;
    }
    if (!selectedAvatar.head) {
        showDialog("Välj Avatar!");
        return;
    }
    if (!selectedAvatar.difficulty) {
        showDialog("Välj nivå!");
        return;
    }

    // Log player details and start the game.
    console.log(`Välkommen: ${playerName}! Spelet startar...`);
    console.log(`Du har valt Avatar: ${selectedAvatar.head}`);
    console.log(`Du har valt nivå: ${selectedAvatar.difficulty}`);

    // Switch to the game page.
    goToPage(2);
});

// Function to navigate between pages.
function goToPage(pageNumber) {
    // Hide all pages.
    document.getElementById('body-start').classList.add('hide');
    document.getElementById('body-game').classList.add('hide');

    // Show the game page if the pageNumber is 2.
    if (pageNumber === 2) {
        document.getElementById('body-game').classList.remove('hide');
    }
}