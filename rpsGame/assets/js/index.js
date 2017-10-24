 // var usernameInput = $('#username');
 var textInput = $('#text');
 var database = firebase.database();
 var username = '';
 var yourDisplayName = '';
 var playerNo = '';
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

 function checkPlayers() {
   database.ref("player").once('value', function(snapshot) {
     if (snapshot.child("player1/id").val() == "" && snapshot.child("player1/id").val() != username) {
       console.log("you are player 1");
       playerNo = "player1"
       return database.ref("player/player1").set({ id: username, displayName: yourDisplayName, choice:"" });
     } else if (snapshot.child("player2/id").val() == "" && snapshot.child("player2/id").val() != username) {
       console.log("you are player 2");
       playerNo = "player2"
       return database.ref("player/player2").set({ id: username, displayName: yourDisplayName, choice:"" });
     }
   });
 }

 database.ref(".info/connected").on("value", function(snap) {
   if (snap.val() === true) {
     console.log(true);
   } else {
     console.log(false)
   }
 })


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

 // Begin listening for data
 startListening();
