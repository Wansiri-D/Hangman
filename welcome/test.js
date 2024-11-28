// Get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get("name");
const difficulty = urlParams.get("difficulty");

// Set initial data
document.getElementById("playerNameDisplay").textContent = playerName;
document.getElementById("difficultyDisplay").textContent = difficulty;

// Elements
const welcomePage = document.getElementById("welcome-page");
const instructionsPage = document.getElementById("instructions-page");
const gamePage = document.getElementById("game-page");
const gamePlayerName = document.getElementById("gamePlayerName");
const gameDifficulty = document.getElementById("gameDifficulty");

// Show/hide pages
function showPage(showElement, hideElements) {
  showElement.classList.remove("hidden");
  hideElements.forEach(el => el.classList.add("hidden"));
}

// Instructions button handler
document.getElementById("instructions-button").addEventListener("click", () => {
  showPage(instructionsPage, [welcomePage, gamePage]);
});

// Back to Welcome button handler
document.getElementById("back-to-welcome").addEventListener("click", () => {
  showPage(welcomePage, [instructionsPage, gamePage]);
});

// Start Game button handler
document.getElementById("start-button").addEventListener("click", () => {
  // Set game player info
  gamePlayerName.textContent = playerName;
  gameDifficulty.textContent = difficulty;

  // Show game page
  showPage(gamePage, [welcomePage, instructionsPage]);
});
