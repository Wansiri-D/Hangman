export const highScoresPopup = document.querySelector('#high-scores-popup'); 
export const closePopupButton = document.querySelector('#close-popup'); 
export const sortByScoreButton = document.querySelector('#sort-by-score'); 
export const sortByDateButton = document.querySelector('#sort-by-date'); 

if (!highScoresPopup || !closePopupButton || !sortByScoreButton || !sortByDateButton) {
  console.error('One or more High Scores elements not found in the DOM');
} else {
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
    sortByScoreButton.classList.add('active'); 
    sortByDateButton.classList.remove('active'); 
  });

  sortByDateButton.addEventListener('click', () => { 
    displayHighScores('date'); 
    sortByDateButton.classList.add('active'); 
    sortByScoreButton.classList.remove('active'); 
  });
}

export function displayHighScores(sortBy = 'score') { 
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
    highScores.sort((a, b) => new Date(b.date) - new Date(a.date)); // ใหม่ไปเก่า
  }

  highScores.forEach(scoreData => {
    const li = document.createElement('li'); 
    li.innerHTML = `
      <strong>${scoreData.name}</strong>: ${scoreData.score} points 
      <br><small>Difficulty: ${scoreData.difficulty} | Played on: ${scoreData.date}</small>
    `;
    highScoresList.appendChild(li);
  });

  highScoresPopup.classList.remove('hidden'); // แสดงป๊อปอัพเมื่อเรียกฟังก์ชัน
}
