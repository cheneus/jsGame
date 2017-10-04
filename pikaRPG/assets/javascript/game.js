$(document).ready(function() {
  //   var bgUrl = {
  //   pikaBg: "assets/images/pika-bg.jpg",
  //   poke151Bg: "assets/images/151poke.png",
  //   poke1512Bg: "assets/images/pop151.jpg",
  //   boneBg: "assets/images/bone.jpg",
  // };
  $('#rpgGame').hide();

  var bgUrl = ["assets/images/pika-bg.jpg",
    "assets/images/151poke.png",
    "assets/images/pop151.jpg",
    "assets/images/bone.jpg"
  ];


  var pokeBg = bgUrl[Math.floor(Math.random() * bgUrl.length)];

  var theGame = {
    player1: {},
    player2: {},
    characters: ['king', 'queen', 'jack', 'joker'],

    message: {
      defeated: "You have been defeated",
      win: "You have defeated ",
      dealt: "You have dealt ",
      took: "You have taken ",
      gameOver: "You have defeated everyone",
    },

    attack: function() {
      this.player2.hp = this.player2.hp - this.player1.atk;
      this.player1.hp = this.player1.hp - this.player2.atk;
      this.player1.atk += this.player1.baseAtk;
      this.player1.wounded = true;
      this.player2.wounded = true;
      console.log(this.player1.wounded)
      this.changeCheck();
      if (theGame.player2.hp <= 0) {
        theGame.enemies = theGame.enemies.filter(function(y) {
          return y != theGame.player2.name;
        })
        console.log(theGame.enemies.length);
      }
    },


    infoUpdate: function() {
      // $("#player1Name").text(charId.toUpperCase());
      $("#player1Hp").text(this.player1.hp);
      $("#player1Atk").text(this.player1.atk);
      // $("#player2Name").text(charId.toUpperCase());
      $("#player2Hp").text(this.player2.hp);
      $("#player2Atk").text(this.player2.atk);
      $("#dmgReport1").text(this.message.took + this.player2.atk);
      $("#dmgReport2").text(this.message.dealt + this.player1.atk);
      if (theGame.player1.hp <= 0) {
        alert("GAME OVER!!");
        $("#gameOver").addClass('bg-danger');
        $("#gameOver").text(this.message.defeated);
        characters.reset();
        $('.char').css('display', 'inline-block');
      }
      if (theGame.player2.hp <= 0) {
        $("#gameOver").addClass('bg-success');
        $("#gameOver").text(this.message.win + this.player2.name);
        // theGame.resetPlayer2Stats();
        $("#attackBtn").prop('disabled', true);
        $(".char").on('click', begin);
        if (theGame.enemies.length == 0) {
          alert("YOU WIN");
          $("#restartBtn").show();
          $("#attackBtn").hide();
        }
      }
    },
    // for a version -- gameplay change. 
    changeCheck: function() {
      if (theGame.player1.wounded) {
        $("#btnChangePly1").hide();
      } else {
        $("#btnChangePly1").show();
      }
      if (theGame.player2.wounded) {
        $("#btnChangePly2").hide();
        // $("#btnChangePly2").css('display','inline-block')
      } else {
        $("#btnChangePly2").show();
      }
    },

    resetPlayer1Stats: function() {
      this.player1 = {}
      $("#player1img").empty();
      $("#player1Name").empty();
      $("#player1Hp").empty();
      $("#player1Atk").empty();
    },
    resetPlayer2Stats: function() {
      this.player2 = {};
      $("#player2img").empty();
      $("#player2Name").empty();
      $("#player2Hp").empty();
      $("#player2Atk").empty();
    },
    infoClear: function() {
      $("#dmgReport1").empty();
      $("#dmgReport2").empty();
      $('#gameOver').empty();
    }
  };


  var characters = {
    king: {
      name: "king",
      baseAtk: 10,
      wounded: false,
      atk: 10,
      hp: 180
    },
    queen: {
      name: "queen",
      baseAtk: 22,
      wounded: false,
      atk: 22,
      hp: 120
    },
    jack: {
      name: "jack",
      baseAtk: 14,
      wounded: false,
      atk: 14,
      hp: 160
    },
    joker: {
      name: "joker",
      baseAtk: 18,
      wounded: false,
      atk: 18,
      hp: 140
    },

    reset: function() {
      this.king = {
          name: "king",
          baseAtk: 10,
          wounded: false,
          atk: 10,
          hp: 200
        },
        this.queen = {
          name: "queen",
          baseAtk: 22,
          wounded: false,
          atk: 22,
          hp: 140
        },
        this.jack = {
          name: "jack",
          baseAtk: 14,
          wounded: false,
          atk: 14,
          hp: 180
        },
        this.joker = {
          name: "joker",
          baseAtk: 18,
          wounded: false,
          atk: 18,
          hp: 160
        }
    }
  };

  var btnHandlers = {
    attack: function() {
      theGame.attack();
      if (theGame.player2.hp > 0) {
        $('.char').off('click');
      }
      // else {
      //   $('char').on('click', begin);
      // }
      console.log(theGame.player1);
      console.log(theGame.player2);
    },

    changePlayer1: function() {
      var ply1charId = theGame.player1.name;
      $("#player1img").empty();
      $('#' + ply1charId).show();
      theGame.resetPlayer1Stats();
      $('.char').on('click', begin);
    },

    changePlayer2: function() {
      var ply2charId = theGame.player2.name;
      $("#player2img").empty();
      $('#' + ply2charId).show();
      theGame.resetPlayer2Stats();
      $('.char').on('click', begin);
    },

    restart: function() {
      characters.reset();
      theGame.resetPlayer1Stats();
      theGame.resetPlayer2Stats();
      $('img').show();
      $("#attackBtn").show();
      $("#restartBtn").hide();
      theGame.infoClear();
      console.log(characters)
    },

    render: function() {
      $('#rpgGame').show();
      $('#gameRules').hide();
    }
  };

  function begin() {
    var charId = $(this).attr('id');
    if (theGame.player1.atk == undefined) {
      theGame.player1 = Object.assign({}, characters[charId]);
      $("#player1Name").text(charId.toUpperCase());
      $("#player1Hp").text(characters[charId].hp);
      $("#player1Atk").text(characters[charId].atk);
      $(this).clone().prependTo("#player1img");
      var ply1charId = $('theGame.player1.name');
      console.log(ply1charId);
      theGame.changeCheck();
      theGame.enemies = theGame.characters.filter(function(y) {
        return y != charId;
      })
      console.log(theGame.enemies);
      if (theGame.player2.wounded === false) {
        $('.char').off('click');
      }
    } else {
      theGame.resetPlayer2Stats();
      theGame.player2 = Object.assign({}, characters[charId]);
      $("#player2Name").text(charId.toUpperCase());
      $("#player2Hp").text(characters[charId].hp);
      $("#player2Atk").text(characters[charId].atk);
      $(this).clone().prependTo("#player2img");
      $("#attackBtn").prop("disabled", false);
      theGame.changeCheck();
      $('.char').off('click');
    }
    // $(this).css('display', 'none');
    $(this).hide();
  }

  // $(this.remove());


  $("#attackBtn").on('click', function() {
    btnHandlers.attack();
    theGame.infoUpdate();
  });

  $(".char").on('click', begin);
  $("#attackBtn").prop("disabled", true);
  $("#btnChangePly1").hide();
  $("#btnChangePly2").hide();
  $("#restartBtn").hide();
  // $("#btnChangePly1").css('display', 'none');
  // $("#btnChangePly2").css('display', 'none');
  $("#btnChangePly1").on('click', btnHandlers.changePlayer1);
  $("#btnChangePly2").on('click', btnHandlers.changePlayer2);
  $("#restartBtn").on('click', btnHandlers.restart);
  console.log(pokeBg)
  $('body').css('background-image', 'url(' + pokeBg + ')');
  $('#playBtn').on('click', btnHandlers.render);
});
