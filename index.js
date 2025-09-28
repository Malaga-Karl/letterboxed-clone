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

// all letter divs
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

// input
const wordInput = document.getElementById('wordinput');

// results
const result = document.getElementById('results')

// confetti
const confetti = document.getElementById('confetti')
const jsConfetti = new JSConfetti()

// random letters
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
let r1 = chosen.slice(0, 3);
let r2 = chosen.slice(3, 6);
let c1 = chosen.slice(6, 9);
let c2 = chosen.slice(9, 12);

console.log(r1, r2, c1, c2);
let selectedLetters = [...r1, ...r2, ...c1, ...c2]

// insert selected letters to divs
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
            console.log(currentWord)
            if(words.includes(currentWord)){
                usedWords.push(currentWord);
                let lastLetter = currentWord[currentWord.length-1]
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

let confettiInterval; // store interval so we can clear it later

function checkWin() {
  for (let key in letterCount) {
    if (letterCount[key].count === 0) {
      return
    }
  }

  jsConfetti.addConfetti()
  // if already celebrating, don’t start another interval
  if (!confettiInterval) {
    confettiInterval = setInterval(() => {
      jsConfetti.addConfetti()
    }, 1000); // every 1s
  }

  wordInput.value = 'WINNER!'
  wordInput.disabled = true
  wordInput.style.color = 'green'
}


// Change letters /////////////////////////////////////////////////////////
const changeLives = document.getElementById('changes');
const changeButton = document.getElementById('btn_change');
let changes = ['🟢', '🟢', '🟢'];
let isChanging = false;
changeLives.innerHTML = changes.join(' ')
changeButton.innerHTML = "Change Letter"



changeButton.addEventListener('click', (e) => {
  isChanging = !isChanging
  console.log(isChanging)

  if (isChanging === false){ ////// user is not changing letters
    changeButton.innerHTML = "Change Letter"
    wordInput.disabled = false;
    letterDivs.forEach((div) => {div.classList.remove('changeable')})
  } else { ////// user is changing letters
    changeButton.innerHTML = "Save"
    wordInput.disabled = true;
    letterDivs.forEach((div) => {
      div.classList.add('changeable');
      div.addEventListener(('click'), (e)=> {
        changes.pop()
        changeLives.innerHTML = changes.join(' ')
      })
    })
  }
})