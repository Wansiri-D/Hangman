// DOM Elements
const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');

// Game Variables
let letters;
let lives;
let select_word;

const words = new Map([
  ['test', 'A simple test word'],
  ['tests', 'Another test word'],
  ['random', 'A random word for fun'],
]);

// Get random word from the list
const getRandomWord = list => list[Math.floor(Math.random() * list.length)];

// Initialize the game
const init = state => {
  wordDiv.innerHTML = ''; // Clear wordDiv

  if (state === 'start') {
    // Create letter buttons dynamically
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
      letterDiv.insertAdjacentHTML('beforeend', `<button class="alpha">${letter.toUpperCase()}</button>`);
    });
  } else if (state === 'reset') {
    // Reset button states and UI
    letters.forEach(btn => btn.classList.remove('disabled'));
    hintDiv.classList.add('hidden');
    notif.classList.add('hidden');
  }

  select_word = getRandomWord([...words.keys()]);
  lives = 5;
  liveSpan.textContent = lives;

  // Display underscores for each letter in the word
  [...select_word].forEach(() => wordDiv.insertAdjacentHTML('beforeend', `<p class="word">_</p>`));

  // Register event listeners for letter buttons
  letters = document.querySelectorAll('.alpha');
  letters.forEach(btn => btn.addEventListener('click', letterPress));
};

// Initialize the game when the page loads
init('start');

// Show notifications (win/lose)
const showNotif = msg => {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
};

// Decrease lives and check game over
const decreaseLife = () => {
  lives--;
  liveSpan.textContent = lives;
  if (lives === 0) showNotif('lost');
};

// Get matching indexes of a letter in the word
const getIndexes = letter => {
  return [...select_word].reduce((indexes, val, i) => {
    if (val === letter) indexes.push(i);
    return indexes;
  }, []);
};

// Check if the word is completely guessed
const checkWord = () => [...wordDiv.children].every(child => child.textContent !== '_');

// Handle letter button press
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    getIndexes(letter).forEach(index => wordDiv.children[index].textContent = this.textContent);
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }

  // Disable the button after it is pressed
  this.classList.add('disabled');
};

// Hint button click event
hintButton.addEventListener('click', () => {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});

// Reset button click event
resetButton.addEventListener('click', () => init('reset'));

// Play again button click event
playAgain.addEventListener('click', () => init('reset'));
