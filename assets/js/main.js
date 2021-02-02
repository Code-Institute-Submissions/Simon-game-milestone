//Variables
var colourArray = ["#blue", "#green", "#red", "#yellow"];
var gameSeq = [];
var userSeq = [];
//user starts game with score = 0
var gameScore = 0;

//Start game sequence
$("#start").click(function() { 
    var rand = colourArray[Math.floor(Math.random() * 4)];
    gameSeq.push(rand);
    //when user pushes start, start button is disabled and only enabled again after pressing stop or refreshing the page
    $("#start").attr("disabled", "disabled");
    console.log(gameSeq);
    highlightColours();
});

//when user wants to stop the game can click stop or can refresh page, also clears the console
$("#stop").click(function() {
  location.reload();
});

//Click panel sequence adding Active class to the pad clicked - Optimized for Desktop
$(".panel").mousedown(function() {
  $("#"+(this.id)+"-sound")[0].load(); 
  $("#"+(this.id)+"-sound")[0].play();
  $(this).addClass("active");
  userSeq.push("#" + this.id);
  console.log(userSeq);
   if (userSeq.length == gameSeq.length) { 
    setTimeout(function(){ 
      sequenceCompare();
    }, 500);
  }
});
//when user releases the left mouse click removes active class to not highlight
$(".panel").mouseup(function() {
  $(this).removeClass("active");
});


//Game sequence highlight adding css class .active to the panel
function highlightColours() {
  gameSeq.forEach(function(element, index){ 
    setTimeout(function(){
        $(element + "-sound")[0].load();
        $(element + "-sound")[0].play(); 
        $(element).addClass("active");
        setTimeout(function(){$(element).removeClass("active");}, 500);
    },
    700 * index); 
  });
}
//Compare User sequence with computer sequence based on https://stackoverflow.com/a/36707123/9179340
function sequenceCompare() {
  if (userSeq.every(function(value, index) { return value === gameSeq[index]})) { 
    console.log("Match"); 
    gameScore++; 
    $("#score").text(gameScore); 
    userSeq = []; 
    //Limiting the game to 20 rounds
        if (gameScore == 20) { 
            $("#winner")[0].play();
            alert("Congratualions!You have an excelent Memory!"); 
      } 
        else { 
            $("#correct")[0].play();
            setTimeout(function() { 
            var rand = colourArray[Math.floor(Math.random() * 4)];
            gameSeq.push(rand); 
            console.log(gameSeq);
            highlightColours();
            }, 500);
        } 
  } 
//error message when user gets wrong sequence
        else {
            $("#lose-sound")[0].load();
            $("#lose-sound")[0].play();
            alert("Almost!!Give it another Go"); 
            userSeq = [];
            highlightColours();
        }
}


