const highScoresPopup = document.querySelector('#high-scores-popup');
const closePopupButton = document.querySelector('#close-popup');
const showHighScoresButton = document.querySelector('#show-high-scores');


showHighScoresButton.addEventListener('click', () => {
    displayHighScores();
    highScoresPopup.classList.remove('hidden'); 
});


closePopupButton.addEventListener('click', () => {
    highScoresPopup.classList.add('hidden'); 
});


highScoresPopup.addEventListener('click', (event) => {
    if (event.target === highScoresPopup) {
        highScoresPopup.classList.add('hidden'); 
    }
});


function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.querySelector('#high-scores-list');
    highScoresList.innerHTML = '';

   
    highScores.forEach(scoreData => {
        const li = document.createElement('li');
        li.textContent = `${scoreData.name} - Score: ${scoreData.score} - Difficulty: ${scoreData.difficulty} - Played on: ${scoreData.date}`;
        highScoresList.appendChild(li);
    });
}
