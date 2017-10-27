$(function() {
  var turn;
  var win = 0, lose = 0, draw = 0;
  var gameLogic = {
    message: {
      win: "You win",
      draw: "You cancel out each other",
      lose: "You lose! NOW feel the pain"
    },

    win: function() {
      $('#messageOutput').text(gameLogic.message.win);
      win++
        $('#win').text(win);
    },

    lose: function() {
      $('#messageOutput').text(gameLogic.message.lose);
      lose++
        $('#lose').text(lose);
    },

    draw: function() {
      $('#messageOutput').text(gameLogic.message.draw);
      draw ++
        $('#draw').text(draw);
    },

    showDown: function() {
      let p1Choice, p2Choice;
      database.ref("player").on("value", function(snapshot) {
        // yourChoice = snapshot.child("choice").val();
        p1Choice = snapshot.child("player1/choice").val();
        p2Choice = snapshot.child("player2/choice").val();
        console.log(p1Choice)
        console.log(p2Choice)
      })
      // .then(function() {
      if (p1Choice == "p") {
        if (p2Choice == "r") {
          console.log("you win");
          gameLogic.win();
        } else if (p2Choice == "s") {
          console.log("you lose");
          gameLogic.lose();
        }
        // console.log("p1 WINS");
      }
      if (p1Choice == "s") {
        if (p2Choice == "r") {
          console.log("you win");
          gameLogic.win();
        } else if (p2Choice == "p") {
          console.log("you lose");
          gameLogic.lose();
        }
        // console.log("p1 WINS");
      }
      if (p1Choice === p2Choice) {
        console.log("DRAW")
        gameLogic.draw();
      }
      // database.ref('session').set({ turn: 0 });
      // })

    },

    selection: function() {
      var selected = $('input[name="yourPoison"]:checked').data('rps');
      var yourChoice;
      $('input[type="radio"]').off('click')
      // database.ref("player/" + playerNo).update({ choice: selection });
      // $('#choiceChoosen').text(selected.toUpperCase());
      $('#choiceChoosen').empty();
      $(this).clone().appendTo('#choiceChoosen');
      $('#choiceChoosen').append($('#poison' + selected.toUpperCase()).text());
      database.ref("player/" + playerNo).once("value", function() {
          database.ref("player/" + playerNo).update({ choice: selected });

        })
        // .then(function() {
        // database.ref("session").update({ turn: turn + 1 });
        // // gameLogic.result();
        // if (turn == 2) {
        //   gameLogic.showDown();
        // }

        // })
        .catch(function(error) {
          console.log(error)
        })



      // database.ref("player").on("value", function(snapshot) {
      //   // yourChoice = snapshot.child.val();
      // })
      // console.log(yourChoice);
    }
  }

  // database.ref("session/turn").on("value", function(snapshot) {
  //   turn = snapshot.val();
  // })

  database.ref("player").on("value", function(snapshot) {
    if (snapshot.child("player1/choice").val() != null && snapshot.child("player2/choice").val() != null) {
      gameLogic.showDown();
    }
  })

  // database.ref("player").on('child_changed', function(snapshot) {
  //   if (username != snapshot.child("player1/id").val()) {
  //     $('#opoName').text(snapshot.child("player1/displayName").val())
  //     // always true due to there is no other way for your to auth
  //     $('#anonymousState2').text("true");
  //   }
  //   if (username != snapshot.child("player2/id").val()) {
  //     $('#opoName').text(snapshot.child("player2/displayName").val())
  //     $('#anonymousState2').text("true");
  //   }
  // })
  $('input[type="radio"]').on('click', gameLogic.selection)
});
