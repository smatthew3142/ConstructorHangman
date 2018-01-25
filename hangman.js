

var inquirer = require('inquirer');

var Word = require('./word.js');

var Letter = require('./letter.js');


var hangman = {

	wordBank:["ELEPHANT", "ORANGUTAN", "SNOW LEOPARD", "SEA LION","RATTLESNAKE", "MEERKAT", "GIRAFFE", "WILDEBEEST","ANTEATER", "GRIZZLY BEAR","CAPUCHIN MONKEY","FENNEC FOX", "HIPPOPOTAMUS","IGUANA","KANGAROO","JAGUAR","OKAPI","PANDA","TAPIR","VULTURE","ZEBRA"],

	guessesLeft: 10,

	alreadyGuessed: [], //array for player's guesses

	currentWord: null,


	startGame: function(){  //prompt to start the game

		var startGame = this;

		if(this.alreadyGuessed.length > 0) {

			this.alreadyGuessed = [];
		}

		inquirer.prompt([{

			name: "start",
			type: "confirm",
			message: "Start a new game?"

		}]).then(function(response){

			if (response.start) {

				startGame.newGame();
			}

			else {

				console.log("See you later!");
			}
		})

	},

	newGame: function(){

		if(this. guessesLeft === 10) {

			console.log("HINT: animals");
			console.log("Ready, set, GO!");
			console.log("^^^^^^^^^^^^^^^^");
			console.log(" ");


			var randomWord = Math.floor(Math.random() * this.wordBank.length); //pick a random word from the word bank

			this.currentWord = new Word (this.wordBank[randomWord]);
			this.currentWord.newLetters();

			console.log(this.currentWord.displayWord()); //display blank word

			this.nextGuess();
		}

		else {

			this.clearGuesses();
			this.newGame();
		}
	},

	clearGuesses: function(){

		this.guessesLeft = 10;
	},

	nextGuess: function(){

		var newGuess = this;

		inquirer.prompt([{ //ask for a letter

			name: "guess",
			type: "input",
			message: "Guess a letter.",

		}]).then(function(newLetter) {

				var chosenLetter = (newLetter.guess).toUpperCase(); //translate to all-caps to match word bank

				var repeatGuess = false;

				for(var i = 0; i < newGuess.alreadyGuessed.length; i++){

					if(chosenLetter === newGuess.alreadyGuessed[i]){

						repeatGuess = true;
					}
				}

				if(repeatGuess === false) {

					newGuess.alreadyGuessed.push(chosenLetter); //add letter to alreadyGuessed array

					var letterFound = newGuess.currentWord.checkLetter(chosenLetter);

					if(letterFound === 0) { //if guess is wrong

						console.log("Not in this word!");
						newGuess.guessesLeft--; //take away a guess

						console.log("Guesses Left:" + newGuess.guessesLeft);
						console.log("Letters already guessed:" + newGuess.alreadyGuessed);
						console.log("^^^^^^^^^^^^^^^^");
						console.log(" ");
						console.log(newGuess.currentWord.displayWord());
						console.log(" ");
						console.log("^^^^^^^^^^^^^^^^");
						console.log(" ");
					}

					else {

						console.log("Correct!");

	              		if(newGuess.currentWord.selectWord() === true) { //check for win

		                	console.log(newGuess.currentWord.displayWord());
		                	console.log("YOU WON!");
	                
	              		}


	              		else {

	              			console.log("Guesses Left:" + newGuess.guessesLeft);
							console.log("Letters already guessed:" + newGuess.alreadyGuessed);
							console.log("^^^^^^^^^^^^^^^^");
							console.log(" ");
							console.log(newGuess.currentWord.displayWord());
							console.log(" ");
							console.log("^^^^^^^^^^^^^^^^");
							console.log(" ");
	                
	             		}
					}

					if(newGuess.guessesLeft > 0 && newGuess.currentWord.wordSelected === false) { //if user has run out of guesses and hasn't completed the word, game over.

						newGuess.nextGuess();
					}

					else if (newGuess.guessesLeft === 0) {

						console.log("GAME OVER!");

						console.log("The correct answer was:  " + newGuess.currentWord.word)
					}
				}

				else {

					console.log("Letter already guessed. Try Again.");
					newGuess.nextGuess();
				}
	
			});
		}
	}

hangman.startGame();