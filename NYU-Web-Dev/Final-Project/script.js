// CONSTANTS
const KEYA = 65;
const KEYZ = 90;
const KEYBACKSPACE = 8;

// DOM elements
var $word = $("#word");
var $userStr = $("#userStr")

// Script vars
var URL = "https://random-word-api.herokuapp.com/word?length="
var word = "";
var inputStr = "";
var wordLen = 5;
const activeWords = [];

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

// Check if user spelled a word correctly
const isWordSpelled = () => {
    for(let i = 0; i < activeWords.length; i++) {
        if(inputStr == activeWords[i]){
            activeWords.splice(i, 1);
            updateInput("");
            console.log(activeWords);
            fetchWordOfLength(5);
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
    if(event.keyCode >= KEYA && event.keyCode <= KEYZ) {
        updateInput(inputStr + event.key);
    }
    else if(event.keyCode == KEYBACKSPACE && inputStr != ""){
        updateInput(inputStr.substring(0, inputStr.length-1));
    }
    isWordSpelled();
});

fetchWordOfLength(8);