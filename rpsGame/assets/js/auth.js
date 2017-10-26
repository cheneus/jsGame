$(function() {
  const displayNameArr = ["SuperMonkey", "PikaPower", "RollWithEggRoll", "SuperFish", "TheGreatEscape"];
  // const user = firebase.auth().currentUser;
  var user = firebase.auth().currentUser;
  var credential;

  var setup = {
    gameState: function() {
      database.ref("player").once('value', function(snapshot) {
        if (snapshot.child("player1/id").val() == "" && snapshot.child("player2/id").val() == "") {
          setup.login()
        } else {
          $('#loginSec').text("THE GAME IS FULL NOW");
          $('#gameSec').hide();
        }
      })
    },
    login: function() {
      $('#loginSec').show();
      $('#gameSec').hide();
      // $('#loginOutBtn').hide();
    },

    game: function() {
      $('#loginSec').hide();
      $('#gameSec').show();
    }
  }
  setup.gameState();

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

  const message = {
    logIn: "has join the game",
    logOut: "has left the game"
  }


  function loginRandom() {
    firebase.auth().signInAnonymously()
      .then(function(user) {
        console.log("just login");
        setup.game();
        database.ref("chat").push({ username: yourDisplayName, text: message.logIn });

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
  };

  $('#loginOutBtn').on('click', logOut);

  function logOut() {
    database.ref("player/" + playerNo).set({ id: "" });
    firebase.auth().signOut()
      .then(function() {
        console.log("signed-out")
        setup.login();
        database.ref("chat").push({ username: yourDisplayName, text: message.logOut });

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

  };

  firebase.auth().onAuthStateChanged(function(user) {

    console.log(user);
    if (user) {
      // User is signed in.
      console.log("signed in")

      var isAnonymous = user.isAnonymous;
      username = user.uid
      setup.game();
      if (user.displayName == null) {
        user.updateProfile({
          displayName: yourDisplayName
        })
      }
      var userDisplayName = user.displayName;
      $('#yourName').text(userDisplayName);
      $('#anonymousState1').text(isAnonymous);
      // var tempName = displayNameArr[randomNum()];
      // $('#yourName').text(displayNameArr[randomNum()]);
      console.log(user)
      checkPlayers();
      // ...

    } else {
      // User is signed out.

      console.log("signed out")
      // ...
    }
    // ...
  });
  $('#loginBtn').on('click', function() {
    yourDisplayName = $('#displayNameTemp').val();
    loginRandom();
  });
});
