$(function() {
  var hangInfo = document.getElementById('hangInfo'),
    hangOutput = document.getElementById('hangOutput'),
    hangEnd = document.getElementById('hangEnd'),
    hangFeedback = document.getElementById('hangFeedback');

  var guess, lives, numLettersMatched, currentGuess, letter, letters, lettersToShow, tempId, alphabet;
  var wordChoice = ['wolf', 'hyena', 'tiger', 'lion', 'puma', 'fox'],
    alphabet26 = "abcdefghijklmnopqrstuvwxyz";
  var lettersMatched = lettersGuessed = '',
    alphaDisplay = document.getElementById('alphabetDisplay'),
    livesDisplay = document.getElementById('livesDisplay'),
    wordDisplay = document.getElementById('wordDisplay');

  var messages = {
    win: 'You win!',
    lose: 'Game over!',
    guessed: ' already guessed, please try again...',
    validLetter: 'Please enter a letter from A-Z'
  };

  document.getElementById('playAgain').addEventListener('click', () => {
    resetStat()
      hangEnd.style.display = 'none';
              hangOutput.style.display = 'flex';
  })

  var resetStat = function() {
    numLettersMatched = 0,
      lives = 5,
      livesDisplay.innerHTML = '<h1>' + lives + '</h1>',
      wordDisplay.innerHTML = '',
      lettersGuessed = "",
      currentWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
    for (i = 0; i < currentWord.length; i++) {
      tempId = "letter_" + currentWord.charAt(i).toUpperCase();
      letter = '<li class="letter" id="letter_' + currentWord.charAt(i) + '">' + currentWord.charAt(i).toUpperCase() + '</li>'
      wordDisplay.insertAdjacentHTML('beforeend', letter);
    };
    document.getElementById("alphaCorrect").innerHTML = '';
    document.getElementById("alphaWrong").innerHTML = '';
  }

  var setup = function() {
    console.log("setup")
    resetStat()
    console.log("reset")
    hangInfo.style.display = 'none';
    hangOutput.style.display = 'none';
    hangEnd.style.display = 'none';
    hangFeedback.style.display = 'none';
  }

  var printMatched = function() {
    document.getElementById("alphaCorrect").innerHTML = '';
    for (i = 0; i < lettersMatched.length; i++) {
      var matchedAlpha = '<button class="matched" disabled>' + lettersMatched.charAt(i).toUpperCase() + '</button>';
      // alphabet = '<button class="alphabet">' + alphabet26.charAt(i).toUpperCase() + '</button>'
      // alphabet.id = "alphaLetters";
      document.getElementById("alphaCorrect").insertAdjacentHTML('beforeend', matchedAlpha);
    };
  }

  var printUnmatched = function() {
    document.getElementById("alphaWrong").innerHTML = '';
    for (i = 0; i < lettersGuessed.length; i++) {
      var unmatchedAlpha = '<button class="unmatched" disabled>' + lettersGuessed.charAt(i).toUpperCase() + '</button>';
      // alphabet = '<button class="alphabet">' + alphabet26.charAt(i).toUpperCase() + '</button>'
      // alphabet.id = "alphaLetters";
      document.getElementById("alphaWrong").insertAdjacentHTML('beforeend', unmatchedAlpha);
    };
  }

  document.getElementById("hangStart").addEventListener('click', () => {
    console.log("clicked");
    startDiv.style.display = "none";
    hangInfo.style.display = 'flex';
    hangOutput.style.display = 'flex';
    hangFeedback.style.display = 'flex';

    document.getElementById("testInput").addEventListener('keydown', (event) => {
      const keyName = event.key;
      event.preventDefault();
      if (keyName) {
        /* is guess a valid letter? if so carry on, else error */
        if (alphabet26.indexOf(keyName) > -1) {
          /* has it been guessed (missed or matched) already? if so, abandon & add notice */
          if ((lettersMatched && lettersMatched.indexOf(keyName) > -1) || (lettersGuessed && lettersGuessed.indexOf(keyName) > -1)) {
            output.innerHTML = '"' + keyName.toUpperCase() + '"' + messages.guessed;
            output.classList.add("alert-warning");
          }
          /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
          else if (currentWord.indexOf(keyName) > -1) {
            var lettersToShow, wordInCurrent;
            lettersToShow = document.querySelectorAll(".letter" + keyName.toUpperCase());
            var tempId = String("letter_" + keyName);
            document.getElementById(tempId).style.backgroundColor = 'green';
            for (var j = 0; j < currentWord.length; j++) {
              if (currentWord.charAt(j) === keyName) {
                numLettersMatched += 1;
              }
            }
            lettersMatched += keyName;
            if (numLettersMatched === currentWord.length) {
              printMatched();
              console.log("You Win");
              output.innerHTML = messages.win;
              output.classList.add("alert-sucess");
            }
            printMatched();
          }
          /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
          else {
            lettersGuessed += keyName;
            lives--;
            livesDisplay.innerHTML = '<h1>You have ' + lives + ' lives remaining</h1>';
            printUnmatched();
            if (lives === 0) {
              console.log("Game Over");
              output.innerHTML = messages.lose;
              output.classList.add("alert-danger");
              hangEnd.style.display = 'flex';
              hangOutput.style.display = 'none';
              document.getElementById('wordDisplay').innerHTML ='<h1>'+currentWord.toUpperCase()+'</h1>'
            }
          }
          /* not a valid letter, error */
        } else {
          output.classList.add('error');
          output.innerHTML = messages.validLetter;
          output.classList.add("alert-warning");
        }
      }
      /* no letter entered, error */
      else {
        output.classList.add('error');
        output.innerHTML = messages.validLetter;
        output.classList.add("alert-warning");
      }
      document.getElementById("testInput").value = "";
    })
  })
  setup();
});