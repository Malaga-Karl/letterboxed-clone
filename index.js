// import words from "https://cdn.skypack.dev/word-list-json";
let words = [];

async function loadWords() {
  const res = await fetch(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
  );
  const wordsObj = await res.json();
  words = Object.keys(wordsObj);
  console.log("Words loaded:", words.length);
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



const letters = 'abcdefghijklmnopqrstuvwxyz'.split("")

function pickRandom(){
    const index = Math.floor(Math.random() * letters.length);
    return letters.splice(index, 1)[0];
}



const r1 = [pickRandom(),pickRandom(),pickRandom()]
const r2 = [pickRandom(),pickRandom(),pickRandom()]
const c1 = [pickRandom(),pickRandom(),pickRandom()]
const c2 = [pickRandom(),pickRandom(),pickRandom()]

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

let usedLetters = [];

wordInput.addEventListener('keydown', (e) => {
    // only on selected words
    let prev = wordInput.value[wordInput.value.length - 1] || null;
    let key = e.key.toLowerCase()
    function isAlphabetical(char) {
        return char.length === 1 && /[a-zA-Z]/.test(char);
    }

    if(isAlphabetical(key)){
        console.log(`prev: ${prev}`)
    }

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

    if (e.key === 'ENTER'){
        console.log('entered')
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