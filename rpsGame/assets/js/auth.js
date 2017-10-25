 const displayNameArr = ["SuperMonkey", "PikaPower", "RollWithEggRoll", "SuperFish", "TheGreatEscape"];
 // const user = firebase.auth().currentUser;
 var user = firebase.auth().currentUser;
 var credential;

 // Prompt the user to re-provide their sign-in credentials




 function randomNum() {
   return Math.floor(Math.random() * displayNameArr.length);
 }

 $('#loginBtn').on('click', function() {
   firebase.auth().signInAnonymously()
     .then(function() {
       console.log("login on d fly")
     })

     .catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(error.message);

       // ...
     })
   // .then(function(user) {
   //   username = user.uid;
   // })
 });

 $('#loginOutBtn').on('click', function() {
   var logOutText = "has signed out..!";
   database.ref("player/" + playerNo).set({ id: "" });
   firebase.auth().signOut()
     .then(function() {
       console.log("signed-out")

       database.ref("chat").push({ username: yourDisplayName, text: logOutText });

       // }).then(function() {
       //   user.reauthenticateWithCredential(credential).then(function() {
       //     // User re-authenticated.
       //   }).then(function() {
       //     user.delete().then(function() {
       //       // User deleted.
       //     })
     }).catch(function(error) {
       // An error happened.
     });
   // });

 });

 firebase.auth().onAuthStateChanged(function(user) {

   console.log(user);
   if (user) {
     // User is signed in.
     console.log("signed in")
     // var displayName = user.displayName;
     var isAnonymous = user.isAnonymous;
     username = user.uid

     if (isAnonymous == true) {
       // var tempName = displayNameArr[randomNum()];
       yourDisplayName = $('#displayNameTemp').val();
       // $('#yourName').text(displayNameArr[randomNum()]);
       console.log(user);
     }
     checkPlayers();
     $('#yourName').text(yourDisplayName);
     $('#anonymousState1').text(isAnonymous);
     // ...

   } else {
     // User is signed out.
     console.log("signed out")
     // ...
   }
   // ...
 });
