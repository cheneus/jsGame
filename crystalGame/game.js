$(document).ready(function() {
  console.log("ready!")
  var currentScore = targetScore = red = yellow = blue = green = win = lose = 0;
  var redflag = yellowflag = blueflag = greenflag = false;
  // var crystalsRed = gameLogic.random(1, 12);
  var targetScore = gameLogic.random(12, 100);
  console.log(targetScore);

  function checkWin() {
    if (targetScore == currentScore) {
      win++;
      alert("win");
    }
    if (targetScore < currentScore) {
      lose++;
      alert("lose");
    }
  };

  $('#redCrystal').on('click', function() {
    if (redflag == false) {
      red = gameLogic.random(1, 12);
      redflag = !redflag;
      console.log(red);
    }

    currentScore += red
    console.log(currentScore);
    $('#yourScore').text(currentScore);
    checkWin();
  });
  $('#blueCrystal').on('click', function() {
    if (blueflag == false) {
      blue = gameLogic.random(1, 12);
      blueflag = !blueflag;
      console.log(blue);
    }
    currentScore += blue
    console.log(currentScore);
    $('#yourScore').text(currentScore);
    checkWin();
  });
  $('#greenCrystal').on('click', function() {
    if (greenflag == false) {
      green = gameLogic.random(1, 12);
      greenflag = !greenflag;
      console.log(green);
    }
    currentScore += green
    console.log(currentScore);
    $('#yourScore').text(currentScore);
    checkWin();
  });
  $('#yellowCrystal').on('click', function() {
    if (yellowflag == false) {
      yellow = gameLogic.random(1, 12);
      yellowflag = !yellowflag;
      console.log(yellow);
    }
    currentScore += yellow
    console.log(currentScore);
    $('#yourScore').text(currentScore);
    checkWin();
  });



});

var gameLogic = {
  random: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  },
  initailize: function() {

  },
};
// var crystals = {
//   red: {
//     value: 0,
//     flag: false,
//   },
//   blue: {
//     value: 0,
//     flag: false,
//   },
//   green: {
//     value: 0,
//     flag: false,
//   },
//   yellow: {
//     value: 0,
//     flag: false,
//   },
// }
