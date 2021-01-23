//variables
userSeq = [];
simonSeq = [];
var id, color, level = 0;
const NUM_OF_LEVELS = 20;
var error = false;
var boardsound = [
    "https://www.soundjay.com/button/sounds/button-37.mp3",
    "https://www.soundjay.com/button/sounds/beep-06.mp3",
    "https://www.soundjay.com/misc/sounds/censor-beep-01.mp3",
    "https://www.soundjay.com/button/sounds/button-3.mp3"
]

//start sequence
$(document).ready(function() {
    $("#score").text("");
    $("#start").click(function() {
        level = 0;
        level++;
        simonSeq = [];
        userSeq = [];
        simonSequence();
    })
})

$(".panel").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    userSequence();
});

function userSequence() {
  userSeq.push(id);
    console.log(id+" "+color);
    addClassSound(id, color);
    //check user sequence
    if(!checkUserSeq()) {
      error = true;   
      displayError();
      userSeq = [];      
      simonSequence();
    }
    else if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
      level++;
      userSeq = [];
      error = false;
      console.log("start simon")
      simonSequence();
    }
    //checking for winners
    if(userSeq.length == NUM_OF_LEVELS) {
      displayWinner();
      resetGame();
    }     
};

function simonSequence() {
  console.log("level "+level);
  $(".display").text(level);
  if(!error) {
    getRandomNum();
  } 
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    color = $("#"+id).attr("class");
    color = color.split("")[1];
    console.log(id+" "+color);
    addClassSound(id, color);
    i++;
    if(i == simonSeq.length) {
      clearInterval(myInterval);
    } 
  }, 1000);  
}


//generate random sequence
function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}

function addClassSound(id, color) {
  $("#"+id).addClass(color+"-active");
  playSound(id)
  setTimeout(function(){
    $("#"+id).removeClass(color+"-active");
  }, 500);
}

function checkUserSeq() {
  for(var i = 0; i < userSeq.length; i++) {
    if(userSeq[i] != simonSeq[i]) {      
      return false;
    }
  }
  return true;
}

function displayError() {
  console.log("error");  
  var counter = 0;
  var myError = setInterval(function() {
    $(".display").text("Err");
    counter++;
    if(counter == 3) {
      $(".display").text(level);
      clearInterval(myError);
      userSeq = [];
      counter = 0;
    }
  }, 500);
}

function displayWinner() {
  var count = 0;
  var winInterval = setInterval(function() { 
    count++;
    $(".display").text("Win");
    if(count == 5) {
      clearInterval(winInterval);
      $(".display").text("00");
      count = 0;
    }
  }, 500);
}

function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}

function stopGame() {
  userSeq = [];
  simonSeq = [];
  level = 0;
  $("#score").text("00");
}