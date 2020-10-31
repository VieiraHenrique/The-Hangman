const parts = document.querySelectorAll('.part');
const word = document.getElementById('word');
const wrong = document.querySelector('#wrong span');
const popup = document.getElementById('popup-container')

const words = ['programming', 'javascript', 'becode', 'webdev', 'github', 'henrique'];
let selectedWord = words[Math.floor(Math.random()*words.length)]

let correctLetters = [];
let wrongLetters = [];

function displayWords() {
    word.innerHTML =
    `
    ${selectedWord.split('').map(letter => {
        return `<span class="letter"> ${correctLetters.includes(letter)? letter : ''} </span>`
    }).join('')}
    `
    let innerWord = word.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        getPopupSuccess()
    }
}

function updateWrongLetters(){
    wrong.innerText = wrongLetters

    parts.forEach((part, i)=>{
        const errors = wrongLetters.length;
        if (i<errors) {
            part.style.display = 'block';    
        } else {
            part.style.display = 'none';
        }
    })

    if(wrongLetters.length === parts.length) {
        getPopupFail()
    }
    
}

function getPopupFail() {
    popup.style.display = 'block'
    popup.querySelector('.popup-message').innerHTML = '<h2>You lost !</h2><p>Play again</p>';
    popup.querySelector('p').addEventListener('click',()=>{
        correctLetters = [];
        wrongLetters = [];
        selectedWord = words[Math.floor(Math.random()*words.length)];
        displayWords()
        updateWrongLetters()
        popup.style.display = 'none'
    })
}
function getPopupSuccess() {
    popup.style.display = 'block'
    popup.querySelector('.popup-message').innerHTML = '<h2>You won !</h2><p>Play again</p>';
    popup.querySelector('p').addEventListener('click',()=>{
        
        correctLetters = [];
        wrongLetters = [];
        selectedWord = words[Math.floor(Math.random()*words.length)];
        displayWords()
        updateWrongLetters()
        popup.style.display = 'none'
    })
}

window.addEventListener('keydown', (e)=>{
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;


        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
            } else {
                console.log('You already got this letter')
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters()
            }
        }
    }
    displayWords()
})

displayWords()