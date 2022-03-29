let theBody = document.querySelector("body");
const theButton = document.getElementById("button");

// https://www.codegrepper.com/code-examples/javascript/get+cursor+position+javascript
var mouseX = -1
var mouseY = -1;

// Updating mouse coords every time mouse is moved
document.onmousemove = function(event) {
    mouseX = event.pageX; 
    mouseY = event.pageY;

    // Calc distance & update background
}

// Function used to calculate the distance between button and cursor
function calcDistance() {
    let buttonLeft = theButton.style.left;
    let buttonTop = theButton.style.top;
    let buttonWidth = theButton.style.width;
    let buttonHeight = theButton.style.height;

    let buttonX = buttonLeft + buttonWidth/2;
    let buttonY = buttonTop + buttonHeight/2;

    // use distance formula w mouse coords and button coords
}
