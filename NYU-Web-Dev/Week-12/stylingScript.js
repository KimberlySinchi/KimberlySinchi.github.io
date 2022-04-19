// DOM vars
var $titleScreen = $("#title_wrapper");
var $gameScreen = $("#game_wrapper");

// Other vars
var $titleDiv = $("<div />", {
    id: "title_container"
});
var $charDiv = $("<p />", {
    id: "char",
    display: "in-line"
});
var $instrucDiv = $("<p />", {
    id: "instruc",
    display: "inline-block"
});
var titleString = "DANGER NOODLE";

const createTitleScreen = () => {
    $titleScreen.append($titleDiv);
    for(let i = 0; i < titleString.length; i++){
        var currChar = titleString.charAt(i);
        if(currChar == " ")
            var $newCharDiv = $charDiv.text("").clone();    
        else
            var $newCharDiv = $charDiv.text(currChar).clone();
        $titleDiv.append($newCharDiv);

        $newCharDiv.css({"animation-delay": (i*0.2).toString() + "s"});
    }
    $titleScreen.append($instrucDiv.text("Instructions: WASD or Arrow Keys to move!"))
}

createTitleScreen();