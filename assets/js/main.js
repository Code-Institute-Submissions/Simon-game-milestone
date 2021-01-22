//variables
userSeq = [];
simonSeq = [];
var id,color, level = 0;
var boardsound = [
    "https://www.soundjay.com/button/sounds/button-37.mp3",
    "https://www.soundjay.com/button/sounds/beep-06.mp3",
    "https://www.soundjay.com/misc/sounds/censor-beep-01.mp3",
    "https://www.soundjay.com/button/sounds/button-3.mp3"
]

//start sequence
$(document).ready(function() {
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
        
    },1000);
}



//generate random sequence
function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}