$(function() {
  $('#postBtn').on("click", function() {
    console.log("working");
    var msgUser = yourDisplayName;
    var msgText = $('#text').val();
    console.log(msgUser + msgText);
    database.ref("chat").push({ username: msgUser, text: msgText });
    $('#text').value = "";
  });

  var startListening = function() {
    database.ref("chat").on('child_added', function(snapshot) {
      var msg = snapshot.val();

      // var msgUsernameElement = document.createElement("b");
      // msgUsernameElement.textContent = msg.username;
      $('#chatOutput').append("<div><b>" + msg.username + "</b><p>" + msg.text + "</p></div");
    });
  }
  startListening();
});

database.ref("player").on("value", function(snapshot) {
    if (snapshot.child("p1/id").val() == "" && snapshot.child("p2/id").val() == "") {
      database.ref("chat").set({});
    }

  })