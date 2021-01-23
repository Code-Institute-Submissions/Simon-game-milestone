var colourArray = ["#blue", "#orange", "#red", "#yellow"];
var gameSequence = [];
var userSequence = [];
var gameScore = 0;

$("#start").click(function() { 
    var rand = colourArray[Math.floor(Math.random() * 4)];
    gameSequence.push(rand);
    $("#start").attr("disabled", "disabled");
    console.log(gameSequence);
    highlightColours();
});

$(".panel").mousedown(function() {
  $("#"+(this.id)+"-sound")[0].load(); 
  $("#"+(this.id)+"-sound")[0].play();
  $(this).addClass("active");
  userSequence.push("#" + this.id);
  console.log(userSequence);
   if (userSequence.length == gameSequence.length) { 
    setTimeout(function(){ 
      sequenceCompare();
    }, 500);
  }
});

$(".panel").mouseup(function() {
  $(this).removeClass("active");
});

$("#stop").click(function() {
  location.reload();
});

function highlightColours() {
  gameSequence.forEach(function(element, index){ 
    setTimeout(function(){ 
      $(element + "-sound")[0].play(); 
      $(element).addClass("active");
      setTimeout(function(){$(element).removeClass("active");}, 500);
    },
    700 * index); 
  });
}

function sequenceCompare() {
  if (userSequence.every(function(value, index) { return value === gameSequence[index]})) { 
    console.log("Match"); 
    gameScore++; 
    $("#score").text(gameScore); 
    userSequence = []; 
        if (gameScore == 20) { 
            $("#winner")[0].play();
            alert("You win!"); 
      } 
        else { 
            $("#correct")[0].play();
            setTimeout(function() { 
            var rand = colourArray[Math.floor(Math.random() * 4)];
            gameSequence.push(rand); 
            console.log(gameSequence);
            highlightColours();
            }, 500);
        } 
  } 
  else if ($("input[type=checkbox]").prop("checked")) {
    $("#error-sound")[0].play();
    alert("Incorrect. Please click Start to begin a new game."); 
    location.reload();
  } 

  else {
    $("#error-sound")[0].play();
    alert("Incorrect. Please attempt the sequence again."); 
    userSequence = [];
    highlightColours();
  }
}


