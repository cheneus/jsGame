  var database = firebase.database();
  $(function() {
    // var usernameInput = $('#username');
    var textInput = $('#text');

    var username = "";
    var yourDisplayName = "";
    var playerNo = "";
    const playerRef = database.ref("player");

    var checkId = function() {
      database.ref("player").on('value', function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.numChildren())
        console.log(snapshot.length);

        // var msgUsernameElement = document.createElement("b");
        // msgUsernameElement.textContent = msg.username;
        // $('#chatOutput').append("<div><b>"+msg.username+"</b><p>"+msg.text+"</p></div");
      });
    }
    // checkId();

    $('#cID').on('click', startGame);

    function startGame() {
      database.ref("player/player1").set({ id: "", displayName: "" });
      database.ref("player/player2").set({ id: "", displayName: "" });
      database.ref("session").set({ turn: 0 });
    }

    database.ref(".info/connected").on("value", function(snap) {
      if (snap.val() === true) {
        console.log("true" + " connected");
      } else {
        console.log(false)
      }
    })
  });
