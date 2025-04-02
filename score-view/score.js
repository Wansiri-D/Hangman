const scoreboardContainer = document.querySelector("#scoreboard tbody");
const backToGameBtn = document.getElementById("back-to-game");

const loadScoreboard = () => {
    const scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

    // Sort by wrong guesses, then by date (latest first)
    scoreboard.sort((a, b) => {
        if (a.wrongGuesses === b.wrongGuesses) {
            return new Date(b.date) - new Date(a.date);
        }
        return a.wrongGuesses - b.wrongGuesses;
    });

    scoreboard.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.playerName}</td>
            <td>${entry.wrongGuessCount}</td>
            <td>${entry.wordLength}</td>
            <td>${entry.date}</td>
            <td>${entry.playerScore}</td>
        `;
        scoreboardContainer.appendChild(row);
    });
};

backToGameBtn.addEventListener("click", () => {
    window.location.href = "index.html"; // Replace with the actual game page
});

loadScoreboard();
