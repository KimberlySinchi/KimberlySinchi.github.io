var theBody = document.querySelector("body");
var theWrapper = document.getElementById("wrapper");
var theTitle = document.getElementById("title");
var theEarsText = document.getElementById("ears_text");
var theEyesText = document.getElementById("eyes_text");
var theSenseImg = document.getElementsByClassName("sense");
var theInteractiveWrapper = document.getElementById("interactive_wrapper");
var theUserSpace = document.getElementById("user_space");

var mouseOverEarsText = false;
var mouseOverEyesText = false;
var numEarsConsecClicks = 0;
var numEyesConsecClicks = 0;
var currScene = 0; // 0: title, 1: ear, 2: eye
var lastClick = 0; // 0: title, 1: ear, 2: eye

theEarsText.onmouseover = function(){ mouseOverEarsText = true; }
theEarsText.onmouseout = function(){ mouseOverEarsText = false; }
theEyesText.onmouseover = function(){ mouseOverEyesText = true; }
theEyesText.onmouseout = function(){ mouseOverEyesText = false; }

theEarsText.addEventListener("mouseover", hover);
theEarsText.addEventListener("mouseout", hover);
theEyesText.addEventListener("mouseover", hover);
theEyesText.addEventListener("mouseout", hover);

// Ears text selected
theEarsText.onclick = function changeContentEars() {
    theSenseImg[0].src = "https://images.squarespace-cdn.com/content/v1/5005fc2ee4b09ef22529406a/1446430425877-Z8CI11LA4RQOAHP1EA3G/ear1.gif?format=500w";
    theSenseImg[1].src = "https://images.squarespace-cdn.com/content/v1/5005fc2ee4b09ef22529406a/1446430425877-Z8CI11LA4RQOAHP1EA3G/ear1.gif?format=500w";

    theTitle.textContent = "a medium through the ears";

    theInteractiveWrapper.style.backgroundImage = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi2ejJ0KXLGz80aQezNGMNiyf47Mu5DmKavg&usqp=CAU)";

    theBody.style.cursor = "url(https://ed27f9fac55a6c9b4009.b-cdn.net/wp-content/uploads/2021/11/WOMG-Music-icon-Export-1c-3.gif), auto";

    earHoverState();
    eyesUnhoverState();

    currScene = 1;
}

// Eyes text selected
theEyesText.onclick = function changeContentEyes() {
    theSenseImg[0].src = "https://i.pinimg.com/originals/51/ca/04/51ca04097929e5d9ea150b107b745c60.gif";
    theSenseImg[1].src = "https://i.pinimg.com/originals/51/ca/04/51ca04097929e5d9ea150b107b745c60.gif";

    theTitle.textContent = "a medium through the eyes";

    theInteractiveWrapper.style.backgroundImage = "url(https://media0.giphy.com/media/l2uHjqlI8agQupxmIC/200w.gif?cid=82a1493bdv0ursbv54mtp7v04oi5g3av9h1lk4ql6xolmaw7&rid=200w.gif&ct=g)";

    earUnhoverState();
    eyesHoverState();

    currScene = 2;
}

// Title (reset) selected
theTitle.onclick = function changeContentEyes() {
    titleContent();
}

// Tracking clicks
theEarsText.addEventListener('click', function() {
    // Double click functionality
    if(lastClick == 1){
        numEarsConsecClicks++;

        if(numEarsConsecClicks%2 == 0){
            titleContent();
        }
    }
    else
        numEarsConsecClicks = 1;

    lastClick = 1;
});

theEyesText.addEventListener('click', function() {
    // Double click functionality
    if(lastClick == 2){
        numEyesConsecClicks++;

        if(numEyesConsecClicks%2 == 0)
            titleContent();
    }
    else
        numEyesConsecClicks = 1;

    lastClick = 2;
});

// Title content gif
function titleContent(){
    theSenseImg[0].src = "https://data.whicdn.com/images/140051440/original.gif";
    theSenseImg[1].src = "https://data.whicdn.com/images/140051440/original.gif";

    theTitle.textContent = "explore your senses";
    theInteractiveWrapper.style.backgroundImage = "url(https://media1.giphy.com/media/1YiJ9qOYgWPCQKhRjj/giphy.gif)";

    earUnhoverState();
    eyesUnhoverState();

    currScene = 0;
}

// Hover states
function earHoverState(){
    theEarsText.style.color = "pink";
    theEarsText.style.fontSize = "10vh";
}

function earUnhoverState(){
    theEarsText.style.color = "white";
    theEarsText.style.fontSize = "4vh";
}

function eyesHoverState(){
    theEyesText.style.color = "pink";
    theEyesText.style.fontSize = "10vh";
}

function eyesUnhoverState(){
    theEyesText.style.color = "white";
    theEyesText.style.fontSize = "4vh";
}

function hover(){
    // Enable hover in specific scenarios
    if(currScene == 0 || currScene == 2){
        if(mouseOverEarsText)
            earHoverState();
        else
            earUnhoverState();
    }
    if(currScene == 0 || currScene == 1){
        if(mouseOverEyesText)
            eyesHoverState();
        else
            eyesUnhoverState();
    }
    console.log(currScene);
}