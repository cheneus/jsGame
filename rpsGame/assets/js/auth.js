 const displayNameArr = ["SuperMonkey", "PikaPower", "RollWithEggRoll", "SuperFish", "TheGreatEscape"];
 // const user = firebase.auth().currentUser;

 function randomNum() {
   return Math.floor(Math.random() * displayNameArr.length);
 }

 $('#loginBtn').on('click', function() {
   firebase.auth().signInAnonymously().catch(function(error) {
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
   firebase.auth().signOut();
   database.ref("chat").push({ username: yourDisplayName, text: logOutText });

   firebase.auth().currentUser.delete().catch(function(error) {
     // An error happened.
   });
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

 // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
 //  .then(function() {
 //    // Existing and future Auth states are now persisted in the current
 //    // session only. Closing the window would clear any existing state even
 //    // if a user forgets to sign out.
 //    // ...
 //    // New sign-in will be persisted with session persistence.
 //    return firebase.auth().signInWithEmailAndPassword(email, password);
 //  })
 //  .catch(function(error) {
 //    // Handle Errors here.
 //    var errorCode = error.code;
 //    var errorMessage = error.message;
 //  });

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
