$(function() {
  let message = "";
  var turn;


  var gameLogic = {

    p1win: 0,
    p1lose: 0,

    p2win: 0,
    p2lose: 0,

    win: function() {
      gameLogic.p1win += 1;
      gameLogic.p2lose += 1;
      database.ref("player/p2").update({ status: "You lose! NOW feel the pain" });
      database.ref("player/p1").update({ status: "You win" });
    },

    lose: function() {
      gameLogic.p2win += 1;
      gameLogic.p1lose += 1;
      database.ref("player/p1").update({ status: "You lose! NOW feel the pain" });
      database.ref("player/p2").update({ status: "You win" });
    },

    feedbackUpdate: function() {
      database.ref("player/p1").update({ win: gameLogic.p1win, lose: gameLogic.p1lose });
      database.ref("player/p2").update({ win: gameLogic.p2win, lose: gameLogic.p2lose });


    },
    showDown: function() {
      let p1Choice, p2Choice;
      database.ref("player").once("value", function(snapshot) {
        // yourChoice = snapshot.child("choice").val();
        p1Choice = snapshot.child("p1/choice").val();
        p2Choice = snapshot.child("p2/choice").val();
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
      // database.ref('session').set({ turn: 0 });
      // })
      console.log(gameLogic.p1win);
      console.log(gameLogic.p2win);
      gameLogic.feedbackUpdate();
      database.ref("player/p2").update({ choice: "" });
      database.ref("player/p1").update({ choice: "" });
      database.ref("session").update({ turn: 1 });
    },

    selection: function() {
      let selected = $('input[name="yourPoison"]:checked').data('rps');
      var yourChoice;
      // $('input[type="radio"]').off('click')
      // database.ref("player/" + playerNo).update({ choice: selection });
      // $('#choiceChoosen').text(selected.toUpperCase());
      $('#choiceChoosen').empty();
      $(this).clone().appendTo('#choiceChoosen');
      $('#choiceChoosen').append($('#poison' + selected.toUpperCase()).text());
      database.ref("player/" + playerNo).once("value", function() {
          database.ref("player/" + playerNo).update({ choice: selected });

        })
        // .then(function() {

        .catch(function(error) {
          console.log(error)
        })
      // database.ref("player").once("value", function(snapshot) {
        database.ref("player").once("value")
        .then( function(snapshot) {
        if (snapshot.child("p1/choice").val() != "" && snapshot.child("p2/choice").val() != "") {
          gameLogic.showDown();

        }
      })
      // })

    }
  }

  database.ref("session").on("value", function(snapshot) {
    if (snapshot.child('turn').val() == 1) {
      database.ref("player/" + playerNo).on("value", function(snapshot) {
        message = snapshot.child("status").val();
        win = snapshot.child("win").val();
        lose = snapshot.child("lose").val();
        $('#messageOutput').text(message);
        $('#win').text(win);
        $('#lose').text(lose);
      })
      database.ref("session").update({ turn: 0 });
    }
  })

  $('input[type="radio"]').on('click', gameLogic.selection)
});
