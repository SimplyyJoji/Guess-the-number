/*
GAME FUNCTION:
-Player must guess a number between the min and max
-Player gets 3 guesses
-Tells player number of guesses left
-Notifys the player the correct answer if no more remaining guesses
-Let the player choose to play again
*/

// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;


//Play Again Event Listener
 game.addEventListener('mousedown', function(e){
   if(e.target.className === 'play-again'){
     window.location.reload();
  }
 });
        
//Listen for guess
guessBtn.addEventListener('click', function(){
 let guess = parseInt(guessInput.value);
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Check if winning number
  if(guess === winningNum) {

    //game over won
    gameOver(true,`${winningNum} is correct!, YOU WIN!`);

  } else {
   // Wrong Number 
   guessesLeft -= 1;

    if(guessesLeft === 0) {
        // Game Over - Lost
      gameOver(false, `Game Over, you lost. The currect number was ${winningNum}!`)
        } else {
      //game continues - answer wrong
      //Change border color
        guessInput.style.borderColor = 'red'
      //Clear Input
        guessInput.value = '';

     //Tell User - Answer Wrong
     setMessage(`${guess} is not currect, ${guessesLeft} guesses left`,'red');

   }
  }
    });

    //Game Over
    function gameOver(won, msg) {
      let color;
      won === true ? color = 'green' : color ='red';

       //Disale input
      guessInput.disabled = true;
      //Change border Color when correct
      guessInput.style.borderColor = color;
      //Set Text Color
      message.style.color = color; 
      // Set message
      setMessage(msg); 

      //Play  Again
      guessBtn.value = 'Play Again';
      guessBtn.className += 'play-again';
    }

    //Get Winning Number
    function getRandomNum(min,max){
     return Math.floor(Math.random()*(max-min+1) + min);
  
    }


//Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}