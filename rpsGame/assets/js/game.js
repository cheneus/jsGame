var turn;
var gameLogic = {
  listener: function() {
    database.on("value", function(snapshot) {
      playerTurn = snapshot.child("turn").val();
    })
  },
  result: function () {

  },
  selection: function() {
  		var selection = $('input[name="yourPoison"').data('rps');
  		database.ref("player/"+playerNo).push({choice: selection});
  		database.ref("session").update({turn: turn + 1});

  }
}

database.ref("session/turn").on("value", function(snapshot) {
	turn = snapshot.val();
})

database.ref("player").on("value", function(snapshot) {
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

var setup =  function() {
  	$('input[type="radio"]').on('click', gameLogic.selection)
  }

 setup();