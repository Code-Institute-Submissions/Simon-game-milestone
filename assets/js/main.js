//variables
userSeq = [];
simonSeq = [];
var id,color, level = 0;
const NUM_OF_LEVELS = 20;
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
        level++;
        startSequence();
    })
})

function startSequence() {
    $("#score").text(level);
    getRandomNum();
    var i = 0;
    var myInterval = setInterval(function() {
      id = simonSeq[i];
      color = $("#"+id).attr("class").split(" ")[1];
      console.log(id+" "+color);
      addClassSound(id, color);
      i++;
      if(i == simonSeq.length) {
        clearInterval(myInterval);
      }
    },1000);
    }

//generate random sequence
function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}

function addClassSound(id, color) {
    $("#"+id).addClass(color+".active");
    playSound()
    setTimeout(function(){
        $("#"+id).removeClass(color+".active");
    }, 500);
};

