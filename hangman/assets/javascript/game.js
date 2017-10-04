 function hangBegin() {
    console.log("clicked");
    hangInfo.style.display = 'block';
    hangOutput.style.display = 'block';
    hangFeedback.style.display = 'block';

    var guess, currentGuess, letter, letters, lettersToShow, alphabet,
      lettersMatched = lettersGuessed = '',
      numLettersMatched = 0,
      lives = 5,
      wordChoice = ['wolf', 'hyena', 'tiger', 'lion', 'puma', 'fox'],
      // alphabet26 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      //   'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      //   't', 'u', 'v', 'w', 'x', 'y', 'z'
      // ];
      alphabet26 = "abcdefghijklmnopqrstuvwxyz";

    var alphaDisplay = document.getElementById('alphabetDisplay'),
      livesDisplay = document.getElementById('livesDisplay'),
      wordDisplay = document.getElementById('wordDisplay'),
      currentWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];



    livesDisplay.innerHTML = '<h2>' + lives + '</h2>';
    // alphaDisplay.innerHTML = '<h3 class="text-center">The 26 Alphabets  >>>Just In-case You Forgot<<<</h3>'
    // for (i = 0; i < alphabet26.length; i++) {
    //   alphabet = '<button class="alphabet" style="display:inline-block;" onclick="guess()" id="' + alphabet26.charAt(i).toUpperCase() + '">' + alphabet26.charAt(i).toUpperCase() + '</button>';
    //   // alphabet = '<button class="alphabet">' + alphabet26.charAt(i).toUpperCase() + '</button>'
    //   // alphabet.id = "alphaLetters";
    //   alphabetDisplay.insertAdjacentHTML('beforeend', alphabet);
    // };
    wordDisplay.innerHTML = '';
    for (i = 0; i < currentWord.length; i++) {
      var tempId = "letter_" + currentWord.charAt(i).toUpperCase();
      letter = '<li class="letter" id="letter_' + currentWord.charAt(i) + '">' + currentWord.charAt(i).toUpperCase() + '</li>'
      wordDisplay.insertAdjacentHTML('beforeend', letter);

    };


    var messages = {
      win: 'You win!',
      lose: 'Game over!',
      guessed: ' already guessed, please try again...',
      validLetter: 'Please enter a letter from A-Z'
    };


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

    // var guess = [];
    // document.getElementById("alpha11").innerHTML = answer.split("");
    // document.getElementById("alpha11").style.display = 'none';
    document.getElementById("alphaCorrect").innerHTML = '';
    document.getElementById("testInput").addEventListener('keydown', (event) => {
      const keyName = event.key;

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

            // for (var i = 0; i < currentWord.length; i++) {
            //   currentWord[i].classList.add("correct");
            // }

            /* check to see if letter appears multiple times */
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
            livesDisplay.innerHTML = 'You have ' + lives + ' lives remaining';
            printUnmatched();
            if (lives === 0) {
              console.log("Game Over");
              output.innerHTML = messages.lose;
              output.classList.add("alert-danger");

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

      // removeAlpha(keyName);
      // keyEntered.unshift(keyName);
      // console.log(keyName);
      // console.log(alpha);
      // document.getElementById("alphaType").innerHTML = alpha;
      // document.getElementById("keyType").innerHTML = keyEntered;
      document.getElementById("testInput").value = "";
    })
  };
