
const highScoresPopup = document.querySelector('#high-scores-popup'); 
const closePopupButton = document.querySelector('#close-popup'); 
const showHighScoresButton = document.querySelector('#show-high-scores');
const sortByScoreButton = document.querySelector('#sort-by-score'); 
const sortByDateButton = document.querySelector('#sort-by-date'); 

if (!highScoresPopup || !closePopupButton || !showHighScoresButton || !sortByScoreButton || !sortByDateButton) { // ตรวจสอบว่ามี element ครบหรือไม่
  console.error('One or more High Scores elements not found in the DOM'); // แสดงข้อผิดพลาดใน console ถ้าขาด element
} else { 
  showHighScoresButton.addEventListener('click', () => { // เพิ่มตัวจัดการเมื่อคลิกปุ่มแสดงคะแนนสูงสุด
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
    sortByScoreButton.classList.add('active'); 
    sortByDateButton.classList.remove('active'); 
  });

  sortByDateButton.addEventListener('click', () => { 
    displayHighScores('date'); 
    sortByDateButton.classList.add('active'); 
    sortByScoreButton.classList.remove('active'); 
  });
}

function displayHighScores(sortBy = 'score') { 
  const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // ดึงคะแนนสูงสุดจาก localStorage หรือสร้างอาร์เรย์ว่าง
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

  highScores.forEach(scoreData => { // วนลูปแสดงคะแนนแต่ละอัน
    const li = document.createElement('li'); 
    li.innerHTML = `
      <strong>${scoreData.name}</strong>: ${scoreData.score} points 
      <br><small>Difficulty: ${scoreData.difficulty} | Played on: ${scoreData.date}</small>
    `;
    highScoresList.appendChild(li);
  });
}
