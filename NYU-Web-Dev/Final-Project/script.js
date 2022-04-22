// JS libraries utilized
// https://www.typeitjs.com

// CONSTANTS
const KEYA = 65;
const KEYZ = 90;
const KEYBACKSPACE = 8;
const KEYENTER = 13;

// DOM elements
var $container = $("#wrapper");
var $word = $("<div />", {
    id: "word"
});
var $userStr = $("<div />", {
    id: "userStr"
});
var $title = $("<div />", {
    id: "title",
    text: "Space Racer"
});

// Script vars
var URL = "https://random-word-api.herokuapp.com/word?length="
var word = "";
var inputStr = "";
var wordLen = 5;
const activeWords = [];

// GAME BUILDING FUNCTIONS
const initTitle = () => {
    console.log("BONK");
    $container.append($title);
    // titleTypeIt.go();
}

const initGame = () => {
    $title.hide();
    $container.append($word);
    $container.append($userStr);
    fetchWordOfLength(8);
}

// ANIMATION FUNCTIONS
// const titleTypeIt = new TypeIt("#title", {
//     strings: "Space Racer",
// });

// Using fetch API: https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c
// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
// Fetching word
const fetchWordOfLength = (num) => {
    // Fetching the new word
    fetch(URL + num.toString())
        .then((response) => { // The response parameter takes the value of the object returned from fetch(URL)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data[0];
        })
        .then((currWord) => {
            $word.text(currWord);

            // TODO: NO REPEATS

            activeWords.push(currWord); // Appending new word to array
            console.log(activeWords); 
        })
        .catch((err) => {
            console.log("Something went wrong!", err);
        });
}

// Check if user spelled a word correctly & updates accordingly
const isWordSpelled = () => {
    for(let i = 0; i < activeWords.length; i++) {
        if(inputStr == activeWords[i]){
            activeWords.splice(i, 1);
            updateInput("");
            console.log(activeWords);
            fetchWordOfLength(10);
        }
    }
}

// Update text displaying user input
const updateInput = (str) => {
    inputStr = str;
    $userStr.text(str);
}

// Tracking current user input
$(document).keydown(function(event) {
    if($title.is(":visible") && event.keyCode == KEYENTER)
        initGame();
    else if($word.is(":visible")){
        if(event.keyCode >= KEYA && event.keyCode <= KEYZ) {
            updateInput(inputStr + event.key);
        }
        else if(event.keyCode == KEYBACKSPACE && inputStr != ""){
            updateInput(inputStr.substring(0, inputStr.length-1));
        }
        isWordSpelled();
    }
});

initTitle();