// VARIABLES

const parts = document.querySelectorAll('.part');
const wrong = document.querySelector('#wrong span');
const word = document.getElementById('word');
const popup = document.getElementById('popup-container');
const double = document.querySelector('.double-letter')
const possibleWords = ['hello', 'goodbye', 'javascript', 'programming', 'webdev', 'henrique', 'becode', 'boolean', 'bug', 'computer', 'laptop', 'internet', 'honey','elephant','jukebox', 'jasmine','pixel', 'animation', 'canvas'];

let selectedWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];
let correctLetters = [];
let wrongLetters = [];

// KEYDOWN EVENTLISTENER

window.addEventListener('keydown', (e)=>{
    if (e.keyCode>=65&&e.keyCode<=90) {

        if (selectedWord.includes(e.key)) {
            if (!correctLetters.includes(e.key)) {
                correctLetters.push(e.key)
                displayWord()
            } else {
                popupDouble()
            }
        } else {
            if (!wrongLetters.includes(e.key)) {
                wrongLetters.push(e.key)
                refreshWrong()
            }else {
                popupDouble()
            }
        }

    }
})

// FUNCTIONS

function refreshWrong(){
    wrong.innerText = wrongLetters;
    parts.forEach((part, index)=> {
        const error = wrongLetters.length;
        if (index < error) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })
    if(wrongLetters.length === parts.length) {
        getPopupFail()
    }
}

function displayWord() {
    word.innerHTML = `
        ${selectedWord.split('').map((letter)=>
            `<p class="letter"> ${correctLetters.includes(letter)? letter:''} </p>`
        ).join('')}
    `

    const innerWord = word.innerText.replace(/\n/g, '');
    if(innerWord===selectedWord) {
        getPopupSuccess()
    }

}

function getPopupFail() {
    setTimeout(() => {
        popup.style.display = 'block';
        popup.querySelector('.popup-message').innerHTML = `
            <h2> You lost.</h2>
            <h2> The word was "${selectedWord}"</h2>
            <p> Play Again</p>
        `
        popup.querySelector('p').addEventListener('click', ()=>{restart()})
        window.addEventListener('keydown', (e)=>{
            if (e.key === 'Enter') {
                restart()
            }
        })
    }, 500);
}

function getPopupSuccess() {
    setTimeout(() => {
        popup.style.display = 'block';
        popup.querySelector('.popup-message').innerHTML = `
            <h2> You win !</h2>
            <p> Play Again</p>
        `
        popup.querySelector('p').addEventListener('click', ()=>{restart()})
        window.addEventListener('keydown', (e)=>{
            if (e.key === 'Enter') {
                restart()
            }
        })
    }, 500);
}

function restart(){
    popup.style.display = 'none';
    selectedWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];
    correctLetters = [];
    wrongLetters = [];
    displayWord()
    refreshWrong()
}

function popupDouble(){
    double.classList.add('show');
    setTimeout(()=>{double.classList.remove('show')}, 1500);
}

displayWord()