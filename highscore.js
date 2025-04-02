const highScoresPopup = document.querySelector('#high-scores-popup');
const closePopupButton = document.querySelector('#close-popup');
const showHighScoresButton = document.querySelector('#show-high-scores');
const sortByScoreButton = document.querySelector('#sort-by-score');
const sortByDateButton = document.querySelector('#sort-by-date');

if (!highScoresPopup || !closePopupButton || !showHighScoresButton || !sortByScoreButton || !sortByDateButton) {
    console.error('One or more High Scores elements not found in the DOM');
} else {
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
        sortByScoreButton.style.backgroundColor = '#d3d3d3';
        sortByDateButton.style.backgroundColor = '';
    });

    sortByDateButton.addEventListener('click', () => {
        displayHighScores('date');
        sortByDateButton.style.backgroundColor = '#d3d3d3';
        sortByScoreButton.style.backgroundColor = '';
    });
}

function displayHighScores(sortBy = 'score') {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = document.querySelector('#high-scores-list');
    highScoresList.innerHTML = '';

    if (highScores.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No high scores yet!';
        highScoresList.appendChild(li);
        return;
    }

    if (sortBy === 'score') {
        highScores.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'date') {
        highScores.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    highScores.forEach(scoreData => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${scoreData.name}</strong>: ${scoreData.score} points 
            <br><small>Difficulty: ${scoreData.difficulty} | Played on: ${scoreData.date}</small>
        `;
        highScoresList.appendChild(li);
    });
}