$(document).ready(function() {

  function currentQuestion(question, choice) {
    var obj = {
      question: question,
      choice: choice,
    };
    return obj
  }

  var gameLogic = {
    question: {},
    yourAnswer: [],
    theAnswer: [],
    questionCheck: [],
    count: 0,
    correctCount: 0,

    // random : function() {
    // 	Math.floor(Math.random(trivia.length + 1))
    // }
    pickRandomProperty: function(obj) {
      // Math.floor((Math.random() * obj.length) + 1);
      // question = {},
      // count = 0;
      // for (var prop in obj)
      //   if (Math.random() < 1 / ++count)
      //     console.log(obj[prop])
      //  	propTest = prop;
      // return question = obj[prop];
      var temp_key, keys = [];
      for (temp_key in obj) {
        if (obj.hasOwnProperty(temp_key)) {
          keys.push(temp_key);
        }
      }
      questionChoosen = keys[Math.floor(Math.random() * keys.length)];

      if (!this.questionCheck.includes(questionChoosen)) {
        this.questionCheck.push(keys[Math.floor(Math.random() * keys.length)]);
        this.count++;
        console.log(this.count);
        return question = obj[keys[Math.floor(Math.random() * keys.length)]];
      } else {
        console.log("rerun");
        this.pickRandomProperty(trivia);
      }



    },
    // makeQuestion: function()

    render: function() {
      this.pickRandomProperty(trivia);
      // if (!this.questionCheck.includes()) {
      //   this.questionCheck.push(this.propTest);
      // } else {
      //   this.pickRandomProperty(trivia);
      // }

      $('#questionOutput').text(question.question)

      for (var prop in question.choice) {
        $('#' + prop).text(prop.toUpperCase() + " : " + question.choice[prop])
      }
    },

    finalResult: function() {
      for (var i = 0; i < this.yourAnswer.length; i++) {
        // for (var j = 0; j < this.theAnswer.length; j++) {
          if (this.yourAnswer[i] == this.theAnswer[i]) {
            this.correctCount++;
            console.log(this.correctCount);
          }
        // }
      }
      $("#yourScore").text(this.correctCount);
    }

  } // end of Game Logic
  // info for randomize version. 
  // choice: {
  //   [
  //     Bulbasaur, Charmander, and Squirtle
  //     Chikorita, Cyndaquil, and Totodile
  //     Treedy, Grilpas, and Kanew
  //     Grassy, Firey, and Watery
  //     Treecko, Torchic, and Mudkip
  //   ]
  // }

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
    // q3: {
    //   question: "True or false: The National Pokedex numbers the Pokemon based on the order they were created.",

    //   choice: {
    //     a: "true",
    //     b: "false"
    //   },
    // },
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

  // var answer = {
  //   q1: trivia.q1.choice.b,
  //   q2: trivia.q2.choice.c,
  //   q3: trivia.q3.choice.b,
  //   q4: trivia.q4.choice.a
  // }


  var btnHandler = {
    start: function() {
      // $('#startPage').hide();
      gameLogic.render();
    },

    submitAns: function() {
      gameLogic.yourAnswer.push($("input[name=multiChoice]:checked").val());
      console.log($("input[name=multiChoice]:checked").val());
      gameLogic.theAnswer.push(question.answer);
      console.log(gameLogic.theAnswer);
      if (gameLogic.questionCheck.length < 4) {
        gameLogic.render();
      } else {
        gameLogic.finalResult();
      }

    }

  }
  $('input[name=multiChoice]').on('click', btnHandler.submitAns)
  $('#startBtn').on('click', btnHandler.start)
  // $('#triviaForm').hide();
});
console.log("document is ready")
