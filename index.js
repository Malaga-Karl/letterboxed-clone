// import words from "https://cdn.skypack.dev/word-list-json";
let words = [];

async function loadWords() {

  const CACHE_KEY = "words_cache";

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    words = JSON.parse(cached);
    console.log("Loaded from cache: ", words.length);
    return
  }

  const res = await fetch(
  "https://corsproxy.io/?" +
  encodeURIComponent("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json")
);
  const wordsObj = await res.json();
  words = Object.keys(wordsObj);

  localStorage.setItem(CACHE_KEY, JSON.stringify(words));
  console.log("Words loaded from Github", words.length);
}

// call it once when page loads
loadWords();




const l1 = document.getElementById('r1l1')
const l2 = document.getElementById('r1l2')
const l3 = document.getElementById('r1l3')
const l4 = document.getElementById('r2l1')
const l5 = document.getElementById('r2l2')
const l6 = document.getElementById('r2l3')
const l7 = document.getElementById('c1l1')
const l8 = document.getElementById('c1l2')
const l9 = document.getElementById('c1l3')
const l10 = document.getElementById('c2l1')
const l11 = document.getElementById('c2l2')
const l12 = document.getElementById('c2l3')
const wordInput = document.getElementById('wordinput');
const result = document.getElementById('results')
const confetti = document.getElementById('confetti')

const jsConfetti = new JSConfetti()
const letters = 'abcdefghijklmnopqrstuvwxyz'.split("");
const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = letters.filter(l => !vowels.includes(l));

function pickRandom(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1)[0]; // removes and returns
}

// decide how many vowels: 3–5
const vowelCount = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
const consonantCount = 12 - vowelCount;

let chosen = [];

// pick unique vowels
let availableVowels = [...vowels];
for (let i = 0; i < vowelCount; i++) {
  chosen.push(pickRandom(availableVowels));
}

// pick unique consonants
let availableConsonants = [...consonants];
for (let i = 0; i < consonantCount; i++) {
  chosen.push(pickRandom(availableConsonants));
}

// shuffle chosen letters
chosen = chosen.sort(() => Math.random() - 0.5);

// split into groups of 3
const r1 = chosen.slice(0, 3);
const r2 = chosen.slice(3, 6);
const c1 = chosen.slice(6, 9);
const c2 = chosen.slice(9, 12);

console.log(r1, r2, c1, c2);
let selectedLetters = [...r1, ...r2, ...c1, ...c2]

l1.innerHTML = r1[0]
l2.innerHTML = r1[1]
l3.innerHTML = r1[2]
l4.innerHTML = r2[0]
l5.innerHTML = r2[1]
l6.innerHTML = r2[2]
l7.innerHTML = c1[0]
l8.innerHTML = c1[1]
l9.innerHTML = c1[2]
l10.innerHTML = c2[0]
l11.innerHTML = c2[1]
l12.innerHTML = c2[2]

const allowedControlKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Enter',
    ' '
]

let usedWords = [];
let usedLetters = [];
let letterDivs = [l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12]
let letterCount = {};
letterDivs.forEach((letter) => {
    letterCount[letter.innerHTML] = {
        "div":letter,
        "count": 0
    }
})


wordInput.addEventListener('keydown', (e) => {
    // only on selected words
    let prev = wordInput.value[wordInput.value.length - 1] || null;
    let currentWord = wordInput.value;
    let key = e.key.toLowerCase()
    function isAlphabetical(char) {
        return char.length === 1 && /[a-zA-Z]/.test(char);
    }

    if(isAlphabetical(key)){
        console.log(`prev: ${prev}`)
    }
    if(selectedLetters.includes(key) || allowedControlKeys.includes(e.key)){
        if(r1.includes(key) && r1.includes(prev)){
            e.preventDefault()
        }
        if(r2.includes(key) && r2.includes(prev)){
            e.preventDefault()
        }
        if(c1.includes(key) && c1.includes(prev)){
            e.preventDefault()
        }
        if(c2.includes(key) && c2.includes(prev)){
            e.preventDefault()
        }

        if (e.key === 'Backspace') {
            if (currentWord.length === 1 && usedWords.length > 0) {
                // Stop the default backspace (so it doesn't delete the last letter)
                e.preventDefault();

                // Restore the last full word
                const lastWord = usedWords.pop();
                let uniqueChars = [...new Set(lastWord)].join('');
                for(let i = 0; i < uniqueChars.length; i++){
                    letterCount[uniqueChars[i]].count--
                    if (letterCount[uniqueChars[i]].count === 0){
                        letterCount[uniqueChars[i]].div.classList.remove('used')
                    }
                }
                wordInput.value = lastWord;
                currentWord = lastWord;
                result.innerHTML = usedWords.join(' ');
            }
        }
        if (e.key === 'Enter'){
            if (currentWord.length < 3){
                tooShortWord()
                return
            }
            console.log(currentWord)
            if(words.includes(currentWord)){
                usedWords.push(currentWord);
                let lastLetter = currentWord[currentWord.length-1]
                validWord()
                let letters = wordInput.value.split('')
                let uniqueChars = [...new Set(letters)].join('');

                for(let i = 0; i < uniqueChars.length; i++){
                    letterCount[uniqueChars[i]].div.classList.add('used');
                    letterCount[uniqueChars[i]].count++
                }
                result.innerHTML = usedWords.join(' ');
                wordInput.value =lastLetter
                checkWin();
            } else {
                invalidWord()
            }
        }
    } else{
        e.preventDefault()
    }
})

