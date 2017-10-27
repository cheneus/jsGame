$(function() {
  const displayNameArr = ["SuperMonkey", "PikaPower", "RollWithEggRoll", "SuperFish", "TheGreatEscape"];
  const user = firebase.auth().currentUser;
  // var user = firebase.auth().currentUser;
  var credential;

  var setup = {
    gameState: function() {
      database.ref("player").once('value', function(snapshot) {
        if (snapshot.child("p1/id").val() == "" || snapshot.child("p2/id").val() == "") {
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
      // const user = firebase.auth().currentUser;
      $('#loginSec').hide();
      $('#yourName').text(yourDisplayName);
      $('#gameSec').show();

      // $('#anonymousState1').text(user.isAnonymous);
    },
    clearPly: function() {
      if (playerNo == p1) {
        p1win = p1lose = p1draw = 0;
      }
      if (playerNo == p2) {
        p2win = p2lose = p2draw = 0;
      }
    }
  }
  setup.gameState();

  function randomNum() {
    return Math.floor(Math.random() * displayNameArr.length);
  }

  function checkPlayers() {
    database.ref("player").once('value', function(snapshot) {
      // if (snapshot.child("p1/id").val() !== "" && snapshot.child("p2/id").val() !== "") {
      //   console.log("we already have 2 players");
      //   return $("#cID").append('Some text');
      // }
      if (snapshot.child("p1/id").val() == "") {
        // if (snapshot.child("p2/id").val() != snapshot.child("p1/id").val()) {
        if (snapshot.child("p2/id").val() != username) {
          console.log("you are player 1");
          playerNo = "p1";
          return database.ref("player/p1").set({ id: username, displayName: yourDisplayName, choice: "", win: 0, lose: 0, status: "" });
        }
      } else if (snapshot.child("p2/id").val() == "") {
        // if (snapshot.child("p2/id").val() != snapshot.child("p1/id").val()) {
        if (snapshot.child("p2/id").val() != username) {
          console.log("you are player 2");
          playerNo = "p2";
          return database.ref("player/p2").set({ id: username, displayName: yourDisplayName, choice: "", win: 0, lose: 0, status: "" });
        }
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



  function logOut() {
    database.ref("player/" + playerNo).set({ id: "" });
    firebase.auth().signOut()
      .then(function() {
        console.log("signed-out")
        setup.login();
        setup.clearPly();
        $('#displayNameTemp').val("");
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
      // setup.gameState();
      // User is signed in.
      console.log("signed in")
      var isAnonymous = user.isAnonymous;
      username = user.uid
      yourDisplayName = $('#displayNameTemp').val();
      if (user.displayName == null) {
        user.updateProfile({
          displayName: yourDisplayName
        })
      }
      setup.game();
      // var tempName = displayNameArr[randomNum()];
      // $('#yourName').text(displayNameArr[randomNum()]);
      console.log(user)
      checkPlayers();
      // $('#yourName').text(tempName);
      // ...

    } else {
      // User is signed out.

      console.log("signed out")
      // ...
    }
    // $('#yourName').text(user.displayName);
    // $('#anonymousState1').text(user.isAnonymous);
  });
  $('#loginBtn').on('click', function() {
    yourDisplayName = $('#displayNameTemp').val();
    loginRandom();
    // var userDisplayName = user.displayName;

  });
  $('#loginOutBtn').on('click', logOut);
});
