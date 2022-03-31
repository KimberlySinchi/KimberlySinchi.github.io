var theBody = document.querySelector("body");
var theButton = document.getElementById("button");
var theIntro = document.getElementById("intro");
var theEnterButton = document.getElementById("enter");
var bounds = theButton.getBoundingClientRect();
var radius = bounds.width/2;
var buttonAudio = new Audio("assets/ohNoDeeDee.mp3");
var userAudio = new Audio("assets/userAudio.mp3");

// https://www.codegrepper.com/code-examples/javascript/get+cursor+position+javascript
var mouseX = -1
var mouseY = -1;

randomizeButton();

// Updating mouse coords every time mouse is moved
document.onmousemove = function(event) {
    mouseX = event.pageX; 
    mouseY = event.pageY;

    // Calc distance & update background
    dist = calcDistance();
    let maxDist = document.documentElement.clientWidth;
    let distRatio = dist/maxDist;
    theBody.style.backgroundColor = "rgb("+(255 - distRatio*255)+ ",0," + (distRatio*255) +")";

    console.log(dist);

    // Playing audio on hover
    // Check if we should play the audio
    if(dist < radius) {
        buttonAudio.play();
    }
    else {
        buttonAudio.pause();
        buttonAudio.currentTime = 0;
    }
}

theButton.onclick = function(){
    if(dist < radius) {
        buttonAudio.pause();
        buttonAudio.currentTime = 0;

        theBody.style.backgroundImage = "url(https://i.redd.it/0u9epioytyc31.jpg)";
        theBody.style.backgroundSize = "cover";
        theButton.style.opacity = "0";
        console.log("mouse bonk");

        userAudio.play();
    }
}

theEnterButton.onclick = function(){
    theIntro.style.zIndex = "-1";
    theIntro.style.opacity = "0";
}

// Function used to calculate the distance between button and cursor
function calcDistance() {
    // https://www.delftstack.com/howto/javascript/get-position-of-element-in-javascript/
    let rect = theButton.getBoundingClientRect();
    let buttonLeft = rect.x;
    let buttonTop = rect.y;

    let buttonWidth = rect.width;
    let buttonHeight = rect.height;

    let buttonX = buttonLeft + buttonWidth/2;
    let buttonY = buttonTop + buttonHeight/2;

    let xDist = buttonX - mouseX;
    let yDist = buttonY - mouseY;

    return Math.sqrt(xDist*xDist + yDist*yDist);
}

// Function to randomize button location
function randomizeButton() {
    let vw = document.documentElement.clientWidth;
    let vh = document.documentElement.clientHeight;
    let x = Math.floor((Math.random() * (vw - radius*4))) + "px";
    let y = Math.floor((Math.random() * (vh - radius*4))) + "px";

    theButton.style.marginTop = y;
    theButton.style.marginLeft = x;
}