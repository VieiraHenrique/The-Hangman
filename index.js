const parts = document.querySelectorAll('.part');
const word = document.getElementById('word');
const wrong = document.querySelector('#wrong span');
const popup = document.getElementById('popup-container');
const double = document.querySelector('.double-letter');

const possibleWords = ['hello', 'goodbye', 'henrique', 'elephant', 'javascript', 'github', 'canvas', 'monkey', 'chicken', 'webdev', 'computer', 'laptop', 'smartphone', 'responsive', 'ecommerce', 'wordpress', 'strawberry', 'banana', 'glass', 'table', 'grid', 'fetch', 'flower'];
let selectedWord = possibleWords[Math.floor(Math.random()*possibleWords.length)]
let correctLetters = []
let wrongLetters = []


// KEYDOWN EVENT LISTENER

window.addEventListener('keydown',(e)=>{
    if (e.keyCode >= 65 && e.keyCode<= 90) {
        if (selectedWord.includes(e.key)) {
            if (!correctLetters.includes(e.key)) {
                correctLetters.push(e.key);
                displayWord()
            } else {
                popupDouble()
            }
        } else {
            if (!wrongLetters.includes(e.key)) {
                wrongLetters.push(e.key)
                refreshWrong()
            } else {
                popupDouble()
            }
        }
    }
})

// FUNCTIONS

function displayWord(){
    word.innerHTML = `
    ${selectedWord.split('').map((letter)=>{
        return `<p class="letter"> ${correctLetters.includes(letter)? letter:''} </p>`
    }).join('')}
`
const innerWord = word.innerText.replace(/\n/g, '');
if (innerWord === selectedWord) {
    popupSuccess()
}

}

function refreshWrong(){
    wrong.innerText = wrongLetters;
    errors = wrongLetters.length;
    parts.forEach((part, index)=>{
        if (index<errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })
    if (errors === parts.length) {
        popupFail()
    
    }
}

function popupSuccess(){
    setTimeout(() => {
        popup.style.display = 'block';
        popup.querySelector('.popup-message').innerHTML = `
            <h2> YOU WIN </h2>
            <p> Play Again </p>
        `
        popup.querySelector('p').addEventListener('click', ()=> restart())
        window.addEventListener('keydown',(e)=>{
            if (e.key === 'Enter') {
                restart()
            }
        })
    }, 500);
}
function popupFail(){
    setTimeout(() => {
        popup.style.display = 'block';
        popup.querySelector('.popup-message').innerHTML = `
            <h2> YOU LOST <br> The word was "${selectedWord}" </h2>
            <p> Play Again </p>
        `
        popup.querySelector('p').addEventListener('click', ()=> restart())
        window.addEventListener('keydown',(e)=>{
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
    setTimeout(() => {
        double.classList.remove('show');
    }, 1500);
}

displayWord()