function validWord() {
    const msg = document.getElementById("validWord");

    msg.style.display = "block";   // show
    msg.style.opacity = "1";       // fade in

    setTimeout(() => {
      msg.style.opacity = "0";     // fade out
      setTimeout(() => {
        msg.style.display = "none"; // fully hide after fade
      }, 1000); // match transition time
    }, 2000); // stay visible for 2 sec
}
function invalidWord() {
    const msg = document.getElementById("invalidWord");

    msg.style.display = "block";   // show
    msg.style.opacity = "1";       // fade in

    setTimeout(() => {
      msg.style.opacity = "0";     // fade out
      setTimeout(() => {
        msg.style.display = "none"; // fully hide after fade
      }, 1000); // match transition time
    }, 2000); // stay visible for 2 sec
}

function tooShortWord() {
    const msg = document.getElementById("tooShortWord");

    msg.style.display = "block";   // show
    msg.style.opacity = "1";       // fade in

    setTimeout(() => {
      msg.style.opacity = "0";     // fade out
      setTimeout(() => {
        msg.style.display = "none"; // fully hide after fade
      }, 1000); // match transition time
    }, 2000); // stay visible for 2 sec
}

let confettiInterval; // store interval so we can clear it later

function checkWin() {
  for (let key in letterCount) {
    if (letterCount[key].count === 0) {
      return
    }
  }

  // Stop the timer and get final time
  try {
    if (typeof stopStopwatch === 'function') {
      stopStopwatch();
    }
    const finalTime = document.getElementById('timer').textContent;
    const winningTimeEl = document.querySelector('.winning-time');
    winningTimeEl.textContent = `Completed in ${finalTime}!`;
    // Trigger animation
    setTimeout(() => winningTimeEl.classList.add('show'), 100);
    // store highscore (time and date) in localStorage
    try {
      const seconds = parseTimeToSeconds(finalTime);
      const entry = { time: finalTime, seconds, date: new Date().toISOString() };
      const HS_KEY = 'lt_highscores';
      const raw = localStorage.getItem(HS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(entry);
      // keep top 5 fastest
      arr.sort((a, b) => a.seconds - b.seconds);
      const top = arr.slice(0, 5);
      localStorage.setItem(HS_KEY, JSON.stringify(top));
    } catch (e) {
      console.warn('Could not save highscore', e);
    }
  } catch (e) {
    console.warn('Error stopping/displaying timer', e);
  }

  jsConfetti.addConfetti()
  // if already celebrating, don't start another interval
  if (!confettiInterval) {
    confettiInterval = setInterval(() => {
      jsConfetti.addConfetti()
    }, 1000); // every 1s
  }

  wordInput.value = 'WINNER!'
  wordInput.disabled = true
  wordInput.style.color = 'green'
}

// --- Highscores helpers ---
function parseTimeToSeconds(timestr){
  // expect M:SS or MM:SS
  const parts = timestr.split(':').map(s => s.trim());
  if(parts.length !== 2) return Infinity;
  const mins = parseInt(parts[0], 10) || 0;
  const secs = parseInt(parts[1], 10) || 0;
  return mins * 60 + secs;
}

function getHighscores(){
  const HS_KEY = 'lt_highscores';
  const raw = localStorage.getItem(HS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function clearHighscores(){
  const HS_KEY = 'lt_highscores';
  localStorage.removeItem(HS_KEY);
}

function renderHighscores(){
  const list = document.getElementById('highscore-list');
  const panel = document.getElementById('highscore-panel');
  if(!list) return;
  const arr = getHighscores();
  list.innerHTML = '';
  if(arr.length === 0){
    const li = document.createElement('li');
    li.textContent = 'No highscores yet';
    list.appendChild(li);
    return;
  }
  arr.forEach((e) => {
    const li = document.createElement('li');
    const date = new Date(e.date);
    const dateStr = date.toLocaleString();
    li.innerHTML = `<span>${e.time}</span><span style="color:#666;font-size:12px">${dateStr}</span>`;
    list.appendChild(li);
  });
}

function setupHighscoresUI(){
  const showBtn = document.getElementById('show-highscores');
  const panel = document.getElementById('highscore-panel');
  const closeBtn = document.getElementById('close-highscores');
  const clearBtn = document.getElementById('clear-highscores');

  if(showBtn){
    showBtn.addEventListener('click', () => {
      renderHighscores();
      panel.classList.remove('hidden');
    });
  }
  if(closeBtn){
    closeBtn.addEventListener('click', () => panel.classList.add('hidden'));
  }
  if(clearBtn){
  
    clearBtn.addEventListener('click', () => {
      let userConfirmation = confirm("Do you want to clear your highscores?")
      if (!userConfirmation){
        return;
      }
      clearHighscores();
      renderHighscores();
    });
  }
}

// --- Timer visibility toggle ---
function setupTimerToggle() {
  const timer = document.getElementById('timer');
  const toggleBtn = document.getElementById('toggle-timer');
  const icon = toggleBtn.querySelector('i');

  toggleBtn.addEventListener('click', () => {
    timer.classList.toggle('timer-hidden');
    // Switch between eye and eye-slash
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
}

// --- Start overlay & timer hookup ---
// When the page loads the main area will be blurred. Clicking the overlay
// removes the blur and starts the stopwatch (if available).
document.addEventListener('DOMContentLoaded', () => {
  setupTimerToggle();
  setupHighscoresUI();
  const mainEl = document.getElementById('main');
  const overlay = document.getElementById('start-overlay');

  if (!mainEl || !overlay) return;

  // initial blurred state
  mainEl.classList.add('blurred');

  overlay.addEventListener('click', () => {
    mainEl.classList.remove('blurred');
    overlay.classList.add('hidden');
    // start the stopwatch if the function is available
    try {
      if (typeof startStopwatch === 'function') {
        startStopwatch();
      }
    } catch (e) {
      // stopwatch not available — ignore silently
      console.warn('startStopwatch not available', e);
    }
  });
});