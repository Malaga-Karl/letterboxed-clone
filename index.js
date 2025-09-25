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

let prev = ''
let usedLetters = [];

wordInput.addEventListener('keydown', (e) => {
    // only on selected words
    let key = e.key.toLowerCase()

    if(selectedLetters.includes(key) || allowedControlKeys.includes(e.key)){
        console.log(`prev: ${prev}`)
        if (prev !== ''){
            if (r1.includes(prev) && r1.includes(key)){
                e.preventDefault();
            }
            if (r2.includes(prev) && r2.includes(key)){
                e.preventDefault();
            }
            if (c1.includes(prev) && c1.includes(key)){
                e.preventDefault();
            }
            if (c2.includes(prev) && c2.includes(key)){
                e.preventDefault();
            }
            if (e.key === 'Enter'){
                console.log(wordInput.value)
                if(words.includes(wordInput.value)){
                    validWord()
                    let letters = wordInput.value.split('')
                    let letterDivs = [l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12]

                    for(let i = 0; i < letters.length; i++){
                        letterDivs.forEach((letterDiv) => {
                            if(letterDiv.innerHTML === letters[i]){
                                letterDiv.classList.add('used')
                                // if (!usedLetters.includes(letters[i])){
                                //     usedLetters.add(letters[i])
                                // }
                            }
                        })
                        // if (usedLetters.length === 12){
                        //     alert("Winner!!")
                        // }
                    }
                    result.innerHTML += wordInput.value + ' '
                    wordInput.value =''
                } else {
                    invalidWord()
                }
                // showMessage()
            }
        }
        prev = key
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