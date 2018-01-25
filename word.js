
// var wordBank:["ELEPHANT", "ORANGUTAN", "SNOW LEOPARD", "SEA LION","RATTLESNAKE", "MEERKAT", "GIRAFFE", "WILDEBEEST","ANTEATER", "GRIZZLY BEAR","CAPUCHIN MONKEY","FENNEC FOX", "HIPPOPOTAMUS","IGUANA","KANGAROO","JAGUAR","OKAPI","PANDA","TAPIR","VULTURE","ZEBRA"];

var Letter = require('./letter.js');

function Word(newWord) {

  var wordString = this; //word as a string

  this.wordSelected = false;
  this.word = newWord;
  this.letters = []; //store letters as objects


  this.newLetters = function(){ //put new Letters into the array

    for(var i = 0; i < wordString.word.length; i++){

      var wordLetters = new Letter (wordString.word[i]);

      this.letters.push(wordLetters);
    }
  };

  this.selectWord = function() { //select the new word

    if(this.letters.every(function(newLtr) {

      return newLtr.showLetter === true;

    })) {

      this.wordSelected = true;

      return true;
    }

  };

  this.checkLetter = function(guessLetter) { //loops through letters to see if there is a match to the guessed letter

    var correctLetters = 0;
    
    this.letters.forEach(function(newLtr) {

      if(newLtr.letter === guessLetter) {

        newLtr.showLetter = true;

        correctLetters++;

      }
    })
    
    return correctLetters;
  };


  this.displayWord = function() { //display word with the correct guesses

    var displayNewLetter = '';
    
    wordString.letters.forEach(function(newLtr){
      
      var currentLetter = newLtr.lettersInWord();
      
      displayNewLetter += currentLetter;

    });

    return displayNewLetter;
  };
}

module.exports = Word;