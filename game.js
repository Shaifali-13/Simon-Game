var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;

$(document).keypress(function()
{
  if(!gameStarted)
  {
    $("#level-title").text("Level  " + level);
    nextSequence();
    gameStarted = true;
  }

});


$(".btn").click(function()
{
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);


});





function nextSequence()
{
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level  " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  var currentButtonPressed = $("#" + randomChosenColor);

  currentButtonPressed.fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  animatePress(randomChosenColor);


}

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success!");

    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function()
      {
          nextSequence();
      }, 1000);
    }


  }

  else
  {
    var wrongMove = new Audio("sounds/wrong.mp3");
    wrongMove.play();

    $("h1").text("Game over!! Press any key to restart.");

    $("body").addClass("game-over");

    setTimeout(function()
  {
    $("body").removeClass("game-over");
  }, 200);

  startOver();

  }
}


function startOver()
{
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


function playSound(name)
{
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


function animatePress(currentColor)
{
  var currentButtonPressed = $("#" + currentColor);

  currentButtonPressed.addClass("pressed");

  setTimeout(function()
{
  currentButtonPressed.removeClass("pressed");
}, 100);
}
