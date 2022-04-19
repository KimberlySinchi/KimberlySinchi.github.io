// DOM vars
var $titleScreen = $("#title_wrapper");
var $gameScreen = $("#game_wrapper");

// Other vars
var $charDiv = $("<p />", {
    id: "char",
    display: "in-line"
});
var titleString = "DANGER NOODLE";

const createTitleScreen = () => {
    for(let i = 0; i < titleString.length; i++){
        var currChar = titleString.charAt(i);
        if(currChar == " ")
            var $newCharDiv = $charDiv.text("").clone();
        else
            var $newCharDiv = $charDiv.text(currChar).clone();
        $titleScreen.append($newCharDiv);

        $newCharDiv.css({"animation-delay": (i*0.2).toString() + "s"});
    }
}

createTitleScreen();