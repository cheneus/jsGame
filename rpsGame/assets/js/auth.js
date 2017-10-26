$(function() {
  const displayNameArr = ["SuperMonkey", "PikaPower", "RollWithEggRoll", "SuperFish", "TheGreatEscape"];
  // const user = firebase.auth().currentUser;
  var user = firebase.auth().currentUser;
  var credential;

  // Prompt the user to re-provide their sign-in credentials




  function randomNum() {
    return Math.floor(Math.random() * displayNameArr.length);
  }

  function checkPlayers() {
    database.ref("player").once('value', function(snapshot) {
      // if (snapshot.child("player1/id").val() !== "" && snapshot.child("player2/id").val() !== "") {
      //   console.log("we already have 2 players");
      //   return $("#cID").append('Some text');
      // }
      if (snapshot.child("player1/id").val() == "" && snapshot.child("player1/id").val() != username) {
        console.log("you are player 1");
        playerNo = "player1";
        return database.ref("player/player1").set({ id: username, displayName: yourDisplayName, choice: "" });
      } else if (snapshot.child("player2/id").val() == "" && snapshot.child("player2/id").val() != username) {
        console.log("you are player 2");
        playerNo = "player2";
        return database.ref("player/player2").set({ id: username, displayName: yourDisplayName, choice: "" });
      }
    });
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
});
