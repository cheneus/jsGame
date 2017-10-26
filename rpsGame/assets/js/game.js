$(function() {
  var turn;
  var gameLogic = {
    win: 0,
    lose: 0,
    message: {
      win: "Your poison win",
      draw: "The poison cancel out each other",
      lose: "You lose! NOW feel the pain"
    },

    showDown: function() {
      let p1Choice, p2Choice;
      database.ref("player").on("value", function(snapshot) {
        // yourChoice = snapshot.child("choice").val();
        p1Choice = snapshot.child("player1/choice").val();
        p2Choice = snapshot.child("player2/choice").val();
      })
      // .then(function() {
      if (p1Choice == "p") {
        if (p2Choice == "r") {
          console.log("p1 WINS");
        } else if (p2Choice == "s") {
          console.log("p2 WINS");
        }
        // console.log("p1 WINS");
      }
      if (p1Choice == "s") {
        if (p2Choice == "r") {
          console.log("p1 WINS");
        } else if (p2Choice == "p") {
          console.log("p2 WINS");
        }
        // console.log("p1 WINS");
      }
      if (p1Choice === p2Choice) {
        console.log("DRAW")
      }
      $('#input[name="yourPoison"]').prop("disabled", false);
      database.ref('session').set({ turn: 0 });
      // })
    },

    selection: function() {
      var selection = $('input[name="yourPoison"]:checked').data('rps');
      var yourChoice;
      $('#input[name="yourPoison"]').prop("disabled", true);
      // database.ref("player/" + playerNo).update({ choice: selection });

      database.ref("player/" + playerNo).once("child_changed", function() {
          database.ref("player/" + playerNo).update({ choice: selection });
          database.ref("session").update({ turn: turn + 1 });
        })
        .then(function() {

          // gameLogic.result();
          if (turn == 2) {
            gameLogic.showDown();
          }

        })
        .catch(function(error) {
          console.log(error)
        })



      database.ref("player").on("value", function(snapshot) {
        // yourChoice = snapshot.child.val();
      })
      console.log(yourChoice);
    }
  }

  database.ref("session/turn").on("value", function(snapshot) {
    turn = snapshot.val();
  })

  database.ref("player").on('child_changed', function(snapshot) {
    if (username != snapshot.child("player1/id").val()) {
      $('#opoName').text(snapshot.child("player1/displayName").val())
      // always true due to there is no other way for your to auth
      $('#anonymousState2').text("true");
    }
    if (username != snapshot.child("player2/id").val()) {
      $('#opoName').text(snapshot.child("player2/displayName").val())
      $('#anonymousState2').text("true");
    }
  })

  var setup = {
    start :function() {
      $('input[type="radio"]').on('click', gameLogic.selection)
      $('#gameSec').hide();
    }
  }
  setup.start();
});
