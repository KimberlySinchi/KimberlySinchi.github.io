// Constants
const windowH = $(window).height();
const KEYLEFT = 37;
const KEYUP = 38;
const KEYRIGHT = 39;
const KEYDOWN = 40;
const KEYA = 65;
const KEYW = 87;
const KEYD = 68;
const KEYS = 83;

// Game vars
var gridSize = 30;

var snakeRows = [];
var snakeCols = [];
var snakeLen;

var appleRow;
var appleCol;
var grow = false;

var mineRows = [];
var mineCols = [];
var mineCount;

var gameOver = false;

var velC = 1;
var velR = 0;
var updateVelC = 1;
var updateVelR = 0;
var refreshRate = 150;

var $tile = $("<div />", {
    id: "tile",
    class: "empty",
    width: .75 * windowH/gridSize,
    height: .75 * windowH/gridSize
});
var $row = $("<div />", {
    class: "row"
});
var $grid = $("<div />", {
    id: "grid"
});

var $container = $("#game_wrapper");
var $titleScreen = $("#title_wrapper");

const createGrid = n => {
    $container.append($grid);
    for(let r = 0; r < n; r++) {
        let $newRow = $row.clone();
        for(let c = 0; c < n; c++) {
            $newRow.append($tile.clone());
        }
        $grid.append($newRow);
    }
}

const initializeSnake = () => {
    snakeLen = 2;
    for(let i = 0; i < snakeLen; i++) {
        snakeRows.unshift(0);
        snakeCols.unshift(i);
        getTileAt(snakeRows[i], snakeCols[i]).attr("class", "snake");
    }
}

const initializeApple = () => {
    randomizeApple();
}

const initializeMine = () => {
    mineCount = gridSize/1;
    for(let i = 0; i < mineCount; i++) {
        randomizeMine();
    }
}

const gameLoop = () => {
    if(!gameOver) {
        velR = updateVelR;
        velC = updateVelC;

        let nextR = snakeRows[0] + velR;
        let nextC = snakeCols[0] + velC;

        if(collideWall(nextR, nextC) || 
           collideSelf(nextR, nextC) ||
           collideMine(nextR, nextC)) {
            gameLost();
            return false;
        }

        if(!grow) popTail();
        advanceHead(nextR, nextC);
        grow = false;

        if(collideApple(nextR, nextC)) {
            grow = true;
            snakeLen ++;
            getTileAt(appleRow, appleCol).attr("class", "snake");
            randomizeApple();
        }
    }
}

const gameLost = () => {
    $container.attr("class", "game-over");
    var audio = new Audio();
    audio.src = "assets/bonk.mp3";
    audio.play();
    gameOver = true; 
}

const getTileAt = (row, col) => {
    let curr = $grid.children().eq(row);
    return $(curr).children().eq(col);
}

const random = (lower, upper) => parseInt((Math.random() * (upper - lower) + lower));

const snakeContains = (start, r, c) => {
    for(let i = start; i < snakeLen; i++) {
        if(snakeRows[i] == r && snakeCols[i] == c) return true;
    }
    return false;
}

const advanceHead = (r, c) => {
    snakeRows.unshift(r);
    snakeCols.unshift(c);
    
    getTileAt(r, c).attr("class", "snake");
}

const popTail = () => {
    getTileAt(snakeRows.pop(), snakeCols.pop()).attr("class", "empty");
}

const collideWall = (r, c) => {
    if(r >= gridSize || r < 0) return true;
    if(c >= gridSize || c < 0) return true;
    return false;
}

const collideSelf = (r, c) => {
    return snakeContains(1, r, c);
}

const collideApple = (r, c) => {
    return r == appleRow && c == appleCol;
}

const collideMine = (r, c) => {
    for(let i = 0; i < mineCount; i++) {
        if(mineRows[i] == r && mineCols[i] == c) return true;
    }
    return false;
}

const randomizeApple = () => {
    let r;
    let c;

    do {
        r = random(0, gridSize);
        c = random(0, gridSize);
    } while(snakeContains(0,r,c) || collideMine(r, c));

    appleRow = r;
    appleCol = c;

    getTileAt(appleRow, appleCol).attr("class", "apple");
}

const randomizeMine = () => {
    let r;
    let c;

    do {
        r = random(1, gridSize);
        c = random(0, gridSize);
    } while(snakeContains(0,r,c) || collideApple(r, c) || collideMine(r, c));

    getTileAt(r, c).attr("class", "mine");

    mineRows.push(r);
    mineCols.push(c);
}

$(document).keydown(function(event) {
    if((event.keyCode == KEYUP || event.keyCode == KEYW) && velR != 1) {
        updateVelR = -1;
        updateVelC = 0;
    } else if((event.keyCode == KEYDOWN || event.keyCode == KEYS) && velR != -1) {
        updateVelR = 1;
        updateVelC = 0;
    } else if((event.keyCode == KEYLEFT || event.keyCode == KEYA) && velC != 1) {
        updateVelR = 0;
        updateVelC = -1;
    } else if((event.keyCode == KEYRIGHT || event.keyCode == KEYD) && velC != -1) {
        updateVelR = 0;
        updateVelC = 1;
    }
});

$($titleScreen).click(function() {
    $titleScreen.hide();
    $gameScreen.css({"display": "flex"});
    console.log("IM ALIVE");
        createGrid(gridSize);
        initializeSnake();
        initializeApple();
        initializeMine();
        setInterval(gameLoop, refreshRate);
});