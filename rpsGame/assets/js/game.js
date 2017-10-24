var gameLogic = {
  listener: function() {
    database.on("value", function(snapshot) {
      playerTurn = snapshot.child("turn").vali();
    })
  }
}

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
