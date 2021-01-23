//Variables
var colourArray = ["#blue", "#green", "#red", "#yellow"];
var gameSequence = [];
var userSequence = [];
//user starts game with score = 0
var gameScore = 0;

//Start game sequence
$("#start").click(function() { 
    var rand = colourArray[Math.floor(Math.random() * 4)];
    gameSequence.push(rand);
    //when user pushes start, start button is disabled and only enabled again after pressing stop or refreshing the page
    $("#start").attr("disabled", "disabled");
    console.log(gameSequence);
    highlightColours();
});

//Click panel sequence
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
//when user releases the left mouse click
$(".panel").mouseup(function() {
  $(this).removeClass("active");
});

//when user wants to stop the game can click stop or can refresh page, also clears the console
$("#stop").click(function() {
  location.reload();
});

//Game sequence highlight adding css class .active to the panel
function highlightColours() {
  gameSequence.forEach(function(element, index){ 
    setTimeout(function(){
        $(element + "-sound")[0].load();
        $(element + "-sound")[0].play(); 
        $(element).addClass("active");
        setTimeout(function(){$(element).removeClass("active");}, 500);
    },
    700 * index); 
  });
}
//Compare User sequence with computer sequence
function sequenceCompare() {
  if (userSequence.every(function(value, index) { return value === gameSequence[index]})) { 
    console.log("Match"); 
    gameScore++; 
    $("#score").text(gameScore); 
    userSequence = []; 
    //Limiting the game to 20 rounds
        if (gameScore == 20) { 
            $("#winner")[0].play();
            alert("Congratualions!You have an excelent Memory!"); 
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
//error message when user gets wrong sequence
        else {
            $("#error-sound")[0].load();
            $("#error-sound")[0].play();
            alert("Almost!!Give it another Go"); 
            userSequence = [];
            highlightColours();
        }
}


