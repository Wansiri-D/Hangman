// ฟังก์ชันสำหรับสลับหน้าจอ
function switchScreen(screenId) {
    // ซ่อนทุกหน้าจอ
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.visibility = 'hidden';
        screen.style.opacity = 0;
    });
    
    // แสดงหน้าจอที่เลือก
    const targetScreen = document.getElementById(screenId);
    targetScreen.style.visibility = 'visible';
    targetScreen.style.opacity = 1;
}

// ตัวแปรสำหรับข้อมูลเกม
let playerName = '';
let word = '';
let guessedLetters = [];
let incorrectGuesses = 0;
let wordLength = 0;
let maxIncorrectGuesses = 6;
let difficulty = 'medium';
let words = {
    easy: ['apple', 'dog', 'cat', 'fish'],
    medium: ['banana', 'grape', 'orange', 'melon'],
    hard: ['pineapple', 'strawberry', 'watermelon', 'blueberry']
};

// ฟังก์ชันเริ่มเกมใหม่
function startNewGame(player) {
    playerName = player;
    document.getElementById('player-display').textContent = `Player: ${playerName}`;
    word = getRandomWord();
    wordLength = word.length;
    guessedLetters = [];
    incorrectGuesses = 0;
    
    // Set word display
    document.getElementById('word-display').textContent = '_ '.repeat(wordLength);
    document.getElementById('letters-guessed').textContent = 'Guessed Letters: ';
    document.getElementById('guess-input').value = '';
    
    // แสดงจำนวนคำที่ทายผิด
    document.getElementById('incorrect-guesses').textContent = incorrectGuesses;
    
    // วาดภาพ Hangman
    drawHangman();
}

// ฟังก์ชันสุ่มคำ
function getRandomWord() {
    return words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
}

// ฟังก์ชันสำหรับการตรวจสอบคำทาย
function checkGuess(guess) {
    if (!guess || guessedLetters.includes(guess)) {
        return;
    }
    
    guessedLetters.push(guess);
    
    if (word.includes(guess)) {
        updateWordDisplay();
    } else {
        incorrectGuesses++;
        drawHangman();
    }
    
    updateIncorrectGuesses();
    checkGameOver();
}

// ฟังก์ชันอัปเดตการแสดงผลของคำ
function updateWordDisplay() {
    const displayWord = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    document.getElementById('word-display').textContent = displayWord;
}

// ฟังก์ชันอัปเดตจำนวนคำที่ทายผิด
function updateIncorrectGuesses() {
    document.getElementById('incorrect-guesses').textContent = incorrectGuesses;
}

// ฟังก์ชันตรวจสอบว่าผู้เล่นชนะหรือแพ้
function checkGameOver() {
    const displayWord = document.getElementById('word-display').textContent.replace(/\s/g, '');
    
    if (incorrectGuesses >= maxIncorrectGuesses) {
        endGame(false);
    } else if (displayWord === word) {
        endGame(true);
    }
}

// ฟังก์ชันจบเกม
function endGame(isWin) {
    switchScreen('game-over-screen');
    document.getElementById('game-result').textContent = isWin ? 'You Win!' : 'Game Over';
    document.getElementById('revealed-word').textContent = `The word was: ${word}`;
    saveScore(isWin);
}

// ฟังก์ชันเก็บคะแนน
function saveScore(isWin) {
    const score = {
        playerName,
        incorrectGuesses,
        wordLength,
        status: isWin ? 'Win' : 'Loss',
        date: new Date().toISOString(),
    };
    
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
    updateScoreboard();
}

// ฟังก์ชันแสดงตารางคะแนน
function updateScoreboard() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const tableBody = document.querySelector('#score-table tbody');
    tableBody.innerHTML = '';
    
    scores.sort((a, b) => a.incorrectGuesses - b.incorrectGuesses || new Date(b.date) - new Date(a.date));

    scores.forEach(score => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${score.playerName}</td>
            <td>${score.incorrectGuesses}</td>
            <td>${score.wordLength}</td>
            <td>${score.date}</td>
            <td>${score.status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// วาดภาพ Hangman
function drawHangman() {
    const hangman = document.getElementById('hangman');
    hangman.innerHTML = '';  // ลบภาพเก่าออก

    const incorrectGuessesText = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    const svgParts = ['circle', 'rect', 'line', 'line', 'line', 'line'];

    for (let i = 0; i < incorrectGuesses; i++) {
        const part = document.createElementNS('http://www.w3.org/2000/svg', svgParts[i]);
        // สร้างส่วนต่างๆ ของภาพ Hangman ตามลำดับ
        if (i === 0) { // head
            part.setAttribute('cx', '100');
            part.setAttribute('cy', '30');
            part.setAttribute('r', '20');
        } else if (i === 1) { // body
            part.setAttribute('x1', '100');
            part.setAttribute('y1', '50');
            part.setAttribute('x2', '100');
            part.setAttribute('y2', '100');
        } else if (i === 2) { // left-arm
            part.setAttribute('x1', '100');
            part.setAttribute('y1', '60');
            part.setAttribute('x2', '60');
            part.setAttribute('y2', '80');
        } else if (i === 3) { // right-arm
            part.setAttribute('x1', '100');
            part.setAttribute('y1', '60');
            part.setAttribute('x2', '140');
            part.setAttribute('y2', '80');
        } else if (i === 4) { // left-leg
            part.setAttribute('x1', '100');
            part.setAttribute('y1', '100');
            part.setAttribute('x2', '60');
            part.setAttribute('y2', '140');
        } else if (i === 5) { // right-leg
            part.setAttribute('x1', '100');
            part.setAttribute('y1', '100');
            part.setAttribute('x2', '140');
            part.setAttribute('y2', '140');
        }
        hangman.appendChild(part);
    }
}

// เพิ่มเหตุการณ์ที่เกิดขึ้นเมื่อเริ่มเกม
document.getElementById('start-game').addEventListener('click', function() {
    const player = document.getElementById('player-name').value;
    if (player) {
        difficulty = document.querySelector('input[name="difficulty"]:checked')?.value || 'medium';
        switchScreen('game-screen');
        startNewGame(player);
    }
});

// ฟังก์ชันการทายคำ
document.getElementById('submit-guess').addEventListener('click', function() {
    const guess = document.getElementById('guess-input').value;
    checkGuess(guess);
});

// เริ่มเกมใหม่
document.getElementById('play-again').addEventListener('click', function() {
    switchScreen('start-screen');
});
