var theWrapper = document.getElementById("wrapper");
var theTitle = document.getElementById("title");
var theEarsText = document.getElementById("ears_text");
var theEyesText = document.getElementById("eyes_text");
var theSenseImg = document.getElementsByClassName("sense");
var theInteractiveWrapper = document.getElementById("interactive_wrapper");
var theUserSpace = document.getElementById("user_space");

var numEarsTextClicks = 0;
var numEyesTextClicks = 0;
var lruClick = 0; // 1 for ear text, 2 for eye text

// Ears text selected
theEarsText.onclick = function changeContentEars() {
    theSenseImg[0].src = "https://images.squarespace-cdn.com/content/v1/5005fc2ee4b09ef22529406a/1446430425877-Z8CI11LA4RQOAHP1EA3G/ear1.gif?format=500w";
    theSenseImg[1].src = "https://images.squarespace-cdn.com/content/v1/5005fc2ee4b09ef22529406a/1446430425877-Z8CI11LA4RQOAHP1EA3G/ear1.gif?format=500w";

    theTitle.textContent = "a medium through the ears";

    // theInteractiveWrapper.style.filter = "drop-shadow(16px 16px 20px red) invert(75%);";

    theInteractiveWrapper.style.backgroundImage = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi2ejJ0KXLGz80aQezNGMNiyf47Mu5DmKavg&usqp=CAU)";
    // theEarsText.style.color = "pink";
    // theEarsText.style.fontSize = "10vh";

    // theEyesText.style.color = "white";
    // theEyesText.style.fontSize = "4vh";
}

// Eyes text selected
theEyesText.onclick = function changeContentEyes() {
    theSenseImg[0].src = "https://i.pinimg.com/originals/51/ca/04/51ca04097929e5d9ea150b107b745c60.gif";
    theSenseImg[1].src = "https://i.pinimg.com/originals/51/ca/04/51ca04097929e5d9ea150b107b745c60.gif";

    theTitle.textContent = "a medium through the eyes";

    theInteractiveWrapper.style.backgroundImage = "url(https://media0.giphy.com/media/l2uHjqlI8agQupxmIC/200w.gif?cid=82a1493bdv0ursbv54mtp7v04oi5g3av9h1lk4ql6xolmaw7&rid=200w.gif&ct=g)";

    // 73648a

    // theEyesText.style.color = "pink";
    // theEyesText.style.fontSize = "10vh";

    // theEarsText.style.color = "white";
    // theEarsText.style.fontSize = "4vh";
}

// Title (reset) selected
theTitle.onclick = function changeContentEyes() {
    theSenseImg[0].src = "https://data.whicdn.com/images/140051440/original.gif";
    theSenseImg[1].src = "https://data.whicdn.com/images/140051440/original.gif";

    theTitle.textContent = "explore your senses";
    theInteractiveWrapper.style.backgroundImage = "url(https://media1.giphy.com/media/1YiJ9qOYgWPCQKhRjj/giphy.gif)";
}

// Tracking clicks
theEarsText.addEventListener('click', function() {
    numEarsTextClicks++;
    lruClick = 1;
    console.log("Ear Clicks " + numEarsTextClicks);
});

theEyesText.addEventListener('click', function() {
    numEyesTextClicks++;
    lruClick = 2;
    console.log("Eye Clicks " + numEyesTextClicks);
});

// Reset gif
function resetContent(){
    theSenseImg[0].src = "https://data.whicdn.com/images/140051440/original.gif";
    theSenseImg[1].src = "https://data.whicdn.com/images/140051440/original.gif";

    // theEarsText.style.color = "white";
    // theEarsText.style.fontSize = "4vh";

    // theEyesText.style.color = "white";
    // theEyesText.style.fontSize = "4vh";
}

// Fix this cause this gets overridden by the onclick listener
// if(numEarsTextClicks != 0 && numEyesTextClicks != 0){
//     if(numEarsTextClicks%2 == 0 || numEyesTextClicks%2 == 0){
//         console.log("hi");
//         resetContent();
//     }
// }