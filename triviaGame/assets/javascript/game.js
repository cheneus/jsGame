$(document).ready(function() {

  var trivia = {
    q1: {
      question: "In the second-generation Pokemon games, which Pokemon can you start with?",

      choice: {
        a: "Bulbasaur, Charmander, and Squirtle",
        b: "Chikorita, Cyndaquil, and Totodile",
        c: "Treedy, Grilpas, and Kanew",
        d: "Treecko, Torchic, and Mudkip",
      },
      answer: "b",
    },
    q2: {
      question: "Which one is not a Pokemon?",

      choice: {
        a: "Pikachu",
        b: "Jigglypuff",
        c: "Jura",
        d: "Gardevoir",
      },
      answer: "c",
    },
    q3: {
      question: "Given that a Diglett and a Raichu have the exact same stats and ability (not going to happen), who will do more damage to identical enemy Pokemon when using Dig?",

      choice: {
        a: "Raichu",
        b: "Diglett",
        c: "Both of them deals the same ammout",
        d: "Raiche can't learn dig"
      },
      answer: "b",
    },
    q4: {
      question: "What does the Pokemon ability Levitate do?",

      choice: {
        a: "A Pokemon with Levitate is not affected by ground-type moves regardless of the Pokemon with the ability.",
        b: "It helps you avoid wild Pokemon because you can float over them.",
        c: "It makes the Pokemon with Levitate faster due to flying capabilities.",
        d: "Levitate makes the moves \"Fly\" and \"Bounce\" stronger due to the ability to go to higher altitudes.",
      },
      answer: "a",
    },
    q5: {
      question: "What does a Pokemon's nature do?",

      choice: {
        a: "The nature of a Pokemon increases one stat by 10% and decreases another by 10%.",
        b: "It will affect the behaviour of the Pokemon in the game.",
        c: "It will have an effect on the Pokemon's happiness.",
        d: "Nothing. It is just a cool thing to have.",
      },
      answer: "a",
    },
    q6: {
      question: "Wooper is introduced in which Pokemon generation?",

      choice: {
        a: "1st Gen",
        b: "2nd Gen",
        c: "3rd Gen",
        d: "4th Gen",
      },
      answer: "b",
    },
    q7: {
      question: "Which Pokemon is the very first one you see in the history of Pokemon games? ",

      choice: {
        a: "Pikachu",
        b: "Nidoking",
        c: "Lapras",
        d: "Gengar",
      },
      answer: "d",
    },
  }

  var gameLogic = {
    testArr: [],
    question: {},
    yourAnswer: [],
    theAnswer: [],
    questionCheck: [],
    // questionChoosen: "",
    keys: [],
    correctCount: 0,

    intialize: function() {
      $('#gamePage').hide();
      $('#resultPage').hide();
      $('#startPage').show();
      this.yourAnswer = [],
        this.theAnswer = [],
        this.questionCheck = [],
        this.correctCount = 0;
      timer.time = 30;
    },

    random: function(obj) {
      var temp_key;
      for (temp_key in obj) {
        if (obj.hasOwnProperty(temp_key)) {
          this.keys.push(temp_key);
        }
      }
    },

    pickRandomProperty: function() {
      questionChoosen = gameLogic.keys[Math.floor(Math.random() * this.keys.length)];
      console.log(this.questionCheck)
      console.log(!this.questionCheck.includes(questionChoosen));
      console.log(this.questionCheck.includes(questionChoosen))
      var Qindex = gameLogic.keys.indexOf(questionChoosen);
      if (Qindex > -1) {
        gameLogic.keys.splice(Qindex, 1);
      }
      return question = trivia[questionChoosen];
    },

    render: function() {
      this.pickRandomProperty();
      $('#questionOutput').text(question.question)

      for (var prop in question.choice) {
        $('#' + prop).text(prop.toUpperCase() + " : " + question.choice[prop])
      }
    },

    finalResult: function() {
      $('#resultPage').show();
      $('#gamePage').hide();
      for (var i = 0; i < this.yourAnswer.length; i++) {
        if (this.yourAnswer[i] == this.theAnswer[i]) {
          this.correctCount++;
          console.log(this.correctCount);
        } else {
          var tempAns = gameLogic.testArr[i].answer;
          $('#correctAns').append("<h4 class='card-title p-2'>Question "+(i+1)+"<h4>")
          $('#correctAns').append("<p class='card-text'>"+gameLogic.testArr[i].question+"</p>");
          $('#correctAns').append("<p class='card-text'>Corrent Answer : "+gameLogic.testArr[i].choice[tempAns]+"</p>");
        }
      }
      $("#yourScore").text(this.correctCount);
    },

  } // end of Game Logic



  var timer = {
    time: 30,
    running: false,

    start: function() {
      if (!timer.running) {
        intervalId = setInterval(timer.count, 1000);
        timer.running = true;
      }
    },

    stop: function() {
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function() {
      timer.time--;
      $('#timerDisplay').text(timer.time);
      console.log(timer.time);
      if (timer.time == 0) {
        gameLogic.finalResult();
        timer.stop();
      }
    }
  }

  var btnHandler = {

    start: function() {
      // $('#startPage').hide();
      gameLogic.random(trivia);
      gameLogic.render();
      $('#gamePage').show();
      $('#startPage').hide();
      timer.start();
      $('#timerDisplay').text(timer.time);
    },

    submitAns: function() {
      gameLogic.yourAnswer.push($("input[name=multiChoice]:checked").val());
      gameLogic.testArr.push(question);
      console.log(gameLogic.testArr);
      console.log($("input[name=multiChoice]:checked").val());
      gameLogic.theAnswer.push(question.answer);
      console.log(gameLogic.theAnswer);
      console.log("click");
      if (gameLogic.yourAnswer.length == 4) {
        gameLogic.finalResult();
        timer.stop();
      } else {
        gameLogic.render();
      }
    },
    reset: function() {
      gameLogic.intialize();
      $('#gamePage').hide();
      $('#resultPage').hide();
      $('#startPage').show();
      $('#correctAns').empty()
    }

  }
  $('input[name=multiChoice]').on('click', btnHandler.submitAns);
  $('#startBtn').on('click', btnHandler.start);
  $('#resetBtn').on('click', btnHandler.reset);
  gameLogic.intialize();
});
console.log("document is ready")
