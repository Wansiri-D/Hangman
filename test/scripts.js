const wordDisplay = document.querySelector(".word-display")
const keyboardDiv = document.querySelector(".keyboard")
const hangmanImage = document.querySelector(".hangman-box img")
const guessesText = document.querySelector(".guesses-text b")
const wrongLettersSpan = document.getElementById("wrong-letters")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")
const viewScoreBtn = document.querySelector(".view-score")
const gameResultTitle = document.getElementById("game-result-title")
const gameResultWord = document.getElementById("game-result-word")
const wrongGuessesCount = document.getElementById("wrong-guesses-count")
const scoreDisplay = document.getElementById("score-display")

let playerName = ""
let playerScore = 0
const codingQuiz = [
    { word: "variable", hint: "A placeholder for a value." },
    { word: "function", hint: "A block of code that performs a specific task." },
    { word: "loop", hint: "Repeats a sequence of instructions." },
];

let currentWord = ""
let correctLetters = []
let wrongLetters = []
let wrongGuessCount = 0
const maxGuesses = 6

document.getElementById("start-game").addEventListener("click", () => {
    playerName = document.getElementById("player-name").value.trim()
    if (!playerName) return alert("Please enter your name!")
    document.getElementById("player-display").innerText = playerName
    document.querySelector(".player-info").style.display = "none"
    document.querySelector(".container").style.display = "flex"
    resetGame()
})

const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * codingQuiz.length)
    const { word, hint } = codingQuiz[randomIndex]
    currentWord = word.toUpperCase()
    correctLetters = []
    wrongLetters = []
    wrongGuessCount = 0

    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter">_</li>`).join("")
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    wrongLettersSpan.innerText = ""
    hangmanImage.src = "images/0.png"
    document.querySelector(".hint-text b").innerText = hint
    renderKeyboard()
};

const renderKeyboard = () => {
    keyboardDiv.innerHTML = ""
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
        const button = document.createElement("button")
        button.innerText = letter
        button.addEventListener("click", () => handleGuess(button, letter))
        keyboardDiv.appendChild(button)
    })
}

const handleGuess = (button, letter) => {
    button.disabled = true

    if (currentWord.includes(letter)) {
        [...currentWord].forEach((char, index) => {
            if (char === letter) {
                correctLetters.push(char);
                wordDisplay.querySelectorAll("li")[index].innerText = char
            }
        })
        if (correctLetters.length === currentWord.length) endGame(true)
    } else {
        wrongLetters.push(letter)
        wrongGuessCount++
        wrongLettersSpan.innerText = wrongLetters.join(", ")
        hangmanImage.src = `images/${wrongGuessCount}.png`
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
        if (wrongGuessCount === maxGuesses) endGame(false)
    }
};

const endGame = (isWin) => {
    const currentDate = new Date().toLocaleString()
    const resultMessage = isWin
        ? `You Win! The word was: <b>${currentWord}</b>`
        : `Game Over! The word was: <b>${currentWord}</b>`
    gameResultTitle.innerText = isWin ? "You Win!" : "Game Over!"
    gameResultWord.innerHTML = currentWord
    wrongGuessesCount.innerText = wrongGuessCount

    if (isWin) {
        playerScore += 10
    } else {
        playerScore -= 5
        if (playerScore < 0) playerScore = 0
    }

    scoreDisplay.innerText = playerScore

    const gameData = {
        playerName,
        wrongGuessCount,
        wordLength: currentWord.length,
        date: currentDate,
        result: isWin ? "Win" : "Lose"
    }

    // Save game data to localStorage
    const previousGames = JSON.parse(localStorage.getItem("hangman-scores")) || []
    previousGames.push(gameData)
    localStorage.setItem("hangman-scores", JSON.stringify(previousGames))

    gameModal.classList.add("show")
}

playAgainBtn.addEventListener("click", () => {
    gameModal.classList.remove("show")
    resetGame()
})

viewScoreBtn.addEventListener("click", () => {
    window.location.href = "score.html"  // You can create a new page to view scores
})
