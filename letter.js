

function Letter(newLetter) {

  this.letter = newLetter; //store the letter

  this.showLetter = false; // should the letter be shown

  this.lettersInWord = function() {

    if(this.letter == ' ') { //show a blank if there is a space in the letter
      
      this.showLetter = true;

      return '  ';

    }

    if(this.showLetter === false) {  //if it is not a space, a letter or blank should appear

      return ' _ ';
    } 

    else { 

      return this.letter;
    }

  };
};

module.exports = Letter;
