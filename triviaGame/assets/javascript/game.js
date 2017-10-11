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
      question: "Which one is nt a Pokemon?",

      choice: {
        a: "Pikachu",
        b: "Jigglypuff",
        c: "Jura",
        d: "Gardevoir",
      },
      answer: "c",
    },
    q3: {
      question: "Given that a Diglett and a Raichu have the exact same stats and ability (not going to happen), who will do more damage to identical enemy Pokémon when using Dig?",

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

  }

  // function currentQuestion(question, choice) {
  //   var obj = {
  //     question: question,
  //     choice: choice,
  //   };
  //   return obj
  // }

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
    // for (var prop in obj) {

    // }
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
      // if (this.questionCheck.includes(questionChoosen) === false) {
      //   // this.questionCheck.push(keys[Math.floor(Math.random() * keys.length)]);
      //   this.questionCheck.push(questionChoosen)
      //   return question = trivia[questionChoosen];
      // } else {
      //   if (gameLogic.questionCheck.length == 4) {
      //     gameLogic.render();
      //   } else {
      //     gameLogic.finalResult();

      //   }
      //   console.log("rerun");
      //   this.pickRandomProperty();
      // }
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
        }
        else {
        	$('#qTitle').append(gameLogic.testArr[i].question)
        	$('#qAnswer').append(gameLogic.testArr[i].answer)
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
    count: function() {
      timer.time--;
      $('#timerDisplay').text(timer.time);
      console.log(timer.time);
      if (timer.time == 0) {
        gameLogic.finalResult();
        clearInterval(intervalId);
        timer.running = false;
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
      if (gameLogic.keys.length === 0) {
        gameLogic.finalResult();
        clearInterval(intervalId);
        timer.running = false;
      } else {
        gameLogic.render();
      }
    },
    reset: function() {
      gameLogic.intialize();
      $('#gamePage').hide();
      $('#resultPage').hide();
      $('#startPage').show();
    }

  }
  $('input[name=multiChoice]').on('click', btnHandler.submitAns);
  $('#startBtn').on('click', btnHandler.start);
  $('#resetBtn').on('click', btnHandler.reset);
  gameLogic.intialize();
});
console.log("document is ready")
