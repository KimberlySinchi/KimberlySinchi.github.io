var $word = $("#word");
var $userStr = $("#usrStr")

var URL = "https://random-word-api.herokuapp.com/word?length="
var word = "";

// Using fetch API: https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c
// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
// Fetching word
const fetchWordOfLength = (num) => {
    URL += num.toString();
    // Fetching the new word
    // Must await as fetch is asynchronous
    fetch(URL)
        .then((response) => { // The response parameter takes the value of the object returned from fetch(URL)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data[0];
        })
        .then((curr_word) => {
            $word.text(curr_word);
        })
        .catch((err) => {
            console.log("Something went wrong!", err);
        });
}

// Tracking current user input


fetchWordOfLength(8);

