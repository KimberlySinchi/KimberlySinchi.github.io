// JS libraries utilized
// https://www.typeitjs.com

// Note: Max length is 11 letters

// CONSTANTS
const WINDOW_H = $(window).height();
const WINDOW_W = $(window).width();
const KEY_A = 65;
const KEY_Z = 90;
const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;
const KEY_TILDA = 192;
const KEY_PERIOD = 190;

// DOM elements
var $container = $(".wrapper");
var $asteroid = $("<div/>", {
    id: "asteroid"
});
var $userWrapper = $("<div/>", {
    id: "user_wrapper"
});
var $astroImg = $('<img/>', { 
    id: 'astro',
    src: 'https://uploads-ssl.webflow.com/5edb6941a6421269b5d90dd2/5fa3fc45a63ff6409a9b9804_3D_Astronaut-Screen_Under%204mb.gif'
});
var $userStr = $("<div/>", {
    id: "user_str"
});
var $score = $("<div/>", {
    id: "score",
    text: "Score: 0"
});
var $time = $("<div/>", {
    id: "time",
    text: "Time: 0"
});
var $title = $("<div/>", {
    id: "title",
    text: "Space Racer"
});
var $instruc = $("<div/>", {
    id: "instruc",
    text: "Type the words on the screen before they hit your space colony!\nClick or press ENTER to start!"
});
var $overScreen = $("<div/>", {
    id: "game_over",
    text: "GAME OVER!\nClick on the screen to try again!"
});

// Script vars
var URL = "https://random-word-api.herokuapp.com/word?length="
var word = "";
var inputStr = "";
var wordLen = 5;
var currTime = 0;
var currPoints = 0;
var isGameOver = false;
var activeWords = [];
var currAsteroids = [];

// Asteroid fall vars
var interval = 500;
var velY = 20;

// GAME BUILDING FUNCTIONS
const initTitle = () => {
    $container.append($title);
    $container.append($instruc);
    // titleTypeIt.go();
}

const initGame = () => {
    $title.hide();
    $instruc.hide();
    $container.attr("id", "game_wrapper");
    $container.append($userWrapper);
    $container.append($overScreen);
    $overScreen.hide();
    $userWrapper.append($astroImg);
    $userWrapper.append($score);
    $userWrapper.append($astroImg.clone());
    $userWrapper.append($userStr);
    $userWrapper.append($astroImg.clone());
    $userWrapper.append($time);
    $userWrapper.append($astroImg.clone());
    createAsteroid(wordLen);
    setInterval(gameLoop, interval);
}

const resetGame = () => {
    //Invisibling the over screen
    $overScreen.hide();

    // Deleting all astreoids
    while(currAsteroids.length > 0) {
        destroyAsteroid(0);
    }

    // Resetting values
    currPoints = 0;
    currTime = 0;
    inputStr = "";
    wordLen = 5;
    activeWords = [];
    isGameOver = false;
    $userWrapper.css("background-color", "rgba(255,237,101,0.4)");
    createAsteroid(wordLen);
}

const gameLoop = () => {
    if(!isGameOver){
        updateTime();
        fallLoop();
        isGameOver = checkGameOver();

        // Increasing difficulty as time progresses
        if(currTime%10==0) {
            createAsteroid(wordLen);
        }
        else if(currTime%15==0 && wordLen < 12)
            wordLen+=1

        if(isGameOver)
            $userWrapper.css("background-color", "rgba(157,2,8,0.4)");
    }
    else{
        $overScreen.show();
    }
}

const updateTime = () => {
    currTime = currTime + interval/1000;
    if(currTime%1 == 0) {
        $time.text("Time: " + currTime);
    }
}

const updatePts = (pts) => {
    currPoints += pts;
    $score.text("Score: " + currPoints);
}

// ANIMATION FUNCTIONS
// const titleTypeIt = new TypeIt("#title", {
//     strings: "Space Racer",
// });

// Creating and destroying asteroids (words)
async function createAsteroid(num) {
    // Awaiting a promise
    const word = await fetchWordOfLength(num);
    console.log(word);

    // Creating an asteroid based off the return word
    activeWords.push(word);
    $newAsteroid = $asteroid.clone();
    currAsteroids.push($newAsteroid);
    console.log("CURRWORDS:", activeWords, "ASTEROIDS:", currAsteroids);
    mruWord = activeWords[activeWords.length-1];
    $container.append(currAsteroids[currAsteroids.length-1].text(mruWord));
    $($newAsteroid).css({top: 0, left: (startCoords($newAsteroid))});
}
const destroyAsteroid = (ind) => {
    currAsteroids[ind].text("");
    currAsteroids[ind].remove();
    currAsteroids.splice(ind, 1);
}

// Asteroid start position
function startCoords($asteroid){
    return Math.random() * (WINDOW_W - $asteroid.width());
}

// Using fetch API: https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c
// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
// Fetching word
async function fetchWordOfLength(num) {
    // Fetching the new word
    return await fetch(URL + num.toString())
        .then((response) => { // The response parameter takes the value of the object returned from fetch(URL)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data[0];
        })
        .catch((err) => {
            console.log("Something went wrong!", err);
        });
}

// Check if user spelled a word correctly & updates accordingly
const checkWordsSpelled = () => {
    for(let i = 0; i < activeWords.length; i++) {
        if(inputStr == activeWords[i]){
            let thisWordLen = activeWords[i].length;
            activeWords.splice(i, 1);
            updateInput("");
            destroyAsteroid(i);
            updatePts(10*thisWordLen);
            createAsteroid(wordLen);
        }
    }
}

// Determine if asteroid hits home
const doesAsteroidHit = ($asteroid) => {
    if($asteroid.position().top + $asteroid.height() > $userWrapper.position().top) {
        console.log("ded");
        return true; 
    }
    return false;
}

// Determine if gameover
const checkGameOver = () => {
    for(var i = 0; i < currAsteroids.length; i++) {
        if(doesAsteroidHit(currAsteroids[i]))
            return true; 
    }
    return false;
}

const fall = ($asteroid) => {
    var currY = $asteroid.position().top;
    $asteroid.css({top: currY + velY});
}

const fallLoop = () => {
    for(var i = 0; i < currAsteroids.length; i++) {
        fall(currAsteroids[i]);
    }
}

// Update text displaying user input
const updateInput = (str) => {
    inputStr = str;
    $userStr.text(str);
}

// Tracking current user input
$(document).keydown(function(event) {
    if($title.is(":visible") && event.keyCode == KEY_ENTER) {
        initGame();
    }
    else if($title.is(":hidden")){
        if(event.keyCode >= KEY_A && event.keyCode <= KEY_Z && inputStr.length < 12)
            updateInput(inputStr + event.key);
        else if(event.keyCode == KEY_BACKSPACE && inputStr != "")
            updateInput(inputStr.substring(0, inputStr.length-1));
        else if(event.keyCode == KEY_TILDA)
            createAsteroid(10);
        // else if(event.keyCode == KEY_PERIOD){
        //     // ADD IN PAUSE FEATURE
        //     // clearInterval(wordLoop);
        //     // clearInterval(timeLoop);
        // }
        if(!isGameOver) {
            checkWordsSpelled();
        }
    }
});

$($container).click(function() {
    if($title.is(":visible"))
        initGame();
    else if(isGameOver)
        resetGame();
});

// MAIN
const main = () =>{
    initTitle();
}

main();