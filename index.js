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



const letters = 'abcdefghijklmnopqrstuvwxyz'.split("")

function pickRandom(){
    const index = Math.floor(Math.random() * letters.length);
    return letters.splice(index, 1)[0];
}



r1 = [pickRandom(),pickRandom(),pickRandom()]
r2 = [pickRandom(),pickRandom(),pickRandom()]
c1 = [pickRandom(),pickRandom(),pickRandom()]
c2 = [pickRandom(),pickRandom(),pickRandom()]

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

let prev = null

wordInput.addEventListener('keydown', (e) => {
    // only on selected words
    let key = e.key.toLowerCase()

    if(selectedLetters.includes(key) || allowedControlKeys.includes(e.key)){
        if (prev){
            if(r1.includes(key) && r1.includes(prev)){
                    e.preventDefault()
                }
            }
        console.log(`prev: ${prev}`)
        prev = key
    } else{
        e.preventDefault()
    }

    // only allow outside of row/col
    
})