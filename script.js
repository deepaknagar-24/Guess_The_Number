let randomNumber = (parseInt(Math.random() * 100 + 1))

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const restart = document.querySelector('.restart');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

let p = document.createElement('p');

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        let guess = parseInt(userInput.value)
        console.log(guess)
        validateGuess(guess)
    })
}


function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    } else if(guess < 0){
        alert('Please enter a number more than 1')
    } else if(guess > 100){
        alert('Please enter a number less than 100')
    } else{
        prevGuess.push(guess)
        if(numGuess === 11){
           cleanupGuess(guess)
           displayMessage(`Game Over. Random number was ${randomNumber}`)
           endGame();
        } else{
            cleanupGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed it right`)
        endGame();
    } else if(guess < randomNumber){
        displayMessage(`Number is TOOO low`)
    } else if(guess > randomNumber){
        displayMessage(`Number is TOOO High`)
    }
}

function cleanupGuess(guess){
   userInput.value = ''
   guessSlot.innerHTML += `${guess}  `
   numGuess++
   remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message){
   lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
   userInput.value = '';
   userInput.setAttribute('disabled', '');
   p.innerHTML = `<button class="newGame">Start new Game</button>`
   startOver.appendChild(p);
   playGame = false;
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('.newGame')
    newGameButton.addEventListener('click',function(e){
           randomNumber = parseInt(Math.random() * 100 + 1)
         
           prevGuess = [];
           numGuess = 1;
           guessSlot.innerHTML = '';
           remaining.innerHTML = `${11 - numGuess}`
           userInput.removeAttribute('disabled');
           startOver.removeChild(p)
           playGame =  true
    })
}
