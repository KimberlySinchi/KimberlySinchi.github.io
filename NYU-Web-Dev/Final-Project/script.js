// JS libraries utilized
// https://www.typeitjs.com

// CONSTANTS
const WINDOW_H = $(window).height();
const WINDOW_W = $(window).width();
const KEY_A = 65;
const KEY_Z = 90;
const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;
const KEY_TILDA = 192;

// DOM elements
var $container = $(".wrapper");
var $asteroid = $("<div/>", {
    id: "asteroid"
});
var $userWrapper = $("<div/>", {
    id: "user_wrapper"
});
var $userStr = $("<div/>", {
    id: "user_str"
});
var $title = $("<div/>", {
    id: "title",
    text: "Space Racer"
});

// Script vars
var URL = "https://random-word-api.herokuapp.com/word?length="
var word = "";
var inputStr = "";
var wordLen = 5;
const activeWords = [];
const currAsteroids = [];

// Asteroid fall vars
var interval = 500;
var velY = 20;

// GAME BUILDING FUNCTIONS
const initTitle = () => {
    console.log("BONK");
    $container.append($title);
    // titleTypeIt.go();
}

const initGame = () => {
    $title.hide();
    $container.attr("id", "game_wrapper");
    $container.append($userWrapper);
    $userWrapper.append($userStr);
    createAsteroid(8);
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

// DISTANCE FORMULA BING BONG TO CHECK WORDS OVERLAPPING
// smaller words go faster bigger bois go slower

const destroyAsteroid = (ind) => {
    currAsteroids[ind].text("");
    currAsteroids[ind].remove();
    currAsteroids.splice(ind, 1);
}

// Asteroid velocity
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
            activeWords.splice(i, 1);
            updateInput("");
            destroyAsteroid(i);
            console.log(activeWords, currAsteroids);
            createAsteroid(10);
        }
    }
}

// Determine if asteroid hits home
const doesAsteroidHit = ($asteroid) => {
    if($asteroid.position().top + $asteroid.height() > $userWrapper.position().top)
        return true; 
    return false;
}

// Determine if gameover
const isGameOver = () => {
    for(var i = 0; i < currAsteroids.length; i++) {
        console.log("currAstpos", currAsteroids[i].position().top, "waka", currAsteroids[i].position().top + currAsteroids[i].height());
        if(doesAsteroidHit(currAsteroids[i]))
            return true; 
    }
    return false;
}

// ADD IN PAUSE FEATURE

const fall = ($asteroid) => {
    var currY = $asteroid.position().top;
    $asteroid.css({top: currY + velY});
}

const fallLoop = () => {
    for(var i = 0; i < currAsteroids.length; i++) {
        fall(currAsteroids[i]);
    }
    if(isGameOver()) {
        $userWrapper.css("background", "red");
        for(var i = 0; i < currAsteroids.length; i++) {
            if(doesAsteroidHit(currAsteroids[i])){
                destroyAsteroid(i);
                console.log(activeWords, currAsteroids);
                createAsteroid(10);
            }
        }
    }
}

// CHANGE GRADIENT OF HIT ZONE AS WORDS APPROACH

// ONLY MAKE Y DIRECTION OF MOVEMENT
// Have astronaunts walking on the bottom or something or conneccted to a ship

// Update text displaying user input
const updateInput = (str) => {
    inputStr = str;
    $userStr.text(str);
}

// Tracking current user input
$(document).keydown(function(event) {
    if($title.is(":visible") && event.keyCode == KEY_ENTER)
        initGame();
    else if($title.is(":hidden")){
        if(event.keyCode >= KEY_A && event.keyCode <= KEY_Z)
            updateInput(inputStr + event.key);
        else if(event.keyCode == KEY_BACKSPACE && inputStr != "")
            updateInput(inputStr.substring(0, inputStr.length-1));
        else if(event.keyCode == KEY_TILDA)
            createAsteroid(10);
        checkWordsSpelled();
    }
});

$($container).click(function() {
    if($title.is(":visible"))
        initGame();
});

// MAIN
const main = () =>{
    initTitle();
    setInterval(fallLoop, interval);
}

main();