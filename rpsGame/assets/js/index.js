 var usernameInput = $('#username');
 var textInput = $('#text');
 var database = firebase.database();

 $('#postBtn').on("click", function() {
   console.log("working");
   var msgUser = usernameInput.val();
   var msgText = textInput.val();
   console.log(msgUser + msgText);
   database.ref("chat").push({ username: msgUser, text: msgText });
   textInput.value = "";
 });

 var startListening = function() {
   database.ref("chat").on('child_added', function(snapshot) {
     var msg = snapshot.val();

     var msgUsernameElement = document.createElement("b");
     msgUsernameElement.textContent = msg.username;

     var msgTextElement = document.createElement("p");
     msgTextElement.textContent = msg.text;



     var msgElement = document.createElement("div");
     msgElement.appendChild(msgUsernameElement);
     msgElement.appendChild(msgTextElement);
     msgElement.className = "msg";
     document.getElementById("results").appendChild(msgElement);
   });
 }

 // Begin listening for data
 startListening();

 // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
 //   // Handle Errors here.
 //   var errorCode = error.code;
 //   var errorMessage = error.message;
 //   // ...
 // });

 // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
 //   // Handle Errors here.
 //   var errorCode = error.code;
 //   var errorMessage = error.message;
 //   // ...
 // });

 // firebase.auth().onAuthStateChanged(function(user) {
 //   if (user) {
 //     // User is signed in.
 //     var displayName = user.displayName;
 //     var email = user.email;
 //     var emailVerified = user.emailVerified;
 //     var photoURL = user.photoURL;
 //     var isAnonymous = user.isAnonymous;
 //     var uid = user.uid;
 //     var providerData = user.providerData;
 //     // ...
 //   } else {
 //     // User is signed out.
 //     // ...
 //   }
 // });
 // addEventListner , run signIn
 $('#loginBtn').on('click', function() {
   firebase.auth().signInAnonymously().catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(error.message);
     // ...
   });
 });

 $('#loginOutBtn').on('click', function() {
   firebase.auth().signOut();
 });

 firebase.auth().onAuthStateChanged(function(user) {
   console.log(user);
   if (user) {
     // User is signed in.
     var isAnonymous = user.isAnonymous;
     var uid = user.uid;
     // ...
   } else {
     // User is signed out.
     // ...
   }
   // ...
 });
