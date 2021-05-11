/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function newGame(){
    return new Game()
}


function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
  }
  



function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
    i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }


class Game {
    constructor(playersGuess,pastGuesses,winningNumber){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        }
        difference(){ return Math.abs(this.playersGuess - this.winningNumber);
        }
        isLower(){   
        if (this.playersGuess < this.winningNumber){

            return true
        }
            return false
        }
        playersGuessSubmission(num){
            if (num < 1 || num > 100 || isNaN(num)) {
                throw 'That is an invalid guess.';
            }else {
                this.playersGuess = num
                return this.checkGuess();
            }
        }
        checkGuess(){
            let index = this.pastGuesses.indexOf(this.playersGuess);
            let feedback = '';
            let hint = '';
            if (this.isLower()){
                hint = 'Guess Higher!';
                
            } else {
                hint = 'Guess Lower!';
            }
            if (index !== -1) {
                feedback = 'You have already guessed that number.';
           }
           this.pastGuesses.push(this.playersGuess)
           if (this.winningNumber === this.playersGuess) {
            feedback = 'You Win!';
            } 
          else if (this.pastGuesses.length >= 5) {
            feedback = `You lose! The winning number was ${this.winningNumber}` ;
            hint = 'Click reset to try again!' 
          }
         else if (this.difference() < 10) {
            feedback = "You're burning up!";
          }
          else if (this.difference() < 25) {
            feedback = "You're lukewarm.";
          }
          else if (this.difference() < 50) {
            feedback = "You're a bit chilly.";
          }
          else if (this.difference() < 100) {
            feedback = "You're ice cold!";
          }
          document.querySelector('#title').innerHTML = feedback;
          document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
          document.querySelector('#subtitle').innerHTML = hint;
          return [feedback,hint]
        } 
        
    
    
    }

    function playGame() {
        const game = newGame();
        const button = document.querySelector('#submit');
        button.addEventListener('click', function() {
            const playersGuess = +document.querySelector('input').value;
            document.querySelector('input').value = '';
        
            game.playersGuessSubmission(playersGuess);
          });

        }
        playGame()

  
    
      
    
   


             
         
         
