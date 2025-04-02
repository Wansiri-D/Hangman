const highScoresPopup = document.querySelector('#high-scores-popup');
const closePopupButton = document.querySelector('#close-popup');
const showHighScoresButton = document.querySelector('#show-high-scores');
const sortByScoreButton = document.querySelector('#sort-by-score');
const sortByDateButton = document.querySelector('#sort-by-date');

showHighScoresButton.addEventListener('click', () => {
    displayHighScores('score');
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

sortByScoreButton.addEventListener('click', () => {
    displayHighScores('score');
});

sortByDateButton.addEventListener('click', () => {
    displayHighScores('date');
});

function displayHighScores(sortBy = 'score') {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.querySelector('#high-scores-list');
    highScoresList.innerHTML = '';

    if (sortBy === 'score') {
        highScores.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'date') {
        highScores.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    highScores.forEach(scoreData => {
        const li = document.createElement('li');
        li.textContent = `${scoreData.name} - Score: ${scoreData.score} - Difficulty: ${scoreData.difficulty} - Played on: ${scoreData.date}`;
        highScoresList.appendChild(li);
    });
}
