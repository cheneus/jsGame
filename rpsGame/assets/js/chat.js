$(function() {
  $('#postBtn').on("click", function() {
    console.log("working");
    var msgUser = yourDisplayName;
    var msgText = textInput.val();
    console.log(msgUser + msgText);
    database.ref("chat").push({ username: msgUser, text: msgText });
    textInput.value = "";
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
