var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

$(document).keyup(function() {
    if (level === 0) {
        $("h1").text("Level " + level);
        nextSequence();
        // gameStart();
    }

});

function playSound(name) {
    var colourSound = new Audio("sounds/" + name + ".mp3");
    colourSound.play();
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//clicking
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// function gameStart(){
//     nextSequence();
//     while(gamePattern[gamePattern.length-1]===userClickedPattern[gamePattern.length-1]){
//         gameStart();
//     }
// }

//checking answer

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { nextSequence(); }, 1000);
        }

    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//starting over

function startOver() {
    level = 0;
    gamePattern = [];
}